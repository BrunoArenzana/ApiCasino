import * as rs from 'readline-sync';
import * as fs from 'fs';
import { Carta, Mazo } from './mazoDeCartas';
import { iApostar } from './iApostar';
import { Jugador } from "./jugador";
import { opcion1 } from '.';
import { Juegos } from "./abstractJuegos";
import { ConsoleColor } from "./consoleColor";

export class MayorMenor extends Juegos implements iApostar {
    //atributos---------------------------------------------------------------
    protected jugador: Jugador;
    private mazo: Mazo;
    private carta: Carta;
    private apuestaMinima: number;
    private apuestaMaxima: number;
    public apuesta: number;
    public saldo1: number;

    //constructor-----------------------------------------------------------------
    constructor(pJugador: Jugador, pApuestaMinima: number, pApuestaMaxima: number) {
        super();
        this.jugador = pJugador;
        this.saldo1 = this.jugador.getSaldoTarj();
        this.apuestaMinima = pApuestaMinima;
        this.apuestaMaxima = pApuestaMaxima;
        this.apuesta = 0;
        this.mazo = new Mazo();
        const cartaInicial = this.mazo.sacarCartaAleatoria();
        this.carta = cartaInicial ?? new Carta("A", "♠");
    }
    //-------------------------metodos de interface-------------------------------
    apuestaMinimaMaxima(): void {
        let saldo = this.jugador.getSaldoTarj();
        if (saldo < this.apuestaMinima) {
            console.log(ConsoleColor.Red + `No tiene creditos suficientes, debe comprar mas creditos` + ConsoleColor.Reset);
            opcion1();
            saldo = this.jugador.getSaldoTarj();
            if (saldo < this.apuestaMinima) {
                console.log(ConsoleColor.Red + `No tiene creditos suficientes, debe comprar mas creditos` + ConsoleColor.Reset);
                return;
            }
        }
        console.clear();
        console.log(`Sus creditos actuales: `+ConsoleColor.Yellow+`${this.jugador.getSaldoTarj()}`+ConsoleColor.Reset);
        let apuesta: number | void = rs.questionInt(`Introduce una apuesta entre ${this.apuestaMinima} y ${this.apuestaMaxima}: `);
        this.apuesta = apuesta;
        while (apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima) {
            apuesta = rs.questionInt(`La apuesta debe ser entre ${this.apuestaMinima} y ${this.apuestaMaxima}. Intenta nuevamente: `);
        }
        if (apuesta > saldo) {
            console.log(ConsoleColor.Red + `No tiene creditos suficientes para realizar esta apuesta, por favor cargue creditos para seguir jugando` + ConsoleColor.Reset);
            opcion1();

            if (this.jugador.getSaldoTarj() < apuesta) {
                console.log(ConsoleColor.Red + `No tiene creditos suficientes para realizar esta apuesta, por favor cargue creditos para seguir jugando` + ConsoleColor.Reset);

                opcion1();
            }
            console.clear();//
            rs.question(ConsoleColor.Blue + `ENTER` + ConsoleColor.Reset)
            return;
        }
        this.apuesta = apuesta;
    }

    private mostrarCartaActual() {
        console.log(ConsoleColor.Cyan + `Carta actual: `+ConsoleColor.Reset+`${this.carta.toString()}` );
    }
    //------------metodos----------------------------------------------
    terminarJuego(): void {

    }
    //pregunta al usuario y validacion
    private pedirApuesta(): "mayor" | "menor" {
        while (true) {
            const respuesta = rs.question(ConsoleColor.Cyan + `¿La siguiente carta sera mayor o menor? (mayor/menor): ` + ConsoleColor.Reset).toLowerCase();
            if (respuesta == "mayor" || respuesta == "menor") {
                return respuesta;
            } else {
                console.log("Opcion invalida, intenta de nuevo.");
            }
        }
    }
    //juego //cambie apuesta por respuesta
    private jugarTurno(respuesta: "mayor" | "menor"): boolean {
        const nuevaCarta = this.mazo.sacarCartaAleatoria();
        if (!nuevaCarta) {
            console.log(ConsoleColor.Red + `No quedan cartas, el juego termino.` + ConsoleColor.Reset);
            return false;
        }
        const valorCartaActual = this.carta.getValorNumerico();
        const valorCartaNueva = nuevaCarta.getValorNumerico();
        const gano = (respuesta == "mayor" && valorCartaNueva > valorCartaActual) ||
            (respuesta == "menor" && valorCartaNueva < valorCartaActual);

        this.carta = nuevaCarta;
        if (gano) {
            let ganancia = this.apuesta;
            const nuevoSaldo = this.jugador.getSaldoTarj() + ganancia;
            this.jugador.setSaldo(nuevoSaldo);
            console.log(ConsoleColor.Green + `Ganaste.`+ConsoleColor.Reset+` La carta es ${nuevaCarta.toString()}`);
            console.log(`${ConsoleColor.Green}Has ganado ${ConsoleColor.Reset}${ConsoleColor.Yellow}${ganancia}${ConsoleColor.Reset}`);
        } else {
            console.log(`${ConsoleColor.Red}Perdiste.${ConsoleColor.Reset} La carta es ${nuevaCarta.toString()}`);
            const nuevoSaldo = this.jugador.getSaldoTarj() - this.apuesta;
            this.jugador.setSaldo(nuevoSaldo);
        }
        console.log(`${ConsoleColor.Green}Tus creditos actuales son :${ConsoleColor.Reset} ${ConsoleColor.Yellow}${this.jugador.getSaldoTarj()}` + ConsoleColor.Reset);
        fs.writeFileSync('saldo.txt', `${this.jugador.getSaldoTarj()}`);
        return true;
    }
    //metodo final
    public jugar() {
        let seguir = true;
        console.log(ConsoleColor.Green + `Bienvenido al juego Mayor o Menor!` + ConsoleColor.Reset);
        this.apuestaMinimaMaxima();

        while (true) {
            this.mostrarCartaActual();
            const apuesta = this.pedirApuesta();

            seguir = this.jugarTurno(apuesta);

            if (!seguir) {
                console.log(ConsoleColor.Green + `No tienes creditos suficientes para seguir jugando. Fin del juego.` + ConsoleColor.Reset);
            }
            const respuesta = rs.question(`Presione` + ConsoleColor.Green+ ` ENTER`+ConsoleColor.Reset+` para Seguir o escriba` + ConsoleColor.Red+ ` SALIR`+ ConsoleColor.Reset+` para terminar: `);
            console.clear();
            if (respuesta === null || respuesta.toLowerCase() == 'salir') {
                if (this.jugador.getSaldoTarj() < this.apuesta) {
                    rs.question(ConsoleColor.Blue + `enter` + ConsoleColor.Reset)
                }
                seguir = false;
                console.log(ConsoleColor.Green + `Gracias por jugar!` + ConsoleColor.Reset);
                return;
            }
            let saldo = this.jugador.getSaldoTarj();
            if (saldo < this.apuesta/*||apuesta > this.jugador.getSaldoTarj()*/) {
                console.log(ConsoleColor.Red + `No tienes creditos suficientes para realizar la apuesta, elige otra apuesta o haz una recarga en el menu` + ConsoleColor.Reset);
                rs.question(ConsoleColor.Blue + `Presione enter` + ConsoleColor.Reset);
                return;
            }

        }
    }
}
