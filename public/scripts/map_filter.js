/*global $, window*/

$(() => {
  // click event for id='save_map' button
  $("#filter").click(() => {
    $.ajax({
      method: "GET",
      url: "/api/users/1",
    }).then((data) => {
      console.log(data);
    });
  });
});
