#!/usr/bin/env bash

set -e

export FSCLI_WORKDIR=$(cd $(dirname $0) && pwd)

cli_help() {
    cli_name=${0##*/}
    echo "


test-fullstack NestJS/React CLI
Version: 0.0.1
Auther: Stefan Wawrzyn <swawrzyn@gmail.com>
Usage: ./cli.sh [command]
Commands:
  run       Run development environment
  *         Help
    "
    exit 1
}

case "$1" in
    run|r)
        "$FSCLI_WORKDIR/scripts/cli/run" "$2"
    ;;
    *)
        cli_help
    ;;
esac
