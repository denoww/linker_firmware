FROM node:onbuild
MAINTAINER rodrigo@seucondominio.com.br
# WORKDIR /usr/app
# VOLUME /workdir1

WORKDIR /src
COPY package*.json ./

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

RUN npm install --quiet

RUN npm install --global coffee-script

RUN apt-get update && apt-get install -y \
  nmap
  # docker.io |
  # curl
  # openssh-client
  # nmap

# instalar docker
# RUN curl -sSL https://get.docker.com/ | sh

# install docker-compose
# RUN curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# RUN chmod +x /usr/local/bin/docker-compose



# EXPOSE 3002
# CMD [ "npm", "run", "start_docker" ]
COPY . .
