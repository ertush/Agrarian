FROM ruby:latest

# Install hashing libs 
RUN gem install rack-protection \
    && gem install openssl

WORKDIR /curl

COPY post.sh /curl

RUN chmod +x /curl/post.sh

# Generate HMAC for payload and parse arguments to post.sh
ENTRYPOINT exec /curl/post.sh $(export PAYLOAD="{\"dbuser\":\"${INPUT_DBUSER}\",\"dbadmin\":\"${INPUT_DBADMIN}\",\"secret\":\"${INPUT_GITSECRET}\"}" ; \
ruby -ropenssl -e 'puts "sha1=" + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new("sha1"), ENV["INPUT_SECRETTOKEN"], ENV["PAYLOAD"])') \
${INPUT_REMOTEHOST} \
"{\"dbuser\":\"${INPUT_DBUSER}\",\"dbadmin\":\"${INPUT_DBADMIN}\",\"secret\":\"${INPUT_GITSECRET}\"}"

