// 01. Función de error básica con never
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
}

function dividir(a: number, b: number): number {
  if (b === 0) {
    return lanzarError("No se puede dividir entre 0");
  }
  return a / b;
}

console.log(dividir(10, 2)); // ✅ 5
console.log(dividir(10, 0)); // ❌ Lanza error
// lanzarError nunca retorna, por lo que el compilador entiende que el flujo termina ahí.

// 02. never en un switch exhaustivo
type Estado = "inicial" | "cargando" | "exito";

function manejarEstado(estado: Estado) {
  switch (estado) {
    case "inicial":
      return "Esperando...";
    case "cargando":
      return "Cargando datos...";
    case "exito":
      return "¡Todo listo!";
    default:
      const exhaustiveCheck: never = estado; // 🔒 Garantiza exhaustividad
      return exhaustiveCheck;
  }
}

// Si agregamos un nuevo valor en Estado y no lo manejamos en el switch, TypeScript marcará error.

// 03. Validación de parámetrs con never
function procesarEntrada(valor: string | number) {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  } else if (typeof valor === "number") {
    return valor * 2;
  } else {
    const inesperado: never = valor; // 🔒 Nunca debería llegar aquí
    return inesperado;
  }
}

// Si alguien intenta pasar otro tipo a procesarEntrada, TypeScript avisará.

// 04. Manejo de errores en funciones genéricas
function asegurarValor<T>(valor: T | null | undefined): T {
  if (valor == null) {
    return lanzarError("Valor inesperado: null o undefined");
  }
  return valor;
}

const nombre = asegurarValor("Ana"); // ✅ "Ana"
const otro = asegurarValor(null);    // ❌ Lanza error

// lanzarError retorna never, lo que asegura que el flujo se corta en el caso de error.

// 05. Función que garantiza nunca terminar
function crashLoop(): never {
  while (true) {
    throw new Error("El sistema entró en un estado inválido");
  }
}

function ejecutar(accion: "ok" | "fail") {
  if (accion === "ok") {
    return "Todo bien";
  }
  return crashLoop(); // nunca regresa
}

// crashLoop es un ejemplo clásico de never, usado cuando la app entra en un estado irrecuperable.