#!/bin/bash

[ ! -f dist/app.bundle.js ] && npm run build

cp -r dist/* ../ltserver/client