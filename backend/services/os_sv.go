package services

import (
	"context"
	"strings"

	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/models"
)

type OsService struct{ repo database.OsRepo }

func NewOsService(r database.OsRepo) *OsService { return &OsService{repo: r} }

func (s *OsService) Create(ctx context.Context, in models.OsCreate) (models.Os, error) {
	if strings.TrimSpace(in.Usuario) == "" || strings.TrimSpace(in.IdCliente) == "" || strings.TrimSpace(in.IdProduto) == "" || strings.TrimSpace(in.Descricao) == "" {
		return models.Os{}, ErrDadosInvalidos
	}
	in.Usuario = strings.TrimSpace(in.Usuario)
	in.IdCliente = strings.TrimSpace(in.IdCliente)
	in.IdProduto = strings.TrimSpace(in.IdProduto)
	in.DataInicio = strings.TrimSpace(in.DataInicio)
	in.DataFim = strings.TrimSpace(in.DataFim)
	in.TotalHorasTrabalhadas = strings.TrimSpace(in.TotalHorasTrabalhadas)
	in.ValorOs = strings.TrimSpace(in.ValorOs)
	in.Descricao = strings.TrimSpace(in.Descricao)
	in.Observacao = strings.TrimSpace(in.Observacao)

	return s.repo.Create(ctx, in)
}

func (s *OsService) GetById(ctx context.Context, id string) (models.Os, error) {
	out, err := s.repo.GetById(ctx, id)
	if err != nil {
		return models.Os{}, err
	}
	return *out, nil
}

func (s *OsService) List(ctx context.Context, limit, offset int) ([]models.Os, error) {
	out, err := s.repo.List(ctx, limit, offset)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (s *OsService) Update(ctx context.Context, idOs string, in models.OsUpdate) (models.Os, error) {
	var o models.Os
	o.IdOs = idOs

	if in.Usuario != nil {
		o.Usuario = strings.TrimSpace(*in.Usuario)
	}

	if in.IdCliente != nil {
		o.IdCliente = strings.TrimSpace(*in.IdCliente)
	}

	if in.IdProduto != nil {
		o.IdProduto = strings.TrimSpace(*in.IdProduto)
	}

	if in.DataInicio != nil {
		o.DataInicio = strings.TrimSpace(*in.DataInicio)
	}

	if in.DataFim != nil {
		o.DataFim = strings.TrimSpace(*in.DataFim)
	}

	if in.TotalHorasTrabalhadas != nil {
		o.TotalHorasTrabalhadas = strings.TrimSpace(*in.TotalHorasTrabalhadas)
	}

	if in.ValorOs != nil {
		o.ValorOs = strings.TrimSpace(*in.ValorOs)
	}

	if in.Descricao != nil {
		o.Descricao = strings.TrimSpace(*in.Descricao)
	}

	if in.Observacao != nil {
		o.Observacao = strings.TrimSpace(*in.Observacao)
	}

	if err := s.repo.Update(ctx, &o); err != nil {
		return models.Os{}, err
	}
	return o, nil
}

func (s *OsService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
