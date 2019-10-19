#!/bin/sh
if [ ! -z ${BASE_URL} ]; then
    cat <<END
    window.BASE_URL='${BASE_URL}';
END
fi
