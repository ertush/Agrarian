#!/bin/bash

curl -H "{\"Http_X_Hub_Signature\": \"$1\", \"Content-Type\": \"application/json\"}" -X POST http://8bc9ae8ab9e4.ngrok.io/hooks/action -d $2 