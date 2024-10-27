/* Aplicación que ejecuta una calculadora sencilla basada en el uso de prompt()
    y muestra sus resultados por consola. Guarda un historial de resultados en 
    el almacenamiento local (localStorage) hasta un límite de 50 operaciones, 
    con la capacidad de mostrar el historial */

/*  Función de valiadción de la selección de operaciones
    Esta función se encarga de asegurar que el usuario introduce
    una selección válida para elegir la operación a realizar*/ 
function validarOperacion() {

    

    /* Se solicita escribir la operación mediante prompt, con un mensaje explicativo */
    let operacion = prompt("¿Qué operación desea realizar?"
                + "\n - Suma: suma / +"
                + "\n - Resta: resta / - "
                + "\n - Multiplicacion: multiplicacion / *"
                + "\n - Division: division / /"
                + "\n - Raiz cuadrada: raiz / √"
                + "\nIntroduzca el nombre (sin tildes) o el símbolo"
                + "\n\nPara mostrar el historial introduzca \"historial\"");
    /* Se controla que el usuario no haya pulsado el botón cancelar, y en caso contrario se
    continua la ejecución */
    if(operacion == null){
        console.log(`Ejecución cancelada por el usuario.`);
    }
    else{
        operacion = operacion.toLowerCase();
    }
    

    /* Se crea un bucle "while" que se ejecuta si lo introducido por el usuario no es una de las
        palabras o símbolos válidos para seleccionar una operación, repitiendo el mensaje de petición.
        Para ello, se utiliza el método "includes()" de String, que devuelve "true" si se incluye
        alguna de los strings aportados al método, y se utiliza la negación (el bucle conginua mientras
        no se incluya alguno de los strings)*/
    while(!["suma", "resta", "multiplicacion", "division", 
        "raiz", "+", "-", "/", "*", "√", "historial"].includes(operacion))
        {
            operacion = prompt("No ha introducido una opción válida. Vuelva a escoger"
                + "\n - Suma: suma / +"
                + "\n - Resta: resta / - "
                + "\n - Multiplicacion: multiplicacion / *"
                + "\n - Division: division / /"
                + "\n - Raiz cuadrada: raiz / √"
                + "\nIntroduzca el nombre (sin tildes) o el símbolo"
                + "\n\nPara mostrar el historial introduzca \"historial\"");
                if(operacion == null){
                    console.log(`Ejecución cancelada por el usuario.`);
                }
                else{
                    operacion = operacion.toLowerCase();
                }
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
    muestra un mensaje particular basado en el parámetro introducido */
function validarInput(mensaje){

    /* Se solicita un número mediante prompt, que se recoge en forma de número real
        utilizando la función parseFloat() */
    let num = parseFloat(prompt(`${mensaje}`));

    /* Se utiliza un bucle while que se repite en caso de que la función isNaN() del
        número introducido sea true, lo que significa que el usuario no ha introducido
        número, en cuyo caso se repite la solicitud al usuario */
    while(isNaN(num)){
        num = parseFloat(prompt(`No ha introducido un número, se necesita un número real`));
    }
    
    return num;
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

/* Función que calcula la raíz cuadrada de un números introducido por parámetro y devuelve el resultado*/
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
        console.log(`No se han realizado operaciones.`);
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
    
    /* Se solicita el tipo de operación a realizar al usuario y y se declaran las variables
    de operandos*/
    let tipo = validarOperacion();
    let num1;
    let num2;

    /* Puesto que realizar una raíz cuadrada sólo requiere un operando, en ese caso se solicita
    un sólo número al usuario.
    En el resto de casos se solicitan los dos.
    En caso de que el usuario escoja la función historial, no se piden números y se ejecuta la fucnión.
    Debido a que todos los inputs posibles están controlados, no es necesaria una opción default. */
    switch(tipo){
        case "√":
            num1 = validarInput(`Introduzca el operando`);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            num1 = validarInput(`Introduza el primer operando`);
            num2 = validarInput(`Introduzca el segundo operando`);
            break;
        case "historial":
            mostrarHistorial(historial);
            break;
    }   

    /* En caso de que el usuario trate de dividir entre 0, se lanzará una alerta informando
    de que esa operación no se puede realizar. En caso contrario, se realizará la operación */
    if(num2 == 0 && (tipo == "/")){
        alert(`No es posible dividir entre 0`);
    }
    /* Debido a que la opción historial ya ha sido controlada, ejecutamos la operación si se ha
    elegido cualquier otra opción */
    else if(tipo != "historial"){
        /* Se realiza la operación, guardando el resultado en una variable, y se muestra por consola.
        Además, se guarda una cadena de caracteres de toda la operación en el array de historial, cadena
        cuyo formato depende del tipo de operación */
        let resultado = operacion(num1, num2, tipo);
        let cadena; 

        if(tipo == "√"){
            cadena = `${tipo}${num1} = ${resultado}`;  
        }
        else{
            cadena = `${num1} ${tipo} ${num2} = ${resultado}`;
        }
        console.log(cadena);

        /* El historial tendrá un límite de 50 operaciones, por lo tanto se elimina el primer elemento 
        en caso de que la longitud del array sea >= 50. Se usa un bucle while en lugar de una estructura
        if(historial.lenght == 50) para controlar posibles errores que provoquen que el historial haya
        superado los 50 elementos, aunque el código no permite esa situación. */ 
        while(historial.length >= 5){
            historial.shift();
        }
        historial.push(cadena);

        /* Finalmente se sobreescribe el historial guardado en el almacenamiento local */
        guardarHistorial(historial);
    }
}

/* Ejecución de la aplicación. Debido a que se requiere que el usuario pueda realizar operaciones
sin recarga el navegador, se usará un bucle while(true), pese a que esto supone un bucle infinito */
while(true){    
    calculadora();
}





