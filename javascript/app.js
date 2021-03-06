var boton = document.querySelector('.buscar');
var inputValor = document.querySelector('#inputValor');
var grados = document.querySelector('#grados_hoy');
var clima = document.querySelector('#clima_hoy');
var viento = document.querySelector('#viento_hoy');
var amanecer = document.querySelector('#amanecer_hoy');
var atardecer = document.querySelector('#atardecer_hoy');
var humedad = document.querySelector('#humedad_hoy');
var visibilidad = document.querySelector('#visibilidad_hoy');
var fecha = document.querySelector('#fecha_hoy');

boton.addEventListener('click', climaHoy)

function climaHoy(){
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+inputValor.value+'&units=metric&appid=1dfce91cad2e917bc5d3ca4b9ad60418')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var gradosValor = data.list[0].main.temp;
        var climaValor = data.list[0].weather[0].description;
        var vientoValor = data.list[0].wind.speed;


        var amanecerValor = data.city.sunrise;
        var atardecerValor = data.city.sunset;
        var amanecerFecha = new Date(amanecerValor * 1000);
        var amanecerHora = amanecerFecha.getHours();
        var amanecerMinutos = amanecerFecha.getMinutes();
        var atardecerFecha = new Date(atardecerValor * 1000);
        var atardecerHora = atardecerFecha.getHours();
        var atardecerMinutos = atardecerFecha.getMinutes();

        var humedadValor = data.list[0].main.humidity;
        var visibilidadValor = data.list[0].visibility;
        
        var fechaValor = data.list[0].dt;
        var date = new Date(fechaValor * 1000);
        var dia = date.getDate();
        var mes = date.getMonth()+1;
        var año = date.getFullYear();
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;

        grados.innerHTML = gradosValor + '°C';
        clima.innerHTML = climaValor;
        viento.innerHTML = vientoValor + ' km/h';
        amanecer.innerHTML = amanecerHora +':'+ amanecerMinutos +' AM';
        atardecer.innerHTML = atardecerHora +':'+ atardecerMinutos +' PM';
        humedad.innerHTML = humedadValor + '%';
        visibilidad.innerHTML = visibilidadValor + ' m';
        fecha.innerHTML = dia +'-'+ mes +'-'+ año;
        climaFuturo(lat, lon);
    })

.catch(error => alert("No existe la ciudad o no se encuentra registrado en la API"));
}

function climaFuturo(lat, lon){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=metric&appid=1dfce91cad2e917bc5d3ca4b9ad60418')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.daily.forEach(function(dayInfo, index) {
            let gradoHoy = document.querySelector('#grados'+index);
            let grado = (dayInfo.temp.day).toString(); 
            gradoHoy.innerHTML = grado + '°C';
        })
    })
}
