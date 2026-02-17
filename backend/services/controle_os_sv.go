package services

import (
	"context"
	"strings"

	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/models"
)

type ControleOsService struct{ repo database.ControleOsRepo }

func NewControleOsService(r database.ControleOsRepo) *ControleOsService { return &ControleOsService{repo: r} }

func (s *ControleOsService) Create(ctx context.Context, in models.ControleOsCreate) (models.ControleOs, error) {
	if strings.TrimSpace(in.IdOs) == "" || strings.TrimSpace(in.IdTecnico) == "" || strings.TrimSpace(in.IdServico) == "" || strings.TrimSpace(in.Status) == "" {
		return models.ControleOs{}, ErrDadosInvalidos
	}

	in.IdOs = strings.TrimSpace(in.IdOs)
	in.IdTecnico = strings.TrimSpace(in.IdTecnico)
	in.IdServico = strings.TrimSpace(in.IdServico)
	in.DataInicio = strings.TrimSpace(in.DataInicio)
	in.DataFim = strings.TrimSpace(in.DataFim)
	in.Status = strings.TrimSpace(in.Status)
	in.Observacao = strings.TrimSpace(in.Observacao)

	return s.repo.Create(ctx, in)
}

func (s *ControleOsService) GetById(ctx context.Context, id string) (models.ControleOs, error) {
	out, err := s.repo.GetById(ctx, id)
	if err != nil {
		return models.ControleOs{}, err
	}
	return *out, nil
}

func (s *ControleOsService) List(ctx context.Context, limit, offset int) ([]models.ControleOs, error) {
	out, err := s.repo.List(ctx, limit, offset)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (s *ControleOsService) Update(ctx context.Context, idControle string, in models.ControleOsUpdate) (models.ControleOs, error) {
	var c models.ControleOs
	c.IdControle = idControle

	if in.IdOs != nil {
		c.IdOs = strings.TrimSpace(*in.IdOs)
	}
	if in.IdTecnico != nil {
		c.IdTecnico = strings.TrimSpace(*in.IdTecnico)
	}
	if in.IdServico != nil {
		c.IdServico = strings.TrimSpace(*in.IdServico)
	}
	if in.DataInicio != nil {
		c.DataInicio = strings.TrimSpace(*in.DataInicio)
	}
	if in.DataFim != nil {
		c.DataFim = strings.TrimSpace(*in.DataFim)
	}
	if in.Status != nil {
		c.Status = strings.TrimSpace(*in.Status)
	}
	if in.Observacao != nil {
		c.Observacao = strings.TrimSpace(*in.Observacao)
	}

	if err := s.repo.Update(ctx, &c); err != nil {
		return models.ControleOs{}, err
	}
	return c, nil
}

func (s *ControleOsService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
