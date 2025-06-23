let picas = document.querySelector('#picas')
const history = document.querySelector('#history')
const fijas = document.querySelector('#fijas')
const pistas = document.querySelector('#pistas')
const adivino = document.querySelector('#adivino')
let intentos = 0
let yaJugados = []

function genracionNumeros() {
  let ad = parseInt(Math.random() * (10 - 1) + 1);
  let ad2 = parseInt(Math.random() * (10 - 1) + 1);
  let ad3 = parseInt(Math.random() * (10 - 1) + 1);
  pistas.style.display = 'block';
  return [parseInt(ad + "" + ad2 + "" + ad3), [ad, ad2, ad3]]
}

function imprimir([num, desglose]) {
  let bol = false;
  yaJugados.forEach(element => {
    bol = element[0].includes(num)
  });
  if (bol) {
    return false;
  } else {
    yaJugados.push([[num, desglose], [undefined, undefined]]);
    adivino.innerHTML = num;
    intentos++
    if (yaJugados[intentos - 2]) {
      yaJugados[intentos - 2][1] = [picas.value, fijas.value];
      updateHistory();
    }
    picas.value = "";
    fijas.value = "";
    return true
  }
}

function variar2() {
  let main = [];
  for (let m of yaJugados[intentos - 1][0][1]) {
    const p1 = [m, parseInt(Math.random() * (10 - 1) + 1), parseInt(Math.random() * (10 - 1))]
    const p2 = [parseInt(Math.random() * (10 - 1) + 1), m, parseInt(Math.random() * (10 - 1))]
    const p3 = [parseInt(Math.random() * (10 - 1) + 1), parseInt(Math.random() * (10 - 1)), m]
    main.push(p1, p2, p3)
  }
  let i = parseInt(Math.random() * (10 - 1) + 1) - 1;
  return [parseInt(main[i].join("")), main[i]]
}
function variar1() {
  let main = [];
  const m = yaJugados[intentos - 1][0][1];
  const p1 = [m[0], parseInt(Math.random() * (10 - 1 + 1) + 1), m[2]]
  const p2 = [parseInt(Math.random() * (10 - 1 + 1)) + 1, m[1], m[2]]
  const p3 = [m[0], m[1], parseInt(Math.random() * (10 - 1 + 1)) + 1]
  main.push(p1, p2, p3)
  let i = parseInt(Math.random() * (2 - 0 + 1) + 0);
  return [main[i].join(""), main[i]]
}

function mejorar() {
  if (intentos === 50) {
    pistas.innerHTML = "Me rindo";
  }
  if (picas.value !== "" && fijas.value !== "") {
    if (parseInt(picas.value) === 0 && parseInt(fijas.value) === 0) {
      imprimir(genracionNumeros());
    }
    if ((parseInt(picas.value) + parseInt(fijas.value)) >= 4) {
      alert("Error solo 3 digitos")
    } else {
      if (parseInt(fijas.value) === 3) {
        console.log("Gane");
      }
      if ((parseInt(fijas.value) > 0 && parseInt(fijas.value) < 4) && (parseInt(picas.value) > 0 && parseInt(picas.value) < 4)) {
        console.log("dual");
      } else if (parseInt(fijas.value) > 0 && parseInt(fijas.value) < 4) {
        if (parseInt(fijas.value) === 1) {
          let newValue = variar2();
          let f = imprimir(newValue);
          if (!f) {
            mejorar()//si no se pudo generar un numero nuevo
          }
        }
        if (parseInt(fijas.value) === 2) {
          let newValue = variar1();
          let f = imprimir(newValue);
          if (!f) {
            mejorar()//si no se pudo generar un numero nuevo
          }
        }
      } else if (parseInt(picas.value) > 0 && parseInt(picas.value) < 4) {
        if (picas.value === 0) {
          console.log("Hey devuelvete que te estas perdiendo")
          if (yaJugados[intentos - 2] && (yaJugados[intentos - 2][1][0] === 1)) {
            console.log("Hey devuelvete que te estas perdiendo")
            // revisar desdes el ultima 1 pica los numeros y reintear
            let newValue = variar2();
            let f = imprimir(newValue);
            if (!f) {
              mejorar()//si no se pudo generar un numero nuevo
            }
          }
        }
        if (parseInt(picas.value) === 1) {
          let newValue = variar2();
          let f = imprimir(newValue);
          if (!f) {
            mejorar()//si no se pudo generar un numero nuevo
          }
        }
        if (parseInt(picas.value) === 2) {
          let newValue = variar1();
          let f = imprimir(newValue);
          if (!f) {
            mejorar()//si no se pudo generar un numero nuevo
          }
        }
      }
    }
  } else {
    alert("Dame las pistas");
  }

}
function updateHistory() {
  history.innerHTML = "";
  for (const key in yaJugados) {
    history.innerHTML += `
      <div class="num">
        <span>${yaJugados[key][0][0]}</span>
        <br>
        picas: ${yaJugados[key][1][0]}<br> 
        fijas: ${yaJugados[key][1][1]}
      </div><br>`;
  }
}

function inicio() {
  if (intentos === 0) {
    imprimir(genracionNumeros());
    document.querySelector('#intentar').style.display = "none";
  }
}

document.querySelector('#intentar').addEventListener('click', inicio);
document.querySelector('#envioPistas').addEventListener('click', mejorar);

