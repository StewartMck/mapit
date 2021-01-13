/*global $, window*/

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/maps/",
  }).then((mapsFromDB) => {
    const maps = mapsFromDB.maps;
    for (let map of maps) {
      // Makes a new cell in table with map_id as id & map name from DB
      $("#maps").append(`<tr><td id='map_${map.id}'>${map.name}</td>
      <td><button id='delete_${map.id}' type="submit">Delete</button></td></tr>`);
    }
    // make list of maps available globally
    window.mapsFromDB = maps;
  });
  //click listener on parent of map cells: table id="maps"
  $("#maps").click((event) => {
    // Match only numbers from id=map_xx & pass to load map function
    let mapID = event.target.id.match(/(\d+)/)[0];

    if (event.target.id.includes("delete")) {
      $.ajax({
        method: "POST",
        url: `/api/maps/${mapID}/delete`,
      }).then((deletedMap) => {
        $("#maps tr").remove();
        $.ajax({
          method: "GET",
          url: "/api/maps/",
        }).then((mapsFromDB) => {
          const maps = mapsFromDB.maps;
          for (let map of maps) {
            // Makes a new cell in table with map_id as id & map name from DB
            $("#maps").append(`<tr><td id='map_${map.id}'>${map.name}</td>
            <td><button id='delete_${map.id}' type="submit">Delete</button></td></tr>`);
          }
          // make list of maps available globally
          window.mapsFromDB = maps;
        });
      });
    }

    // console.log(mapID)
    window.getMap(mapID);
  });
});
