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
  database  Run database commands
  *         Help
    "
    exit 1
}

"$FSCLI_WORKDIR/scripts/cli/check-deps"

case "$1" in
    run|r)
        "$FSCLI_WORKDIR/scripts/cli/run" "$2" "$3"
    ;;
    database|db)
        "$FSCLI_WORKDIR/scripts/cli/db" "$2" "$3"
    ;;
    *)
        cli_help
    ;;
esac
