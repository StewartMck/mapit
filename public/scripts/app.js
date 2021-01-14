/*global $, window*/
window.appVars = {};
$(() => {
  console.log(window);
  $.ajax({
    method: "GET",
    url: "/api/maps/",
  })
    .then((mapsFromDB) => {
      const maps = mapsFromDB.maps;

      console.log($("input").val());

      //checking if we're on the landing page
      //dont render delete button if we're on landing page
      if ($("input").val()) {
        for (let map of maps) {
          // Makes a new cell in table with map_id as id & map name from DB
          $("#maps").append(`<tr><td id='map_${map.id}'>${map.name}</td>
        <td><button id='delete_${map.id}' type="submit">Delete</button></td></tr>`);
        }
        // make list of maps available globally
        window.mapsFromDB = maps;
      } else {
        for (let map of maps) {
          // Makes a new cell in table with map_id as id & map name from DB
          $("#maps").append(`<tr><td id='map_${map.id}'>${map.name}</td></tr>`);
        }
        // make list of maps available globally
        window.mapsFromDB = maps;
      }
    })
    .then((mapsFromDB) => {
      const maps = mapsFromDB.maps;
      for (let map of maps) {
        // Makes a new cell in table with map_id as id & map name from DB
        $("#maps").append(`<tr><td id='map_${map.id}'>${map.name}</td>
      <td><button id='delete_${map.id}' type="submit">Delete</button></td></tr>`);
      }
      // make list of maps available globally
      window.mapsFromDB = maps;
    })
    .catch((err) => {
      console.log(err);
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
    //possible issue here
    window.getMap(mapID);
  });

  $("#filter").on("change", function () {
    let selectedOption = $(this).val();

    //uncomment remove() to reset table before repopulating
    switch (selectedOption) {
      case "all":
        // $("#maps tr").remove();
        console.log(selectedOption);
        break;
      case "favourites":
        // $("#maps tr").remove();
        console.log(selectedOption);

        break;
      case "contributions":
        // $("#maps tr").remove();
        console.log(selectedOption);

        break;
    }
  });
});
