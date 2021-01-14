/*global $, window*/

$(() => {
  // drop down list listener
  $("#filter").on("change", (event) => {
    $.ajax({
      method: "GET",
      url: `/api/users/1`,
    }).then((userData) => {
      filterTable(userData.userData, event);
    });
  });

  const filterTable = function (userData, event) {
    const selectedOption = event.target.value;
    $("#maps tr").remove();

    switch (selectedOption) {
      case "all":
        for (let map of window.mapsFromDB) {
          $("#maps").append(`<tr><td id='map_${map.id}'>${map.name}</td>
          <td><button id='delete_${map.id}' type="submit">Delete</button></td></tr>`);
        }
        break;
      case "favourites":
        for (let map of userData.favourites) {
          console.log(map);
          $("#maps").append(`<tr><td id='map_${map.map_id}'>${map.name}</td>
          <td><button id='delete_${map.map_id}' type="submit">Delete</button></td></tr>`);
        }
        break;
      case "contributions":
        for (let map of userData.points) {
          console.log(map);
          $("#maps").append(`<tr><td id='map_${map.map_id}'>${map.name}</td>
          <td><button id='delete_${map.map_id}' type="submit">Delete</button></td></tr>`);
        }
        break;
    }
  };

  window.appVars.filterTable = filterTable;
});
