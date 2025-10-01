// 01. as const con union types
// Normalmente se ampliaría a string[]
const roles = ["admin", "editor", "viewer"] as const;

// Esto crea el tipo: "admin" | "editor" | "viewer"
type Rol = typeof roles[number];

function setRol(rol: Rol) {
  console.log(`Rol asignado: ${rol}`);
}

setRol("admin");   // ✅
setRol("editor");  // ✅
// setRol("otro"); ❌ Error
// Gracias a as const, los elementos del array se vuelven literales inmutables.

// 02. as const con generics
function obtenerPrimero<T extends readonly string[]>(arr: T): T[number] {
  return arr[0];
}

const colores = ["rojo", "verde", "azul"] as const;

const primero = obtenerPrimero(colores);
console.log(primero); // "rojo"

// `primero` es "rojo" | "verde" | "azul", no string

// as const permite que el genérico preserve los valores literales, no los degrade a string.

// 03. as const con tipos opcionales
type Config = {
  modo?: "oscuro" | "claro";
  idioma: "es" | "en";
};

const config: Config = {
  idioma: "es",
  modo: "oscuro"
} as const;

// El campo "modo" es opcional, pero aquí TypeScript lo infiere como "oscuro"
// Aquí as const asegura que la propiedad opcional quede con su literal exacto "oscuro".

// 04. as const en arrow function tipadas
const crearRespuesta = (ok: boolean): { status: "ok" | "error"; data: string } => {
  return ok 
    ? { status: "ok", data: "Todo bien" } as const
    : { status: "error", data: "Hubo un problema" } as const;
};

const respuesta = crearRespuesta(true);
// respuesta.status es "ok" | "error", no solo string
// Sin as const, status sería string, perdiendo precisión en el tipo.

// 05. as const con objetos y dicriminated unions
type Accion =
  | { tipo: "crear"; payload: string }
  | { tipo: "borrar"; id: number };

const crearAccion = (nombre: string): Accion => ({
  tipo: "crear",
  payload: nombre
} as const);

const borrarAccion = (id: number): Accion => ({
  tipo: "borrar",
  id
} as const);

const a1 = crearAccion("Usuario1");
const a2 = borrarAccion(5);

// `a1.tipo` es exactamente "crear"
// `a2.tipo` es exactamente "borrar"

// Esto es muy útil para pattern matching con discriminated unions en TypeScript.
