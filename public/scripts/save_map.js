/*global $, google, document, window*/

$(() => {
  const getGoogleMap = function () {
    return {
      user_id: 1,
      name: window.prompt("Name Map", "test_map"),
      center_lat: window.googleMap.center.lat,
      center_long: window.googleMap.center.lng,
      zoom: window.googleMap.zoom,
      type: window.googleMap.mapTypeId,
    };
  };

  const saveMap = function (mapData) {
    $.ajax({
      url: "/api/maps/",
      dataType: "text",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: mapData,
    })
      .then(() => {
        for (let point of window.points) {
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

  const savePoints = function (pointData) {
    console.log(window.googleMap.MapID);
    $.ajax({
      url: "/api/points/",
      dataType: "text",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: {
        title: "test-point",
        description: "description",
        image_url: "",
        longitude: pointData.getPosition().lng(),
        latitude: pointData.getPosition().lat(),
        type: "point",
        rating: "0",
        map_id: Number(window.googleMap.MapID),
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  $("#save_map").click(() => {
    saveMap(getGoogleMap());
  });
});
