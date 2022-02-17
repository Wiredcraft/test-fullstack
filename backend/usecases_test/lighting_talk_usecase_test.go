package usecases_test

import (
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/silverlovesl/test-fullstack/backend/models"
	"github.com/silverlovesl/test-fullstack/backend/rr"
	"github.com/silverlovesl/test-fullstack/backend/tests"
	"github.com/silverlovesl/test-fullstack/backend/usecases"
	"github.com/stretchr/testify/assert"
)

var lightingUC *usecases.LightingTalkUsecase

func TestMain(t *testing.T) {
	gin.SetMode(gin.DebugMode)
	tests.InitMain()
	lightingUC = usecases.NewLightingTalkUsecase()
}

func TestAddListLightingTalk(t *testing.T) {
	request := &rr.AddLightingTalkRequest{
		Topic:   "Test Topic",
		Content: "Test Content",
	}
	testUser := &models.AuthUser{
		UserID: 1,
		Name:   "Test user",
	}
	response, err := lightingUC.AddLightingTalk(testUser, request)
	assert.Nil(t, err)
	assert.NotNil(t, response)
	assert.Equal(t, response.Topic, request.Topic)
	assert.Equal(t, response.Content, request.Content)
	assert.Equal(t, response.Rating, 0)
}

func TestListLightingTalk(t *testing.T) {
	request := &rr.ListLightingTalkRequest{}
	response, err := lightingUC.ListLightingTalk(request)
	assert.Nil(t, err)
	assert.NotNil(t, response)
	assert.Equal(t, len(response), 2)
}
