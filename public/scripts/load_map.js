/*global $, google, document, window*/

$(() => {
  const htmlElement = "map";
  const mapID = 9;

  const initMap = function (options) {
    const map = new google.maps.Map(
      document.getElementById(htmlElement),
      options
    );
    // creating a new Point (null is passed in because there is no db entry)
    map.addListener("click", (event) => {
      window.addPoint(null, event.latLng, map);
    });
    return map;
  };

  const showPoint = function (dbPoint, googleMap) {
    // const marker = new google.maps.Marker({
    //   position: new google.maps.LatLng(point.latitude, point.longitude),
    //   map: googleMap,
    //   animation: google.maps.Animation.DROP,
    //   title: point.title,
    // });
    // add marker function
    window.addPoint(
      dbPoint,
      new google.maps.LatLng(dbPoint.latitude, dbPoint.longitude),
      googleMap
    );
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
        const dbMap = response.maps[0];
        const googleMap = initMap({
          center: new google.maps.LatLng(dbMap.center_lat, dbMap.center_long),
          zoom: dbMap.zoom,
          mapTypeId: dbMap.type,
        });
        // make map available globally
        window.googleMap = googleMap;
        getPoints(googleMap, mapID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getMap(mapID);
});
