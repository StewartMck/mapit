### RESTful
* Naming convention for routes
* Representational state transfer
* Routes represent the underlying data structure

BREAD | HTTP Verb| Route
---- | ---- | ---- 
BROWSE | GET | /resource
READ | GET | /resource/:id
EDIT | POST | /resource/:id
ADD | POST | /resource
DELETE | POST | /resource/:id/delete


------------------------------------
### Project Routes

**ROOT**
BREAD | Type | Route | Description
------|------|------|------|
BROWSE | GET | /  | Welcome Page

**USERS**
BREAD | Type | Route | Description
------|------|------|------|
READ | GET | /users/user:id  | PROFILE: LIST OF MAPS, CONTRIBUTIONS, FAVOURITES

**MAPS**
BREAD | Type | Route | Description
------|------|------|------|
BROWSE | GET | /maps  | Show all maps
READ | GET | /maps/:id  | Show a specific map
ADD | POST | /maps  | Create a new map
DELETE | POST | /maps/:id/delete   | Delete map

**POINTS**
BREAD | Type | Route | Description
------|------|------|------|
BROWSE | GET |  /points  | Show all points on a map
ADD | POST |  /points  | Add points to a map
EDIT | POST | /points/:id | Edit a point on a map
DELETE | POST |/points/:id/delete   | Delete point from a map
