#!/bin/bash

ARTIFACT_NAME="github-pages"

# generate tar
TAR_FILE="github-pages.tar"
tar -cvf $TAR_FILE $ARTIFACT_NAME

# create gzip archive
GZIP_FILE="$ARTIFACT_NAME.tar.gz"
gzip -c $TAR_FILE > $GZIP_FILE

echo "GitHub Pages artifacts created: $GZIP_FILE"