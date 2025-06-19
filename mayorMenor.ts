import * as rs from 'readline-sync';
import * as fs from 'fs';
import { Carta, Mazo } from './mazoDeCartas';
import { iApostar } from './iApostar';
import { Jugador } from "./jugador";
import { opcion1 } from '.';
import { Juegos } from "./abstractJuegos";
import { ConsoleColor } from './consoleColor';

export class MayorMenor extends Juegos implements iApostar {
//atributos---------------------------------------------------------------
protected jugador:Jugador;
private mazo: Mazo;
private carta: Carta;
private apuestaMinima:number;
private apuestaMaxima:number;
public apuesta:number;
public saldo1:number;

//constructor-----------------------------------------------------------------
constructor(pJugador:Jugador, pApuestaMinima: number, pApuestaMaxima: number ) {
    super();
    this.jugador=pJugador;
    this.saldo1= this.jugador.getSaldoTarj();
    this.apuestaMinima = pApuestaMinima;
    this.apuestaMaxima = pApuestaMaxima;
    this.apuesta = 0
    this.mazo = new Mazo();
    const cartaInicial = this.mazo.sacarCartaAleatoria();
    this.carta = cartaInicial ?? new Carta("A", "♠");
}
//-------------------------metodos de interface-------------------------------
    apuestaMinimaMaxima(): void {
        let saldo= this.jugador.getSaldoTarj();
        if(saldo < this.apuestaMinima){
        console.log(`No tiene saldo suficiente, debe comprar mas saldo`);
        opcion1();
        saldo = this.jugador.getSaldoTarj();
        if(saldo < this.apuestaMinima){
            console.log(`No tiene saldo suficiente, debe comprar mas saldo`);
            opcion1();
            return;
        }
        }//console.log(this.ROJO + '\n=== MENU PRINCIPAL ===' + this.RESET);
        console.clear();
        console.log(`Su saldo actual es de: ${this.jugador.getSaldoTarj()}`);
                let apuesta: number | void = rs.questionInt(`Introduce una apuesta entre ${this.apuestaMinima} y ${this.apuestaMaxima}: `);
                while (apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima){
        apuesta = rs.questionInt(`La apuesta debe ser entre ${this.apuestaMinima} y ${this.apuestaMaxima}. Intenta nuevamente: `);
    }
    if(apuesta > saldo){
        console.log(`No tiene saldo suficiente para realizar esta apuesta, por favor cargue saldo para seguir jugando`);
        opcion1();
        console.clear();
        return;
    }
    this.apuesta = apuesta;
    }

private mostrarCartaActual() {
    console.log(`Carta actual: ${this.carta.toString()}`);
}
//------------metodos----------------------------------------------
terminarJuego(): void {
    
}
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
    let ganancia= this.apuesta;
    const nuevoSaldo= this.jugador.getSaldoTarj() + ganancia;
    this.jugador.setSaldo(nuevoSaldo);
    //this.modificarSaldoTarj(+ganancia);
    console.log(`Ganaste. La carta es ${nuevaCarta.toString()}`);
    console.log(`Has ganado ${ganancia}`);
    //console.log(`Tu saldo actual es: ${this.jugador.getSaldoTarj()}`);
    } else {
    //this.modificarSaldoTarj(this.getSaldoTarj()-this.apuesta);
    console.log(`Perdiste. La carta es ${nuevaCarta.toString()}`);
    const nuevoSaldo= this.jugador.getSaldoTarj() - this.apuesta;
    this.jugador.setSaldo(nuevoSaldo);
    }
console.log(`Tu saldo actual es: ${this.jugador.getSaldoTarj()}`);
fs.writeFileSync('saldo.txt', `${this.jugador.getSaldoTarj()}`);
//this.jugador.guardarSaldo();
return true;
}
//metodo final
public jugar() {
    let seguir = true;
    console.log("Bienvenido al juego Mayor o Menor!");
    this.apuestaMinimaMaxima();

    while (true) {
    this.mostrarCartaActual();
    const apuesta = this.pedirApuesta();

    seguir = this.jugarTurno(apuesta);

    if (!seguir){
    console.log("No tienes saldo suficiente para seguir jugando. Fin del juego.");
    //break;
}
    const respuesta = rs.question("¿Quieres seguir jugando? (s/n): ").toLowerCase();
    //detalle en el if, se puede corregir y cambiar la validacion para ser mas estricto
    if (respuesta !== "s") {
        seguir = false;
        console.log("Gracias por jugar!");
        return ;
    }
    let saldo = this.jugador.getSaldoTarj();
    if(saldo < this.apuestaMinima/*||apuesta > this.jugador.getSaldoTarj()*/){
        console.log("No tienes saldo suficiente para realizar la apuesta, elige otra apuesta o haz una recarga en el menu");
        return;
    }
    //this.apuestaMinimaMaxima();
    }
}
}
