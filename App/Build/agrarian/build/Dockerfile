# Dockerfile for Node-RED - pulls latest master code from git
FROM alpine:latest

WORKDIR /node-red
 
# download latest stable node-red
RUN apk update \
    && apk upgrade \
    && apk add nodejs \
    && apk add npm 

RUN npm install -g --unsafe-perm node-red

# expose port
EXPOSE 1880 

# Set the default command to execute
# when creating a new container
CMD ["node-red", "-v", "-s /root/.node-red/config/settings.js", "--max-old-space-size=512", "/root/.node-red/config/flows_YOGA-510-RICO.json", " | /dev/null"]

LABEL Author="Eric Mutua" 

# docker build --rm=true -t node-red:agrarian .
# docker run -it -p 1880:1880 -v ./node-red-data:/root/.node-red  node-red:agrarian
