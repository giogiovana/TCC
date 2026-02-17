package controllers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/giogiovana/TCC/models"
	"github.com/giogiovana/TCC/services"
	"github.com/go-chi/chi/v5"
)

type ControleOsController struct{ svc *services.ControleOsService }

func NewControleOsController(s *services.ControleOsService) *ControleOsController {
	return &ControleOsController{svc: s}
}

func (c *ControleOsController) Register(r chi.Router) {
	r.Route("/controle-os", func(r chi.Router) {
		r.Post("/", c.create)
		r.Get("/", c.list)
		r.Get("/{id}", c.get)
		r.Put("/{id}", c.update)
		r.Delete("/{id}", c.delete)
	})
}

func (c *ControleOsController) create(w http.ResponseWriter, r *http.Request) {
	var in models.ControleOsCreate
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		respondErr(w, http.StatusBadRequest, "json inválido")
		return
	}

	out, err := c.svc.Create(r.Context(), in)
	if err != nil {
		if err == services.ErrDadosInvalidos || err == sql.ErrNoRows {
			respondErr(w, http.StatusBadRequest, err.Error())
			return
		}
		respondErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	respond(w, http.StatusCreated, out)
}

func (c *ControleOsController) get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	out, err := c.svc.GetById(r.Context(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado")
			return
		}
		respondErr(w, 500, err.Error())
		return
	}
	respond(w, 200, out)
}

func (c *ControleOsController) list(w http.ResponseWriter, r *http.Request) {
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))
	items, err := c.svc.List(r.Context(), limit, offset)
	if err != nil {
		respondErr(w, 500, err.Error())
		return
	}
	respond(w, 200, items)
}

func (c *ControleOsController) update(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var in models.ControleOsUpdate
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		respondErr(w, 400, "json inválido")
		return
	}

	out, err := c.svc.Update(r.Context(), id, in)
	if err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado ")
			return
		}
		respondErr(w, 500, err.Error())
		return
	}
	respond(w, http.StatusAccepted, out)
}

func (c *ControleOsController) delete(w http.ResponseWriter, r *http.Request) {
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
