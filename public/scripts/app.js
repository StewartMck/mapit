/*global $, window*/
window.appVars = {};
$(() => {
  const getMaps = function () {
    $.ajax({
      method: "GET",
      url: "/api/maps/",
    })
      .then((mapsFromDB) => {
        if (window.appVars.userID) {
          updateUser();
        }
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

  const updateUser = function () {
    $.ajax({
      method: "GET",
      url: `/api/users/${window.appVars.userID}`,
    })
      .then((userData) => {
        // use jquery to merge 2 objects
        $.extend(window.appVars, userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // starting point of app, gets all available maps from DB
  getMaps();

  const buildTable = function (maps) {
    for (let map of maps) {
      // Makes a new row in table with map_id as id & map name from DB
      $("#maps").append(`<tr><td id='map_${map.id}'>${map.name}</td>
      ${
        window.appVars.userID
          ? `<td><button id='delete_${map.id}' class="btn" type="submit " ${
              window.appVars.userID !== map.user_id ? "disabled" : ""
            }><i class="fa fa-trash"></i></button></td>`
          : ""
      }
      ${
        window.appVars.userID
          ? `<td><button id='favourite_${map.id}' class="btn" type="submit "><i class="fas fa-plus-circle"></i></button></td>`
          : ""
      }
      </tr>`);
    }
  };

  //click listener on parent of map cells: table id="maps" for load map and delete
  $("#maps").click((event) => {
    let mapID = Number(event.target.id.match(/(\d+)/)[0]);

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
      const favourites = window.appVars.userData.favourites;
      let isFound = false;
      for (const fav of favourites) {
        if (fav.id === mapID) {
          isFound = true;
          break;
        }
      }
      let url =
        `/api/favourites/` +
        (isFound
          ? `${window.appVars.userID}/delete`
          : `${window.appVars.userID}`);

      $.ajax({
        url: url,
        dataType: "text",
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: { mapID },
      })
        .then(() => {
          updateUser();
          updateMapsDB();
          $("#maps tr").remove();
          if ($(event.currentTarget).attr("class") === "profile") {
            $("#filter").trigger("change");
          } else {
            getMaps();
          }
        })
        .catch((e) => console.log(e));
    } else {
      window.getMap(mapID);
    }
  });
  window.appVars.getMaps = getMaps;
  window.appVars.buildTable = buildTable;
});
