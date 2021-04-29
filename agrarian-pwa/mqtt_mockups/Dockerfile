#Grab the latest alpine image
FROM alpine:latest

WORKDIR /app

# Install python and pip
RUN apk add --update nodejs npm
ADD ./aedes-server.js /app
ADD ./package.json /app

# Install dependencies
RUN npm install .

# Expose is NOT supported by Heroku
# EXPOSE 5000 		

RUN addgroup -S node && adduser -S node -G node

# Run the image as a non-root user
RUN adduser -D myuser
USER myuser

# Run the app.  CMD is required to run on Heroku
# $PORT is set by Heroku			
CMD node aedes-server.js