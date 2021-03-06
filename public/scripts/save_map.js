/*global $, window*/

$(() => {
  // Gets the info of the googleMaps obj and will export as mapData
  const getGoogleMap = function () {
    return {
      //setting user_id to mapUserId
      user_id: window.googleMap.mapUserID || window.appVars.userID,
      name: $("#title").text(),
      center_lat: window.googleMap.center.lat,
      center_long: window.googleMap.center.lng,
      zoom: window.googleMap.zoom,
      type: window.googleMap.mapTypeId,
    };
  };

  // saves map to DB and then saves the points found in a global points array. If point matches an id in DB don't save again
  const saveMap = function (mapData) {
    // if googleMap has userCreated = true then save map else update
    const isUserCreated = window.googleMap.userCreated;
    const params = {
      url: isUserCreated ? "/api/maps/" : `/api/maps/${window.googleMap.mapID}`,
      dataType: "text",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: mapData,
    };

    $.ajax(params)
      .then(() => {
        for (let point of Object.values(window.points)) {
          // if point exists update otherwise save new point
          if (point.dbPoint.id) {
            updatePoint(point);
          } else {
            savePoint(point);
          }
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // save points to DB, makes sure map_id is a number
  const savePoint = function (pointData) {
    // You have to save point info otherwise save will fail

    $.ajax({
      url: "/api/points/",
      dataType: "text",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: {
        title: pointData.dbPoint.title,
        description: pointData.dbPoint.description,
        longitude: pointData.getPosition().lng(),
        latitude: pointData.getPosition().lat(),
        type: "point",
        rating: pointData.dbPoint.rating,
        map_id: Number(window.googleMap.mapID),
        user_id: window.appVars.userID,
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // Update point in DB
  const updatePoint = function (pointData) {
    $.ajax({
      url: `/api/points/${pointData.dbPoint.id}`,
      dataType: "text",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: {
        title: pointData.dbPoint.title,
        description: pointData.dbPoint.description,
        type: pointData.dbPoint.type,
        rating: Number(pointData.dbPoint.rating),
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // click event for id='save_map' button
  $("#save_map").click(() => {
    saveMap(getGoogleMap());
    $("#maps tr").remove();
    $.ajax({
      method: "GET",
      url: "/api/maps/",
    }).then(() => {
      window.appVars.getMaps();
    });
  });
});
