package services

import (
	"context"
	"strings"

	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/models"
)

type OsService struct {
	repo           database.OsRepo
	controleOsRepo database.ControleOsRepo
}

func NewOsService(r database.OsRepo, controleOsRepo database.ControleOsRepo) *OsService {
	return &OsService{repo: r, controleOsRepo: controleOsRepo}
}

func (s *OsService) Create(ctx context.Context, in models.OsCreate) (models.Os, error) {
	if strings.TrimSpace(in.IdCliente) == "" || strings.TrimSpace(in.IdProduto) == "" || strings.TrimSpace(in.Descricao) == "" {
		return models.Os{}, ErrDadosInvalidos
	}
	in.IdCliente = strings.TrimSpace(in.IdCliente)
	in.IdProduto = strings.TrimSpace(in.IdProduto)
	in.DataInicio = strings.TrimSpace(in.DataInicio)
	in.DataFim = strings.TrimSpace(in.DataFim)
	in.TotalHorasTrabalhadas = strings.TrimSpace(in.TotalHorasTrabalhadas)
	in.ValorOs = strings.TrimSpace(in.ValorOs)
	in.Status = strings.TrimSpace(in.Status)
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

func (s *OsService) GetByIdComItens(ctx context.Context, id string) (models.OsComControles, error) {
	os, err := s.GetById(ctx, id)
	if err != nil {
		return models.OsComControles{}, err
	}

	controles, err := s.controleOsRepo.ListByOsId(ctx, id)
	if err != nil {
		return models.OsComControles{}, err
	}

	return models.OsComControles{
		Os:        os,
		Controles: controles,
	}, nil
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

	if in.Status != nil {
		o.Status = strings.TrimSpace(*in.Status)
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
