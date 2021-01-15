/*global $, window*/

$(() => {
  // drop down list listener
  $("#filter").on("change", (event) => {
    $.ajax({
      method: "GET",
      url: `/api/users/${window.appVars.userID}`,
    })
      .then((userData) => {
        filterTable(userData.userData, event);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const filterTable = function (userData, event) {
    const selectedOption = event.target.value;
    $("#maps tr").remove();

    switch (selectedOption) {
      case "all":
        window.appVars.buildTable(window.mapsFromDB);
        break;
      case "favourites":
        window.appVars.buildTable(userData.favourites);
        break;
      case "contributions":
        window.appVars.buildTable(userData.points);
        break;
    }
  };

  window.appVars.filterTable = filterTable;
});
