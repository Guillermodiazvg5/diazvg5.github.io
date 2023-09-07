const formularioCalculadora = document.getElementById("formulario-calculadora");
const resultado = document.getElementById("resultado");

formularioCalculadora.addEventListener("submit", (evento) => {
  evento.preventDefault();

  calcularTMB();
});

function calcularTMB() {
  aparecerResultado();
  // Validar los datos de entrada
  if (validarDatos()) {
    // Calcular las calorías
    let calculoCalorias = calcularCalorias();
    // Grupo poblacional
    let grupoP = grupoPoblacional();
    // Insertar los elementos al HTML
    insertarElementos(calculoCalorias, grupoP);
    // limpiar datos del formulario
    limpiarDatos();
  }
}

function validarDatos() {
  // captura de elementos
  const nombre = document.querySelector("#nombre");
  const tipoDocumento = document.querySelector("#documento");
  const numeroDocumento = document.querySelector("#numeroID");
  const edad = document.querySelector("#edad");
  const peso = document.querySelector("#peso");
  const altura = document.querySelector("#altura");

  // Manejo de condicionales

  if (
    !(
      edad.value &&
      peso.value &&
      altura.value &&
      nombre.value &&
      tipoDocumento.value &&
      numeroDocumento.value
    )
  ) {
    mostrarMensajeDeError("Por favor llene todos los campos ");
    return false;
  } else if (edad.value < 15 || edad.value > 80) {
    mostrarMensajeDeError("La edad ingresada no es permitida");
    return false;
  }

  return true;
}

function calcularCalorias() {
  // captura de elementos
  const peso = document.querySelector("#peso");
  const altura = document.querySelector("#altura");
  const edad = document.querySelector("#edad");
  const genero = document.querySelector('input[name ="genero"]:checked');
  const actividad = document.querySelector("#actividad");

  // Manejo de objetos

  const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
  };

  // calculo de calorias                       // APLICAR operador ternario

  let calculoCalorias;

  calculoCalorias =
    actividad.value * (multiplicadorTMB.peso * peso.value) +
    multiplicadorTMB.altura * altura.value -
    multiplicadorTMB.edad * edad.value +
    (genero.id === "masculino" ? 5 : -161);

  return calculoCalorias;
}

// grupo poblacional




//Funcion para determinar el grupo poblacional segun la edad

/*const determinarGrupoPoblacional = (edad) => {
  if (edad >= 15 && edad <= 29) {
    return "Joven";
  } else if (edad >= 30 && edad <= 59) {
    return "Adulto";
  } else if (edad >= 60) {
    return "Adulto Mayor";
  } else {
    return "No Aplica";
  }
};
*/




const grupoPoblacional = () => {
  const edad = document.querySelector("#edad");
  if (29 >= edad.value && edad.value >= 15) {
    return "Joven";
  } else if (59 >= edad.value && edad.value >= 30) {
    return "Adulto";
  } else {
    return "Adulto Mayor";
  }
}

function insertarElementos(calculoCalorias, grupoP) {
  // captura de elementos
  const nombre = document.querySelector("#nombre");
  const tipoDocumento = document.querySelector("#documento");
  const numeroDocumento = document.querySelector("#numeroID");
  const resultado = document.querySelector("#resultado");

  // Insercion de elemenstos al HTML

  resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${Math.floor(
                  calculoCalorias
                )} kcal" style="font-size: 2rem" disabled>
            </div>
            <div class="alert alert-warning" role="alert">
            El paciente ${nombre.value} identificado con ${tipoDocumento.value} 
            NO. ${numeroDocumento.value}, requiere un total de ${Math.floor(
    calculoCalorias
  )} kcal para el sostenimiento de su TBM .
            
             </div>
             <div class="alert alert-warning w-100" role="alert">
             Grupo Poblacional :  ${grupoP}.
            </div>
        </div>
    `;
}

// limpiar datos del formulario

function limpiarDatos() {
  const nombre = document.querySelector("#nombre");
  const tipoDocumento = document.querySelector("#documento");
  const numeroDocumento = document.querySelector("#numeroID");
  const edad = document.querySelector("#edad");
  const peso = document.querySelector("#peso");
  const altura = document.querySelector("#altura");
  const actividad = document.querySelector("#actividad");

  nombre.value = null;
  tipoDocumento.value = null;
  numeroDocumento.value = null;
  edad.value = null;
  peso.value = null;
  altura.value = null;
  actividad.value = null;
}

function mostrarMensajeDeError(msg) {
  const calculo = document.querySelector("#calculo");
  if (calculo) {
    calculo.remove();
  }

  const divError = document.createElement("div");
  divError.className = "d-flex justify-content-center align-items-center h-100";
  divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
}

// Animaciones
function aparecerResultado() {
  resultado.style.top = "100vh";
  resultado.style.display = "block";

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 10);
}

function desvanecerResultado() {
  let distancia = 1;

  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      clearInterval(id);
      resultado.style.display = "none";
      resultado.style.top = 0;
    }
  }, 10);
}
