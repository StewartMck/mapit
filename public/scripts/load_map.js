/*global $, google, document, window*/

$(() => {
  const htmlElement = "map";

  // creates a map
  const initMap = function (options) {
    // clear points in mem otherwise points from previous session will be save to current map
    if (window.points) {
      window.points = {};
      window.counter = 0;
    } else {
      const points = {};
      let counter = 0;
      window.points = points;
      window.counter = counter;
    }

    const map = new google.maps.Map(
      document.getElementById(htmlElement),
      options
    );
    // creating a new Point (empty {} is passed in because there is no db entry)
    map.addListener("click", (event) => {
      window.addPoint({}, event.latLng, map);
    });
    window.infoWindow = new google.maps.InfoWindow();

    // event listeners for point info window
    google.maps.event.addListener(window.infoWindow, "domready", () => {
      const deletePoint = document.getElementById("delete_marker");
      deletePoint.onclick = (event) => {
        window.deletePoint(parseInt(deletePoint.getAttribute("data-id")));
      };
      const savePoint = document.getElementById("save_marker");
      savePoint.onclick = (event) => {
        window.savePointInfo(event);
      };
    });
    map.addListener("bounds_changed", () => {
      console.log("bounds changed");
    });
    // make map available globally
    window.googleMap = map;
    return map;
  };

  window.initMap = initMap;

  // populates the maps with points from the DB
  const showPoint = function (dbPoint, googleMap) {
    window.addPoint(
      dbPoint,
      new google.maps.LatLng(dbPoint.latitude, dbPoint.longitude),
      googleMap
    );
  };

  // gets points from DB using the MAP ID
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

  // Gets the Map using MAP ID and calls the initMap (create map) function with values from DB
  const getMap = function (mapID) {
    console.log("in getmap:", window.appVars.UserID);
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
          // attaches mapID & name to googleMap obj for use in app
          mapID: mapID,
          name: dbMap.name,
        });

        console.log("Current mapID", mapID);
        getPoints(googleMap, mapID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createSearchBar = function (map) {
    // console.log("input:", $("#pac-input"));
    // const input = $("#pac-input");
    // const searchBox = new google.maps.places.SearchBox(input);
    // console.log(map);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // map.addListener("places-changed", () => {
    //   const places = searchBox.getPlaces();
    // });
  };

  window.getMap = getMap;
});
