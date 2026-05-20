package controllers

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/giogiovana/TCC/services"
	"github.com/go-chi/chi/v5"
	"github.com/golang-jwt/jwt/v5"
)

type AuthController struct {
	svc       *services.UsuarioService
	jwtSecret []byte
}

func NewAuthController(s *services.UsuarioService, secret []byte) *AuthController {
	return &AuthController{svc: s, jwtSecret: secret}
}

func (a *AuthController) Register(r chi.Router) {
	r.Post("/auth/login", a.login)
}

type loginReq struct {
	Login string `json:"login"`
	Senha string `json:"senha"`
}

func (a *AuthController) login(w http.ResponseWriter, r *http.Request) {
	var in loginReq
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil || in.Login == "" || in.Senha == "" {
		respondErr(w, 400, "json inválido")
		fmt.Println("json inválido")
		return
	}
	u, err := a.svc.Authenticate(r.Context(), in.Login, in.Senha)
	if err != nil {
		status := 401
		if err != services.ErrInvalidCredentials && !errors.Is(err, sql.ErrNoRows) {
			status = 500
		}
		respondErr(w, status, "login ou senha inválidos")
		fmt.Println("login ou senha inválidos")
		return
	}

	claims := jwt.RegisteredClaims{
		Subject:   u.Login,
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	s, err := token.SignedString(a.jwtSecret)
	if err != nil {
		respondErr(w, 500, "erro ao gerar token")
		fmt.Println("erro ao gerar token")
		return
	}

	respond(w, 200, map[string]any{
		"access_token": s,
		"token_type":   "Bearer",
		"expires_in":   86400,
		"user":         u,
	})
}
