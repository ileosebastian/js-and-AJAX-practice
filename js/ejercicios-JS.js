document.addEventListener('DOMContentLoaded', () => {
	let answer; // las respuestas se almacenara, dependiendo del evento, aqui
	/* EJERCICIO 1 */
	let input_exercise_1 = document.querySelector('#i-js-1');
	input_exercise_1.addEventListener('keyup', event => {
		answer = document.querySelector('#o-js-1');

		answer.innerHTML = isPalindrome( input_exercise_1.value ); // ejercicio en accion
		if (input_exercise_1.value == '' || input_exercise_1.value == null) 
			answer.classList.add('hidden');
		else
			answer.classList.remove('hidden');
	});


	/* EJERCICIO 2 */
	let input_1_exercise_2 = document.querySelector('#i-js-2-1');
	let input_2_exercise_2 = document.querySelector('#i-js-2-2');
	[input_1_exercise_2, input_2_exercise_2].forEach(input => {
		input.addEventListener('keypress', event => {
			if ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 44) {
				if (input.value.includes(',') && !(event.charCode >= 48))
					event.preventDefault();
			} else
				event.preventDefault();	
		});
	});
	document.querySelector("#compare-numbers").addEventListener('click', () => {
		answer = document.querySelector('#o-js-2');
		if (input_1_exercise_2.value.length > 0 && input_2_exercise_2.value.length > 0) {
			let n1 = Number( input_1_exercise_2.value.replace(',', ".") );	
			let n2 = Number( input_2_exercise_2.value.replace(',', ".") );	

			answer.innerHTML = bigger_number( n1, n2 ); // ejercicio en accion
			
			answer.classList.remove('hidden');		
		} else
			answer.classList.add('hidden');		
	});


	/* EJERCICIO 3 */
	let input_exercise_3 = document.querySelector('#i-js-3');
	input_exercise_3.addEventListener('keyup', event => {
		answer = document.querySelector('#o-js-3');

		answer.innerHTML = show_vowels( input_exercise_3.value ); // ejercicio en accion
		if ((input_exercise_3.value == '' || input_exercise_3.value == null) && answer.innerHTML.length > 0) 
			answer.classList.add('hidden');
		else
			answer.classList.remove('hidden');
	});

	/* EJERCICIO 4 */
	let input_exercise_4 = document.querySelector('#i-js-4');

	input_exercise_4.addEventListener('keyup', event => {
		answer = document.querySelector('#o-js-4');

		answer.innerHTML = number_vowels( input_exercise_4.value ); // ejercicio en accion
		if ((input_exercise_4.value == '' || input_exercise_4.value == null) && answer.innerHTML.length > 0) 
			answer.classList.add('hidden');
		else
			answer.classList.remove('hidden');
	});
	

});


/* ----------------- FUNCIONES DE EJERCICIOS RESUELTOS ----------------- */
//// Ejercicio 1
/**
 * isPalindrome - Check if a string is palindrome 
 * @param {String} str - string, 'Loro'
 * @returns {String} - Message indicating if is palindrome or not
 */
function isPalindrome (str) {
	let response = "Error - La entrada no es una cadena de caracteres."; // por si no esun string la entrada
	if (typeof(str) == 'string') {
		str = str.replace(/ /g, '').toLowerCase(); // quirar los espacios y poner todos los caracteres en minusculas 
		str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // reemplazar caracteres especiales
		
		let possible_palindrome = str.split('').reverse().join(''); // establecer la cadena al reves

		response = possible_palindrome === str ? "Es un palindromo." : "No es un palindromo.";
	}
	return response;
}

////// Ejercicio 2
/**
 * bigger_number - Compare which number is bigger 
 * @param {Number} number_1 - First number to compare 
 * @param {Number} number_2 - Second number to compare
 * @returns {String} - Message with the correct answer 
 */
function bigger_number (number_1, number_2) {
	let response = "Error - La entrada no es un número.";
	if (typeof(number_1) == 'number' && typeof(number_2) == 'number') {
		response = number_1 > number_2 
					? `${number_1} es mayor que ${number_2}` 
					: `${number_2} es mayor que ${number_1}`;	
	}

	return response;
}

//////// Ejercicio 3
/**
 * show_vowels - Parses a string, finding, if exists, the vowels 
 * @param {String} str - Any string (example: UNIR)
 * @returns {String} Slice of HTML - Message that show vowels and  the anatomy in str
 */
function show_vowels (str) {
	let vowels = str.replace(/[^aeiou ]/ig, "").split("");
	vowels = [...new Set(vowels)].sort();

	let anatomy_str = str.replace(/[^aeiou ]/ig, "_");

	return anatomy_str.length > 0 ? `Las vocales que aparecen, en relativo orden, son: ${vowels} <br> 
								La anatomina de la frase ingresada es: ${anatomy_str}` : "";
}

////////// Ejercicio 4
/**
 * number_vowels - Parses a string, finding, if exists, count and show amount of vowels 
 * @param {String} str - Any string (example: UNIR)
 * @returns {String} Slice of HTML - Message that show number of repetitions of each vowel
 */
function number_vowels (str) {
	let n_vowels = str.replace(/[^aeiou]/ig, "").split("")
					.reduce((prev, curr) => (prev[curr] ? prev[curr] += 1 : prev[curr] = 1, prev), {})
	let vowels = ``;
	Object.keys(n_vowels).sort().forEach( key => {
		if (n_vowels[key] > 1)
			vowels += `<strong>${key}</strong> se repite ${n_vowels[key]} veces; `;
		else
			vowels += `<strong>${key}</strong> se repite ${n_vowels[key]} vez; `;
	});
	vowels = vowels.replace(/; $/g, ".");
	
	return vowels.length > 0 ? `Las veces que aparece cada vocal es la siguiente: <br> ${vowels}` : "";
}