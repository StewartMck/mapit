/*global $, window*/

$(() => {
  const deletePoint = function (pointNumber) {
    const point = window.points[pointNumber];
    console.log("deleting point:", pointNumber);
    // removes point from map and deletes from the object that stores all the points
    point.setMap(null);
    delete window.points[pointNumber];

    // if point is present in database delete it there also
    if (point.dbPoint.id) {
      $.ajax({
        method: "POST",
        url: `/api/points/${point.dbPoint.id}/delete`
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  window.deletePoint = deletePoint;
});
