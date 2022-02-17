package constants

const (
	DBIntInitValue    = 0
	DBStringInitValue = ""
)

const (
	JWTExpired = 24
)

// Error code
const (
	ErrCodeAuthFailed             = 0
	ErrCodeInvalidParam           = 1
	ErrCodeFailedToAdd            = 2
	ErrCodeWrongLoginIDOrPassword = 3
	ErrCodeAuthTokenInvalid       = 4
	ErrCodeAuthTokenExpired       = 5
	ErrCodeLoginIDExists          = 7
	ErrCodeHackNewsNotFound       = 8
)
