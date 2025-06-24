//palo y valor para las cartas)
import { ConsoleColor } from "./consoleColor";
const valores: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
type Palo = "♠" | "♥" | "♦" | "♣";
const palos: Palo[] = ["♠", "♥", "♦", "♣"];

function imprimirConColor(palo: Palo): string {
    if (palo === "♥" || palo === "♦") {
        return `${ConsoleColor.Red}${palo}${ConsoleColor.Reset}`;
    }else if (palo === "♣" || palo === "♠"){
        return `${palo}`
    }
    return palo;
}

//valor numerico para las cartas j,q,k,a y conversion de string a number
function valorNumerico(valor: string): number {
    if (valor == "J") return 11;
    if (valor == "Q") return 12;
    if (valor == "K") return 13;
    if (valor == "A") return 14;
    return parseInt(valor);
}
//clase carta
export class Carta {
    //atributos
    valor:string;
    palo:Palo;
//constructor
    constructor(pValor: string, pPalo: Palo) {
        this.valor=pValor
        this.palo=pPalo
    }
//metodos
getValorNumerico(): number {
    return valorNumerico(this.valor);
}
toString(): string {
    return `${this.valor} ${ConsoleColor.Green}de${ConsoleColor.Reset} ${imprimirConColor(this.palo)}`;
}
}
//clase mazo
export class Mazo {
cartas: Carta[] = [];
constructor() {
    this.generarMazo();
}
//genera el mazo con todas las cartas
generarMazo() {
    this.cartas = [];
    for (let i= 0; i < palos.length; i++) {
        for (let i2= 0; i2 < valores.length; i2++) {
            const palo = palos[i];
            const valor = valores[i2];
            this.cartas.push(new Carta(valor, palo));
        }
    }
}
//saca carta al azar y la elimina para que no se vuelvan a repetir
sacarCartaAleatoria(): Carta | null {
    if (this.cartas.length == 0) return null;
    const i = Math.floor(Math.random() * this.cartas.length);
    return this.cartas.splice(i,1)[0];
}
}
//nota para mas tarde(opcional): dividir en dos el metodo sacar carta aleatoria