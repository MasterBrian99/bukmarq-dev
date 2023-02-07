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

func (folder *BookmarkFolder) GetFolderList() (Result, error) {
	//res := database.Database.Raw(" select bf1.* from bookmark_folders bf1 inner join bookmark_folders bf2 on bf1.parent=bf2.parent order by id desc;", BookmarkFolders{})
	err := database.Database.Model(&BookmarkFolder{}).Select("bookmark_folders.*").Joins("inner join bookmark_folders as bk on bk.parent=bookmark_folders.parent").Scan(&Result{})
	return Result, nil
	//err := database.Database.Model(&BookmarkFolder{}).Preload("BookmarkFolders").Find(&users).Error
	//return users, err
}

//db.Model(&User{}).Select("users.name, emails.email").Joins("left join emails on emails.user_id = users.id").Scan(&result{})

//SELECT alias1.cols, alias2.cols FROM tbl1 alias1, tbl2 alias2 WHERE [condition]
