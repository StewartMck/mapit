/*global $, google, document*/

$(() => {
  const htmlElement = "map";
  const mapID = 9;

  const initMap = function (options) {
    return new google.maps.Map(document.getElementById(htmlElement), options);
  };

  const showPoint = function (point, googleMap) {
    console.log("point", point);
    console.log("googleMap", googleMap);
    new google.maps.Marker({
      position: new google.maps.LatLng(point.latitude, point.longitude),
      map: googleMap,
      title: "my point",
    });
  };

  const getPoints = function (googleMap, mapID) {
    $.ajax({
      url: `/api/points/${mapID}`,
      method: "GET",
    })
      .then((response) => {
        const points = response.points;
        for (let point of points) {
          showPoint(point, googleMap);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMap = function (mapID) {
    $.ajax({
      url: `/api/maps/${mapID}`,
      method: "GET",
    })
      .then((response) => {
        const map = response.maps[0];
        const googleMap = initMap({
          center: new google.maps.LatLng(map.center_lat, map.center_long),
          zoom: map.zoom,
          mapTypeID: map.type,
        });
        getPoints(googleMap, mapID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getMap(mapID);
});
