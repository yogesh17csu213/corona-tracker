FROM ubuntu:20.04
RUN apt-get update
RUN apt-get install -y nodejs --no-install-recommends
RUN apt-get install -y npm --no-install-recommends
RUN npm cache clean -f
RUN npm install -g n
RUN n 16.2.0
WORKDIR /home/ubuntu/main/corona-tracker
COPY /backend/package.json /home/ubuntu/main/corona-tracker
RUN  npm i
COPY . /home/ubuntu/main/corona-tracker
EXPOSE 8080
ENTRYPOINT bash /home/ubuntu/main/corona-tracker/run.bash

