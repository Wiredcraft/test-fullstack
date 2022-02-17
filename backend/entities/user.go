package entities

import (
	"github.com/guregu/null"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	LoginID   string      `gorm:"column:login_id; type:varchar(255) not null;"`
	Password  string      `gorm:"column:password; type:varchar(255) not null;"`
	AuthToken null.String `gorm:"column:auth_token; type:text null;"`
	Name      string      `gorm:"column:name; type:varchar(255) not null;"`
	AvatarURL null.String `gorm:"column:avatar_url; type:text null;"`
}

func (User) TableName() string {
	return "users"
}
