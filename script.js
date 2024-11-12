/* Aplicación que ejecuta una calculadora sencilla basada en el uso de prompt()
    y muestra sus resultados por consola. Guarda un historial de resultados en 
    el almacenamiento local (localStorage) hasta un límite de 10 operaciones, 
    con la capacidad de mostrar el historial */

    /* Se crea un mapa para agilizar la validación de la selección de operación.
    Este mapa se utiliza para reasignar la selección del usuario al símbolo de la operación
    en caso de que introduzca el nombre. Esto se hace para agilizar instrucciones más adelante. */

    const mapaOperaciones = new Map([
        ["suma", "+"],
        ["+", "+"],
        ["resta", "-"],
        ["-", "-"],
        ["multiplicacion", "*"],
        ["*", "*"],
        ["division", "/"],
        ["/", "/"],
        ["raiz", "√"],
        ["√", "√"],
        ["historial", "historial"]
    ]);

/*  Función de valiadción de la selección de operaciones
    Esta función se encarga de asegurar que el usuario introduce una selección válida para elegir 
    la operación a realizar.
    La función retorna el símbolo de una operación o null, que facilita la implementación de la
    función de cancelar la ejecución por parte del usuario */ 
function validarOperacion() {

    /* Se solicita escribir la operación mediante prompt, con un mensaje explicativo
        Se controla que el usuario no haya pulsado el botón cancelar, devolviendo operacion == null.
        En caso contrario, se  transforma la cadena a minúsculas para simplificar la validación */

    let mensaje = "¿Qué operación desea realizar?"
                + "\n - Suma: suma / +"
                + "\n - Resta: resta / - "
                + "\n - Multiplicacion: multiplicacion / *"
                + "\n - Division: division / /"
                + "\n - Raiz cuadrada: raiz / √"
                + "\nIntroduzca el nombre (sin tildes) o el símbolo"
                + "\n\nPara mostrar el historial introduzca \"historial\""
                + "\nPara salir de la calculadora pulse \"cancelar\"";
    
    let operacion = prompt(mensaje);
    
    if(operacion != null) operacion = operacion.toLowerCase(); 
            
        /* Se crea un bucle "while" que se ejecuta si lo introducido por el usuario no es una de las
        palabras o símbolos válidos para seleccionar una operación, repitiendo la petición.
        Para ello, se utiliza el método "has()" de Map, que devuelve "true" si la cadena introducida
        por el usuario existe en el mapa
        El bucle también finaliza si el usuario pulsa "cancelar", lo que devuelve "null" */
    while(!mapaOperaciones.has(operacion) && operacion != null)
        {
            operacion = prompt("Opción no válida.\n\n" + mensaje);
            if(operacion != null) operacion = operacion.toLowerCase();               
        }

    /* Se devuelve directamente el símbolo de la operación utilizando el método get() de Map, 
    o el valor null */
    return mapaOperaciones.get(operacion) || null;
}

/* Función de validación de introducción de números.
    Esta función se encarga de asegurar que el usuario introduce un número. 
    Permite retornar un número real o null, facilitando la funcionalidad de
    cancelación de operación.
    Se añade un parámetro para personalizar el mensaje, que incluye un mensaje por defecto */
function validarInput(mensaje = "Introduzca un número"){

    /* Para implementar la funcionalidad de que el usuario pueda cancelar una operación, 
    se recoge el número de forma directa, y se evalúa si la variable es == null, lo que
    quiere decir que el usuario ha pulsado "cancelar" */
    let num = prompt(`${mensaje}`);
    if(num == null) {
        return null;
    }
    else{
        /* En caso contrario se usa la función parseFloat() para recoger lo introducido por el usuario
        en forma de número real. Para realizar la validación se utiliza un bucle while que se repite 
        en caso de que la función isNaN() del número introducido sea true, lo que significa que el 
        usuario no ha introducido número, en cuyo caso se repite la solicitud */
        num = parseFloat(num);
        while(isNaN(num)){
            num = prompt("No ha introducido un número, se necesita un número real."
                + "\nPulse \"cancelar\" para cancelar la operación.");
            if(num == null) {
                return null;
            }
            else{
                num = parseFloat(num);
            }
        }
    
    return num;
    }
    
}

