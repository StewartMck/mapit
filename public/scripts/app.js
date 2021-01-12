$(() => {
  $.ajax({
    method: "GET",
    url: "/api/maps/",
  }).then((response) => {
    const maps = response.maps;
    for (let map of maps) {
      $("#maps").append(`<td id='map_${map.id}'>${map.name}</td>`);
    }
  });
  //click listener on parent of maps table
  $("#maps").click((event) => {
    // Match only numbers from id=map_xx & pass to load map function
    let mapID = event.target.id.match(/(\d+)/)[0];
    window.getMap(mapID);
  });
});
