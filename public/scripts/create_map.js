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
    return map;
  };

  // navigator api takes in success, error, options
  // if success buildUserMap, otherwise console log error, else buildDefaultMap with timeout of 60 sec
  const getGeoLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        buildUserMap,
        (error) => {
          console.log(error);
        },
        { timeout: 60000 }
      );
    } else {
      buildDefaultMap();
    }
  };

  // builds a map & centers around user location with temporary marker
  const buildUserMap = function (position) {
    const homeCoords = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    initMap({
      center: homeCoords,
      zoom: 16,
      mapTypeId: "roadmap",
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
      zoom: 13,
      mapTypeId: "satellite",
    });
  };

  // click event for create_map button
  $("#create_map").click(() => {
    getGeoLocation();
  });
});
