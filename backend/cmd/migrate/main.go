package main

import (
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/CAPVOK/MarkVovka/backend/internal/app/ds"
	"github.com/CAPVOK/MarkVovka/backend/internal/app/dsn"
)

func main() {
    _ = godotenv.Load()
    db, err := gorm.Open(postgres.Open(dsn.FromEnv()), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // Явно мигрировать только нужные таблицы
    err = db.AutoMigrate(&ds.Baggage{},&ds.Delivery{}, &ds.User{}, &ds.DeliveryBaggage{})
    if err != nil {
        panic("cant migrate db")
    }
}
