package rr

import "time"

type GetLightingTalkRequest struct {
	ID uint `json:"id"`
}

type GetLightingTalkResponse struct {
	ID        uint      `json:"id"`
	Topic     string    `json:"topic"`
	Content   string    `json:"content"`
	Rating    int       `json:"rating"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
