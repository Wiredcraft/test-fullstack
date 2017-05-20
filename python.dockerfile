FROM alpine

WORKDIR /test-fullstack
ADD . /test-fullstack

RUN apk update
RUN apk add python3
RUN apk add py3-psycopg2
RUN pip3 install -r requirements.txt

RUN mkdir -p log
RUN touch log/debug
