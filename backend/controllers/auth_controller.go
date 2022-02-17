package controllers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/silverlovesl/test-fullstack/backend/errors"
	"github.com/silverlovesl/test-fullstack/backend/models"
	"github.com/silverlovesl/test-fullstack/backend/rr"
	"github.com/silverlovesl/test-fullstack/backend/usecases"
	"github.com/silverlovesl/test-fullstack/backend/utils"
)

type AuthContext struct {
	*gin.Context
}

func (c *AuthContext) SetAuthUser(authUser *models.AuthUser) {
	c.Set("authUser", authUser)
}

func (c *AuthContext) GetAuthUser() *models.AuthUser {
	m, isExists := c.Get("authUser")
	if isExists {
		return m.(*models.AuthUser)
	}
	return nil
}

// AuthController Auth controller
type AuthController struct {
	userUC *usecases.UserUsecase
}

// NewAuthController Auth controller constructor
func NewAuthController() *AuthController {
	return &AuthController{
		userUC: usecases.NewUserUsecase(),
	}
}

// Authenticate
func (ctrl *AuthController) Authenticate(ctx *gin.Context) {
	auth := ctx.Request.Header.Get("Authorization")
	if len(auth) == 0 {
		ctx.Abort()
		utils.DebugPrintErr("Not Authorization in header")
		ctx.JSON(http.StatusUnauthorized, errors.ErrAuthFailed)
		return
	}
	tokenString := strings.Fields(auth)
	if len(tokenString) != 2 {
		ctx.JSON(http.StatusUnauthorized, errors.ErrAuthFailed)
	}
	token := tokenString[1]
	authUser, err := ctrl.userUC.GetAuthedUser(token)
	if err == nil && authUser != nil {
		utils.DebugPrintFC("authUser %+v", authUser)
		cc := AuthContext{ctx}
		cc.SetAuthUser(authUser)
		ctx.Next()
	} else {
		utils.DebugPrintErr("Error: %s", err)
		ctx.Abort()
		ctx.JSON(http.StatusUnauthorized, errors.ErrAuthFailed)
		return
	}
}

// Login
func (ctrl *AuthController) Login(ctx *gin.Context) {
	var request rr.LoginRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	response, err := ctrl.userUC.Login(&request)
	if err != nil {
		utils.DebugPrintErr("response error %s", err)
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	utils.DebugPrintFC("%s = %s", "▲▲▲▲▲▲▲▲▲▲response", response.AuthToken)
	ctx.JSON(http.StatusOK, response)
}
