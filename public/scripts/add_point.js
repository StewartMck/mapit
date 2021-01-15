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

    // every point has an id and is passed into the showMarkerInfo when right click
    point.addListener("rightclick", () => {
      showMarkerInfo(dbPoint, point.id);

      window.infoWindow.open(window.googleMap, point);
    });
  };

  const populateMarkerInfo = function (dbPoint, pointNumber) {
    return (
      '<div id="pointInfo" style="display:grid, align-content:space-evenly,grid-template-columns: auto auto auto, grid-gap:10x, padding:10px">' +
      `<h2 id="point_title" class="Heading" contenteditable='true'>${
        dbPoint.title ? dbPoint.title : "New Point"
      } </h2>` +
      `<h3 id="point_description" contenteditable='true'>${
        dbPoint.description ? dbPoint.description : "New Description"
      }</h3>` +
      (dbPoint.latitude
        ? `<h4>LAT: ${dbPoint.latitude} LONG: ${dbPoint.longitude} </h4>`
        : "") +
      '<label for="rating">Rating:</label>' +
      `<input id="point_rating" type="number" min="0" step="1" max="5"` +
      (window.appVars.userID ? "" : " disabled") +
      `value=${dbPoint.rating ? dbPoint.rating : "0"}>` +
      `<button id='save_marker' data-id="${pointNumber}" ` +
      (window.appVars.userID ? "" : "disabled") +
      `>SAVE</button>` +
      `<button id='delete_marker' data-id="${pointNumber}" ` +
      (window.appVars.userID ? "" : "disabled") +
      `>DELETE</button>` +
      "</div>"
    );
  };

  const showMarkerInfo = function (dbPoint, pointNumber) {
    return window.infoWindow.setContent(
      populateMarkerInfo(dbPoint, pointNumber)
    );
  };

  const savePointInfo = function (event) {
    // gets the point from the save button
    const pointNumber = $(event.target.parentElement)
      .find("#save_marker")
      .attr("data-id");

    // populates the dbPoint object on the point with data from the info window
    window.points[pointNumber].dbPoint.title = $(event.target.parentElement)
      .find("#point_title")
      .text();
    window.points[pointNumber].dbPoint.description = $(
      event.target.parentElement
    )
      .find("#point_description")
      .text();
    window.points[pointNumber].dbPoint.rating = $(event.target.parentElement)
      .find("#point_rating")
      .val();

    window.infoWindow.close();
  };

  window.addPoint = addPoint;
  window.savePointInfo = savePointInfo;
});
