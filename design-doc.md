### Techstack:
- node.js + express = backend (web framework)
- mongoose + mongodb = database
- google-auth: auth
- vanilla JS/React = frontend

### Features:
- sign in
- create, update, read, delete notes
- markdown support
- editor + preview

### Backend:
- design db schema for users
- design db schema for notes
- design routes for user sign in/sign out
- design routes for CRUD notes

### Frontend:
- create homepage
- create login page
- create notes page
- create editor with live preview page

tasks:
- add google sign-in to a web-app to protect a route:
    - confirm if user exists by checking db, then create a user session; if not, add to db, then do the same
    - if anyone goes to protected route, redirect to login if not logged in

### References:
- https://chat.openai.com/c/b2a66c20-d75a-48f8-bf63-a714c62224ed
- https://developers.google.com/identity/sign-in/web/sign-in
- https://developers.google.com/identity/sign-in/web/backend-auth
- https://console.cloud.google.com/apis/credentials/oauthclient
- https://cloud.mongodb.com/v2/653e156c7bd592646a7bc091#/clusters/connect?clusterId=notes-app-cluster0
- https://mongoosejs.com/docs/connections.html
