import { salir } from ".";
import * as rs from "readline-sync";
export class Login {
  private username: string;
  private password: string;
  private age: number;

  constructor(username: string, password: string, age: number) {
    this.username = username.toLowerCase();
    this.password = password.toLowerCase();
    this.age = age;
  }

 public validateLogin() {
  if (this.age < 18) {
    console.log("No puedes ingresar - (ley 13470 Menores, apuestas y juegos de azar)");
    salir();
    return false;
  }

  let intentos = 3;

  while (intentos > 0) {
    if (this.validatePassword()) {
      return true;
    }

    intentos--;
    if (intentos > 0) {
      console.log(`Contraseña inválida. Te quedan ${intentos} intento(s).`);
      this.password = rs.question("Reingresá tu contraseña: ",{ hideEchoBack: true  });
    } else {
      console.error("Has excedido los 3 intentos. Acceso denegado.");
    }
  }

  return false;
}



private validatePassword(): boolean {
  
  if (!/^[A-Za-z0-9]{4,}$/.test(this.password)) {
    console.error(
      "La contraseña debe tener al menos 4 caracteres, sin espacios ni símbolos"
    );
    return false;
  }
  return true;
}

}