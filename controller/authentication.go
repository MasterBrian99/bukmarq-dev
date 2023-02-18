package controller

import (
	"github.com/MasterBrian99/bukmarq/helper"
	"github.com/MasterBrian99/bukmarq/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthenticationInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Register(context *gin.Context) {
	var input AuthenticationInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Validation failed !"})
		return
	}

	user := model.User{
		Username: input.Username,
		Password: input.Password,
	}

	_, err := user.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "User Already exist !"})
		return
	}
	context.JSON(http.StatusCreated, gin.H{"message": "success"})
}

func Login(context *gin.Context) {
	var input AuthenticationInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Validation failed !"})
		return
	}

	user, err := model.FindUserByUsername(input.Username)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "User not found !"})
		return
	}

	err = user.ValidatePassword(input.Password)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "User not found !"})
		return
	}

	jwt, err := helper.GenerateJWT(user)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "jwt token failed !"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success", "jwt": jwt})
}

func TestAuthentication(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"message": "Success"})

}
