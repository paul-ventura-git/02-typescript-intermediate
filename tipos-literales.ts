// 01. Uso con strings literales
type Rol1 = "admin" | "editor" | "lector";

function setPermiso(rol: Rol) {
  console.log(`Permiso asignado al rol: ${rol}`);
}

setPermiso("admin");   // ✅ válido
// setPermiso("root"); // ❌ Error: "root" no está en el tipo Rol
// Asegura que solo se usen roles permitidos.

// 02. Uso con números literales
type Direccion = 1 | -1;

function mover(posicion: number, direccion: Direccion) {
  return posicion + direccion;
}

console.log(mover(10, 1));   // ✅ 11
console.log(mover(10, -1));  // ✅ 9
// mover(10, 0);             // ❌ Error
// Limita la dirección del movimiento solo a 1 o -1.

// 03. Uso con booleanos literales
type Respuesta = true | false;

function confirmar(respuesta: Respuesta) {
  return respuesta ? "Confirmado" : "Cancelado";
}

console.log(confirmar(true));   // ✅ Confirmado
// Aquí se restringe explícitamente a true o false.

// 04. Uso en parámetros de funciones
function alinearTexto(align: "left" | "center" | "right") {
  console.log(`Texto alineado a: ${align}`);
}

alinearTexto("center");  // ✅ válido
// alinearTexto("justify"); // ❌ Error
// Ideal en casos de configuración (por ejemplo, estilos, props en React, etc.).

// 05. Uso con objetos y as const
const colores1 = {
  primario: "blue",
  secundario: "green",
  alerta: "red",
} as const;

type Color = typeof colores1[keyof typeof colores1];

function setColor(c: Color) {
  console.log(`Color seleccionado: ${c}`);
}

setColor("blue");   // ✅ válido
// setColor("yellow"); // ❌ Error
// Con as const los valores del objeto se convierten en tipos literales, no en string genérico.

