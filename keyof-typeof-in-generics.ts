// 🔹 typeof → obtiene el tipo de un valor.
// 🔹 keyof → obtiene la unión de las claves de un objeto.

// 01. Extraer claves de un objeto con keyof
function obtenerPropiedad<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const persona1 = { nombre: "Ana", edad: 25 };
const nombre1 = obtenerPropiedad(persona1, "nombre"); // tipo string
const edad1 = obtenerPropiedad(persona1, "edad");     // tipo number

// keyof asegura que solo puedes pasar claves válidas.

// 02. Usar typeof con un objeto fijo
const config1 = {
  modo: "oscuro",
  version: 1,
  activo: true
};

type Config1 = typeof config1;

function mostrarConfig(c: Config1) {
  console.log(c.modo, c.version, c.activo);
}

mostrarConfig({ modo: "oscuro", version: 1, activo: false });

// typeof toma el tipo del objeto config y lo usa en un genérico.

// 03. Función con keyof typeof
const mensajes = {
  exito: "Operación correcta",
  error: "Algo salió mal",
  cargando: "Cargando..."
};

function mostrarMensaje<K extends keyof typeof mensajes>(key: K) {
  return mensajes[key];
}

console.log(mostrarMensaje("exito"));   // ✅
console.log(mostrarMensaje("error"));   // ✅
// console.log(mostrarMensaje("otro")); ❌ Error
// Combinamos keyof y typeof para limitar los valores permitidos.

// 04. Actualizar valores dinámicamente
function actualizarPropiedad<
  T,
  K extends keyof T
>(obj: T, key: K, valor: T[K]): T {
  obj[key] = valor;
  return obj;
}

let usuario = { id: 1, activo: true };
usuario = actualizarPropiedad(usuario, "activo", false); // ✅
// T[K] garantiza que el valor sea del mismo tipo que la propiedad.

// 05. Genérico con typeof en funciones
function crearGetter<T>(obj: T) {
  return <K extends keyof T>(key: K): T[K] => obj[key];
}

const libro = { titulo: "TS Avanzado", paginas: 300 };
const getLibro = crearGetter(libro);

console.log(getLibro("titulo"));  // string
console.log(getLibro("paginas")); // number
// Aquí usamos generics con keyof para un getter seguro.

// 06. keyof en clases genéricas
class Coleccion<T> {
  private items: T[] = [];

  agregar(item: T) {
    this.items.push(item);
  }

  obtenerPor<K extends keyof T>(key: K, valor: T[K]): T | undefined {
    return this.items.find(i => i[key] === valor);
  }
}

type Usuario1 = { id: number; nombre: string };

const c1 = new Coleccion<Usuario1>();
c1.agregar({ id: 1, nombre: "Luis" });
c1.agregar({ id: 2, nombre: "Ana" });

console.log(c1.obtenerPor("nombre", "Ana")); // ✅
// keyof limita las búsquedas a propiedades existentes en Usuario.

// 07. typeof con funciones existentes
function sumar(a: number, b: number) {
  return a + b;
}

type TipoSumar = typeof sumar;

const miSuma: TipoSumar = (x, y) => x + y;

console.log(miSuma(5, 3)); // 8
// typeof obtiene la firma de la función y la aplica a otra variable.

// 08. keyof + typeof en un enum
enum Estados {
  Activo = "activo",
  Inactivo = "inactivo",
  Pendiente = "pendiente"
}

function manejarEstado1(estado: keyof typeof Estados) {
  console.log("Estado recibido:", estado);
}

manejarEstado1("Activo");    // ✅
// manejarEstado("otro"); ❌ Error

