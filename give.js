const enviar = document.getElementById("enviar");
const respuesta = document.getElementById("respuesta");
const historia = document.getElementById("historia");

function init() {
	const p1 = parseInt(Math.random() * (10 - 1) + 1);
	const p2 = parseInt(Math.random() * (10 - 1) + 1);
	const p3 = parseInt(Math.random() * (10 - 1) + 1);
	const p4 = parseInt(Math.random() * (10 - 1) + 1);
	let numer = [p1, p2, p3, p4];
	if (p1 == p2 || p2 == p3 || p1 == p3 || p1 == p4 || p2 == p4 || p3 == p4) {
		return init();
	} else {
		return numer;
	}
}

let numero = init();

const historial = []

let x = false;

const actualizarHistoial = () => {
	console.log("--------------//Log//----------")
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

document.addEventListener("keydown", function (e) {
	if (e.keyCode == 69) {
		if (!x) {
			document.getElementById("numeroMagico").innerHTML = numero.join("");
			x = true;
			actualizarHistoial();
		} else {
			document.getElementById("numeroMagico").innerHTML = "";
			x = false;
		}
	}
});

let numeroPrincipal = 4;

const miniAI = (e) => {
	e.preventDefault();
	let numero1 = [parseInt(document.getElementById("numero1").value), false];
	let numero2 = [parseInt(document.getElementById("numero2").value), false];
	let numero3 = [parseInt(document.getElementById("numero3").value), false];
	let numero4 = [parseInt(document.getElementById("numero4").value), false];
	const arrayCompleto = [numero1, numero2, numero3, numero4];

	const avance = (i, v) => {
		let valorFuturo = i;
		if ((valorFuturo + v) > numeroPrincipal - 1) {
			valorFuturo = (valorFuturo + v) - (numeroPrincipal - 1);
		} else {
			valorFuturo += v;
		}
		return valorFuturo;
	}
	const arrayValores = [];
	const comprobar = () => {
		let prueba = true;
		for (let i = 0; i < arrayCompleto.length; i++) {
			let valorFuturo = i;
			if (arrayCompleto.hasOwnProperty(valorFuturo + 1)) {
				valorFuturo++;
			} else {
				valorFuturo = 0;
			}
			const arrx = arrayCompleto[i];
			if (arrx[0] === arrayCompleto[valorFuturo][0]) {
				prueba = false;
			}
			arrayValores.push(arrx[0]);
		}
		return prueba;
	}
	const numeroR = comprobar();
	let fijas = 0;
	let picas = 0;
	arrayCompleto.forEach((val, i) => {
		let valorFuturo = avance(i, 1);
		if (isNaN(val[0])) {
			return respuesta.innerHTML = "Ingresa valores"
		} else if (!numeroR) {
			if (i === numeroPrincipal - 1) {
				historial.push([arrayValores.join(""), "Todos son iguales"]);
			}
			return respuesta.innerHTML = "Recuerda ningun numero se repite";
		} else {
			if (val[0] === numero[i]) {
				fijas++;
				val[1] = true;
			}
			if (numero.includes(val[0]) && val[1] === false) {
				picas++;
			}
			if (i === numeroPrincipal - 1) {
				historial.push([arrayValores.join(""), { picas, fijas }]);
				if (fijas === numeroPrincipal) {
					return respuesta.innerHTML = "¡¡¡GANASTE!!!";
				}
				respuesta.innerHTML = `hay ${fijas} fijas y ${picas} picas`;
			}
		}
	});
	actualizarHistoial();
}
enviar.onsubmit = miniAI;
