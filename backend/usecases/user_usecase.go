package usecases

import (
	"time"

	"github.com/guregu/null"
	"github.com/silverlovesl/test-fullstack/backend/configs"
	"github.com/silverlovesl/test-fullstack/backend/constants"
	"github.com/silverlovesl/test-fullstack/backend/entities"
	"github.com/silverlovesl/test-fullstack/backend/errors"
	"github.com/silverlovesl/test-fullstack/backend/models"
	"github.com/silverlovesl/test-fullstack/backend/persistences"
	"github.com/silverlovesl/test-fullstack/backend/rr"
	"github.com/silverlovesl/test-fullstack/backend/services"
	"github.com/silverlovesl/test-fullstack/backend/utils"
	"gorm.io/gorm"
)

// UserUsecase User service
type UserUsecase struct {
	logService services.LogService
	comDBA     *persistences.CommonDBA
}

// NewUserUsecase User service constructor
func NewUserUsecase() *UserUsecase {
	return &UserUsecase{
		logService: *services.GetLogService(),
		comDBA:     persistences.GetCommonDBA(),
	}
}

// Login
func (serv *UserUsecase) Login(req *rr.LoginRequest) (*rr.LoginResponse, error) {

	// serv.logService.Logger.Infof("User [%s] try to login", req.LoginID)

	gConfig := configs.GetGlobalConfigs()
	var userEntity entities.User
	encPassword := utils.SHA256Str(req.Password)
	queryResult := serv.comDBA.Engine.
		Where("login_id = ? and password = ?", req.LoginID, encPassword).
		First(&userEntity)
	if queryResult.RowsAffected == 0 {
		return nil, &errors.ErrWrongLoginIDOrPassword
	}

	jwtWrap := models.NewJWT(gConfig.Secret.GetJWTPrivateBytes(), gConfig.Secret.GetJWTPublicBytes())
	jwtString, err := jwtWrap.Create(time.Hour*constants.JWTExpired, int64(userEntity.ID))
	if err != nil {
		return nil, err
	}

	serv.comDBA.Engine.Transaction(func(tx *gorm.DB) error {
		userEntity.AuthToken = null.StringFrom(jwtString)
		tx.Save(&userEntity)
		return nil
	})

	return &rr.LoginResponse{
		AuthToken: jwtString,
	}, nil
}

func (serv *UserUsecase) GetAuthedUser(authToken string) (*models.AuthUser, error) {
	var userEntity entities.User
	gConfig := configs.GetGlobalConfigs()
	jwtWrap := models.NewJWT(gConfig.Secret.GetJWTPrivateBytes(), gConfig.Secret.GetJWTPublicBytes())

	claimDat, err := jwtWrap.Validate(authToken)
	if err != nil {
		return nil, &errors.ErrAuthTokenInvalid
	}

	userID := int(claimDat.(float64))
	queryResult := serv.comDBA.Engine.First(&userEntity, userID)

	if queryResult.RowsAffected == 0 {
		return nil, &errors.ErrAuthTokenInvalid
	}

	if !userEntity.AuthToken.Valid || userEntity.AuthToken.String != authToken {
		return nil, &errors.ErrAuthTokenExpired
	}

	return &models.AuthUser{
		UserID: userEntity.ID,
		Name:   userEntity.Name,
	}, nil
}
