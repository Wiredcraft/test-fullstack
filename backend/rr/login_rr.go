package rr

type LoginRequest struct {
	LoginID  string `json:"loginID" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	AuthToken string `json:"authToken"`
}
