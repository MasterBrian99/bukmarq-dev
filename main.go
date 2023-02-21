package main

import (
	"fmt"
	"log"
	"time"

	"github.com/MasterBrian99/bukmarq/controller"
	"github.com/MasterBrian99/bukmarq/database"
	docs "github.com/MasterBrian99/bukmarq/docs"
	"github.com/MasterBrian99/bukmarq/middleware"
	"github.com/MasterBrian99/bukmarq/model"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
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
	r.Use(static.Serve("/", static.LocalFile("./dist", true)))
	r.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Origin", "Content-Length", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
		AllowAllOrigins:  true,
	}))
	routes := r.Group("/api")
	auth := routes.Group("/auth")
	{
		auth.POST("", controller.Register)
		auth.POST("/login", controller.Login)
		auth.GET("/test", middleware.JWTAuthMiddleware(), controller.TestAuthentication)
	}

	collection := routes.Group("/collection")
	{
		collection.POST("", middleware.JWTAuthMiddleware(), controller.CreateCollection)
		collection.GET("/parent/:id", middleware.JWTAuthMiddleware(), controller.GetAllCollectionByParentID)
		collection.PUT("", middleware.JWTAuthMiddleware(), controller.UpdateCollection)
	}
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	err := r.Run(":9000")
	if err != nil {
		return
	}
	fmt.Println("Server running on port 8000")
}
