var boton = document.querySelector('.buscar');
var inputValor = document.querySelector('#inputValor');
var grados = document.querySelector('#grados_hoy');
var clima = document.querySelector('#clima_hoy');

boton.addEventListener('click', function(){
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+inputValor.value+'&appid=1dfce91cad2e917bc5d3ca4b9ad60418')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var gradosValor = data.list[0].main.temp;
        var climaValor = data.list[0].weather[0].description;

        grados.innerHTML = gradosValor + '°F';
        clima.innerHTML = climaValor;
    })

.catch(err => alert("No existe ese nombre para una ciudad"))
}) 