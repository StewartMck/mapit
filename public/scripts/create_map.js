/*global $, google, document, window, navigator*/

$(() => {
  const htmlElement = "map";

  // creates a map based on user geolocation or default
  const initMap = function (options) {
    const map = new google.maps.Map(
      document.getElementById(htmlElement),
      options
    );
    // creating a new Point (null is passed in because there is no db entry)
    map.addListener("click", (event) => {
      window.addPoint(null, event.latLng, map);
    });
    // make map available globally
    window.googleMap = map;
    console.log("NEW MAP: Current mapID", window.googleMap.mapID);
    return map;
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
    const homeCoords = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    initMap({
      center: homeCoords,
      zoom: 16,
      mapTypeId: "roadmap",
      mapID: window.mapsFromDB[window.mapsFromDB.length - 1]["id"] + 1,
    });
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition(homeCoords);
    infoWindow.setContent("You are here.");
    infoWindow.open(window.googleMap);
  };

  // default map when user does not have location: 'boneyard'
  const buildDefaultMap = function () {
    initMap({
      center: new google.maps.LatLng(32.155573819618716, -110.82893675561328),
      zoom: 16,
      mapTypeId: "satellite",
      mapID: window.mapsFromDB[window.mapsFromDB.length - 1]["id"] + 1,
    });
  };

  // click event for create_map button
  $("#create_map").click(() => {
    getGeoLocation();
  });
});

// const newMapID = window.mapsFromDB[window.mapsFromDB.length - 1]["id"] + 1;
