package utils

import "fmt"

func DebugPrintFC(format string, arg ...interface{}) {
	convertedFormat := fmt.Sprintf("\033[32m%s\033[0m", format)
	fmt.Printf(convertedFormat, arg...)
}

func DebugPrintlnFC(format string, arg ...interface{}) {
	convertedFormat := fmt.Sprintf("\033[32m%s\033[0m\n", format)
	fmt.Printf(convertedFormat, arg...)
}

func DebugPrintErr(format string, arg ...interface{}) {
	convertedFormat := fmt.Sprintf("\033[31m%s\033[0m\n", format)
	fmt.Printf(convertedFormat, arg...)
}

func DebugPrintSQL(format string, arg ...interface{}) {
	fmt.Println(format)
}

func DebugThrowErr(format string, arg ...interface{}) error {
	convertedFormat := fmt.Sprintf("\033[31m%s\033[0m\n", format)
	return fmt.Errorf(convertedFormat, arg)
}
