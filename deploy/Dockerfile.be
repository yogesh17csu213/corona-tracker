FROM ubuntu:20.04
RUN apt-get update --fix-missing 
RUN apt-get install -y tzdata --no-install-recommends
RUN apt-get install -y curl \
		libxrender1 \
		fontconfig \
		libjpeg-turbo8 \
		libxtst6 \
		xfonts-base \
		xfonts-75dpi \
		xz-utils --no-install-recommends
RUN apt-get install -y dialog apt-utils --no-install-recommends
RUN apt-get install -y build-essential --no-install-recommends
RUN apt-get install -y git --no-install-recommends
RUN apt-get install -y nodejs --no-install-recommends
RUN apt-get install -y npm --no-install-recommends
RUN npm cache clean -f
RUN npm install -g n
RUN n 16.2.0
WORKDIR /home/ubuntu/main/corona-tracker
COPY /backend/package.json /home/ubuntu/main/corona-tracker
RUN npm i --legacy-peer-deps
COPY . /home/ubuntu/main/corona-tracker
EXPOSE 8080
ENTRYPOINT bash /home/ubuntu/main/corona-tracker/deploy/run.bash

