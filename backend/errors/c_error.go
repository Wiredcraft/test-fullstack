package errors

import (
	"fmt"

	"github.com/silverlovesl/test-fullstack/backend/constants"
)

// ErrorWithCode エラー
type ErrorWithCode struct {
	Code         int    `json:"code"`
	Reason       string `json:"reason"`
	Notification bool   `json:"notification"`
}

// NewInvalidParamError returns ErrorReason type of invalid request parameters
func NewInvalidParamError(paramName string) *ErrorWithCode {
	return &ErrorWithCode{
		Code:   constants.ErrCodeInvalidParam,
		Reason: fmt.Sprintf("Invalid param [%s]", paramName),
	}
}

func (error *ErrorWithCode) Error() string {
	return error.Reason
}

var ErrAuthFailed = ErrorWithCode{
	Reason: "Auth Failed",
	Code:   constants.ErrCodeAuthFailed,
}

var ErrCodeFailedToAdd = ErrorWithCode{
	Reason: "Failed to aadd",
	Code:   constants.ErrCodeFailedToAdd,
}

var ErrWrongLoginIDOrPassword = ErrorWithCode{
	Reason: "Wrong login ID or password",
	Code:   constants.ErrCodeWrongLoginIDOrPassword,
}

var ErrAuthTokenInvalid = ErrorWithCode{
	Reason: "AuthToken Invalid",
	Code:   constants.ErrCodeAuthTokenInvalid,
}

var ErrAuthTokenExpired = ErrorWithCode{
	Reason: "AuthToken expired",
	Code:   constants.ErrCodeAuthTokenExpired,
}

var ErrLoginIDExists = ErrorWithCode{
	Reason: "LoginID existed",
	Code:   constants.ErrCodeLoginIDExists,
}

var ErrHackNewsNotFound = ErrorWithCode{
	Reason: "Hack news not found",
	Code:   constants.ErrCodeHackNewsNotFound,
}
