package app

import (
	"context"
	"fmt"
	"log"

	"github.com/CAPVOK/MarkVovka/backend/internal/api"
	"github.com/CAPVOK/MarkVovka/backend/internal/app/config"
	"github.com/CAPVOK/MarkVovka/backend/internal/app/dsn"
	"github.com/CAPVOK/MarkVovka/backend/internal/app/repository"
	"github.com/gin-gonic/gin"
)

// Application представляет основное приложение.
type Application struct {
    Config       *config.Config
    Repository   *repository.Repository
    RequestLimit int
}

// New создает новый объект Application и настраивает его.
func New(ctx context.Context) (*Application, error) {
    // Инициализируйте конфигурацию
    cfg, err := config.NewConfig(ctx)
    if err != nil {
        return nil, err
    }

    // Инициализируйте подключение к базе данных (DB)
    repo, err := repository.New(dsn.FromEnv())
    if err != nil {
        return nil, err
    }
    // Инициализируйте и настройте объект Application
    app := &Application{
        Config: cfg,
        Repository: repo,
        // Установите другие параметры вашего приложения, если необходимо
    }

    return app, nil
}


// Run запускает приложение.
func (app *Application) Run() {

    handler := api.NewHandler(app.Repository)
    r := gin.Default()


    // Группа запросов для багажа
    BaggageGroup := r.Group("/baggage")
    {
        BaggageGroup.GET("/", handler.GetBaggages)
        BaggageGroup.GET("/:baggage_id", handler.GetBaggageByID) 
        BaggageGroup.DELETE("/:baggage_id/delete", handler.DeleteBaggage) 
        BaggageGroup.POST("/create", handler.CreateBaggage)
        BaggageGroup.PUT("/:baggage_id/update", handler.UpdateBaggage) 
        BaggageGroup.POST("/:baggage_id/delivery", handler.AddBaggageToDelivery) 
        BaggageGroup.DELETE("/:baggage_id/delivery/delete", handler.RemoveBaggageFromDelivery)
        BaggageGroup.POST("/:baggage_id/image",handler.AddBaggageImage)
    }
    

    // Группа запросов для доставки
    DeliveryGroup := r.Group("/delivery")
    {
        DeliveryGroup.GET("/", handler.GetDeliveries)
        DeliveryGroup.GET("/:id", handler.GetDeliveryByID)
        DeliveryGroup.DELETE("/:id/delete", handler.DeleteDelivery)
        DeliveryGroup.PUT("/:id/update", handler.UpdateDelivery)
        DeliveryGroup.PUT("/:id/status/user", handler.UpdateDeliveryStatusForUser)  // Новый маршрут для обновления статуса доставки пользователем
        DeliveryGroup.PUT("/:id/status/moderator", handler.UpdateDeliveryStatusForModerator)  // Новый маршрут для обновления статуса доставки модератором
    }
    addr := fmt.Sprintf("%s:%d", app.Config.ServiceHost, app.Config.ServicePort)
    r.Run(addr)
    log.Println("Server down")
}

