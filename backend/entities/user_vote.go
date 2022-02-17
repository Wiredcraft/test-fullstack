package entities

import "gorm.io/gorm"

type UserVote struct {
	gorm.Model
	LightingTalkID uint `gorm:"column:lighting_talk_id; type:int unsigned not null;"`
	UserID         uint `gorm:"column:user_id; type:int unsigned not null;"`
}

func (UserVote) TableName() string {
	return "user_votes"
}
