import { Jugador } from "./jugador";
import { Tragamonedas } from "./tragamonedas";
import { ConsoleColor } from "./consoleColor";
export class TragamonedasLogo extends Tragamonedas {
  protected jugador: Jugador;

  constructor(jugador: Jugador) {
    super("Logo", ["♠",ConsoleColor.Red+ "♥"+ConsoleColor.Reset,ConsoleColor.Red+ "♦"+ConsoleColor.Reset, "♣"], 300, 500);
    this.jugador = jugador;
  }
}
