#! /bin/bash

KEY_F=./keys/jwt.rsa
PUB_F=./keys/jwt.rsa.pub

openssl genrsa -out $KEY_F
openssl rsa -in $KEY_F -pubout > $PUB_F