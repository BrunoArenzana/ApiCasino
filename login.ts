import { salir } from ".";

export class Loggin {
  private username: string;
  private password: string;
  private age: number;

  constructor(username: string, password: string, age: number) {
    this.username = username.toLowerCase();
    this.password = password;
    this.age = age;
  }


  public validateLogin() {
    if (this.age < 18) {
      console.log( "No puedes ingresar ley 13470 Menores, apuestas y juegos de azar");
      salir();
    }
  }
}