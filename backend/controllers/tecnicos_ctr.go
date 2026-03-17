package controllers

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/models"
	"github.com/giogiovana/TCC/services"
	"github.com/go-chi/chi/v5"
	"github.com/lib/pq"
)

type TecnicoController struct{ svc *services.TecnicoService }

func NewTecnicoController(s *services.TecnicoService) *TecnicoController {
	return &TecnicoController{svc: s}
}

func (c *TecnicoController) Register(r chi.Router) {
	r.Route("/tecnicos", func(r chi.Router) {
		r.Post("/", c.create)
		r.Get("/", c.list)
		r.Get("/{id}", c.get)
		r.Put("/{id}", c.update)
		r.Delete("/{id}", c.delete)
	})
}

func (c *TecnicoController) create(w http.ResponseWriter, r *http.Request) {
	var in models.TecnicoCreate
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		respondErr(w, http.StatusBadRequest, "json inválido")
		return
	}
	out, err := c.svc.Create(r.Context(), in)
	if err != nil {
		switch e := err.(type) {
		case *pq.Error:
			if string(e.Code) == "23505" { // unique_violation
				respondErr(w, http.StatusConflict, "cpf_cnpj já cadastrado")
				return
			}
			if errors.Is(err, database.ErrUsuarioFKInexistente) {
				respondErr(w, http.StatusConflict, database.ErrUsuarioFKInexistente.Error())
				return
			}
			respondErr(w, http.StatusInternalServerError, err.Error())
			fmt.Println("erro de banco: " + e.Error())
			return
		default:
			if err == services.ErrDadosInvalidos || err == sql.ErrNoRows {
				respondErr(w, http.StatusBadRequest, err.Error())
				fmt.Println("erro de banco: " + e.Error())
				return
			}
			respondErr(w, http.StatusInternalServerError, err.Error())
			fmt.Println("erro de banco: " + e.Error())
			return
		}
	}
	respond(w, http.StatusCreated, out)
}

func (c *TecnicoController) get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	cli, err := c.svc.GetById(r.Context(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado")
			return
		}
		respondErr(w, 500, err.Error())
		return
	}
	respond(w, 200, cli)
}

func (c *TecnicoController) list(w http.ResponseWriter, r *http.Request) {
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))
	items, err := c.svc.List(r.Context(), limit, offset)
	if err != nil {
		respondErr(w, 500, err.Error())
		return
	}
	respond(w, 200, items)
}

func (c *TecnicoController) update(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var in models.TecnicoUpdate
	if err := json.NewDecoder(r.Body).Decode((&in)); err != nil {
		respondErr(w, 400, "json inválido")
		return
	}

	out, err := c.svc.Update(r.Context(), id, in)
	if err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado")
			return
		}
		respondErr(w, 500, err.Error())
		return
	}

	respond(w, http.StatusAccepted, out)
}

func (c *TecnicoController) delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := c.svc.Delete(r.Context(), id); err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado")
			return
		}
		respondErr(w, 500, err.Error())
		return
	}
	w.WriteHeader(204)
}
