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

boton.addEventListener('click', function(){
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+inputValor.value+'&units=metric&appid=1dfce91cad2e917bc5d3ca4b9ad60418')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var gradosValor = data.list[0].main.temp;
        var climaValor = data.list[0].weather[0].description;
        var vientoValor = data.list[0].wind.speed;
        var amanecerValor = data.city.sunrise;
        var atardecerValor = data.city.sunset;
        var humedadValor = data.list[0].main.humidity;
        var visibilidadValor = data.list[0].visibility;
        var fechaValor = data.list[0].dt;

        grados.innerHTML = gradosValor + '°C';
        clima.innerHTML = climaValor;
        viento.innerHTML = vientoValor + ' km/h';
        amanecer.innerHTML = amanecerValor + ' AM';
        atardecer.innerHTML = atardecerValor + ' PM';
        humedad.innerHTML = humedadValor + '%';
        visibilidad.innerHTML = visibilidadValor + ' km';
        fecha.innerHTML = new Date(fechaValor);
    })

.catch(error => alert("No existe la ciudad o no se encuentra registrado en la API"))
}) 