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

    const input = document.getElementById("pac-input");
    if (window.appVars.userID) {
      autoComplete(input, map);
    }

    // creating a new Point (empty {} is passed in because there is no db entry)
    map.addListener("click", (event) => {
      window.addPoint({}, event.latLng, map);
    });
    window.infoWindow = new google.maps.InfoWindow();

    // event listeners for point info window
    google.maps.event.addListener(window.infoWindow, "domready", () => {
      const deletePoint = document.getElementById("delete_marker");
      deletePoint.onclick = () => {
        window.deletePoint(parseInt(deletePoint.getAttribute("data-id")));
      };
      const savePoint = document.getElementById("save_marker");
      savePoint.onclick = (event) => {
        window.savePointInfo(event);
      };
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
    $.ajax({
      url: `/api/maps/${mapID}`,
      method: "GET",
    })
      .then((response) => {
        const dbMap = response.maps[0];
        $("#title").text(dbMap.name);
        const googleMap = initMap({
          center: new google.maps.LatLng(dbMap.center_lat, dbMap.center_long),
          zoom: dbMap.zoom,
          mapTypeId: dbMap.type,
          // attaches mapID & name to googleMap obj for use in app
          mapID: mapID,
          name: dbMap.name,
          //attach user_id to googleMAP obj for save_map
          mapUserId: dbMap.user_id,
        });

        getPoints(googleMap, mapID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const autoComplete = function (input, map) {
    const autocomplete = new google.maps.places.Autocomplete(input);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
      map.setZoom(21);
      $(input).val("");
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
      }
    });
  };

  window.getMap = getMap;
});
