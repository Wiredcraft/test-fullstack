#!/bin/bash

COVERAGE_PATH=./coverage

rm -f $COVERAGE_PATH/test-result.out
rm -f $COVERAGE_PATH/test-result.html

go test -v ./... -coverpkg=./... -coverprofile $COVERAGE_PATH/test-result.out
go tool cover -html=$COVERAGE_PATH/test-result.out -o $COVERAGE_PATH/test-result.html

open $COVERAGE_PATH/test-result.html