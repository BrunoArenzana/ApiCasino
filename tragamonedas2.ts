import { Tragamonedas } from "./tragamonedas";

export class TragamonedasNumeros extends Tragamonedas{
  constructor() {
    super("Numeros", ["1", "2", "3", "4", "5", "6"]);
  }
}
const tragamonedasN =  new TragamonedasNumeros();
tragamonedasN.calcularResultado(tragamonedasN.tirar());
