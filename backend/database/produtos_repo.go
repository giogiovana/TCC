package database

import (
	"context"

	"github.com/giogiovana/TCC/models"
)

type ProdutoRepo interface {
	Create(ctx context.Context, in models.ProdutoCreate) (models.Produto, error)
	GetById(ctx context.Context, id string) (*models.Produto, error)
	List(ctx context.Context, limit, offset int) ([]models.Produto, error)
	Update(ctx context.Context, in *models.Produto) error
	Delete(ctx context.Context, id string) error
}

type ProdutoRepoPG struct{ db *DAO }

func NewProdutoRepo(db *DAO) *ProdutoRepoPG { return &ProdutoRepoPG{db: db} }

func (r *ProdutoRepoPG) Create(ctx context.Context, in models.ProdutoCreate) (models.Produto, error) {
	const q = `insert into produtos (marca, modelo, tipo, descricao, categoria, observacao) values ($1, $2, $3, $4, $5, $6) returning id_produto`

	var idProduto string
	if err := r.db.DB().QueryRowContext(ctx, q, in.Marca, in.Modelo, in.Tipo, in.Descricao, in.Categoria, in.Observacao).Scan(&idProduto); err != nil {
		return models.Produto{}, err
	}

	out := models.Produto{
		IdProduto:  idProduto,
		Marca:      in.Marca,
		Modelo:     in.Modelo,
		Tipo:       in.Tipo,
		Descricao:  in.Descricao,
		Categoria:  in.Categoria,
		Observacao: in.Observacao,
	}
	return out, nil
}

func (r *ProdutoRepoPG) GetById(ctx context.Context, id string) (*models.Produto, error) {
	const q = `select id_produto, marca, modelo, tipo, descricao, categoria, observacao from produtos where id_produto = $1`
	var p models.Produto
	if err := r.db.DB().GetContext(ctx, &p, q, id); err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *ProdutoRepoPG) List(ctx context.Context, limit, offset int) ([]models.Produto, error) {
	if limit <= 0 {
		limit = 50
	}
	const q = `
	select id_produto, marca, modelo, tipo, descricao, categoria, observacao 
	from produtos order by id_produto 
	limit $1 offset $2
	`

	var out []models.Produto
	if err := r.db.DB().SelectContext(ctx, &out, q, limit, offset); err != nil {
		return nil, err
	}
	return out, nil
}

func (r *ProdutoRepoPG) Update(ctx context.Context, in *models.Produto) error {
	const q = `
	update produtos set
		marca = coalesce(nullif($2,''), marca),
		modelo = coalesce(nullif($3,''), modelo),
		tipo = coalesce(nullif($4, ''), tipo),
		descricao = coalesce(nullif($5, ''), descricao),
		categoria = coalesce(nullif($6, ''), categoria),
		observacao = coalesce(nullif($7, ''), observacao)
	where
		id_produto = $1
	returning
		id_produto, marca, modelo, tipo, descricao, categoria, observacao
	`
	return r.db.DB().QueryRowxContext(ctx, q, in.IdProduto, in.Marca, in.Modelo, in.Tipo, in.Descricao, in.Categoria, in.Observacao).StructScan(in)
}

func (r *ProdutoRepoPG) Delete(ctx context.Context, id string) error {
	_, err := r.db.DB().ExecContext(ctx, `delete from produtos where id_produto = $1`, id)
	return err
}
