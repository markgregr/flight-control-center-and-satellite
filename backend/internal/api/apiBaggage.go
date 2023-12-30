package api

import (
	"net/http"
	"strconv"

	"github.com/CAPVOK/MarkVovka/backend/internal/app/ds"
	"github.com/CAPVOK/MarkVovka/backend/internal/auth"
	"github.com/gin-gonic/gin"
)

//методы для таблицы baggage
func (h *Handler) GetBaggages(c *gin.Context) {
    // Получение экземпляра singleton для аутентификации
    authInstance := auth.GetAuthInstance()
    searchCode := c.DefaultQuery("searchCode", "")
    baggages, err := h.Repo.GetBaggages(searchCode, authInstance.UserID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"baggages": baggages})
}
func (h *Handler) GetBaggageByID(c *gin.Context) {
    authInstance := auth.GetAuthInstance()
    baggageID, err := strconv.Atoi(c.Param("baggage_id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid id"})
        return
    }
    baggage, err := h.Repo.GetBaggageByID(baggageID,authInstance.UserID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
        return
    }
    c.JSON(http.StatusOK, baggage)
}
func (h *Handler) CreateBaggage(c *gin.Context) {
    authInstance := auth.GetAuthInstance()

    searchCode := c.DefaultQuery("searchCode", "")
	var baggage ds.Baggage
	if err := c.BindJSON(&baggage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.Repo.CreateBaggage(&baggage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Получаем обновленный список багажей
	baggages, err := h.Repo.GetBaggages(searchCode,authInstance.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Baggage created successfully", "baggages": baggages})
}
func (h *Handler) DeleteBaggage(c *gin.Context) {
    authInstance := auth.GetAuthInstance()
    searchCode := c.DefaultQuery("searchCode", "")
	baggageID, err := strconv.Atoi(c.Param("baggage_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid id"})
		return
	}

	err = h.Repo.DeleteBaggage(baggageID, authInstance.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Получаем обновленный список багажей
	baggages, err := h.Repo.GetBaggages(searchCode,authInstance.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Baggage deleted successfully", "baggages": baggages})
}
func (h *Handler) UpdateBaggage(c *gin.Context) {
    authInstance := auth.GetAuthInstance()
    baggageID, err := strconv.Atoi(c.Param("baggage_id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid id"})
        return
    }

    var updatedBaggageRequest ds.Baggage
    if err := c.BindJSON(&updatedBaggageRequest); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Попытка обновления багажа в репозитории
    err = h.Repo.UpdateBaggage(baggageID, &updatedBaggageRequest)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
        return
    }

    // Получаем обновленный объект багажа (map[string]interface{})
    updatedBaggage, err := h.Repo.GetBaggageByID(baggageID, authInstance.UserID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Baggage updated successfully", "baggage": updatedBaggage})
}
//м-м
func (h *Handler) AddBaggageToDelivery(c *gin.Context) {
    authInstance := auth.GetAuthInstance()
    searchCode := c.DefaultQuery("searchCode", "")
    // Получаем параметры из URL
    baggageID, err := strconv.Atoi(c.Param("baggage_id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid baggage_id"})
        return
    }
    // Попытка обновления связи между багажом и доставкой в репозитории
    err = h.Repo.AddBaggageToDelivery(uint(baggageID), authInstance.UserID,1)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
        return
    }

    // Получаем обновленный список багажей
	baggages, err := h.Repo.GetBaggages(searchCode,authInstance.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Baggage delivery update successfully", "baggages": baggages})
}

func (h *Handler) RemoveBaggageFromDelivery(c *gin.Context) {
    authInstance := auth.GetAuthInstance()
    searchCode := c.DefaultQuery("searchCode", "")
    var err error  // Объявляем переменную здесь

    // Получаем параметры из URL
    baggageID, err := strconv.Atoi(c.Param("baggage_id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid baggage_id"})
        return
    }
    // Попытка удаления связи между багажом и доставкой в репозитории
    err = h.Repo.RemoveBaggageFromDelivery(uint(baggageID), authInstance.UserID)  // Используем объявленную переменную err
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
        return
    }
    baggages, err := h.Repo.GetBaggages(searchCode, authInstance.UserID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Baggage removed from delivery successfully", "baggages": baggages})
}





