// Implementa un EventEmitter genérico que permita:
// - Registrar manejadores para tipos de eventos específicos
// - Emitir eventos con payloads fuertemente tipados
// - Manejar errores de tipo en tiempo de compilación
// - Soporte para wildcards y patrones de eventos
// Requisito: Usar tipos condicionales y unión discriminada
function EventEmitter() {
  const listeners = new Map<String, Function>();
  function on<T extends string>(
    event: T,
    listener: (payload: any) => void
  ): void {
    try {
      listeners.set(event, listener);
    } catch {
      console.log("Error en la funcion on");
    }
  }
  function emit<T extends string>(event: T, payload: any): void {
    const listener = listeners.get(event);
    try {
      if (payload) {
        if (listener) {
          listener(payload);
          if (listener) {
            listener();
          }
        }
      }
    } catch (error) {
      console.log("Error en la funcion emit:" + error);
    }
  }
 

  return {
    on,
    emit,
  
  };
}

// usage
const emmitter = EventEmitter();
emmitter.on("foo", (payload : {foo : string}) => {
    console.log(payload.foo);
});
emmitter.emit("foo", {foo: "bar"}); // OK


