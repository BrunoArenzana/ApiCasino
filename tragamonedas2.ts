import { Jugador } from "./jugador";
import { Tragamonedas } from "./tragamonedas";
import { ConsoleColor } from "./consoleColor";
export class TragamonedasNumeros extends Tragamonedas {
  protected jugador: Jugador;

  constructor(jugador: Jugador) {
    super("Numeros", [ConsoleColor.Red+"1"+ConsoleColor.Reset, ConsoleColor.Cyan+"2"+ConsoleColor.Reset, ConsoleColor.Green+"3"+ConsoleColor.Reset,ConsoleColor.Magenta+ "4"+ConsoleColor.Reset],50, 150);
    this.jugador = jugador;
  }
}


