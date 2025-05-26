import { Tragamonedas } from "./tragamonedas";

export class TragamonedasFrutas extends Tragamonedas {
  constructor() {
    super("Frutas", ['Kiwi', 'Banana', 'Manzana', 'Naranja', 'Pera', 'Mandarina'],100);
  }
}
const tragamonedasF =  new TragamonedasFrutas();
tragamonedasF.jugar();