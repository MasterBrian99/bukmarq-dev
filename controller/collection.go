package controller

import (
	"github.com/MasterBrian99/bukmarq/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateCollectionInput struct {
	Name     string `json:"name"  binding:"required,min=1,max=50"`
	ParentId int    `json:"parent" `
}

func CreateCollection(context *gin.Context) {
	var input CreateCollectionInput
	var collection model.Collection
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	collection = model.Collection{
		Name: input.Name,
	}
	parent, err := collection.FindById(input.ParentId)
	if err == nil {
		collection.ParentId = parent.ID
	}
	_, err = collection.Save()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return

	}
	context.JSON(http.StatusOK, gin.H{"status": "created"})
}
