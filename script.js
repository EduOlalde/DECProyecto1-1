/* Aplicación que ejecuta una calculadora sencilla basada en el uso de prompt()
    y muestra sus resultados por consola. Guarda un historial de resultados en 
    el almacenamiento local (localStorage) hasta un límite de 50 operaciones, 
    con la capacidad de mostrar el historial */

/*  Función de valiadción de la selección de operaciones
    Esta función se encarga de asegurar que el usuario introduce una selección válida para elegir 
    la operación a realizar.
    La función retorna el símbolo de una operación o null, que facilita la implementación de la
    función de cancelar la ejecución por parte del usuario */ 
function validarOperacion() {

    
    /* Se solicita escribir la operación mediante prompt, con un mensaje explicativo */
    let operacion = prompt("¿Qué operación desea realizar?"
                + "\n - Suma: suma / +"
                + "\n - Resta: resta / - "
                + "\n - Multiplicacion: multiplicacion / *"
                + "\n - Division: division / /"
                + "\n - Raiz cuadrada: raiz / √"
                + "\nIntroduzca el nombre (sin tildes) o el símbolo"
                + "\n\nPara mostrar el historial introduzca \"historial\""
                + "\n\nPara salir de la calculadora pulse \"cancelar\"");
    /* Se controla que el usuario no haya pulsado el botón cancelar, devolviendo operacion == null.
    En caso contrario, se  transforma la cadena a minúsculas para simplificar la validación*/
    if(operacion != null)
        operacion = operacion.toLowerCase();
    
    
    /* Se crea un bucle "while" que se ejecuta si lo introducido por el usuario no es una de las
        palabras o símbolos válidos para seleccionar una operación, repitiendo el mensaje de petición.
        Para ello, se utiliza el método "includes()" de String, que devuelve "true" si se incluye
        alguna de los strings aportados al método, y se utiliza la negación (el bucle continua mientras
        no se incluya alguno de los strings)
        El bucle también finaliza si el usuario pulsa "cancelar" */
    while(!["suma", "resta", "multiplicacion", "division", 
        "raiz", "+", "-", "/", "*", "√", "historial"].includes(operacion)
        && operacion != null)
        {
            operacion = prompt("¿Qué operación desea realizar?"
                + "\n - Suma: suma / +"
                + "\n - Resta: resta / - "
                + "\n - Multiplicacion: multiplicacion / *"
                + "\n - Division: division / /"
                + "\n - Raiz cuadrada: raiz / √"
                + "\nIntroduzca el nombre (sin tildes) o el símbolo"
                + "\n\nPara mostrar el historial introduzca \"historial\""
                + "\n\nPara salir de la calculadora pulse \"cancelar\"");
                if(operacion != null)
                    operacion = operacion.toLowerCase();
        }

    /* Para simplificar instrucciones durante el resto de la aplicación, se reasigna el valor
    de la selección a un carácter */
    switch(operacion){
        case "suma": 
            operacion = "+";
            break;
        case "resta": 
            operacion = "-";
            break;
        case "multiplicacion": 
            operacion = "*";
            break;
        case "division": 
            operacion = "/";
            break;
        case "raiz": 
            operacion = "√";
            break;
    }

    return operacion;

}

/* Función de validación de introducción de números.
    Esta función se encarga de asegurar que el usuario introduce un número. La función
    muestra un mensaje particular basado en el parámetro introducido.
    La función permite retornar un número real o null, facilitando la funcionalidad de
    cancelación de operación. */
