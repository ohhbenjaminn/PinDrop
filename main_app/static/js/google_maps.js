function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function formatMarkers(marks) {
  let markDict = marks.split('}{')
  markDict[0] = markDict[0].replace('{','');
  markDict[markDict.length - 1] = markDict[markDict.length - 1].replace('}','');
  let list_marks = []
  for (let mark of markDict) {
    let markObj = mark.split(', \'')
    let obj_part = {}
    for (let item of markObj) {
      let key = item.split(': ')[0].replace('\'', '')
      key = key.replace('\'','')
      let value = item.split(': ')[1].replace('\'', '')
      value = value.replace('\'','')
      obj_part[key] = value
    }
    list_marks.push(obj_part)
  }
  return list_marks
}


function initMap(marks) {
    let markerList = formatMarkers(marks)
    const veniceBeach = { lat: 34.003052, lng: -118.483971 };
    // The map, center it on Venice Beach for now, later this will be user's home
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: veniceBeach,
    });
    // make markers
    markerList.forEach(function (markerIngredients) {
      console.log(markerIngredients)
      const marker = new google.maps.Marker({
        position: {lat: parseFloat(markerIngredients.lat), lng: parseFloat(markerIngredients.lng)},
        map: map,
      });
    })
    map.addListener("click", (event) => {
      const marker = new google.maps.Marker({
        position: event.latLng, 
        map: map
      });
      // get createview....
      let locData = {lat: event.latLng.lat(), lng: event.latLng.lng()}
      window.location.href = `/events/create/?lat=${locData.lat}&lng=${locData.lng}`

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
  