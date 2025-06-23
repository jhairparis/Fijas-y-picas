const enviar = document.getElementById("enviar");
const cifraEntrada = document.getElementById("cifra");
const cifraButon = document.getElementById("cifraB");
const respuesta = document.getElementById("respuesta");
const historia = document.getElementById("historia");
const form = document.getElementById("form");

let numeroPrincipal = 0;
let numero = [];
let historial = []

function init() {
	let numer = [];
	for (let i = 0; i < numeroPrincipal; i++) {
		const r = parseInt(Math.random() * (10 - 1) + 1);
		if (!numer.includes(r)) {
			numer.push(r);
		} else {
			i--;
		}
	}
	return numer;
}


cifraButon.addEventListener("click", () => {
	const entradasN = document.getElementById("entradasN")
	entradasN.innerHTML = ""
	numeroPrincipal = parseInt(cifraEntrada.value);
	numero = init();
	historial = [];

	if (cifraEntrada.value !== "") {
		form.style.display = "block";
		for (let i = 0; i < numeroPrincipal; i++) {
			entradasN.innerHTML += `<input
              type="number"
              id="numero${i}"
              placeholder="Ingrese un número"
              class="
                flex-1
                appearance-none
                mr-6
                border border-transparent
                w-full
                py-2
                px-4
                bg-white
                text-gray-700
                placeholder-gray-400
                shadow-md
                rounded-lg
                text-base
                focus:outline-none
                focus:ring-2
                focus:ring-purple-600
                focus:border-transparen
              "
            />`;
		}

	}
});

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

const miniAI = (e) => {
	e.preventDefault();
	const arrayCompleto = [];
	for (let i = 0; i < numeroPrincipal; i++) {
		let arr = [parseInt(document.getElementById(`numero${i}`).value), false];
		arrayCompleto.push(arr);
	}
	const arrayValores = [];
	const comprobar = () => {
		let prueba = true;
		arrayCompleto.forEach(arr => arrayValores.push(arr[0]));
		//comprobar si hay un elemento repetido en arrayValores
		for (let i = 0; i < arrayValores.length; i++) {
			for (let j = 0; j < arrayValores.length; j++) {
				if (i !== j && arrayValores[i] === arrayValores[j]) {
					prueba = false;
				}
			}
		}
		return prueba;
	}
	const numeroR = comprobar();
	let fijas = 0;
	let picas = 0;
	arrayCompleto.forEach((val, i) => {
		if (isNaN(val[0])) {
			return respuesta.innerHTML = "Ingresa valores"
		} else if (!numeroR) {
			if (i === numeroPrincipal - 1) {
				historial.push([arrayValores.join(""), "Hay un valor repetido"]);
			}
			return respuesta.innerHTML = "Recuerda ninguna cifra se repite";
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
