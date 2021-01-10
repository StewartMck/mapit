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
READ | GET | /users/:email | PROFILE: LIST OF MAPS, CONTRIBUTIONS, FAVOURITES

**MAPS**
BREAD | Type | Route | Description
------|------|------|------|
BROWSE | GET | /maps/  | Show all maps
READ | GET | /maps/:map_id  | Show a specific map
ADD | POST | /maps/  | Create a new map
DELETE | POST | /maps/:map_id/delete   | Delete map

**POINTS**
BREAD | Type | Route | Description
------|------|------|------|
BROWSE | GET |  /points/:map_id  | Show all points on a map
ADD | POST |  /points/  | Add points to a map
EDIT | POST | /points/:id | Edit a point on a map
DELETE | POST |/points/:point_id/delete   | Delete point from a map

**COMMENTS**
BREAD | Type | Route | Description
------|------|------|------|
BROWSE | GET |  /comments/:point_id  | Show all comments for a point
ADD | POST |  /comments/  | Add comments to a point
EDIT | POST | /comments/:id | Edit a comment for a point
DELETE | POST |/comments/:point_id/delete   | Delete a comment from a point
