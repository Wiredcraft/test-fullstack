package rr

type VoteLightingTalkRequest struct {
	ID uint `json:"id" binding:"required"`
}

type VoteLightingTalkResponse struct {
	ID uint `json:"id"`
}
