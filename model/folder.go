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
		return nil, err
	}
	if err != nil {
		return &BookmarkFolder{}, err
	}
	return folder, nil
}

type BookmarkFolders struct {
	ID   int
	Name string
	Age  int
	res  []BookmarkFolders
}

type Result struct {
	Name  string
	Email string
}

//db.Model(&User{}).Select("users.name, emails.email").Joins("left join emails on emails.user_id = users.id").Scan(&result{})

//SELECT alias1.cols, alias2.cols FROM tbl1 alias1, tbl2 alias2 WHERE [condition]
