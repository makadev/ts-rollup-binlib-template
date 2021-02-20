#!/bin/bash

## cd to correct path
THIS_PATH=${BASH_SOURCE%/*}
cd "${THIS_PATH}" || exit 1

## run setup if needed and do not start the bundler
if [[ ! -f "config.sh" ]]; then
    if ! ./setup.sh ; then
        echo "config setup failed"
        echo "you might need to delete "
        echo "and rerun setup by executing ${THIS_PATH}/setup.sh"
        echo "good luck"
        exit 1;
    fi
fi

## load config
source config.sh

## setup project path
PROJECT_PATH="$(pwd)/../.."
## if this is run under windows using cygwin/git bash try to convert
## the path using cygpath.exe
if [[ "$OS" == "Windows_NT" ]]; then
    if [[ -e "/usr/bin/cygpath.exe" ]]; then
        PROJECT_PATH=$(cygpath.exe -aw "${PROJECT_PATH}")
    fi
fi

## (re)build image
echo "[+] (re)build image if needed"
docker build \
    --pull \
    --build-arg BASE_IMAGE="${BASE_IMAGE}" \
    -t "${IMAGE_NAME}:${IMAGE_TAG}" \
    -f bundler/Dockerfile \
    "${PROJECT_PATH}"

## stop old container with same name if it's still running
echo "[+] removing running container if existend"
docker stop "${CONTAINER_NAME}" 2>/dev/null
docker rm "${CONTAINER_NAME}" 2>/dev/null

## setup new container (detached)
echo "[+] container startup"
docker run -dit --name "${CONTAINER_NAME}" \
    -p "${CONTAINER_MAPPING}:3000" \
    --volume "${PROJECT_PATH}:/app" \
    "${IMAGE_NAME}:${IMAGE_TAG}"

## enter container and execute command
if [[ -z "$*" ]]; then
    docker exec -it "${CONTAINER_NAME}" bash -c "bash"
else
    docker exec -it "${CONTAINER_NAME}" bash -c "$*"
fi

## after command execution, remove the container
echo "[+] removing container"
docker stop "${CONTAINER_NAME}" 2>/dev/null
docker rm "${CONTAINER_NAME}" 2>/dev/null

echo "[+] done"
