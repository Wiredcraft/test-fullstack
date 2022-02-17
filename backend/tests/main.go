package tests

import (
	"flag"

	"github.com/silverlovesl/test-fullstack/backend/configs"
	"github.com/silverlovesl/test-fullstack/backend/persistences"
	"github.com/silverlovesl/test-fullstack/backend/services"
)

func InitMain() {
	var (
		configFile string
	)
	flag.StringVar(&configFile, "config", "../config.json", "Config File")
	flag.Parse()

	// Init config
	configs.LoadConfig(configFile)
	gConfig := configs.GetGlobalConfigs()
	// Init logger
	services.InitLogService(gConfig.AppEnv, "", "", nil)
	// Init DB
	err := persistences.InitEngine(gConfig.DB.DataSource, gConfig.DB.ShowSQL, "")
	if err != nil {
		panic(err)
	}
}
