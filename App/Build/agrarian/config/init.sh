#!/bin/bash

chown -R 1000:1000 /data ;

chmod 755 /data ;

node-red node-red -v $FLOWS
