// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
  // The location of méxico
  var méxico = {lat: 24.8186288, lng: -101.9745723};
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 5, center: méxico});
  // The marker, positioned at méxico
}


var map, infoWindow;
function showMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 16
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Aquí estas.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
} 

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: Tu localizacion no se pudo obtener.' :
    'Error: Tu navegador no soporta Geolocalización');
  infoWindow.open(map);
}

document.querySelector('#buton-get-data').addEventListener('click', getData());
function getData(){
  const xhttp = new XMLHttpRequest()
  xhttp.open('GET', 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=krispy+kreme&key=AIzaSyBVjrMeEdZKP6eHH012MmiibnhMk1SEEA8#', true);
  xhttp.send();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      // console.log(this.responseText);
      let data = JSON.parse(this.responseText);
      // console.log(data);
      let res = document.querySelector('#krispy')
      res.innerHTML = ''

      for(let item of data){
        res.innerHTML += ` 
        <div class="card-header" id="nameKrispy"${item.formatted_address}</div>
        `
      }
    }
  }
}