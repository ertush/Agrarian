#!/bin/sh


# Curl post command
# 3 arguments

curl -H "Http_X_Hub_Signature: $1" -H "Content-Type: application/json" -X POST $2 -d "$3" 
