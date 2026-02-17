package database

import (
	"context"

	"github.com/giogiovana/TCC/models"
)

type ControleOsRepo interface {
	Create(ctx context.Context, in models.ControleOsCreate) (models.ControleOs, error)
	GetById(ctx context.Context, id string) (*models.ControleOs, error)
	List(ctx context.Context, limit, offset int) ([]models.ControleOs, error)
	Update(ctx context.Context, in *models.ControleOs) error
	Delete(ctx context.Context, id string) error
}

type ControleOsRepoPG struct{ db *DAO }

func NewControleOsRepo(db *DAO) *ControleOsRepoPG { return &ControleOsRepoPG{db: db} }

func (r *ControleOsRepoPG) Create(ctx context.Context, in models.ControleOsCreate) (models.ControleOs, error) {
	const q = `
	insert into controle_os
		(id_os, id_tecnico, id_servico, data_inicio, data_fim, status, observacao)
	values
		($1::int, $2::int, $3::int, coalesce(nullif($4,'')::date, now()::date), nullif($5,'')::date, $6::int2, nullif($7,''))
	returning id_controle
	`

	var idControle string
	if err := r.db.DB().QueryRowContext(
		ctx,
		q,
		in.IdOs,
		in.IdTecnico,
		in.IdServico,
		in.DataInicio,
		in.DataFim,
		in.Status,
		in.Observacao,
	).Scan(&idControle); err != nil {
		return models.ControleOs{}, err
	}

	out := models.ControleOs{
		IdControle: idControle,
		IdOs:       in.IdOs,
		IdTecnico:  in.IdTecnico,
		IdServico:  in.IdServico,
		DataInicio: in.DataInicio,
		DataFim:    in.DataFim,
		Status:     in.Status,
		Observacao: in.Observacao,
	}

	return out, nil
}

func (r *ControleOsRepoPG) GetById(ctx context.Context, id string) (*models.ControleOs, error) {
	const q = `
	select id_controle, id_os, id_tecnico, id_servico, data_inicio, data_fim, status, observacao
	from controle_os
	where id_controle = $1
	`
	var out models.ControleOs
	if err := r.db.DB().GetContext(ctx, &out, q, id); err != nil {
		return nil, err
	}
	return &out, nil
}

func (r *ControleOsRepoPG) List(ctx context.Context, limit, offset int) ([]models.ControleOs, error) {
	if limit <= 0 {
		limit = 50
	}
	const q = `
	select id_controle, id_os, id_tecnico, id_servico, data_inicio, data_fim, status, observacao
	from controle_os
	order by id_controle
	limit $1 offset $2
	`

	var out []models.ControleOs
	if err := r.db.DB().SelectContext(ctx, &out, q, limit, offset); err != nil {
		return nil, err
	}
	return out, nil
}

func (r *ControleOsRepoPG) Update(ctx context.Context, in *models.ControleOs) error {
	const q = `
	update controle_os set
		id_os = coalesce(nullif($2,'')::int, id_os),
		id_tecnico = coalesce(nullif($3,'')::int, id_tecnico),
		id_servico = coalesce(nullif($4,'')::int, id_servico),
		data_inicio = coalesce(nullif($5,'')::date, data_inicio),
		data_fim = coalesce(nullif($6,'')::date, data_fim),
		status = coalesce(nullif($7,'')::int2, status),
		observacao = coalesce(nullif($8,''), observacao)
	where id_controle = $1
	returning id_controle, id_os, id_tecnico, id_servico, data_inicio, data_fim, status, observacao
	`

	return r.db.DB().QueryRowxContext(
		ctx,
		q,
		in.IdControle,
		in.IdOs,
		in.IdTecnico,
		in.IdServico,
		in.DataInicio,
		in.DataFim,
		in.Status,
		in.Observacao,
	).StructScan(in)
}

func (r *ControleOsRepoPG) Delete(ctx context.Context, id string) error {
	_, err := r.db.DB().ExecContext(ctx, `delete from controle_os where id_controle = $1`, id)
	return err
}
