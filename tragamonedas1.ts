import { Jugador } from "./jugador";
import { Tragamonedas } from "./tragamonedas";

export class TragamonedasLogo extends Tragamonedas {
  private jugador:Jugador
  constructor(jugador:Jugador) {
    super("Logo", ["♠" , "♥",  "♦", "♣"],jugador.getSaldoTarj());
  }
}
