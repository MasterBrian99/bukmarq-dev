package model

import (
	"github.com/MasterBrian99/bukmarq/database"
	"gorm.io/gorm"
)

type Collection struct {
	gorm.Model
	Name string `gorm:"size:255;not null" json:"name"`
	//SubCollection []*Collection `gorm:"many2many:sub_collection;constraint:OnDelete:CASCADE"`
	ParentId uint `gorm:"default:0" json:"parent_id"`
	UserID   uint `json:"user_id"`
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
	err := database.Database.Where("id=?", id).Find(&coll).Limit(1).Error
	if err != nil {
		return Collection{}, err
	}
	return coll, nil
}

type CollectionList struct {
	ID       uint
	Name     string
	ParentId uint
}

func GetAllCollectionByParentID(id int, userID uint) ([]CollectionList, error) {

	var collectionList []CollectionList

	err := database.Database.Model(&Collection{}).Where("parent_id=?", id).Where("user_id=?", userID).Find(&collectionList).Error

	if err != nil {
		return []CollectionList{}, err
	}
	return collectionList, nil
}

func FindByCurrentUserAndID(id int, userID uint) (Collection, error) {
	var collection Collection

	err := database.Database.Where("id=?", id).Where("user_id=?", userID).Find(&collection).Error

	if err != nil {
		return Collection{}, err
	}

	return collection, nil

}

func (collection *Collection) UpdateCollection() error {

	err := database.Database.Save(&collection).Error

	if err != nil {
		return err
	}
	return nil
}
