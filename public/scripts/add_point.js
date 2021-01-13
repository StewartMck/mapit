/*global $, google, window*/

$(() => {
  // Adds a marker to the map & attached the dbPoint Object so that it can be used later.
  const addPoint = function (dbPoint, location, map) {
    window.counter++;
    const point = new google.maps.Marker({
      position: location,
      animation: google.maps.Animation.DROP,
      map: map,
      dbPoint: dbPoint,
      id: window.counter,
    });

    window.points[window.counter] = point;

    console.log("points:", window.points);
    console.log("point:", point);

    // every point has an id and is passed into the showMarkerInfo when right click
    point.addListener("rightclick", () => {
      showMarkerInfo(dbPoint, point.id);

      window.infoWindow.open(window.googleMap, point);
    });
  };

  const populateMarkerInfo = function (dbPoint, pointNumber) {
    return (
      '<div id="content">' +
      '<div id="markerInfo">' +
      "</div>" +
      `<h2 id="Heading" class="Heading" contenteditable='true'>${
        dbPoint ? dbPoint.title : "New Point"
      }
      </h2>` +
      '<div id="bodyContent">' +
      `<h3 contenteditable='true'>${
        dbPoint ? dbPoint.description : "New Description"
      }</h3>` +
      '<label for="rating">Rating:</label>' +
      `<input id="rating" type="number" min="0" step="1" max="5" value=${
        dbPoint ? dbPoint.rating : "0"
      }>` +
      `<button id='save_marker' data-id="${pointNumber}">SAVE</button>` +
      `<button id='delete_marker' data-id="${pointNumber}">DELETE</button>` +
      "</div>" +
      "</div>"
    );
  };

  const showMarkerInfo = function (dbPoint, pointNumber) {
    return window.infoWindow.setContent(
      populateMarkerInfo(dbPoint, pointNumber)
    );
  };

  window.addPoint = addPoint;
});
