package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/silverlovesl/test-fullstack/backend/errors"
	"github.com/silverlovesl/test-fullstack/backend/rr"
	"github.com/silverlovesl/test-fullstack/backend/usecases"
	"github.com/silverlovesl/test-fullstack/backend/utils"
)

// LightingTalkController LightingTalk controller
type LightingTalkController struct {
	CommonController
	lightingTalkUC *usecases.LightingTalkUsecase
}

// NewLightingTalkController LightingTalk controller constructor
func NewLightingTalkController() *LightingTalkController {
	return &LightingTalkController{
		lightingTalkUC: usecases.NewLightingTalkUsecase(),
	}
}

// GetLightingTalk
func (ctrl *LightingTalkController) GetLightingTalk(ctx *gin.Context) {
	hackNewsID, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errors.NewInvalidParamError("ID is invalid"))
		return
	}
	request := rr.GetLightingTalkRequest{
		ID: uint(hackNewsID),
	}
	response, err := ctrl.lightingTalkUC.GetLightingTalk(&request)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	ctx.JSON(http.StatusOK, response)
}

// ListLightingTalk
func (ctrl *LightingTalkController) ListLightingTalk(ctx *gin.Context) {
	request := rr.ListLightingTalkRequest{}
	response, err := ctrl.lightingTalkUC.ListLightingTalk(&request)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	ctx.JSON(http.StatusOK, utils.WrapArray(response))
}

// AddLightingTalk
func (ctrl *LightingTalkController) AddLightingTalk(ctx *gin.Context) {
	var request rr.AddLightingTalkRequest
	cc := AuthContext{ctx}
	authUser := cc.GetAuthUser()
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	response, err := ctrl.lightingTalkUC.AddLightingTalk(authUser, &request)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	ctx.JSON(http.StatusOK, response)
}

// VoteLightingTalk
func (ctrl *LightingTalkController) VoteLightingTalk(ctx *gin.Context) {
	var request rr.VoteLightingTalkRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	response, err := ctrl.lightingTalkUC.VoteLightingTalk(&request)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}
	ctx.JSON(http.StatusOK, response)
}
