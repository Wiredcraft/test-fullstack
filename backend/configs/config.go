package configs

import (
	"fmt"
	"io/ioutil"
	"log"
	"path/filepath"
	"strings"

	"github.com/silverlovesl/test-fullstack/backend/utils"
	"github.com/spf13/viper"
)

var globalConfigs Config

type Secret struct {
	JWTPrivateKeyPath string
	JWTPublicKeyPath  string
}

type DB struct {
	DataSource string
	ShowSQL    bool
}

type Port struct {
	Client int
	Server int
}

type Config struct {
	AppEnv       string
	AllowOragins []string
	Secret       Secret
	DB           DB
}

func (config Config) IsLocal() bool {
	return config.AppEnv == "local"
}
func (config Config) IsDev() bool {
	return config.AppEnv == "development"
}

func (config Config) IsProd() bool {
	return config.AppEnv == "production"
}

func (secret *Secret) GetJWTPrivateBytes() []byte {
	signBytes, err := ioutil.ReadFile(secret.JWTPrivateKeyPath)
	if err != nil {
		log.Fatalf("Can not read jwt private key path: %s", secret.JWTPrivateKeyPath)
	}
	return signBytes
}

func (secret *Secret) GetJWTPublicBytes() []byte {
	verifyBytes, err := ioutil.ReadFile(secret.JWTPublicKeyPath)
	if err != nil {
		log.Fatalf("Can not read jwt public key path: %s", secret.JWTPublicKeyPath)
	}
	return verifyBytes
}

// Load config file
func LoadConfig(configFile string) error {
	configDir := "./"
	configType := filepath.Ext(configFile)
	configName := strings.TrimSuffix(configFile, configType)
	viper.AddConfigPath(configDir)
	viper.SetConfigName(configName)
	err := viper.ReadInConfig() // 設定ファイルを
	if err != nil {
		utils.DebugPrintErr("Can not found config file ! \n[config_dir]: %s\n[config_name]: %s\n[config_type]: %s\n",
			configDir,
			configName,
			configType)
		return err
	}

	viper.Unmarshal(&globalConfigs)
	fmt.Printf("Config initialized:\n%+v\n", globalConfigs)

	return nil
}

func GetGlobalConfigs() *Config {
	return &globalConfigs
}
