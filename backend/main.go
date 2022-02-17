package main

import (
	"flag"
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/silverlovesl/test-fullstack/backend/configs"
	"github.com/silverlovesl/test-fullstack/backend/controllers"
	"github.com/silverlovesl/test-fullstack/backend/persistences"
	"github.com/silverlovesl/test-fullstack/backend/services"
	"github.com/swaggo/swag/example/basic/docs"
)

func main() {
	var (
		configFile string
	)
	flag.StringVar(&configFile, "config", "config.json", "Config File")
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

	// Init gin
	ge := gin.Default()
	// Config gin
	docs.SwaggerInfo.BasePath = "/api"
	ge.Use(cors.New(cors.Config{
		AllowOrigins:     gConfig.AllowOragins,
		AllowMethods:     []string{http.MethodGet, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodHead, http.MethodDelete, http.MethodOptions},
		AllowHeaders:     []string{"Content-Type", "X-XSRF-TOKEN", "Accept", "Origin", "X-Requested-With", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	// Set routing
	controllers.SetupRoutes(ge)
	// Start http server
	ge.Run(fmt.Sprintf(":%d", 8009))
}
