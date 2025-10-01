// 01. Validación de respuesta json a una API externa
async function fetchUsuario(id: number): Promise<unknown> {
  const resp = await fetch(`https://api.example.com/users/${id}`);
  return resp.json(); // podría devolver cualquier cosa
}

async function ejemplo1() {
  const data = await fetchUsuario(1);

  if (typeof data === "object" && data !== null && "nombre" in data) {
    console.log("Nombre del usuario:", (data as { nombre: string }).nombre);
  } else {
    console.error("Respuesta inesperada:", data);
  }
}
// El unknown obliga a validar que realmente exista nombre.

// 02. Manejo de union types con unknown
async function fetchSaldo(): Promise<unknown> {
  const resp = await fetch("https://api.example.com/saldo");
  return resp.json();
}

async function ejemplo2() {
  const data = await fetchSaldo();

  if (typeof data === "number" || typeof data === "string") {
    console.log("Saldo recibido:", data);
  } else {
    console.error("Formato no válido:", data);
  }
}
// unknown puede convertirse en un union type si la API devuelve number | string.

// 03. Uso de unknown con genéricos en API dinámica
async function fetchData<T = unknown>(url: string): Promise<T> {
  const resp = await fetch(url);
  return resp.json();
}

async function ejemplo3() {
  const producto = await fetchData<{ id: number; nombre: string }>(
    "https://api.example.com/productos/1"
  );

  console.log("Producto:", producto.id, producto.nombre);
}
// Por defecto T = unknown, pero si sabemos la forma de la respuesta podemos tiparla.
