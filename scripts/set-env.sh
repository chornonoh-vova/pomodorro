#!/bin/bash

regex='^(v[0-9\.]{5})-(alpha|beta|internal)$'

version=$(echo -n "$1" | sed -En "s/$regex/\1/p")
track=$(echo -n "$1" | sed -En "s/$regex/\2/p")

version=$([[ -z "$version" ]] && echo -n "$1" || echo -n "$version")
track=$([[ -z "$track" ]] && echo -n "production" || echo -n "$track")

echo "Settings env variables"
echo "version: $version"
echo "track: $track"

echo "version=$version" >> $GITHUB_ENV
echo "track=$track" >> $GITHUB_ENV
