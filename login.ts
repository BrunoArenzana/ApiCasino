import { salir } from ".";

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
      console.log("No puedes ingresar ley 13470 Menores, apuestas y juegos de azar");
      salir();
      return false;
    }
    
    if (!this.validatePassword()) {
    return false;
    }
    
    return true;
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