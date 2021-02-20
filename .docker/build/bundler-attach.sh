#!/bin/bash

## change path so we know exactly where we are
THIS_PATH=${BASH_SOURCE%/*}
cd "${THIS_PATH}" || exit 1

## run setup if needed and do not start the bundler
if [[ ! -f "config.sh" ]]; then
    echo "${THIS_PATH}/config.sh is missing"
    echo "either run ./bundler.sh or ${THIS_PATH}/setup.sh"
    echo "and complete the setup"
    exit 1;
fi

## load config
source config.sh

echo "[+] trying to attach to container"
## enter container and execute command
if [[ -z "$*" ]]; then
    docker exec -it "${CONTAINER_NAME}" bash -c "bash"
else
    docker exec -it "${CONTAINER_NAME}" bash -c "$*"
fi
