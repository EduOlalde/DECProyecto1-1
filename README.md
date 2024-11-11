# Calculadora Simple con Historial

Esta aplicación implementa una calculadora sencilla con las siguientes funcionalidades:

* **Operaciones aritméticas:** Suma, resta, multiplicación, división y raíz cuadrada.
* **Historial de operaciones:** Almacena las últimas 10 operaciones en el almacenamiento local del navegador. Este número ha sido elegido para facilitar la demostración de la funcionalidad.
* **Interfaz simple:** Utiliza `prompt()` para la entrada y `console.log()` para la salida.
* **Cancelación de operación o ejecución:** Permite al usuario cancelar la operación en cualquier momento pulsando "Cancelar" en los cuadros de diálogo.


## Uso

1. Abre el archivo `index.html` en tu navegador web.
2. La aplicación te pedirá que selecciones una operación.
3. En la primera ejecución, cancela la operación y recarga la página para el correcto funcionamiento de la consola.
4. Introduce los operandos según sea necesario.
5. El resultado se mostrará en la consola del navegador.
6. Puedes ver el historial de operaciones introduciendo "historial" cuando se te pida la operación.
7. Puedes cancelar la operación actual o la ejecución de la aplicación pulsando "Cancelar" en cualquier momento.

## Limitaciones

* La interfaz de usuario es básica, basada en `prompt()` y `console.log()`.
* El historial está limitado a 10 operaciones.