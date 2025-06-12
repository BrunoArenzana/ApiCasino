import * as rs from 'readline-sync';
import * as fs from 'fs';
import { iApostar } from './iApostar';
import { opcion1 } from '.';
import { Jugador } from "./jugador";

export class Tragamonedas  implements iApostar {
    private nombre: string;
    private figuras: string[];

    public apuesta: number;
    private apuestaMinima: number;
    private apuestaMaxima: number;
    protected jugador: Jugador;




    constructor(pName: string, pNombre: string, pFiguras: string[], pApuestaMinima: number, pApuestaMaxima: number) {

        this.nombre = pNombre;
        this.figuras = pFiguras;
        this.apuesta = 0;
        this.apuestaMinima = pApuestaMinima;
        this.apuestaMaxima = pApuestaMaxima;

    }

    getNombre() {
        return this.nombre;
    }

    apuestaMinimaMaxima(): void {
    if (this.jugador.getSaldoTarj() < this.apuestaMinima) {
        console.log("No tiene saldo suficiente, debe comprar más saldo");
        opcion1();
    }
    let apuesta: number = rs.questionInt(`Introduce una apuesta entre ${this.apuestaMinima} y ${this.apuestaMaxima}: `);
    while (apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima || isNaN(apuesta)) {
        apuesta = rs.questionInt(`La apuesta debe ser entre ${this.apuestaMinima} y ${this.apuestaMaxima}. Intenta nuevamente: `);
    }
    this.apuesta = apuesta;
    }


    public random(): string {
        const i = Math.floor(Math.random() * this.figuras.length);
        return this.figuras[i];
    }

    public tirar(): string[] {
        const resultado = [this.random(), this.random(), this.random(), this.random()];
        console.log(`   < ${resultado.join(" - ")} >`);
        return resultado;
    }

    public calcularResultado(resultado: string[]): void {
        let repetido = 0;
        for (let i = 0; i < resultado.length; i++) {
            let contador = 0;
            for (let j = 0; j < resultado.length; j++) {
                if (resultado[i] === resultado[j]) {
                    contador++;
                }
            }
            if (contador > repetido) {
                repetido = contador;
            }
        }

        let nuevoSaldo: number;
        if (repetido === 3) {
            nuevoSaldo = this.jugador.getSaldoTarj() + (this.apuesta * 5)
            console.log(this.jugador.getSaldoTarj())
            console.log("Ganaste apuesta x 5");

        } else if (repetido === 4) {
            nuevoSaldo = this.jugador.getSaldoTarj() + (this.apuesta * 10)
            console.log(this.jugador.getSaldoTarj())
            console.log("JACKPOT!!");
            console.log("GANASTE APUESTA X 10");

        } else {
            nuevoSaldo = this.jugador.getSaldoTarj() - this.apuesta;
            console.log(this.jugador.getSaldoTarj())
            console.log("No tuviste suerte. Intenta de nuevo")

        }

        this.jugador.setSaldo(nuevoSaldo);
        console.log("Saldo actual: " + this.jugador.getSaldoTarj())
        fs.writeFileSync('saldo.txt', `${this.jugador.getSaldoTarj()}`);

    }

    public jugar() {
        let seguir = true;
        while (seguir) {
            console.log("** Tragamonedas " + this.nombre + " **");

            this.apuestaMinimaMaxima();

            const resultado = this.tirar();
            this.calcularResultado(resultado);

            const respuesta = rs.question("Presione enter para Seguir / Escriba SALIR para terminar: ");
            let saldo = this.jugador.getSaldoTarj();
    if(saldo < this.apuestaMinima){
        console.log("No tienes saldo suficiente para realizar la apuesta, para seguir jugando, haz otra recarga");
        
        opcion1();
    }
            console.clear();
            if (respuesta === null || respuesta.toLowerCase() == 'salir') {
                seguir = false;
                console.log("¡Gracias por jugar!");
            }

        }
    }
}*/

export class Tragamonedas  implements iApostar {
    private nombre: string;
    private figuras: string[];
    public apuesta: number;
    private apuestaMinima: number;
    private apuestaMaxima: number;
    protected jugador!: Jugador;
    constructor(pName: string, pNombre: string, pFiguras: string[], pApuestaMinima: number, pApuestaMaxima: number) {
        
        this.nombre = pNombre;
        this.figuras = pFiguras;
        this.apuesta = 0;
        this.apuestaMinima = pApuestaMinima;
        this.apuestaMaxima = pApuestaMaxima;
    }
    getNombre() {
        return this.nombre;
    }
apuestaMinimaMaxima(): void {
        if (this.jugador.getSaldoTarj() < this.apuestaMinima) {
            console.log("No tiene saldo suficiente, debe comprar más saldo");
            opcion1();
            return;
        }
        let apuesta: number = rs.questionInt(`Introduce una apuesta entre ${this.apuestaMinima} y ${this.apuestaMaxima}: `);
        while (
            apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima || apuesta > this.jugador.getSaldoTarj()
        ) {
            console.log(this.jugador.getSaldoTarj())
            console.log(`Apuesta inválida. Debe estar entre ${this.apuestaMinima} y ${this.apuestaMaxima}.`);
            apuesta = rs.questionInt("Intenta nuevamente: ");
        }
        this.apuesta = apuesta;
    }
    public random(): string {
        const i = Math.floor(Math.random() * this.figuras.length);
        return this.figuras[i];
    }
    public tirar(): string[] {
        const resultado = [this.random(), this.random(), this.random(), this.random()];
        console.log(`   < ${resultado.join(" - ")} >`);
        return resultado;
    }
    public calcularResultado(resultado: string[]): void {
        let repetido = 0;
        for (let i = 0; i < resultado.length; i++) {
            let contador = 0;
            for (let j = 0; j < resultado.length; j++) {
                if (resultado[i] === resultado[j]) {
                    contador++;
                }
            }
            if (contador > repetido) {
                repetido = contador;
            }
        }
        let nuevoSaldo: number;
        if (repetido === 3) {
            nuevoSaldo = this.jugador.getSaldoTarj() + (this.apuesta * 5)
            console.log(this.jugador.getSaldoTarj())
            console.log("Ganaste apuesta x 5");
        } else if (repetido === 4) {
            nuevoSaldo = this.jugador.getSaldoTarj() + (this.apuesta * 10)
            console.log(this.jugador.getSaldoTarj())
            console.log("JACKPOT!!");
            console.log("GANASTE APUESTA X 10");
        } else {
            nuevoSaldo = this.jugador.getSaldoTarj() - this.apuesta;
            console.log(this.jugador.getSaldoTarj())
            console.log("No tuviste suerte. Intenta de nuevo")
        }
        this.jugador.setSaldo(nuevoSaldo);
        console.log("Saldo actual: " + this.jugador.getSaldoTarj())
        fs.writeFileSync('saldo.txt', `${this.jugador.getSaldoTarj()}`);
    }
    public jugar() {
        let seguir = true;
        while (seguir) {
            console.log("** Tragamonedas " + this.nombre + " **");
            this.apuestaMinimaMaxima();
            const resultado = this.tirar();
            this.calcularResultado(resultado);
            const respuesta = rs.question("Presione enter para Seguir / Escriba SALIR para terminar: ");
            console.clear();
            if (respuesta === null || respuesta.toLowerCase() == 'salir') {
                seguir = false;
                console.log("¡Gracias por jugar!");
            }
        }
    }
}
