package rr

import "time"

type AddLightingTalkRequest struct {
	Topic   string `json:"topic" binding:"required,max=255"`
	Content string `json:"content" binding:"required"`
}

type AddLightingTalkResponse struct {
	ID        uint      `json:"id"`
	Topic     string    `json:"topic"`
	Content   string    `json:"content"`
	Rating    int       `json:"rating"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
