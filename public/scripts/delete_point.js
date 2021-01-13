/*global $, window*/

$(() => {
  const deletePoint = function (pointNumber) {
    const point = window.points[pointNumber];
    console.log("deleting point:", pointNumber);

    point.setMap(null);
    delete window.points[pointNumber];
    if (point.dbPoint) {
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
