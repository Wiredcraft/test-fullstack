package controllers

import "github.com/gin-gonic/gin"

// Route設定
func SetupRoutes(ge *gin.Engine) {
	setRoutes(ge)
}

func setRoutes(ge *gin.Engine) {
	authCtrl := NewAuthController()
	lightingTalkCtrl := NewLightingTalkController()

	nonAuthGroup := ge.Group("/api/v1")
	nonAuthGroup.POST("/login", authCtrl.Login)
	nonAuthGroup.GET("/lighting-talk/:id", lightingTalkCtrl.GetLightingTalk)
	nonAuthGroup.GET("/lighting-talk", lightingTalkCtrl.ListLightingTalk)

	// Follow api should be authed,before access
	authGroup := ge.Group("/api/v1", authCtrl.Authenticate)
	{
		authGroup.POST("/lighting-talk", lightingTalkCtrl.AddLightingTalk)
		authGroup.PUT("/lighting-talk/vote", lightingTalkCtrl.VoteLightingTalk)
	}
}
