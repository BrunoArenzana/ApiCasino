import { Jugador } from "./jugador";
import { Tragamonedas } from "./tragamonedas";

export class TragamonedasNumeros extends Tragamonedas {
  protected jugador: Jugador;

  constructor(jugador: Jugador) {
    super("","Logo", ["1", "2", "3", "4"],50, 150);
    this.jugador = jugador;
  }
}


