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
      value = value.replace('datetime.datetime(','')
      obj_part[key] = value
    }
    list_marks.push(obj_part)
  }
  return list_marks
}

function formatInfoWindowContent(markerIngredients) {

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

      // reference for markerIngredients vv
      // id: '15
      // user: '2'
      // name: 'Joe Testdata'
      // location: 'A Description'
      // event_time: 'datetime.datetime(2020, 5, 3, 0, 0....
      // time create: 'datetime.datetime(2020, 5, 3, 0, 0....
      // lat: "-17.077762075345877"
      // lng: "128.7755974946022"

      //test infowindow....
      const infoWindow = new google.maps.InfoWindow({
        content : `
        <h3> ${ markerIngredients.name }  </h3>
        <p>location: ${ markerIngredients.location }</p>
        <p>event date: ${ markerIngredients.event_date }</p>
        <p>event time: ${ markerIngredients.event_time }</p>
        <p>details: ${ markerIngredients.details }</p>
        <a href="/events/${markerIngredients.id}/">Edit</a>`
      })


      marker.addListener('mouseup', (event) => {
        //add onclick behavior to marker 
        if (event.domEvent.which === 1) {
          // open infowindow test....
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        }
        if( mapEl.classList.contains('logged-in')) {
          if (event.domEvent.which === 3) {
            // Delete endpoint: 'events/<int:pk>/delete/'
            window.location.href = `/events/${markerIngredients.id}/delete/`
          }
        }
      })
    })
    const mapEl = document.getElementById("map");
    if( mapEl.classList.contains('logged-in')) {
      map.addListener("click", (event) => {
        const marker = new google.maps.Marker({
          position: event.latLng, 
          map: map
        });
        // get createview.....
        let locData = {lat: event.latLng.lat(), lng: event.latLng.lng()}
        window.location.href = `/events/create/?lat=${locData.lat}&lng=${locData.lng}`
  
      })
    }

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
  