package main

import (
	"fmt"
	"github.com/fletisco/bukmarq/middleware"
	"log"

	"github.com/fletisco/bukmarq/controller"
	"github.com/fletisco/bukmarq/database"
	"github.com/fletisco/bukmarq/model"
	"github.com/gin-gonic/gin"
)

func main() {
	loadDatabase()
	serveApplication()

}
func loadDatabase() {
	database.Connect()
	err := database.Database.AutoMigrate(&model.User{}, &model.BookmarkFolder{})
	if err != nil {
		log.Fatal("Database Migration Failed !")
	}
}

func serveApplication() {

	r := gin.Default()
	routes := r.Group("/api")
	auth := routes.Group("/auth")
	{
		auth.POST("/", controller.Register)
		auth.POST("/login", controller.Login)
		auth.GET("/test", middleware.JWTAuthMiddleware(), controller.TestAuthentication)
	}

	fContent := routes.Group("/folder")
	{
		//fContent.GET("/list", middleware.JWTAuthMiddleware(), controller.GetFolderList)
		fContent.POST("/", middleware.JWTAuthMiddleware(), controller.CreateFolder)
	}

	// accounts := routes.Group("github")
	// {
	// 	accounts.POST("add", controller.AddNewAccount)
	// }

	err := r.Run(":9000")
	if err != nil {
		return
	}
	fmt.Println("Server running on port 8000")
}
