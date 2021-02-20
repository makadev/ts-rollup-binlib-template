#!/bin/bash

BASE_IMAGE=${BASE_IMAGE:-"__BASE__"}
IMAGE_NAME=${IMAGE_NAME:-"__IMAGE__"}
IMAGE_TAG=${IMAGE_TAG:-"__TAG__"}
CONTAINER_NAME=${CONTAINER_NAME:-"__CONTAINER__"}
CONTAINER_MAPPING=${CONTAINER_MAPPING:-"__MAPPING__"}

export BASE_IMAGE
export IMAGE_NAME
export IMAGE_TAG
export CONTAINER_NAME
export CONTAINER_MAPPING