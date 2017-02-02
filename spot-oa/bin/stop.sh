#!/bin/sh
# Last server instance

# Does user wants to stop a particular instance?
PORT="$1"

if [ "$PORT" = "" ]; then
    # Find out what the last used port was
    PORT=$(cat ipython.out | grep "is running at:" | sed -e 's?.\+:\([0-9]\+\).*?\1?')
fi

echo "Stopping web server on port $PORT... "

PID=$(netstat -nlp 2>/dev/null | grep $PORT | sed -e 's?.\+ \([0-9]\+\)/python.*?\1?')
if [ "$PID" != "" ]; then
    kill -9 $PID > /dev/null 2>&1
fi