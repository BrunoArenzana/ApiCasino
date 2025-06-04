import { Jugador } from "./jugador";
import { Tragamonedas } from "./tragamonedas";

export class TragamonedasLogo extends Tragamonedas {
  protected jugador: Jugador;

  constructor(jugador: Jugador) {
    super("","Logo", ["♠", "♥", "♦", "♣"], 10, 30);
    this.jugador = jugador;
  }
}
