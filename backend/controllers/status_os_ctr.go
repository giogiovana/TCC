package controllers

import (
	"net/http"
	"strconv"

	"github.com/giogiovana/TCC/services"
	"github.com/go-chi/chi/v5"
)

type StatusOsController struct{ svc *services.StatusOsService }

func NewStatusOsController(s *services.StatusOsService) *StatusOsController {
	return &StatusOsController{svc: s}
}

func (c *StatusOsController) Register(r chi.Router) {
	r.Route("/status-os", func(r chi.Router) {
		r.Get("/", c.list)
	})
}

func (c *StatusOsController) list(w http.ResponseWriter, r *http.Request) {
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))

	items, err := c.svc.List(r.Context(), limit, offset)
	if err != nil {
		respondErr(w, http.StatusInternalServerError, err.Error())
		return
	}

	respond(w, http.StatusOK, items)
}
