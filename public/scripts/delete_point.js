/*global $, google, document, window*/

$(() => {
  const deletePoint = function (pointNumber) {
    console.log("deleting point:", pointNumber);

    window.points[pointNumber].setMap(null);
    delete window.points[pointNumber];
  };

  window.deletePoint = deletePoint;
});
