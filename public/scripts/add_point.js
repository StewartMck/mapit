/*global $, google, document, window*/

$(() => {
  const points = [];
  // Adds a marker to the map & attached the dbPoint Object so that it can be used later.
  const addPoint = function (dbPoint, location, map) {
    const point = new google.maps.Marker({
      position: location,
      animation: google.maps.Animation.DROP,
      map: map,
      dbPoint: dbPoint,
    });
    point.addListener("click", () => {
      showMarkerInfo(dbPoint).open(window.googleMap, point);
    });
    points.push(point);
    window.points = points;
  };

  const populateMarkerInfo = function (dbPoint) {
    return (
      '<div id="content">' +
      '<div id="markerInfo">' +
      "</div>" +
      `<h1 id="Heading" class="Heading" contenteditable='true'>${
        dbPoint ? dbPoint.title : "New Point"
      }
      </h1>` +
      '<div id="bodyContent">' +
      `<p contenteditable='true'>${
        dbPoint ? dbPoint.description : "New Description"
      }</p>` +
      `<p>Rating: ${dbPoint ? dbPoint.rating : "0"}</p>` +
      "<btn>SAVE</btn>" +
      "<btn>DELETE</btn>" +
      "</div>" +
      "</div>"
    );
  };

  const showMarkerInfo = function (dbPoint) {
    return new google.maps.InfoWindow({
      content: populateMarkerInfo(dbPoint),
    });
  };

  window.addPoint = addPoint;
});
