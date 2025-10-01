// 01. public con rest parameters
class Logger {
  public logMessages(...messages: (string | number)[]) {
    messages.forEach(m => console.log("Log:", m));
  }
}

const logger = new Logger();
logger.logMessages("Hola", 123, "Mundo");
// El método es público, cualquiera puede acceder. Acepta múltiples argumentos con rest y un union type string | number.

// 02. private con union types
class Caja {
  private contenido: string | number;

  constructor(valor: string | number) {
    this.contenido = valor;
  }

  public obtenerContenido(): string | number {
    return this.contenido;
  }
}

const c = new Caja("Secreto");
// console.log(c.contenido); ❌ Error, es privado
console.log(c.obtenerContenido()); // "Secreto"
// La propiedad contenido es privada, solo se accede mediante un método público.

// 03. protected con generics
class Base<T> {
  protected items: T[] = [];

  protected agregar(...valores: T[]) {
    this.items.push(...valores);
  }
}

class Hija extends Base<number> {
  public inicializar() {
    this.agregar(1, 2, 3); // permitido porque es protected
    return this.items;
  }
}

const h = new Hija();
console.log(h.inicializar()); // [1, 2, 3]
// protected permite usar agregar solo dentro de la clase o herencias, no fuera.

// 04. readonly con rest parameters
class Usuario {
  readonly nombre: string;
  readonly roles: string[];

  constructor(nombre: string, ...roles: string[]) {
    this.nombre = nombre;
    this.roles = roles;
  }
}

const u = new Usuario("Ana", "admin", "editor");
console.log(u.nombre); // "Ana"
// u.nombre = "Luis"; ❌ Error porque es readonly
// readonly asegura que las propiedades no se reasignen después del constructor.

// 05. static con union types
class MathUtils {
  static combinar(...valores: (number | string)[]) {
    return valores.join("-");
  }
}

console.log(MathUtils.combinar(10, "años", 2025)); // "10-años-2025"
// Los métodos estáticos se usan sin instanciar la clase.

// 06. abstract con generics
abstract class Repositorio<T> {
  abstract guardar(item: T): void;
  abstract obtenerTodos(): T[];
}

class RepoUsuarios extends Repositorio<string> {
  private data: string[] = [];

  guardar(...usuarios: string[]) {
    this.data.push(...usuarios);
  }

  obtenerTodos() {
    return this.data;
  }
}

const repo = new RepoUsuarios();
repo.guardar("Ana", "Luis", "Carlos");
console.log(repo.obtenerTodos()); // ["Ana", "Luis", "Carlos"]
// abstract define métodos que deben implementarse en clases hijas.