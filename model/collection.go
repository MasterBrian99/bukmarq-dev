package model

import (
	"github.com/MasterBrian99/bukmarq/database"
	"gorm.io/gorm"
)

type Collection struct {
	gorm.Model
	Name string `gorm:"size:255;not null" json:"name"`
	//SubCollection []*Collection `gorm:"many2many:sub_collection;constraint:OnDelete:CASCADE"`
	ParentId uint `gorm:"default:null" json:"parent_id"`
}

func (collection *Collection) Save() (*Collection, error) {

	err := database.Database.Create(&collection).Error
	if err != nil {
		return nil, err
	}
	return collection, nil
}

func (collection *Collection) FindById(id int) (Collection, error) {

	var coll Collection
	err := database.Database.Where("id=?", id).Find(&coll).Error
	if err != nil {
		return Collection{}, err
	}
	return coll, nil
}
