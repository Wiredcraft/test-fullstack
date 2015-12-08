### How to run the code

1. ```git clone <repo> <dir> ```

2. Terminal 1
```cd <dir> && cd client && npm install && npm run start ```

3. Terminal 2
```cd <dir> && cd server && npm install && node . ```

4. Surf localhost:8000


### What i would improve further:
frontend:
- optimistic updates
- flat tree no nesting of objects in the state tree aka normalizr
- tests for reducers + more integration tests
- more mobile adjustments 
- redux router 
- better CONST handling 
- branch by feature 
- fix animation

backend:
- dont screw the user and topic relation 
- calculate the points in backend + liked / not liked
- more tests for bulletproof ACL 
