import * as rs from 'readline-sync';
import { Carta, Mazo } from './mazoDeCartas';
import { iApostar } from './iApostar';

export class MayorMenor implements iApostar {
    //atributos----------------------------------
private mazo: Mazo;
private carta: Carta;
saldo: number;
monto:number;
//const apuesta: number;
//constructor---------------------------------------
constructor(pSaldo: number) {
    this.saldo = pSaldo;
    this.monto =rs.questionInt("ingrese monto a apostar: ");
    this.mazo = new Mazo();
    const cartaInicial = this.mazo.sacarCartaAleatoria();
    this.carta = cartaInicial ?? new Carta("A", "♠");
}

//----------------metodos de interface-------------------------
    calcularGanancia(): number {//este metodo no tiene ninguna funcion de momento, puede ser borrado o darle alguna funcion util, de momento no le encontre utilidad
        throw console.error("el q lee es gay");
        
    }
    sumarSaldo(): void {
    this.saldo += this.monto;
    }
    restarSaldo(): void {
        this.saldo -= this.monto;
    }

private mostrarCartaActual() {
    console.log(`Carta actual: ${this.carta.toString()}`);
}
//------------metodos--------------------------------------------
//pregunta al usuario y validacion
private pedirApuesta(): "mayor" | "menor"{
    while (true){
    const respuesta = rs.question("¿La siguiente carta sera mayor o menor? (mayor/menor): ").toLowerCase();
    if (respuesta == "mayor" || respuesta == "menor"){
    return respuesta;
    }else{
    console.log("Opcion invalida, intenta de nuevo.");
    }
    }
}
        
       // const monto = rs.questionFloat('Monto: ');
//juego
private jugarTurno(apuesta: "mayor" | "menor"): boolean {
    const nuevaCarta = this.mazo.sacarCartaAleatoria();
    if (!nuevaCarta) {
    console.log("No quedan cartas, el juego termino.");
    return false; 
    }
    const valorCartaActual = this.carta.getValorNumerico();
    const valorCartaNueva = nuevaCarta.getValorNumerico();
    const gano = (apuesta == "mayor" && valorCartaNueva > valorCartaActual) ||
    (apuesta == "menor" && valorCartaNueva < valorCartaActual);

    this.carta = nuevaCarta;

    if (gano) {
    console.log(`Ganaste. La carta es ${nuevaCarta.toString()}`);
    this.sumarSaldo();
    console.log(`Has ganado ${this.monto}`);
    
    } else {
    console.log(`Perdiste. La carta es ${nuevaCarta.toString()}`);
    this.restarSaldo();
    }

console.log(`Tu saldo actual es: ${this.saldo}`);

    return true;
}
//metodo final, juego con menu
public jugar() {
    let seguir = true;
    console.log("Bienvenido al juego Mayor o Menor!");

    while (seguir) {
    this.mostrarCartaActual();
    const apuesta = this.pedirApuesta();
    seguir = this.jugarTurno(apuesta);

    if (!seguir) break;

    const respuesta = rs.question("¿Quieres seguir jugando? (s/n): ").toLowerCase();
    //detalle en el if, se puede corregir y cambiar la validacion para ser mas estricto
    if (respuesta !== "s") {
        seguir = false;
        console.log("Gracias por jugar!");
    }
    }
}
}
