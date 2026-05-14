package services

import (
	"context"

	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/models"
)

type StatusOsService struct{ repo database.StatusOsRepo }

func NewStatusOsService(r database.StatusOsRepo) *StatusOsService {
	return &StatusOsService{repo: r}
}

func (s *StatusOsService) List(ctx context.Context, limit, offset int) ([]models.StatusOs, error) {
	return s.repo.List(ctx, limit, offset)
}
