/*global $, window*/

$(() => {
  // Gets the info of the googleMaps obj and will export as mapData
  const getGoogleMap = function () {
    return {
      // need to change user_id from hard-coded
      user_id: 1,
      name: window.prompt(
        "Name Map, cancel to save to existing map",
        "test_map"
      ),
      center_lat: window.googleMap.center.lat,
      center_long: window.googleMap.center.lng,
      zoom: window.googleMap.zoom,
      type: window.googleMap.mapTypeId,
    };
  };

  // saves map to DB and then saves the points found in a global points array. If point matches an id in DB don't save again
  const saveMap = function (mapData) {
    $.ajax({
      url: "/api/maps/",
      dataType: "text",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: mapData,
    })
      .then(() => {
        for (let point of Object.values(window.points)) {
          console.log("points from object", point);
          if (point.dbPoint) {
            continue;
          } else {
            savePoints(point);
          }
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // save points to DB, makes sure map_id is a number
  const savePoints = function (pointData) {
    $.ajax({
      url: "/api/points/",
      dataType: "text",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: {
        title: "test-point",
        description: "description",
        longitude: pointData.getPosition().lng(),
        latitude: pointData.getPosition().lat(),
        type: "point",
        rating: "0",
        map_id: Number(window.googleMap.mapID),
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // click event for id='save_map' button
  $("#save_map").click(() => {
    saveMap(getGoogleMap());
  });
});
