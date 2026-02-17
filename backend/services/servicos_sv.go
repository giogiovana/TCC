package services

import (
	"context"
	"strings"

	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/models"
)

type ServicoService struct{ repo database.ServicoRepo }

func NewServicoService(r database.ServicoRepo) *ServicoService { return &ServicoService{repo: r} }

func (s *ServicoService) Create(ctx context.Context, in models.ServicoCreate) (models.Servico, error) {
	return s.repo.Create(ctx, in)
}

func (s *ServicoService) GetById(ctx context.Context, id string) (models.Servico, error) {
	out, err := s.repo.GetById(ctx, id)
	if err != nil {
		return models.Servico{}, err
	}
	return *out, nil
}

func (s *ServicoService) List(ctx context.Context, limit, offset int) ([]models.Servico, error) {
	out, err := s.repo.List(ctx, limit, offset)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (s *ServicoService) Update(ctx context.Context, idServico string, in models.ServicoUpdate) (models.Servico, error) {
	var serv models.Servico
	serv.IdServico = idServico

	if in.Nome != nil {
		serv.Nome = strings.TrimSpace(*in.Nome)
	}

	if in.Descricao != nil {
		serv.Descricao = strings.TrimSpace(*in.Descricao)
	}

	if in.Valor != nil {
		serv.Valor = strings.TrimSpace(*in.Valor)
	}

	if in.TempoEstimado != nil {
		serv.TempoEstimado = strings.TrimSpace(*in.TempoEstimado)
	}

	if in.Categoria != nil {
		serv.Categoria = strings.TrimSpace(*in.Categoria)
	}

	if err := s.repo.Update(ctx, &serv); err != nil {
		return models.Servico{}, err
	}
	return serv, nil
}

func (s *ServicoService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
