#!/bin/bash

regex='^v[0-9\.]+(-(alpha|beta|internal))*[\.0-9]*$'

track=$(echo -n "$1" | sed -En "s/$regex/\2/p")

track=$([[ -z "$track" ]] && echo -n "production" || echo -n "$track")

echo "Settings env variables"
echo "RELEASE_VERSION: $1"
echo "RELEASE_TRACK: $track"

echo "RELEASE_VERSION=$1" >> $GITHUB_ENV
echo "RELEASE_TRACK=$track" >> $GITHUB_ENV
