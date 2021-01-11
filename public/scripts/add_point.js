/*global $, google, document, window*/

$(() => {
  // Adds a marker to the map.
  const addPoint = function (dbPoint, location, map) {
    const point = new google.maps.Marker({
      position: location,
      animation: google.maps.Animation.DROP,
      map: map,
    });
    point.addListener("click", () => {
      showMarkerInfo(dbPoint).open(window.googleMap, point);
    });
  };

  const createMarkerInfo = function (dbPoint) {
    return (
      '<div id="content">' +
      '<div id="markerInfo">' +
      "</div>" +
      `<h1 id="Heading" class="Heading">${dbPoint ? dbPoint.title : "New Point"}
      </h1>` +
      '<div id="bodyContent">' +
      `<p>${dbPoint ? dbPoint.description : "New Description"}</p>` +
      `<p>Rating: ${dbPoint ? dbPoint.rating : "0"}</p>` +
      `<img src = ${dbPoint ? dbPoint.image_url : ""}</img>` +
      "</div>" +
      "</div>"
    );
  };

  const showMarkerInfo = function (dbPoint) {
    return new google.maps.InfoWindow({
      content: createMarkerInfo(dbPoint),
    });
  };

  window.addPoint = addPoint;
});
