package entities

import "gorm.io/gorm"

type LightingTalk struct {
	gorm.Model
	Topic    string `gorm:"column:topic; type:varchar(255) not null;"`
	Content  string `gorm:"column:content; type:text not null;"`
	Rating   int    `gorm:"column:rating; type:smallint not null;"`
	PosterID int    `gorm:"column:poster_id; type:int not null;"`
}

func (LightingTalk) TableName() string {
	return "lighting_talks"
}
