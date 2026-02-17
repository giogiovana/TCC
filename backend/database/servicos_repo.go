package database

import (
	"context"

	"github.com/giogiovana/TCC/models"
)

type ServicoRepo interface {
	Create(ctx context.Context, in models.ServicoCreate) (models.Servico, error)
	GetById(ctx context.Context, in string) (*models.Servico, error)
	List(ctx context.Context, limit, offset int) ([]models.Servico, error)
	Update(ctx context.Context, in *models.Servico) error
	Delete(ctx context.Context, id string) (err error)
}

type ServicoRepoPG struct{ db *DAO }

func NewServicoRepo(db *DAO) *ServicoRepoPG { return &ServicoRepoPG{db: db} }

func (r *ServicoRepoPG) Create(ctx context.Context, in models.ServicoCreate) (models.Servico, error) {
	const qServico = `
		insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria)
		values ($1, $2, $3::money, $4::numeric, $5)
		returning id_servico
	`
	var idServico string

	if err := r.db.DB().QueryRowContext(ctx, qServico, in.Nome, in.Descricao, in.Valor, in.TempoEstimado, in.Categoria).Scan(&idServico); err != nil {
		return models.Servico{}, err
	}

	out := models.Servico{
		IdServico:     idServico,
		Nome:          in.Nome,
		Descricao:     in.Descricao,
		Valor:         in.Valor,
		TempoEstimado: in.TempoEstimado,
		Categoria:     in.Categoria,
	}

	return out, nil
}

func (r *ServicoRepoPG) GetById(ctx context.Context, id string) (*models.Servico, error) {
	const q = `
	select id_servico, nome, descricao, valor_servico, tempo_estimado, categoria
	from servicos where id_servico = $1`

	var s models.Servico
	if err := r.db.DB().GetContext(ctx, &s, q, id); err != nil {
		return nil, err
	}
	return &s, nil
}

func (r *ServicoRepoPG) List(ctx context.Context, limit, offset int) ([]models.Servico, error) {
	if limit <= 0 {
		limit = 50
	}
	const q = `
	select id_servico, nome, descricao, valor_servico, tempo_estimado, categoria
	from servicos
	order by id_servico limit $1 offset $2`

	var out []models.Servico
	if err := r.db.DB().SelectContext(ctx, &out, q, limit, offset); err != nil {
		return nil, err
	}
	return out, nil
}

func (r *ServicoRepoPG) Update(ctx context.Context, in *models.Servico) error {
	const q = `
	update servicos set
		nome = coalesce(nullif($2,''), nome),
		descricao = coalesce(nullif($3,''), descricao),
		valor_servico = coalesce(nullif($4,'')::money, valor_servico),
		tempo_estimado = coalesce(nullif($5,'')::numeric, tempo_estimado),
		categoria = coalesce(nullif($6,''), categoria)
	where id_servico = $1
	returning id_servico, nome, descricao, valor_servico, tempo_estimado, categoria
	`
	return r.db.DB().QueryRowxContext(ctx, q,
		in.IdServico, in.Nome, in.Descricao, in.Valor, in.TempoEstimado, in.Categoria,
	).StructScan(in)
}

func (r *ServicoRepoPG) Delete(ctx context.Context, id string) error {
	_, err := r.db.DB().ExecContext(ctx, `delete from servicos where id_servico = $1`, id)
	return err
}
