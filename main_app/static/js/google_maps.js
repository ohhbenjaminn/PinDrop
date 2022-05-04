// // Initialize and add the map
// console.log("PIZZAAAAAA!");

// google.maps.event.addListener(map, 'click', function(event) {
//   placeMarker(event.latLng);
// });

// function placeMarker(location) {
//    const marker = new google.maps.Marker({
//        position: location, 
//        map: map
//    });
// }

// lngEl = $('#id_lng')
// latEl = $('.#id_lat')

function initMap(marks) {
    let markDict = marks.split('}{')
    markDict[0] = markDict[0].replace('{','');
    markDict[markDict.length - 1] = markDict[markDict.length - 1].replace('}','');
    let list_marks = []
    for (let mark of markDict) {
      let markObj = mark.split(',')
      let obj_part = {}
      for (let item of markObj) {
        let key = item.split(': ')[0]
        let value = item.split(': ')[1]
        obj_part[key] = value
      }
      list_marks.push(obj_part)
    }
    console.log(list_marks)
    const uluru = { lat: -25.344, lng: 131.031 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
    map.addListener("click", (event) => {
      const marker = new google.maps.Marker({
        position: event.latLng, 
        map: map
    });
    })
  }


  
  function getMarkers() {
    $.ajax({
      url: "/events/json",
      type: "GET",
      success: function(data) {
        let x = JSON.stringify(data);
        x = JSON.parse(x);
        initMap(x)
      },
      error: function(error) {
        console.log( `Error ${error}`);
      }
    });
  }

  
  

  window.initMap = getMarkers;
  