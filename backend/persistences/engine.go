package persistences

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var engine *gorm.DB

// InitEngine は xorm engine の初期化を行う.
func InitEngine(dataSource string, showSQL bool, migrationPath string) error {
	var err error
	dialector := mysql.New(mysql.Config{
		DSN: dataSource,
	})
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             0,           // Slow SQL threshold
			LogLevel:                  logger.Info, // Log level
			IgnoreRecordNotFoundError: true,        // Ignore ErrRecordNotFound error for logger
			Colorful:                  true,        // Disable color
		},
	)
	config := &gorm.Config{
		Logger: newLogger,
	}

	engine, err = gorm.Open(dialector, config)
	return err
}

// GetEngine 共通エンジン、初期化する時に取得
func GetEngine() *gorm.DB {
	return engine
}
