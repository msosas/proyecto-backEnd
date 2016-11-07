## Event Emitter

Tenemos que contruir nuestro propio módulo que se llame __Event Emitter__.
Básicamente tiene que tener dos funcionalidades:

- Agregar Events Listeners: Creamos una función `on(evento, callback)` que reciba un evento y un callback que se dispará cuando suceda el evento.
- Emitir eventos: Creamos una función `emit(evento)` que recibe un evento, y lo que hace es ejecutar todas los callbacks de los listeners que estaban _escuchando_ por ese evento. Es decir que esta función avisa que ocurrió el evento!

> __Pista__: Creá un objeto cuyas propiedades sean eventos y que su valor sea un arreglo de funciones. La función `on` agrega eventos y funciones y la función `emit` invoca todas las funciones que estaban guardadas en ese evento. Por ejemplo:
```javascript
var emitter = {
	'evento1': [function(){console.log('hola')}, function(){console.log('chao')}],
	'otro evento': [function(){console.log('hola2')}, function(){console.log('chao2')}]
}
```
Cuando se emita el evento: `evento1` se deberia ejecutar las funciones correspondientes.

#### Modo copado
- Controlar que el callback de `on()` sea una función.
- Agregar la funcionalidad de poder eliminar TODOS los events listeners de un evento: `eliminarTodos(evento)`