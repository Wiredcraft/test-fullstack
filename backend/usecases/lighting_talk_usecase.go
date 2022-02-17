package usecases

import (
	"github.com/silverlovesl/test-fullstack/backend/entities"
	"github.com/silverlovesl/test-fullstack/backend/errors"
	"github.com/silverlovesl/test-fullstack/backend/models"
	"github.com/silverlovesl/test-fullstack/backend/persistences"
	"github.com/silverlovesl/test-fullstack/backend/rr"
	"github.com/silverlovesl/test-fullstack/backend/services"
)

// LightingTalkUsecase LightingTalkUsecase service
type LightingTalkUsecase struct {
	logService services.LogService
	comDBA     *persistences.CommonDBA
}

// NewLightingTalkUsecase LightingTalkUsecase constructor
func NewLightingTalkUsecase() *LightingTalkUsecase {
	return &LightingTalkUsecase{
		logService: *services.GetLogService(),
		comDBA:     persistences.GetCommonDBA(),
	}
}

// GetLightingTalk get hack news by id
func (uc *LightingTalkUsecase) GetLightingTalk(request *rr.GetLightingTalkRequest) (*rr.GetLightingTalkResponse, error) {
	var result *rr.GetLightingTalkResponse
	var lightingTalkEntity entities.LightingTalk
	queryResult := uc.comDBA.Engine.First(&lightingTalkEntity, request.ID)
	if queryResult.RowsAffected == 0 {
		return nil, &errors.ErrHackNewsNotFound
	}
	result = &rr.GetLightingTalkResponse{
		ID:        lightingTalkEntity.ID,
		Topic:     lightingTalkEntity.Topic,
		Content:   lightingTalkEntity.Content,
		Rating:    lightingTalkEntity.Rating,
		CreatedAt: lightingTalkEntity.CreatedAt,
		UpdatedAt: lightingTalkEntity.UpdatedAt,
	}
	return result, nil
}

// ListLightingTalk list hack news
func (uc *LightingTalkUsecase) ListLightingTalk(request *rr.ListLightingTalkRequest) ([]*rr.ListLightingTalkResponse, error) {
	var lightingTalkEntities []entities.LightingTalk
	var result []*rr.ListLightingTalkResponse

	uc.comDBA.Engine.Order("rating DESC, updated_at DESC").Find(&lightingTalkEntities)

	for _, entity := range lightingTalkEntities {
		result = append(result, &rr.ListLightingTalkResponse{
			ID:        entity.ID,
			Topic:     entity.Topic,
			Content:   entity.Content,
			Rating:    entity.Rating,
			CreatedAt: entity.CreatedAt,
			UpdatedAt: entity.UpdatedAt,
		})
	}

	return result, nil
}

// AddLightingTalk list hack news
func (uc *LightingTalkUsecase) AddLightingTalk(authUser *models.AuthUser, req *rr.AddLightingTalkRequest) (*rr.AddLightingTalkResponse, error) {

	var result *rr.AddLightingTalkResponse
	lightingTalkEntity := entities.LightingTalk{
		Topic:    req.Topic,
		Content:  req.Content,
		Rating:   0,
		PosterID: int(authUser.UserID),
	}

	queryResult := uc.comDBA.Engine.Create(&lightingTalkEntity)
	if queryResult.RowsAffected != 1 {
		return nil, &errors.ErrCodeFailedToAdd
	}

	result = &rr.AddLightingTalkResponse{
		ID:        lightingTalkEntity.ID,
		Topic:     lightingTalkEntity.Topic,
		Content:   lightingTalkEntity.Content,
		Rating:    lightingTalkEntity.Rating,
		CreatedAt: lightingTalkEntity.CreatedAt,
		UpdatedAt: lightingTalkEntity.UpdatedAt,
	}

	return result, nil
}

// VoteLightingTalk
func (uc *LightingTalkUsecase) VoteLightingTalk(request *rr.VoteLightingTalkRequest) (*rr.VoteLightingTalkResponse, error) {
	var result *rr.VoteLightingTalkResponse
	var lightingTalkEntity entities.LightingTalk
	queryResult := uc.comDBA.Engine.First(&lightingTalkEntity, request.ID)
	if queryResult.RowsAffected == 0 {
		return nil, &errors.ErrHackNewsNotFound
	}
	lightingTalkEntity.Rating += 1
	uc.comDBA.Engine.Save(&lightingTalkEntity)
	result = &rr.VoteLightingTalkResponse{
		ID: lightingTalkEntity.ID,
	}
	return result, nil
}