function validarInput(mensaje){

    /* Para implementar la funcionalidad de que el usuario pueda cancelar una operación, 
    se recoge el número de forma directa, y se evalúa si la variable es == null, lo que
    quiere decir que el usuario ha pulsado "cancelar" */
    let num = prompt(`${mensaje}`);
    if(num == null) {
        return null;
    }
    else{
        /* En caso contrario se usa la función parseFloat() para recoger lo introducido por el usuario
        en forma de número real. PAra realizar la validación se utiliza un bucle while que se repite 
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

function operacion(num1, num2, tipo){

    let resultado = 0;

    /* Para seleccionar la operación a realizar se utiliza una estructura switch.
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

/* Función que suma dos números introducidos por parámetro y devuelve el resultado*/
function suma(num1, num2){
    let resultado = num1 + num2;
    return resultado;
}

/* Función que resta dos números introducidos por parámetro y devuelve el resultado*/
function resta(num1, num2){
    let resultado = num1 - num2;
    return resultado;
}

/* Función que multiplica dos números introducidos por parámetro y devuelve el resultado*/
function multiplicacion(num1, num2){
    let resultado = num1 * num2;
    return resultado;
}

/* Función que divide dos números introducidos por parámetro y devuelve el resultado*/
function division(num1, num2){
    let resultado = num1 / num2;
    return resultado;
}

/* Función que calcula la raíz cuadrada de un número introducido por parámetro y devuelve el resultado*/
function raizCuadrada(num){
    let resultado = Math.sqrt(num);
    return resultado;
}

/* Función que muestra todos los valores del array historial, controlando si está vacío */
function mostrarHistorial(historial){
    console.log(`Historial de operaciones:\n`)
    
    if(historial.length != 0){
        for(let i = 0; i < historial.length; i++){
            console.log(`\t${historial[i]}\n`);
        }
    }
    else{
        console.log(`Aún no se han realizado operaciones.`);
    }
}

/* Función que guarda el array historial en formato string separado por ";" en el 
almacenamiento local */
function guardarHistorial(historial){
    localStorage.setItem(`historial`, historial.join(";"));
}

/*  Función que devuelve un array donde cada elemento es una operación del historial
    guardado en el almacenamiento local (localStorage)
    Si no existe el historial, se devuelve un array vacío */
function recuperarHistorial(){

    if(localStorage.getItem(`historial`) != null){
        let historial = localStorage.getItem(`historial`).split(";");
        return historial;
    }
    else{
        let historial = [];
        return historial;
    }
}


/* Función principal que ejecuta las instrucciones necesarias para la calculadora */
function calculadora(){
    /* Se declara una variable tipo array en la que se guarda el historial almacenado */
    let historial = recuperarHistorial();
    
    /* Una variable controla la finalización de la ejecución de la aplicación por el usuario */
    let continuarEjecucion = true;
    
    /* Se solicita el tipo de operación a realizar al usuario y y se declaran las variables
    de operandos*/
    let tipo = validarOperacion();
    let num1;
    let num2;

    /* Debido a que distintas elecciones del usuario requieren distintas solicitudes de números,
    se utiliza un switch basado en la variable "tipo", y se solicita un número en el caso de la 
    raíz cuadrada, y dos números en cualquier otra operación */
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
            break;        
    }   

    /* Con todos los datos recogidos del usuario, se controlan todos los posibles casos en los que no se
    deba ejecutar la operación con una estructura if/else if */

    /* En caso de que el usuario trate de dividir entre 0, se lanzará una alerta informando
    de que esa operación no se puede realizar. En caso contrario, se realizará la operación */
    if(num2 == 0 && (tipo == "/")){
        alert(`No es posible dividir entre 0`);
    }
    /* La opción "historial" ejecuta la función mostrarHistorial() */
    else if (tipo == "historial"){
        mostrarHistorial(historial);
    }
    /* Si el usuario ha pulsado "cancelar" en la introducción de alguno de los números */
    else if((tipo != null && tipo != "√") && (num1 == null || num2 == null)){
        console.log(`Operación cancelada por el usuario.`)
    }
    /* En caso de que el usuario cancele la ejecución se muestra un mensaje y se reasigna la 
    variable de control de la ejecución*/
    else if(tipo == null){
        continuarEjecucion = false;
        console.log(`Ejecución cancelada por el usuario.`);
    }
    /* Los casos restantes requieren ejecutar la operación */
    else{
        /* Se realiza la operación, guardando el resultado en una variable, y se muestra por consola.
        Además, se guarda una cadena de caracteres de toda la operación en el array de historial, cadena
        cuyo formato depende del tipo de operación */
        let resultado = operacion(num1, num2, tipo);
        let cadena; 

        if(tipo == "√")
            cadena = `${tipo}${num1} = ${resultado}`;  
        else
            cadena = `${num1} ${tipo} ${num2} = ${resultado}`;
        
        console.log(cadena);

        /* El historial tendrá un límite de 10 operaciones, por lo tanto se elimina el primer elemento 
        en caso de que la longitud del array sea >= 10. Se usa un bucle while en lugar de una estructura
        if(historial.lenght == 10) para controlar posibles errores que provoquen que el historial haya
        superado los 10 elementos, aunque el código no permita esa situación. */ 
        while(historial.length >= 10) historial.shift();
        
        historial.push(cadena);

        /* Finalmente se sobreescribe el historial guardado en el almacenamiento local */
        guardarHistorial(historial);
    }

    return continuarEjecucion;
}

/* Ejecución de la aplicación. Debido a que se requiere que el usuario pueda realizar operaciones
continuamente sin recarga el navegador, se usará un bucle while.
Se implemente una funcionalidad que permite al usuario cancelar la ejecución, por lo tanto el bucle
se ejecuta mientras calculadora retorne "true", lo que ocurre mientras el usuario no pulse "cancelar"*/
while(calculadora()){}





