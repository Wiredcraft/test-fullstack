# API Specification

Routes which needs to be authenticated must have the `Bearer <token>` provided in the request header, where `<token>` is the token returned by the authentication endpoint.

## Register
**URL** : `/auth/register`
**Method** : `POST`
**Data constraints**
```json
{
    "username": "string",
    "password": "string"
}
```
**Auth required** : NO
**Permissions required** : None
### Success Response
**Code** : `200 OK`
**Content examples**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUyZGNjNTgyZDBlN2RlZmFlYmExNGMiLCJyb2xlIjoidXNlciIsInVzZXJuYW1lIjoibG9pY3BpcmV6IiwiZXhwIjoxNjQ3NzQ4MzU4LjE2MSwiaWF0IjoxNjQyNTY0MzU4fQ.JpmvSS65Dbrd3S5w2EM5iAUPybkqygwuWZuIs0lIgpM",
    "id": "61e2dcc582d0e7defaeba14c",
    "username": "loicpirez"
}
```

## Login
**URL** : `/auth/login`
**Method** : `POST`
**Data constraints**
```json
{
    "username": "string",
"password": "string"
}
```
**Auth required** : NO
**Permissions required** : None
### Success Response
**Code** : `200 OK`
**Content examples**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUyZGNjNTgyZDBlN2RlZmFlYmExNGMiLCJyb2xlIjoidXNlciIsInVzZXJuYW1lIjoibG9pY3BpcmV6IiwiZXhwIjoxNjQ3NzQ4MzU4LjE2MSwiaWF0IjoxNjQyNTY0MzU4fQ.JpmvSS65Dbrd3S5w2EM5iAUPybkqygwuWZuIs0lIgpM",
    "id": "61e2dcc582d0e7defaeba14c",
    "username": "loicpirez"
}
```

# Talks
## Get a Talk
**URL** : `/talks/:talk_id`
**Method** : `GET`
**Auth required** : YES
**Permissions required** : None
### Success Response
**Code** : `200 OK`
**Content examples**
```json
{
    "_id": "61e2ea6c58086c324bfba7ec",
    "user": "loicpirez",
    "score": "+1",
    "name": "Hi Wiredcraft !",
    "description": "An introduction about my technical skills."
}
```

## Get all talks
**URL** : `/talks/list/`
**Method** : `GET`
**Auth required** : YES
**Permissions required** : None
### Success Response
**Code** : `200 OK`
  
## Add a Talk
  **URL** : `/talks/`
  **Method** : `POST`
  
  **Data constraints**
  ```json
{
    "name": "string",
    "description": "string"
}
```
  
  **Auth required** : YES
  **Permissions required** : None
  ### Success Response
  **Code** : `200 OK`
  **Content examples**
  ```json
{
    "status": "created",
    "id": "61e381d595470b1e1ad58475"
}
```

## Patch a Talk
**URL** : `/talks/:talk_id`
**Method** : `PATCH`
  
  **Data constraints**
  ```json
{
    "name": "optional string",
    "description": "optional string"
}
```
**Auth required** : YES
**Permissions required** : YES (be the owner of the talk)
### Success Response
**Code** : `200 OK`
**Content examples**
```json
{
    "status": "patched",
}
```

## Delete a Talk
**URL** : `/talks/:talk_id`
**Method** : `DELETE`
**Auth required** : YES
**Permissions required** : YES (be the owner of the talk)
### Success Response
**Code** : `200 OK`
**Content examples**
```json
{
    "status": "deleted",
}
```