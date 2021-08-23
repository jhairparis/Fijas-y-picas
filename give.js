const enviar = document.getElementById("enviar");
const respuesta = document.getElementById("respuesta");
const historia = document.getElementById("historia");

function init() {
	const p1 = parseInt(Math.random() * (10 - 1) + 1);
	const p2 = parseInt(Math.random() * (10 - 1) + 1);
	const p3 = parseInt(Math.random() * (10 - 1) + 1);
	let numer = [p1, p2, p3];
	if (p1 == p2 || p2 == p3 || p1 == p3) {
		return init();
	} else {
		return numer;
	}
}

let numero = init();

const historial = []

let x = false;

document.addEventListener("keydown", function (e) {
	if (e.keyCode == 69) {
		if (!x) {
			document.getElementById("numeroMagico").innerHTML = numero.join("");
			x = true;
		} else {
			document.getElementById("numeroMagico").innerHTML = "";
			x = false;
		}
	}
});

const miniAI = (e) => {
	e.preventDefault();
	let numero1 = [parseInt(document.getElementById("numero1").value), false];
	let numero2 = [parseInt(document.getElementById("numero2").value), false];
	let numero3 = [parseInt(document.getElementById("numero3").value), false];

	if (isNaN(numero1[0]) || isNaN(numero2[0]) || isNaN(numero3[0])) {
		respuesta.innerHTML = "Ingresa valores"
	} else if (numero1[0] === numero2[0] && numero3[0] === numero1[0] && numero2[0] === numero3[0]) {
		respuesta.innerHTML = "Recuerda ningun numero se repite"

		historial.push([[numero1[0], numero2[0], numero3[0]].join(""), "Todos son iguales"]);
	} else {
		let fijas = 0;
		let picas = 0;

		if (numero1[0] == numero[0]) {
			fijas++;
			numero1[1] = true;
		}
		if (numero2[0] == numero[1]) {
			fijas++;
			numero2[1] = true;
		}
		if (numero3[0] == numero[2]) {
			fijas++;
			numero3[1] = true;
		}

		if (numero1[0] == numero2[0]) {
			if (numero1[1] === false && numero2[1] === false) {
				if (numero.includes(numero1[0])) {
					console.log("Sumamos pica por 1 -2")
					picas++;
					if (numero.includes(numero3[0])) {
						console.log("Sumamos pica por 1 -2 dentro 3")
						picas++;
					}
				}
			} else if (numero3[1] === false) {
				if (numero.includes(numero3[0])) {
					console.log("Sumamos pica por 3 en el 1 - 2")
					picas++;
				}
			}
		}
		if (numero2[0] == numero3[0]) {
			if (numero2[1] === false && numero3[1] === false) {
				if (numero.includes(numero2[0])) {
					console.log("Sumamos pica por 2 -3")
					picas++;
					if (numero.includes(numero1[0])) {
						console.log("Sumamos pica por 2 -3 dentro 1")
						picas++;
					}
				}
			} else if (numero1[1] === false) {
				if (numero.includes(numero1[0])) {
					console.log("Sumamos pica por 1 en el 2 - 3")
					picas++;
				}
			}
		}
		if (numero1[0] == numero3[0]) {
			if (numero1[1] === false && numero3[1] === false) {
				if (numero.includes(numero1[0])) {
					console.log("Sumamos pica por 1 -3")
					picas++;
					if (numero.includes(numero2[0])) {
						console.log("Sumamos pica por 1 -3 dentro 2")
						picas++;
					}
				}
			} else if (numero2[1] === false) {
				if (numero.includes(numero2[0])) {
					console.log("Sumamos pica por 2 en el 1 - 3")
					picas++;
				}
			}
		}
		if (numero1[0] !== numero2[0] && numero3[0] !== numero1[0] && numero2[0] !== numero3[0]) {
			console.log("Unicos")
			if (numero.includes(numero1[0]) && numero1[1] === false) {
				picas++;
			}
			if (numero.includes(numero2[0]) && numero2[1] === false) {
				picas++;
			}
			if (numero.includes(numero3[0]) && numero3[1] === false) {
				picas++;
			}
		}

		respuesta.innerHTML = `hay ${fijas} fijas y ${picas} picas`;

		historial.push([[numero1[0], numero2[0], numero3[0]].join(""), { picas, fijas }]);

		if (fijas === 3) {
			respuesta.innerHTML = "¡¡¡GANASTE!!!";
		}
	}
	historia.innerHTML = "";
	let m = ["red", "green", "blue", "gray"]
	for (let i = 0; i < historial.length; i++) {
		historia.innerHTML += `
			<div class="w-full mx-auto my-2 p-2 rounded-full bg-${i < 5 ? m[i] : m[0]}-800">
				${historial[i][0]}
			</div>`;
		console.log("Valor: ", historial[i][0], '---', historial[i][1])
	}
}
enviar.onsubmit = miniAI;
