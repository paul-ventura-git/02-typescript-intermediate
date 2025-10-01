/**
 * Un mixin es básicamente una función que recibe una clase base y devuelve una nueva clase extendida con funcionalidades adicionales.
 */

// 01. Mixin básico con arrow function y union types
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();

    getInfo = (): string | number => {
      return Math.random() > 0.5 ? this.createdAt.toISOString() : this.createdAt.getTime();
    };
  };
}

class Usuario2 {}
const UsuarioConFecha = Timestamped(Usuario2);

const u1 = new UsuarioConFecha();
console.log(u1.getInfo()); // string | number
// Aquí la arrow function retorna un union type (string | number).


// 02. Mixins con arrays indexados
function WithArray<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    items: string[] = [];

    addItem = (item: string) => this.items.push(item);
    getItem = (index: number) => this.items[index]; // acceso indexado
  };
}

class Caja1 {}
const CajaConArray = WithArray(Caja1);

const caja = new CajaConArray();
caja.addItem("manzana");
caja.addItem("pera");

console.log(caja.getItem(0)); // "manzana"
// Usamos arrays indexados con métodos tipados.

// 03. Mixins con generics en arrays
function WithGenericArray<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    data: any[] = [];

    addData = (...items: any[]) => this.data.push(...items);
    getAll = (): any[] => this.data;
  };
}

class Storage1 {}
const GenericStorage = WithGenericArray(Storage1);

const s = new GenericStorage();
s.addData(10, 20, 30);
console.log(s.getAll()); // [10, 20, 30]

// 04. Mixins con union types y arrays
function WithLogs<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    logs: (string | number)[] = [];

    log = (msg: string | number) => {
      this.logs.push(msg);
    };

    showLogs = () => this.logs.forEach(l => console.log("Log:", l));
  };
}

class Sistema {}
const SistemaConLogs = WithLogs(Sistema);

const sys = new SistemaConLogs();
sys.log("Inicio");
sys.log(404);
sys.showLogs();
// Aquí los logs usan union types (string | number).

// 05. Mixins con arrow functions y generics
function WithIdentity<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    identity = <T>(value: T): T => value; // arrow function genérica
  };
}

class Test {}
const TestConIdentity = WithIdentity(Test);

const t = new TestConIdentity();
console.log(t.identity(123));     // number
console.log(t.identity("texto")); // string

// 06. Mixins con arrays indexados, union types y gnerics
function WithCollection<T extends string | number, TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    collection: T[] = [];

    add = (...items: T[]) => this.collection.push(...items);
    getByIndex = (i: number): T => this.collection[i];
  };
}

class Modelo {}
const ModeloConColeccionString = WithCollection<string, typeof Modelo>(Modelo);
const ModeloConColeccionNumber = WithCollection<number, typeof Modelo>(Modelo);

const m = new ModeloConColeccionString();
m.add("uno", "dos");
console.log(m.getByIndex(1)); // "dos"

const n = new ModeloConColeccionNumber();
n.add(100, 200);
console.log(n.getByIndex(0)); // 100