// 01. public con rest parameters
class Logger {
  public logMessages(...messages: (string | number)[]) {
    messages.forEach(m => console.log("Log:", m));
  }
}

const logger = new Logger();
logger.logMessages("Hola", 123, "Mundo");
// El método es público, cualquiera puede acceder. Acepta múltiples argumentos con rest y un union type string | number.
