/*global $, window*/

// Define a global object to store all global variables
window.appVars = {};
$(() => {
  const getMaps = function () {
    $.ajax({
      method: "GET",
      url: "/api/maps/",
    })
      .then((mapsFromDB) => {
        const maps = mapsFromDB.maps;
        buildTable(maps);
        // make list of maps available globally
        window.mapsFromDB = maps;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateMapsDB = function () {
    $.ajax({
      method: "GET",
      url: "/api/maps/",
    })
      .then((mapsFromDB) => {
        // make list of maps available globally
        window.mapsFromDB = mapsFromDB.maps;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // starting point of app, gets all available maps from DB
  getMaps();

  const buildTable = function (maps) {
    for (let map of maps) {
      // Makes a new cell in table with map_id as id & map name from DB
      $("#maps").append(`<tr><td id='map_${map.id}'>${map.name}</td>
      ${
        window.appVars.userID
          ? `<td><button id='delete_${map.id}' type="submit " ${
              window.appVars.userID !== map.user_id ? "disabled" : ""
            }>Delete</button></td>`
          : ""
      }
      ${
        window.appVars.userID
          ? `<td><button id='favourite_${map.id}' type="submit ">Favourite</button></td>`
          : ""
      }
      </tr>`);
    }
  };

  //click listener on parent of map cells: table id="maps" for load map and delete
  $("#maps").click((event) => {
    let mapID = event.target.id.match(/(\d+)/)[0];

    if (event.target.id.includes("delete")) {
      $.ajax({
        method: "POST",
        url: `/api/maps/${mapID}/delete`,
      }).then(() => {
        updateMapsDB();
        $("#maps tr").remove();
        if ($(event.currentTarget).attr("class") === "profile") {
          $("#filter").trigger("change");
        } else {
          getMaps();
        }
      });
    } else if (event.target.id.includes("favourite")) {
      //if favourite_id exists, delete request using favourite id
      //otherwise add to favourites
      $.ajax({
        method: "POST",
        url: `/api/maps/favourites`,
      }).then(() => {
        updateMapsDB();
        $("#maps tr").remove();
        if ($(event.currentTarget).attr("class") === "profile") {
          $("#filter").trigger("change");
        } else {
          getMaps();
        }
      })
    } else {
      window.getMap(mapID);
    }





  });
  window.appVars.getMaps = getMaps;
  window.appVars.buildTable = buildTable;
});
