// ROOT
GET /                               	// Welcome Page

// USERS
GET /users/user:id                 		//PROFILE: LIST OF MAPS, CONTRIBUTIONS, FAVOURITES

// MAPS
GET /maps/:id                       	//A specific MAP

POST /maps                         	  //create new map
POST /maps/:id/delete               	//delete map

// POINTS
POST /maps/:id/points              	 //Add points on map
POST /maps/:id/points/:id            //Edit points on map
POST /maps/:id/points/:id/delete     //Edit points on map


B
R 
E 
A 
D 
