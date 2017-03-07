#!/bin/bash
pushd $(dirname $0) > /dev/null
SPOT_OA_DIR=$(pwd)
popd > /dev/null
IPYTHONDIR="$SPOT_OA_DIR/ipython/"
export IPYTHONDIR
ipython notebook --profile=spot > ipython.out 2>&1&
