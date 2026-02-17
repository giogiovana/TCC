package database

import (
	"context"

	"github.com/giogiovana/TCC/models"
)

type OsRepo interface {
	Create(ctx context.Context, in models.OsCreate) (models.Os, error)
	GetById(ctx context.Context, id string) (*models.Os, error)
	List(ctx context.Context, limit, offset int) ([]models.Os, error)
	Update(ctx context.Context, in *models.Os) error
	Delete(ctx context.Context, id string) error
}

type OsRepoPG struct{ db *DAO }

func NewOsRepo(db *DAO) *OsRepoPG { return &OsRepoPG{db: db} }

func (r *OsRepoPG) Create(ctx context.Context, in models.OsCreate) (models.Os, error) {
	const q = `
	insert into ordens_servico
		(usuario, id_cliente, id_produto, data_incio, data_fim, total_horas_trabalhadas, valor_os, descricao, observacao)
	values
		($1, $2::int, $3::int, coalesce(nullif($4,'')::date, now()::date), nullif($5,'')::date, nullif($6,'')::numeric, nullif($7,'')::money, $8, nullif($9,''))
	returning id_os
	`

	var idOs string
	if err := r.db.DB().QueryRowContext(
		ctx,
		q,
		in.Usuario,
		in.IdCliente,
		in.IdProduto,
		in.DataInicio,
		in.DataFim,
		in.TotalHorasTrabalhadas,
		in.ValorOs,
		in.Descricao,
		in.Observacao,
	).Scan(&idOs); err != nil {
		return models.Os{}, err
	}

	out := models.Os{
		IdOs:                  idOs,
		Usuario:               in.Usuario,
		IdCliente:             in.IdCliente,
		IdProduto:             in.IdProduto,
		DataInicio:            in.DataInicio,
		DataFim:               in.DataFim,
		TotalHorasTrabalhadas: in.TotalHorasTrabalhadas,
		ValorOs:               in.ValorOs,
		Descricao:             in.Descricao,
		Observacao:            in.Observacao,
	}

	return out, nil
}

func (r *OsRepoPG) GetById(ctx context.Context, id string) (*models.Os, error) {
	const q = `
	select id_os, usuario, id_cliente, id_produto, data_incio, data_fim, total_horas_trabalhadas, valor_os, descricao, observacao
	from ordens_servico
	where id_os = $1
	`
	var out models.Os
	if err := r.db.DB().GetContext(ctx, &out, q, id); err != nil {
		return nil, err
	}
	return &out, nil
}

func (r *OsRepoPG) List(ctx context.Context, limit, offset int) ([]models.Os, error) {
	if limit <= 0 {
		limit = 50
	}
	const q = `
	select id_os, usuario, id_cliente, id_produto, data_incio, data_fim, total_horas_trabalhadas, valor_os, descricao, observacao
	from ordens_servico
	order by id_os
	limit $1 offset $2
	`

	var out []models.Os
	if err := r.db.DB().SelectContext(ctx, &out, q, limit, offset); err != nil {
		return nil, err
	}
	return out, nil
}

func (r *OsRepoPG) Update(ctx context.Context, in *models.Os) error {
	const q = `
	update ordens_servico set
		usuario = coalesce(nullif($2,''), usuario),
		id_cliente = coalesce(nullif($3,'')::int, id_cliente),
		id_produto = coalesce(nullif($4,'')::int, id_produto),
		data_incio = coalesce(nullif($5,'')::date, data_incio),
		data_fim = coalesce(nullif($6,'')::date, data_fim),
		total_horas_trabalhadas = coalesce(nullif($7,'')::numeric, total_horas_trabalhadas),
		valor_os = coalesce(nullif($8,'')::money, valor_os),
		descricao = coalesce(nullif($9,''), descricao),
		observacao = coalesce(nullif($10,''), observacao)
	where id_os = $1
	returning id_os, usuario, id_cliente, id_produto, data_incio, data_fim, total_horas_trabalhadas, valor_os, descricao, observacao
	`

	return r.db.DB().QueryRowxContext(
		ctx,
		q,
		in.IdOs,
		in.Usuario,
		in.IdCliente,
		in.IdProduto,
		in.DataInicio,
		in.DataFim,
		in.TotalHorasTrabalhadas,
		in.ValorOs,
		in.Descricao,
		in.Observacao,
	).StructScan(in)
}

func (r *OsRepoPG) Delete(ctx context.Context, id string) error {
	_, err := r.db.DB().ExecContext(ctx, `delete from ordens_servico where id_os = $1`, id)
	return err
}
