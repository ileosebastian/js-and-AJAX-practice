// Variables globales a utilizar
var states_list = ['UNSET', 'OPENED', 'HEADERS_RECEIVED', 'LOADING', 'DONE'];
var initial_time = 0;
var CORS_reference = "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS";
document.addEventListener('DOMContentLoaded', () => {
	// obtencion de los elementos HTTML para su posterior interaccion
	let input_recurso = document.querySelector("#recurso");
	let btn_enviar = document.querySelector("#enviar");
	let output_contenidos = document.querySelector("#contenidos");
	let output_cabeceras = document.querySelector("#cabeceras");
	let output_estados = document.querySelector("#estados");
	let output_codigo = document.querySelector("#codigo");

	/* EJERCICIO 1 */
	// PAGINA SUGERIDA. OJO: esto tiene la logica que necesaria para resolver el ejercicio 1
	let url = "https://api.frankfurter.app"; 
	show_url_itself( url, input_recurso );

	btn_enviar.addEventListener("click", event => {
		if (input_recurso.value.length > 0) {
			/* EJERCICIOS 2, 3, 4 y 5 */
			load_process( 
				input_recurso.value, // url, se espera una API de preferencia
				output_contenidos, 
				output_cabeceras, 
				output_estados, 
				output_codigo 
			);
		} else {
			document.querySelector("#msg").innerHTML = `
				<p style="color: tomato;">Debe ingresar una URL válida.</p>
				<strong>Ejemplos de URL(APIs) válidas:</strong><br>
				<ul>
					<li>https://api.frankfurter.app/latest</li>
					<li>https://mindicador.cl/api/dolar</li>
					<li>https://api.chucknorris.io/jokes/random</li>
				</ul>
			`;
		}
	});
});

/* ----------------- FUNCIONES DE EJERCICIOS RESUELTOS ----------------- */

// Ejercicio 1
function show_url_itself(url, input) {
	input.value = url;
}

// Proceso de carga de informacion
function load_process(url, o_contents, o_headers, o_states, o_codes) {
	// limpieza del contenido
	document.querySelector("#msg").innerHTML = ``;
	o_contents.innerHTML = ``; o_headers.innerHTML = ``;
	o_states.innerHTML = ``; o_codes.innerHTML = ``;

	let request;
	// alert(url);
	if (window.XMLHttpRequest) 
		request = new XMLHttpRequest();
	
	let message_error = `
		<p style="color: tomato;">Error al comunicarse con la URL ingresada.</p>
			Por favor, ingrese una URL válida, que no rechace una petición por errores 
			<a href="${CORS_reference}" target="_blanck">CORS</a>.<br>
		<strong>Ejemplos de URL(APIs) válidas:</strong><br>
		<ul>
			<li>https://api.frankfurter.app/latest</li>
			<li>https://mindicador.cl/api/dolar</li>
			<li>https://api.chucknorris.io/jokes/random</li>
		</ul>
	`;

	request.onreadystatechange = function() {
		show_request_statuses( request, o_states );
		show_status_codes( request, o_codes );
		if (request.status == 200) {
			show_contents( request, o_contents );
			show_headers( request, o_headers );
		} 
		if ((request.readyState != 1 && request.status == 0) || request.status == 404) {
			document.querySelector("#msg").innerHTML = message_error;
		}
	}
	
	initial_time = new Date();
	request.open('GET', url, true);
	request.send();
}

//// Ejercicio 2
function show_contents(response, output) {
	output.innerHTML = response.responseText;
}

////// Ejercicio 3
function show_headers(response, output) {
	output.innerHTML = response.getAllResponseHeaders();
}

//////// Ejercicio 4
function show_request_statuses(response, output) {
	let final_time = new Date();
	let miliseconds = final_time - initial_time;

	output.innerHTML += `${response.readyState} - [ ${miliseconds} ms.] ${states_list[response.readyState]} <br/>`;
}

////////// Ejercicio 5
function show_status_codes(response, output) {
	output.innerHTML += response.statusText.length > 0 
							? `${response.status} / ${response.statusText} <br>`
							: `${response.status} <br>`;
}