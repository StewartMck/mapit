/*global $, google, window, navigator*/

$(() => {
  // creates a map based on user geolocation or default
  const initMap = function (options) {
    return window.initMap(options);
  };

  // navigator api takes in success, error, options
  // if success buildUserMap, otherwise console log error and buildDefault, else buildDefaultMap with timeout of 60 sec
  const getGeoLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        buildUserMap,
        (error) => {
          console.log(error);
          buildDefaultMap();
        },
        { timeout: 60000 }
      );
    } else {
      buildDefaultMap();
    }
  };

  // builds a map & centers around user location with temporary marker
  /* mapID = checks global maps obj (app.js) for last id and uses the next one as the new maps id */
  const buildUserMap = function (position) {
    getNextMapID().then((mapID) => {
      console.log("mapID to use", mapID);
      const homeCoords = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      initMap({
        center: homeCoords,
        zoom: 16,
        mapTypeId: "roadmap",
        mapID: mapID ? mapID : 1,
      });
      console.log("NEW MAP: Current mapID", window.googleMap.mapID);
      const infoWindow = new google.maps.InfoWindow();
      infoWindow.setPosition(homeCoords);
      infoWindow.setContent("You are here.");
      infoWindow.open(window.googleMap);
    });
  };

  // default map when user does not have location: 'boneyard'
  const buildDefaultMap = function () {
    getNextMapID().then((mapID) => {
      console.log("mapID to use", mapID);
      initMap({
        center: new google.maps.LatLng(32.155573819618716, -110.82893675561328),
        zoom: 16,
        mapTypeId: "satellite",
        mapID: mapID ? mapID : 1,
      });
    });
  };

  const getNextMapID = function () {
    return $.ajax({
      method: "GET",
      url: "/api/maps/latest/map",
    })
      .then((latestMapID) => {
        return latestMapID.maps.id + 1;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // click event for create_map button
  $("#create_map").click(() => {
    getGeoLocation();
  });
});
