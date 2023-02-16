package database

import (
	"fmt"
	"github.com/MasterBrian99/bukmarq/config"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var Database *gorm.DB

func Connect() {
	var err error
	Database, err = gorm.Open(sqlite.Open(config.Config("DB_NAME")+"?_pragma=journal_mode(wal)"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("Connection Opened to Database")
	fmt.Println("Database Migrated")
}
