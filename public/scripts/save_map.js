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
          // if point exists update otherwise save new point
          if (point.dbPoint && point.dbPoint.id) {
            updatePoint(point);
            continue;
          } else {
            savePoint(point);
          }
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // save points to DB, makes sure map_id is a number
  const savePoint = function (pointData) {
    // You have to save point info otherwise save will fail
    console.log("Points saved to: ", Number(window.googleMap.mapID));
    $.ajax({
      url: "/api/points/",
      dataType: "text",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: {
        title: pointData.dbPoint.title,
        description: pointData.dbPoint.description,
        longitude: pointData.getPosition().lng(),
        latitude: pointData.getPosition().lat(),
        type: "point",
        rating: pointData.dbPoint.rating,
        map_id: Number(window.googleMap.mapID),
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // Update point in DB
  const updatePoint = function (pointData) {
    $.ajax({
      url: `/api/points/${pointData.dbPoint.id}`,
      dataType: "text",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: {
        title: pointData.dbPoint.title,
        description: pointData.dbPoint.description,
        type: pointData.dbPoint.type,
        rating: Number(pointData.dbPoint.rating),
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
