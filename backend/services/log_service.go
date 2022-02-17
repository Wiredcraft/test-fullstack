package services

import (
	"github.com/aws/aws-sdk-go/aws/session"
	logrus_cloudwatchlogs "github.com/kdar/logrus-cloudwatchlogs"
	"github.com/sirupsen/logrus"
)

// LogService log service
type LogService struct {
	Logger *logrus.Logger
}

var logService *LogService

func InitLogService(appEnv string, group, stream string, session *session.Session) {
	_logrus := logrus.New()

	logService = &LogService{
		Logger: _logrus,
	}

	if appEnv == "local" {
		// Local時はCloudWatchに送らない
		_logrus.SetLevel(logrus.DebugLevel)
		_logrus.SetFormatter(&logrus.TextFormatter{})

		logService.Logger.WithFields(logrus.Fields{
			"env": appEnv,
		}).Info("Start log service")

	} else {
		hook, err := logrus_cloudwatchlogs.NewHook(group, stream, session)
		_logrus.AddHook(hook)

		_logrus.SetFormatter(&logrus.JSONFormatter{})
		if err != nil {
			logrus.Fatalln(err)
		}
		if appEnv == "develop" {
			_logrus.SetLevel(logrus.InfoLevel)
		} else if appEnv == "prod" {
			_logrus.SetLevel(logrus.WarnLevel)
		} else {
			logrus.Fatalf("Wrong app env [%s]", appEnv)
		}

		logService.Logger.WithFields(logrus.Fields{
			"env":    appEnv,
			"group":  group,
			"stream": stream,
		}).Info("Connection to AWS Cloud watch")
	}
}

func GetLogService() *LogService {
	return logService
}
