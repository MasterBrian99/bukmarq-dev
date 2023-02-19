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

// CreateCollection godoc
// @Summary      create new collection
// @Tags         collection
// @Accept       json
// @Produce      json
// @Router       /collection/ [post]
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
	fmt.Printf("%+v\n", collection)
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
	context.JSON(http.StatusOK, gin.H{"message": "success", "data": all})
}

type UpdateCollectionInput struct {
	ID       int    `json:"id" binding:"required"`
	Name     string `json:"name"`
	ParentId int    `json:"parent"`
	Type     int    `json:"type" binding:"required"`
}

func UpdateCollection(context *gin.Context) {
	var input UpdateCollectionInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := helper.CurrentUser(context)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Type == 1 {
		println("Update Collection ")
		_, err := UpdateCollectionName(user, &input)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}
	if input.Type == 2 {
		_, err2 := UpdateCollectionParent(user, &input)
		if err2 != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	context.JSON(http.StatusOK, gin.H{"message": "success !"})

}

func UpdateCollectionName(user model.User, input *UpdateCollectionInput) (*model.Collection, error) {
	collection, err := model.FindByCurrentUserAndID(input.ID, user.ID)
	if err != nil {
		return nil, err
	}
	collection.Name = input.Name

	err = collection.UpdateCollection()
	if err != nil {
		return nil, err
	}

	return nil, nil
}

func UpdateCollectionParent(user model.User, input *UpdateCollectionInput) (*model.Collection, error) {
	collection, err := model.FindByCurrentUserAndID(input.ID, user.ID)
	if err != nil {
		return nil, err
	}
	parent, err := model.FindByCurrentUserAndID(input.ParentId, user.ID)
	if err != nil {
		return nil, err
	}
	collection.ParentId = parent.ID

	err = collection.UpdateCollection()
	if err != nil {
		return nil, err
	}

	return nil, nil
}