/* Funciones flecha simplificadas que ejecutan las operaciones y devuelven el resultado */
const raizCuadrada = (num) => Math.sqrt(num);
const suma = (num1, num2) => num1 + num2;
const resta = (num1, num2) => num1 - num2;
const multiplicacion = (num1, num2) => num1 * num2;
/* Se controla evitar la división por 0 mediante un operador ternario */
const division = (num1, num2) => num2 != 0 ? num1 / num2 : "Error: Divisón por cero no permitida";

/* Función que selecciona la operación a realizar */
function operacion(num1, num2, tipo){

    let resultado = 0;

    /* Para hacer la selección se utiliza una estructura switch.
     */
    switch(tipo){

        /*
        Para cada operación, se ejecuta la operación llamando a la función asociada.
        */
        case "√":
            resultado = raizCuadrada(num1);
            break;

        case "+":
            resultado = suma(num1, num2);                 
            break;

        case "-":
            resultado = resta(num1, num2);
            break;

        case "*":
            resultado = multiplicacion(num1, num2);                    
            break;

        case "/":
            resultado = division(num1, num2);                    
            break;  
    }
    
return resultado;
}

/* Para cumplir el requisito del proyecto de crear y gestionar objetos, haremos que cada operación del
historial se guarde en forma de objeto. Este objeto se creará de forma literal */
function agregarAlHistorial(num1, num2, tipo, resultado) {
    const operacionObjeto = {
        operando1: num1,
        operando2: num2,
        tipoOperacion: tipo,
        resultado: resultado,
        fecha: new Date().toLocaleString()
    };

    /* Se declara una variable tipo array en la que se recupera el historial almacenado y se añade la
    nueva operación */
    let historial = recuperarHistorial();
    historial.push(operacionObjeto);

    /* Se guarda el historial en el almacenamiento local */
    guardarHistorial(historial);

    /* El historial tendrá un límite de 10 operaciones, por lo tanto se elimina el primer elemento 
    en caso de que la longitud del array sea >= 10. Se usa un bucle while en lugar de una estructura
    if(historial.lenght == 10) para controlar posibles errores que provoquen que el historial haya
    superado los 10 elementos, aunque el código no permita esa situación. */ 
    while (historial.length >= 10) historial.shift();
}

/* Función que muestra todos los valores historial, controlando si está vacío */
function mostrarHistorial(){

    let historial = recuperarHistorial();

    console.log(`Historial de operaciones:\n`)
    /*En caso de que el historial no esté vacío (lenght == 0), se ejecuta un bucle for..of que recorre
    el historial mostrando un mensaje que depende del tipo de operación */
    if(historial.length != 0){
        for(let op of historial){
            if(op.tipoOperacion == "√")
                console.log(`\tOperación: ${op.tipoOperacion}${op.operando1}`
                + ` = ${op.resultado}\n\t\tFecha: ${op.fecha}`);
            else
            console.log(`\tOperación: ${op.operando1} ${op.tipoOperacion} ${op.operando2}`
                + ` = ${op.resultado}\n\t\tFecha: ${op.fecha}`);
        }
    }
    else{
        console.log(`Aún no se han realizado operaciones.`);
    }
}

/* Para controlar la posibilidad de que localStorage no esté disponible, se crea una función 
que comprueba su disponibilidad, y devuelve true or false */
function localStorageDisponible() {
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        return true;
    } catch (e) {
        return false;
    }
}
/* Se declara una variable global donde se guarará el historial durante la sesión en 
caso de que localStorage no esté disponible */
let historialTemporal = [];

/* Función que guarda el array historial serializando el array historial */
function guardarHistorial(historial){
    if(localStorageDisponible())
        localStorage.setItem(`historial`, JSON.stringify(historial));
    else
        historialTemporal = historial;
}

/*  Función que devuelve un array donde cada elemento es una operación del historial
    deserializando la cadena guardada en el almacenamiento local (localStorage) 
    Si no existe el historial, se devuelve un array vacío */
