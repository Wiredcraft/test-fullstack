package utils

import (
	"reflect"
	"sort"
	"strconv"
	"strings"
	"time"
)

// Element Array elements as object
type Element interface{}

// WrapArray Array elements to object
func WrapArray(arrayData interface{}) map[string]Element {
	return WrapArrayWithElemName(arrayData, "data")
}

// WrapArrayWithElemName Array elements to object with field name.
func WrapArrayWithElemName(arrayData interface{}, elemName string) map[string]Element {
	jsonData := make(map[string]Element)
	dataSize := getArraySize(arrayData)
	if arrayData == nil || dataSize <= 0 {
		jsonData[elemName] = make([]Element, 0)
	} else {
		jsonData[elemName] = arrayData
	}

	return jsonData
}

func getArraySize(data interface{}) int {
	if data == nil {
		return 0
	}
	switch reflect.TypeOf(data).Kind() {
	case reflect.Slice:
		return reflect.ValueOf(data).Len()
	default:
		return -1
	}
}

// IndexOfInt returns index of value in the array.
func IndexOfInt(arrayData []int, val int) int {
	for i, v := range arrayData {
		if v == val {
			return i
		}
	}
	return -1
}

// ExistsInt returns the value exists in the array.
func ExistsInt(arrayData []int, val int) bool {
	for _, v := range arrayData {
		if v == val {
			return true
		}
	}
	return false
}

// UniqInt returns duplicate value in the array.
func UniqInt(arrayData []int) []int {
	results := make([]int, 0, len(arrayData))
	encounters := map[int]bool{}
	for _, v := range arrayData {
		if !encounters[v] {
			results = append(results, v)
			encounters[v] = true
		}
	}
	return results
}

// ExistsString returns the value exists in the array.
func ExistsString(arrayData []string, val string) bool {
	for _, v := range arrayData {
		if v == val {
			return true
		}
	}
	return false
}

// IntArrayToString
func IntArrayToString(arrayData []int, delimiter string) string {
	results := make([]string, 0, len(arrayData))
	for _, data := range arrayData {
		results = append(results, strconv.Itoa(data))
	}
	return strings.Join(results, delimiter)
}

// StringToIntArray delimiter
func StringToIntArray(str string) ([]int, error) {
	if str == "" {
		return make([]int, 0), nil
	}

	splitedStrList := strings.Split(str, ",")
	result := make([]int, len(splitedStrList))
	for i, splitedStr := range splitedStrList {
		val, err := strconv.ParseInt(splitedStr, 10, 64)
		if err != nil {
			return make([]int, 0), err
		}
		result[i] = int(val)
	}
	return result, nil
}

// RemoveNumInArray
func RemoveNumInArray(removeNum int, intArray []int) []int {
	result := []int{}
	for _, num := range intArray {
		if num != removeNum {
			result = append(result, num)
		}
	}
	return result
}

// SliceInt
func SliceInt(offset int, limit int, intArray []int) []int {

	result := make([]int, 0, limit)
	to := offset + limit
	if offset >= len(intArray) {
		return []int{}
	}
	if to > len(intArray) {
		to = len(intArray)
	}
	for i := offset; i < to; i++ {
		result = append(result, intArray[i])
	}

	return result
}

//SortMapByValueForTime Map(key:int,value:time.Time)
func SortMapByValueForTime(srcMap map[int]time.Time) []int {

	type temp struct {
		key   int
		value time.Time
	}
	var result []int
	var work []temp

	for k, v := range srcMap {
		work = append(work, temp{
			key:   k,
			value: v,
		})
	}

	sort.Slice(work, func(a int, b int) bool {
		return work[a].value.After(work[b].value) //a.time > b.time
	})

	for _, sortTemp := range work {
		result = append(result, sortTemp.key)
	}
	return result
}

//SortMapByValueForFloat Map(key:int,value:float64)
func SortMapByValueForFloat(srcMap map[int]float64) []int {

	type temp struct {
		key   int
		value float64
	}
	var result []int
	var work []temp

	for k, v := range srcMap {
		work = append(work, temp{
			key:   k,
			value: v,
		})
	}
	sort.Slice(work, func(a int, b int) bool {
		return work[a].value > work[b].value
	})

	for _, sortTemp := range work {
		result = append(result, sortTemp.key)
	}
	return result
}
