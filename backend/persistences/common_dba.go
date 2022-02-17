package persistences

import "gorm.io/gorm"

// CommonDBA is commonDBA of User.
type CommonDBA struct {
	Engine *gorm.DB
}

// GetCommonDBA return a common commonDBA instance.
func GetCommonDBA() *CommonDBA {
	return &CommonDBA{
		Engine: GetEngine(),
	}
}
