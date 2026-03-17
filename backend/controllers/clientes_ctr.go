package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/giogiovana/TCC/models"
	"github.com/giogiovana/TCC/services"
	"github.com/go-chi/chi/v5"
	"github.com/lib/pq"
)

type ClienteController struct{ svc *services.ClienteService }

func NewClienteController(s *services.ClienteService) *ClienteController {
	return &ClienteController{svc: s}
}

func (c *ClienteController) Register(r chi.Router) {
	r.Route("/clientes", func(r chi.Router) {
		r.Post("/", c.create)
		r.Get("/", c.list)
		r.Get("/{id}", c.get)
		r.Put("/{id}", c.update)
		r.Delete("/{id}", c.delete)
	})
}

func (c *ClienteController) create(w http.ResponseWriter, r *http.Request) {
	var in models.ClienteCreate
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		respondErr(w, http.StatusBadRequest, "json inválido")
		fmt.Println("json inválido")
		return
	}
	out, err := c.svc.Create(r.Context(), in)
	if err != nil {
		switch e := err.(type) {
		case *pq.Error:
			if string(e.Code) == "23505" { // unique_violation
				respondErr(w, http.StatusConflict, "cpf_cnpj já cadastrado")
				fmt.Println("cpf_cnpj já cadastrado")
				return
			}
			respondErr(w, http.StatusInternalServerError, e.Error())
			fmt.Println("erro de banco: " + e.Error())
			return
		default:
			if err == services.ErrDadosInvalidos || err == sql.ErrNoRows {
				respondErr(w, http.StatusBadRequest, err.Error())
				fmt.Println(e.Error())
				return
			}
			respondErr(w, http.StatusInternalServerError, err.Error())
			fmt.Println(e.Error())
			return
		}
	}
	respond(w, http.StatusCreated, out)
}

func (c *ClienteController) get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	cli, err := c.svc.GetById(r.Context(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado")
			fmt.Println("cliente não encontrado")
			return
		}
		respondErr(w, 500, err.Error())
		return
	}
	respond(w, 200, cli)
}

func (c *ClienteController) list(w http.ResponseWriter, r *http.Request) {
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))
	items, err := c.svc.List(r.Context(), limit, offset)
	if err != nil {
		respondErr(w, 500, err.Error())
		return
	}
	respond(w, 200, items)
}

func (c *ClienteController) update(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var in models.ClienteUpdate
	if err := json.NewDecoder(r.Body).Decode((&in)); err != nil {
		respondErr(w, 400, "json inválido")
		fmt.Println("json inválido")
		return
	}

	_, err := c.svc.Update(r.Context(), id, in)
	if err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado")
			fmt.Println("cliente não encontrado")
			return
		}
		respondErr(w, 500, err.Error())
		fmt.Println(err.Error())
		return
	}
}

func (c *ClienteController) delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := c.svc.Delete(r.Context(), id); err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado")
			fmt.Println("não encontrado")
			return
		}
		respondErr(w, 500, err.Error())
		fmt.Println(err.Error())
		return
	}
	w.WriteHeader(204)
}
