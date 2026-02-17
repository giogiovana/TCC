package api

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/giogiovana/TCC/config"
	"github.com/giogiovana/TCC/controllers"
	"github.com/giogiovana/TCC/services"

	"github.com/giogiovana/TCC/database"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

type Server struct {
	cfg *config.ApiConfig
	db  *database.DAO
}

func New(cfg *config.ApiConfig, dao *database.DAO) *Server {
	return &Server{cfg: cfg, db: dao}
}

func (s *Server) Listen() {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	r.Use(middleware.RequestID, middleware.RealIP, middleware.Logger, middleware.Recoverer)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		_, _ = w.Write([]byte("sistema-os"))
	})

	usuarioRepo := database.NewUsuarioRepo(s.db)
	clienteRepo := database.NewClienteRepo(s.db)
	tecnicoRepo := database.NewTecnicoRepo(s.db)
	produtoRepo := database.NewProdutoRepo(s.db)
	servicoRepo := database.NewServicoRepo(s.db)
	osRepo := database.NewOsRepo(s.db)
	controleOsRepo := database.NewControleOsRepo(s.db)

	usuarioSvc := services.NewUsuarioService(usuarioRepo)
	clienteSvc := services.NewClienteService(clienteRepo)
	tecnicoSvc := services.NewTecnicoService(tecnicoRepo)
	produtoSvc := services.NewProdutoService(produtoRepo)
	servicoSvc := services.NewServicoService(servicoRepo)
	osSvc := services.NewOsService(osRepo)
	controleOsSvc := services.NewControleOsService(controleOsRepo)

	// auth (login/JWT)
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatal("JWT_SECRET não definido")
	}

	authCtl := controllers.NewAuthController(usuarioSvc, []byte(secret))
	authCtl.Register(r)

	// (protegidos por Bearer JWT)
	usuarioCtl := controllers.NewUsuarioController(usuarioSvc)
	clienteCtl := controllers.NewClienteController(clienteSvc)
	tecnicoCtl := controllers.NewTecnicoController(tecnicoSvc)
	produtoCtl := controllers.NewProdutoController(produtoSvc)
	servicoCtl := controllers.NewServicoController(servicoSvc)
	osCtl := controllers.NewOsController(osSvc)
	controleOsCtl := controllers.NewControleOsController(controleOsSvc)

	r.Group(func(pr chi.Router) {
		pr.Use(controllers.AuthMiddleware([]byte(secret)))
		usuarioCtl.Register(pr)
		clienteCtl.Register(pr)
		tecnicoCtl.Register(pr)
		produtoCtl.Register(pr)
		servicoCtl.Register(pr)
		osCtl.Register(pr)
		controleOsCtl.Register(pr)
	})

	addr := s.cfg.Port
	if addr == "" {
		addr = "8080"
	}
	if addr[0] != ':' {
		addr = ":" + addr
	}

	srv := &http.Server{
		Addr:              addr,
		Handler:           r,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	go func() {
		log.Printf("API ouvindo em http://localhost%s", addr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("erro ao iniciar servidor: %v", err)
		}
	}()

	<-ctx.Done()

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Printf("shutdown forçado: %v", err)
	}
	log.Println("servidor encerrado")
}
