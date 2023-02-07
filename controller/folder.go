package controller

import (
	"github.com/fletisco/bukmarq/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

type FolderCreateInput struct {
	FolderName string `json:"folderName"  binding:"required,min=1,max=15"`
	Parent     int    `json:"parent"  binding:"required,numeric"`
}

func CreateFolder(context *gin.Context) {
	var input FolderCreateInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	folder := model.BookmarkFolder{
		ParentFolder: input.Parent,
		Name:         input.FolderName,
	}
	savedFolder, err := folder.Save()
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"user": savedFolder})
}

//func GetFolderList(context *gin.Context) {
//	a:=model.BookmarkFolders{
//
//	}
//
//	_, _ = model.BookmarkFolder.GetFolderList(a)
//}
