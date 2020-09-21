FROM ruby:latest

# install hashing libs 
RUN gem install rack-protection \
    && gem install openssl

WORKDIR /curl

COPY post.sh /curl

RUN chmod +x /curl/post.sh

# Generate HMAC for payload
CMD export PAYLOAD="{\"dbuser\":\"$INPUT_DBUSER\", \"dbadmin\":\"$INPUT_DBADMIN\", \"secret\":\"$INPUT_GITSECRET\"}" \
    && export HMAC_SIG=$(ruby -ropenssl -e 'puts "sha1=" + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new("sha1"), "$INPUT_SECRETTOKEN", "$PAYLOAD")') \
    && /curl/post.sh $HMAC_SIG $PAYLOAD


