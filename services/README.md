# FEEDx backend services

## UsersModule/UsersController

1. For session based auth in this project, a user should not use get(user/:id) for his/her profile, endpoints within this controller should only be accessed by the admin+ roles

2. See './user-profile.controller' for safe profile fetch

3. Since the tokens are stored in the server and the returned userprofile usually get omit the id field, he won't know his id in most cases.

## Feeds/feeds.controller

1. Many of lines in this controller are borrowed from a [amplication](https://amplication.com/) auto generated project, to learn rbac with nestjs-access-control, will implement here soom
