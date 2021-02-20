#!/bin/bash

THIS_PATH=${BASH_SOURCE%/*}
cd "${THIS_PATH}" || exit 1

## check if config.sh exists
if [[ -f "./config.sh" ]]; then
    exit 0;
fi

## set defaults
DEFAULT_VALUE_BASE_IMAGE="node:current-buster"
DEFAULT_VALUE_IMAGE_NAME="node-bundler"
DEFAULT_VALUE_IMAGE_TAG="latest"
DEFAULT_VALUE_CONTAINER_NAME="node-bundler-container"
DEFAULT_VALUE_CONTAINER_MAPPING="127.0.0.1:8080"

## get settings
echo ""
echo "Update settings, leave empty for default"
read -p "Node Name [default: ${DEFAULT_VALUE_BASE_IMAGE}]: " BASE_IMAGE
read -p "Image Name [default: ${DEFAULT_VALUE_IMAGE_NAME}]: " IMAGE_NAME
read -p "Image Tag [default: ${DEFAULT_VALUE_IMAGE_TAG}]: " IMAGE_TAG
read -p "Container Name [default: ${DEFAULT_VALUE_CONTAINER_NAME}]: " CONTAINER_NAME
read -p "Mapping [default: ${DEFAULT_VALUE_CONTAINER_MAPPING}]: " CONTAINER_MAPPING

## update with defaults and remove percent signs which are used with sed
BASE_IMAGE=${BASE_IMAGE:-${DEFAULT_VALUE_BASE_IMAGE}}
BASE_IMAGE=${BASE_IMAGE//"%"}
IMAGE_NAME=${IMAGE_NAME:-${DEFAULT_VALUE_IMAGE_NAME}}
IMAGE_NAME=${IMAGE_NAME//"%"}
IMAGE_TAG=${IMAGE_TAG:-${DEFAULT_VALUE_IMAGE_TAG}}
IMAGE_TAG=${IMAGE_TAG//"%"}
CONTAINER_NAME=${CONTAINER_NAME:-${DEFAULT_VALUE_CONTAINER_NAME}}
CONTAINER_NAME=${CONTAINER_NAME//"%"}
CONTAINER_MAPPING=${CONTAINER_MAPPING:-${DEFAULT_VALUE_CONTAINER_MAPPING}}
CONTAINER_MAPPING=${CONTAINER_MAPPING//"%"}

sed -e "s%__BASE__%$BASE_IMAGE%" \
    -e "s%__IMAGE__%$IMAGE_NAME%" \
    -e "s%__TAG__%$IMAGE_TAG%"  \
    -e "s%__CONTAINER__%$CONTAINER_NAME%" \
    -e "s%__MAPPING__%$CONTAINER_MAPPING%" \
    config.example.sh > config.sh

## check syntax
if ! bash -n config.sh > /dev/null 2> /dev/null ; then
    echo "Something went wrong, check your "
    exit 1;
fi

## and done
echo ""
echo "generated ${THIS_PATH}/config.sh"

exit 0;
