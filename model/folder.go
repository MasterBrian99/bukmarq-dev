package model

import (
	"github.com/fletisco/bukmarq/database"
	"gorm.io/gorm"
)

type BookmarkFolder struct {
	gorm.Model
	ParentFolder int
	Name         string `gorm:"size:255;not null"`
	Parent       int    `gorm:"foreignkey:ParentID"`
}

func (folder *BookmarkFolder) Save() (*BookmarkFolder, error) {
	err := database.Database.Create(&folder).Error
	if err != nil {
		return &BookmarkFolder{}, err
	}
	return folder, nil
}

//([]*BookmarkFolder, error)
