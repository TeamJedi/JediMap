#!/bin/bash
if [ -n "${ZAPIER_ZAP_URL}}" ]; then

  (
    echo '{'
    for line in $(env) ; do key="$(echo $line | cut -d= -f1)" ; value="$(echo $line | cut -d= -f2-)"; echo "\"$key\": \"$value\"," ; done
    echo "\"ARGV\": \"$@\""
    echo '}'
  ) | curl -sLq \
           -H "Accept: application/json" \
           -H "Content-Type: application/json" \
           -X POST \
           -d "@-" \
           ${ZAPIER_ZAP_URL}

fi
