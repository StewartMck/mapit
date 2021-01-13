/*global $, window*/

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/maps/",
  }).then((mapsFromDB) => {
    const maps = mapsFromDB.maps;
    for (let map of maps) {
      // Makes a new cell in table with map_id as id & map name from DB
      $("#maps").append(`<td id='map_${map.id}'>${map.name}</td>`);
    }
    // make list of maps available globally
    window.mapsFromDB = maps;
  });
  //click listener on parent of map cells: table id="maps"
  $("#maps").click((event) => {
    // Match only numbers from id=map_xx & pass to load map function
    let mapID = event.target.id.match(/(\d+)/)[0];
    window.getMap(mapID);
  });
});
