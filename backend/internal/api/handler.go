package api

import (
	"github.com/CAPVOK/MarkVovka/backend/internal/app/repository"
)

type Handler struct {
	Repo *repository.Repository
}

func NewHandler(repo *repository.Repository) *Handler {
	return &Handler{Repo: repo}
}




