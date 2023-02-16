package controller

import (
	"fmt"
	"github.com/MasterBrian99/bukmarq/helper"
	"github.com/MasterBrian99/bukmarq/model"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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
	user, err := helper.CurrentUser(context)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	collection = model.Collection{
		Name:   input.Name,
		UserID: user.ID,
	}
	parent, err := collection.FindById(input.ParentId)
	if err != nil {
		collection.ParentId = 0
	} else {
		collection.ParentId = parent.ID

	}
	_, err = collection.Save()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return

	}
	context.JSON(http.StatusOK, gin.H{"status": "created"})
}

func GetAllCollectionByParentID(context *gin.Context) {
	id := context.Param("id")

	num, err := strconv.Atoi(id)
	if err != nil {
		fmt.Println(num)
		context.JSON(http.StatusBadRequest, gin.H{"error": "please provide a valid number"})
		return
	}
	user, err := helper.CurrentUser(context)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	all, err := model.GetAllCollectionByParentID(num, user.ID)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, gin.H{"data": all})
}

type UpdateCollectionInput struct {
	ID       int    `json:"id" binding:"required"`
	Name     string `json:"name"  binding:"min=1,max=50"`
	ParentId int    `json:"parent"`
}

func UpdateCollectionName(context *gin.Context) {
	var input UpdateCollectionInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	collection := model.Collection{}
	collection, err := collection.FindById(input.ID)
	if err != nil {
		return
	}
	collection.Name = input.Name
	_, err = collection.Save()
	if err != nil {
		return
	}
}
