package repository

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)


type Repository struct {
	db *gorm.DB
	minioClient *minioclient.MinioClient
}

func New(dsn string) (*Repository, error) {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return &Repository{
		db: db,
		minioClient: minioClient,
	}, nil
}

