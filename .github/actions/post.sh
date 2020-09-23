#!/bin/sh

echo "sig: " $1 "\npayload: " $2
curl -H "Http_X_Hub_Signature: $1" -X POST https://ff3dee20cd67.ngrok.io/hooks/action -d "$2" 