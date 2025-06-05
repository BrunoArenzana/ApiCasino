import * as rs from 'readline-sync';
import * as fs from 'fs';
import { Carta, Mazo } from './mazoDeCartas';
import { iApostar } from './iApostar';
import { Jugador } from "./jugador";
import { opcion1 } from '.';
import { Juegos } from "./juegos";
import {  } from "./";

export class MayorMenor extends Juegos implements iApostar {
    //atributos----------------------------------
protected jugador:Jugador;
private mazo: Mazo;
private carta: Carta;
private apuestaMinima:number;
private apuestaMaxima:number;
public apuesta:number;
public saldo1:number;
//private saldo: number;
//monto:number;

//const apuesta: number;
//constructor---------------------------------------
constructor(pJugador:Jugador, pApuestaMinima: number, pApuestaMaxima: number ) {
    super();
    this.jugador=pJugador;
    this.saldo1= this.jugador.getSaldoTarj();
    //this.jugador = pJugador;
    this.apuestaMinima = pApuestaMinima;
    this.apuestaMaxima = pApuestaMaxima;
    //this.saldo = pSaldo;
    //this.monto =rs.questionInt("ingrese monto a apostar: ");
    this.apuesta = 0
    this.mazo = new Mazo();
    const cartaInicial = this.mazo.sacarCartaAleatoria();
    this.carta = cartaInicial ?? new Carta("A", "♠");
}

//----------------metodos de interface-------------------------
    /*calcularGanancia(): number {//este metodo no tiene ninguna funcion de momento, puede ser borrado o darle alguna funcion util, de momento no le encontre utilidad
        throw console.error("el q lee es gay");
        
    }*/
    /*sumarSaldo(): void {
    this.saldo += this.monto;
    }
    restarSaldo(): void {
    this.saldo -= this.monto;
    }*/
    apuestaMinimaMaxima(): void {
        let saldo= this.jugador.getSaldoTarj();
        if(saldo < this.apuestaMinima){
        console.log("No tiene saldo suficiente, debe comprar mas salod");
        opcion1();
        saldo = this.jugador.getSaldoTarj();
        /*if (saldo < this.apuestaMinima) {
        console.log("Saldo insuficiente para jugar. Volviendo al menú principal.");
        return;
    }*/
        }
                let apuesta: number | void = rs.questionInt(`Introduce una apuesta entre ${this.apuestaMinima} y ${this.apuestaMaxima}: `);
                while (apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima){
    
        apuesta = rs.questionInt(`La apuesta debe ser entre ${this.apuestaMinima} y ${this.apuestaMaxima}. Intenta nuevamente: `);
    }
    this.apuesta = apuesta;
    
    }


private mostrarCartaActual() {
    console.log(`Carta actual: ${this.carta.toString()}`);
}
//------------metodos--------------------------------------------
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
    }
console.log(`Tu saldo actual es: ${this.jugador.getSaldoTarj()}`);
fs.writeFileSync('saldo.txt', `${this.jugador.getSaldoTarj()}`);
return true;
}
//metodo final, juego con menu
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
    }
}
}
//const jugador1 = new Jugador("Pepe")
//const MayorMenor1= new MayorMenor(jugador1,10,500);