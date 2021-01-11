/*global $, google, document, window*/

$(() => {
  const getGoogleMap = function () {
    console.log(window.googleMap);
    return {
      user_id: 1,
      name: "test-map",
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
      .then(() => {})
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  $("#save_map").click(() => {
    saveMap(getGoogleMap());
  });
});
