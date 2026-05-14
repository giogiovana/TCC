package database

import (
	"context"

	"github.com/giogiovana/TCC/models"
)

type StatusOsRepo interface {
	List(ctx context.Context, limit, offset int) ([]models.StatusOs, error)
}

type StatusOsRepoPG struct{ db *DAO }

func NewStatusOsRepo(db *DAO) *StatusOsRepoPG { return &StatusOsRepoPG{db: db} }

func (r *StatusOsRepoPG) List(ctx context.Context, limit, offset int) ([]models.StatusOs, error) {
	if limit <= 0 {
		limit = 50
	}

	const q = `
	select id_status::text as id_status, descricao
	from status_os
	order by id_status limit $1 offset $2`

	var out []models.StatusOs
	if err := r.db.DB().SelectContext(ctx, &out, q, limit, offset); err != nil {
		return nil, err
	}
	return out, nil
}
