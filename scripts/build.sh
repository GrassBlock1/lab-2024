#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

pnpx @tinacms/ build && hugo --minify --gc && "$SCRIPT_DIR"/encrypt