function recuperarHistorial(){

    if(localStorageDisponible()){
        if(localStorage.getItem(`historial`) != null) 
            return JSON.parse(localStorage.getItem(`historial`));
        else 
            return [];
    }
    else
        return historialTemporal;
    
}


/* Función principal que ejecuta las instrucciones necesarias para la calculadora */
function calculadora(){
    
    /* Una variable controla la finalización de la ejecución de la aplicación por el usuario */
    let continuarEjecucion = true;
    
    /* Se solicita el tipo de operación a realizar al usuario y y se declaran las variables
    de operandos*/
    let tipo = validarOperacion();
    let num1;
    let num2;

    /* Debido a que distintas elecciones del usuario requieren distintas solicitudes de números,
    se utiliza un switch basado en la variable "tipo", y se solicita un número en el caso de la 
    raíz cuadrada, y dos números en cualquier otra operación. No se hace nada en caso de 
    introducir la opción "historial" */
    switch(tipo){
        case "√":
            num1 = validarInput("Introduza el operando"
                + "\nPulse \"cancelar\" para cancelar la operación.");
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            /* Se solicita el segundo número en caso de que no se pulse "cancelar" en la primera solicitud */
            num1 = validarInput("Introduza el primer operando"
                + "\nPulse \"cancelar\" para cancelar la operación.");
            if(num1 != null) 
                num2 = validarInput("Introduza el segundo operando"
                    + "\nPulse \"cancelar\" para cancelar la operación.");
    }

    /* Con todos los datos recogidos del usuario, se controlan todos los posibles casos en los que no se
    deba ejecutar la operación con una estructura if/else if */

    /* En caso de que el usuario trate de dividir entre 0, se lanzará una alerta informando
    de que esa operación no se puede realizar. */
    
    if(num2 == 0 && tipo == "/"){
        alert(`No es posible dividir entre 0`);
    }        
    /* La opción "historial" ejecuta la función mostrarHistorial() */
    else if (tipo == "historial"){
        mostrarHistorial();
    }
    /* En caso de que el usuario cancele la ejecución se muestra un mensaje y se reasigna la 
    variable de control de la ejecución*/
    else if(tipo == null){
        continuarEjecucion = false;
        console.log(`Ejecución cancelada por el usuario.`);
    }
    /* Si el usuario ha pulsado "cancelar" en la introducción de alguno de los números.
    En la condición se tienen que controlar las distintas combinaciones posibles */
    else if((tipo != "√" && (num1 == null || num2 == null)) || (tipo == "√" && num1 == null)){
        console.log(`Operación cancelada por el usuario.`)
    }
    /* Los casos restantes requieren ejecutar la operación */
    else{
        /* Se realiza la operación, guardando el resultado en una variable. */
        let resultado = operacion(num1, num2, tipo);

        /* Se muestra por consola la operación en forma de cadena de caracteres
        cuyo formato depende del tipo de operación. */
        if(tipo == "√")
            console.log(`${tipo}${num1} = ${resultado}`);  
        else
            console.log(`${num1} ${tipo} ${num2} = ${resultado}`);

        /* Finalmente se agrega la nueva operación al historial */
        agregarAlHistorial(num1, num2, tipo, resultado);
        
    }

    return continuarEjecucion;
}

/* Se muestra un primer mensaje de bienvenida al usuario, explicando como hacer que la 
aplicación funcione correctamente */
alert("Calculadora básica\nLos resultados se mostrarán en consola, pulsar F12 para mostrarla" + 
    "\n\nPulsar cancelar en primera ejecución y actualizar la página para su correcto funcionamiento");

/* Mensaje en caso de que no se pueda acceder al localStorage */
if(!localStorageDisponible()) 
    console.log("localStorage no disponible. No se guardará el historial entre sesiones.");

/* Ejecución de la aplicación. Debido a que se requiere que el usuario pueda realizar operaciones
continuamente sin recarga el navegador, se usará un bucle while.
Se implemente una funcionalidad que permite al usuario cancelar la ejecución, por lo tanto el bucle
se ejecuta mientras calculadora retorne "true", lo que ocurre mientras el usuario no pulse "cancelar" */
while(calculadora()){}





