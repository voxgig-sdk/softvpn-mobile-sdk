package core

type SoftvpnMobileError struct {
	IsSoftvpnMobileError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewSoftvpnMobileError(code string, msg string, ctx *Context) *SoftvpnMobileError {
	return &SoftvpnMobileError{
		IsSoftvpnMobileError: true,
		Sdk:              "SoftvpnMobile",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *SoftvpnMobileError) Error() string {
	return e.Msg
}
