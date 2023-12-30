package repository

import (
	"errors"
	"strings"
	"time"

	"github.com/CAPVOK/MarkVovka/backend/internal/app/ds"
)

func (r *Repository) GetDeliveriesForUser(searchFlightNumber, startFormationDate, endFormationDate, deliveryStatus string, userID uint) ([]map[string]interface{}, error) {
    searchFlightNumber = strings.ToUpper(searchFlightNumber + "%")
    deliveryStatus = strings.ToLower(deliveryStatus + "%")

    // Построение основного запроса для получения доставок.
    query := r.db.Table("deliveries").
        Select("DISTINCT deliveries.delivery_id, deliveries.flight_number, deliveries.creation_date, deliveries.formation_date, deliveries.completion_date, deliveries.delivery_status").
        Joins("JOIN delivery_baggages ON deliveries.delivery_id = delivery_baggages.delivery_id").
        Joins("JOIN baggages ON baggages.baggage_id = delivery_baggages.baggage_id").
        Where("deliveries.delivery_status LIKE ? AND deliveries.flight_number LIKE ? AND deliveries.user_id = ?", deliveryStatus, searchFlightNumber, userID)
    // Добавление условия фильтрации по дате формирования, если она указана.
    if startFormationDate != "" && endFormationDate != "" {
        query = query.Where("deliveries.formation_date BETWEEN ? AND ?", startFormationDate, endFormationDate)
    }

    // Выполнение запроса и сканирование результатов в структуру deliveries.
    var deliveries []map[string]interface{}
    if err := query.Scan(&deliveries).Error; err != nil {
        return nil, err
    }

    // Для каждой доставки получаем информацию о багаже по номеру рейса и статусу доставки.
    for _, delivery := range deliveries {
        baggages, err := r.GetBaggagesByFlightNumber(delivery["flight_number"].(string))
        if err != nil {
            return nil, err
        }
        // Добавляем информацию о багаже в поле "baggages" внутри каждой доставки.
        delivery["baggages"] = baggages
    }

    return deliveries, nil
}

func (r *Repository) GetDeliveryByIDForUser(deliveryID int, userID uint) (map[string]interface{}, error) {
    var delivery map[string]interface{}
    // Получение информации о доставке по deliveryID.
    if err := r.db.
        Table("deliveries").
        Select("deliveries.delivery_id, deliveries.flight_number, deliveries.creation_date, deliveries.formation_date, deliveries.completion_date, deliveries.delivery_status").
        Where("deliveries.delivery_status != ? AND deliveries.delivery_id = ? AND deliveries.user_id = ?", ds.DELIVERY_STATUS_DELETED, deliveryID, userID).
        Scan(&delivery).Error; err != nil {
        return nil, err
    }

    // Получение багажей по указанному deliveryID.
    baggages, err := r.GetBaggagesByFlightNumber(delivery["flight_number"].(string))
    if err != nil {
        return nil, err
    }
    // Добавление информации о багаже в поле "baggages" внутри доставки.
    delivery["baggages"] = baggages

    return delivery, nil
}

func (r *Repository) DeleteDeliveryForUser(deliveryID int, userID uint) error {
    // Проверяем, существует ли указанная доставка в базе данных
    var delivery ds.Delivery
    if err := r.db.First(&delivery, deliveryID).Error; err != nil {
        return err
    }

    // Проверяем, что пользователь является создателем этой доставки
    if delivery.UserID != userID {
        return errors.New("unauthorized: User does not have permission to delete this delivery")
    }

    // Обновляем статус доставки на "удален" с использованием GORM
    err := r.db.Model(&ds.Delivery{}).Where("delivery_id = ?", deliveryID).Update("delivery_status", ds.DELIVERY_STATUS_DELETED).Error
    if err != nil {
        return err
    }

    return nil
}

func (r *Repository) UpdateDeliveryForUser(deliveryID int, userID uint, updatedDelivery *ds.Delivery) error {
    // Проверяем, существует ли указанная доставка в базе данных
    var delivery ds.Delivery
    if err := r.db.First(&delivery, deliveryID).Error; err != nil {
        return err
    }

    // Проверяем, что доставка принадлежит указанному пользователю
    if delivery.UserID != userID {
        return errors.New("unauthorized: User does not have permission to update this delivery")
    }

    // Проверяем, что обновляем только поле FlightNumber
    if updatedDelivery.FlightNumber != "" {
        // Обновляем только поле FlightNumber из JSON-запроса
        if err := r.db.Model(&ds.Delivery{}).Where("delivery_id = ?", deliveryID).Update("flight_number", updatedDelivery.FlightNumber).Error; err != nil {
            return err
        }
    } else {
        return errors.New("invalid request: FlightNumber cannot be empty")
    }

    return nil
}

func (r *Repository) UpdateDeliveryStatusForUser(deliveryID int, userID uint) error {
    // Проверяем, существует ли указанная доставка в базе данных
    var delivery ds.Delivery
    if err := r.db.First(&delivery, deliveryID).Error; err != nil {
        return err
    }

    // Проверяем, что пользователь имеет право на изменение статуса этой доставки
    if delivery.UserID != userID {
        return errors.New("unauthorized: User does not have permission to update this delivery status")
    }

    // Проверяем, что текущий статус доставки - "черновик"
    if delivery.DeliveryStatus == ds.DELIVERY_STATUS_DRAFT {
        // Обновляем статус доставки на "в работе"
        delivery.DeliveryStatus = ds.DELIVERY_STATUS_WORK

        // Обновляем дату формирования на текущее московское время
        moscowTime, err := time.LoadLocation("Europe/Moscow")
        if err != nil {
            return err
        }
        delivery.FormationDate = time.Now().In(moscowTime)
    }

    // Обновляем доставку в базе данных
    if err := r.db.Save(&delivery).Error; err != nil {
        return err
    }

    return nil
}





