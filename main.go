package main

import (
	"fmt"
	"github.com/MasterBrian99/bukmarq/controller"
	"github.com/MasterBrian99/bukmarq/database"
	docs "github.com/MasterBrian99/bukmarq/docs"
	"github.com/MasterBrian99/bukmarq/middleware"
	"github.com/MasterBrian99/bukmarq/model"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	loadDatabase()
	serveApplication()

}
func loadDatabase() {
	database.Connect()
	err := database.Database.AutoMigrate(&model.User{}, &model.Collection{})
	if err != nil {
		log.Fatal("Database Migration Failed !")
	}
}

func serveApplication() {
	docs.SwaggerInfo.BasePath = "/api"
	r := gin.Default()
	routes := r.Group("/api")
	auth := routes.Group("/auth")
	{
		auth.POST("/", controller.Register)
		auth.POST("/login", controller.Login)
		auth.GET("/test", middleware.JWTAuthMiddleware(), controller.TestAuthentication)
	}

	collection := routes.Group("/collection")
	{
		collection.POST("/", middleware.JWTAuthMiddleware(), controller.CreateCollection)
		collection.GET("/parent/:id", middleware.JWTAuthMiddleware(), controller.GetAllCollectionByParentID)
	}
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	err := r.Run(":9000")
	if err != nil {
		return
	}
	fmt.Println("Server running on port 8000")
}
