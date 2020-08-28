#!/bin/bash

cd /code
curl \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/ertush/Agrarian/hooks \
  -d '{"config":{"url":"https://3f1b6c4cadea.ngrok.io","content_type":"json","secret": "ricoHOOKweb77","insecure_ssl":"0"}, "events":"push", "active":"true"}'
