#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

tinacms build && hugo --minify --gc && "$SCRIPT_DIR"/encrypt