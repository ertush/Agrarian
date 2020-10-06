#!/bin/sh


# Curl post command
# $1 -> payload sha1 hmac
# $2 -> remote host
# $3 -> json payload

curl -H "Http_X_Hub_Signature: $1" -H "Content-Type: application/json" -X POST $2 -d "$3" 
