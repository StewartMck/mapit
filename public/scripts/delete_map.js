


// $(() => {
//   $.ajax({
//     method: "POST",
//     url: "/api/maps/:map_id/delete"
//   }).then((mapsFromDB) => {
//     const maps = mapsFromDB.maps;
//     for (let map of maps) {
//       // Makes a new cell in table with map_id as id & map name from DB
//       $("#maps").append(`<tr><td id='map_${map.id}'>${map.name}</td><tr>`);
//     }
//     // make list of maps available globally
//     window.mapsFromDB = maps;
//   })

//   $()

// })


// $("#delete")

// const deleteMap(mapId) => {
//   $.ajax({
//     method: "POST",
//     url: `/api/maps/${mapId}/delete`
//   }).then((mapsFromDB) => {
//     const maps = mapsFromDB.maps;
//     for (let map of maps) {
//       // Makes a new cell in table with map_id as id & map name from DB
//       $("#maps").append(`<tr><td id='map_${map.id}'>${map.name}</td><tr>`);
//     }
//     window.mapsFromDB = maps;
//   })

// }
