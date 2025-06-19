import * as rs from 'readline-sync';
import * as fs from 'fs';
import { iApostar } from './iApostar';
import { opcion1 } from '.';
import { Jugador } from "./jugador";
import { Juegos } from './abstractJuegos';
import { ConsoleColor } from './consoleColor';

export class Tragamonedas extends Juegos implements iApostar {
    private nombre: string;
    private figuras: string[];
    public apuesta: number;
    private apuestaMinima: number;
    private apuestaMaxima: number;
    protected jugador!: Jugador;

    constructor(pName: string, pNombre: string, pFiguras: string[], pApuestaMinima: number, pApuestaMaxima: number) {
      super()  
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
            console.log(ConsoleColor.Red + `No tiene saldo suficiente, debe comprar más saldo`+ ConsoleColor.Reset );
            opcion1();
            return;
        }
        let apuesta: number = rs.questionInt(`Introduce una apuesta entre ${this.apuestaMinima} y ${this.apuestaMaxima}: `);
        while (
            apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima || apuesta > this.jugador.getSaldoTarj()
        ) {
            //console.log("Saldo disponible: " + this.jugador.getSaldoTarj())
            console.log(ConsoleColor.Red +`Apuesta inválida. Debe estar entre ${this.apuestaMinima} y ${this.apuestaMaxima}. y no puede superar  ${this.jugador.getSaldoTarj()} que es su saldo actual`+ ConsoleColor.Reset);
            apuesta = rs.questionInt('Intenta nuevamente: ');
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
           // console.log(this.jugador.getSaldoTarj())
            console.log(ConsoleColor.Green+'Ganaste apuesta x 5'+ConsoleColor.Reset);
        } else if (repetido === 4) {
            nuevoSaldo = this.jugador.getSaldoTarj() + (this.apuesta * 10)
            //console.log(this.jugador.getSaldoTarj())
            console.log('JACKPOT!!');
            console.log('GANASTE APUESTA X 10');
        } else {
            nuevoSaldo = this.jugador.getSaldoTarj() - this.apuesta;
            //console.log(this.jugador.getSaldoTarj())
            console.log('No tuviste suerte. Intenta de nuevo')
        }
        this.jugador.setSaldo(nuevoSaldo);
        console.log(`Saldo actual:`+ConsoleColor.Yellow + `${this.jugador.getSaldoTarj()}`+ConsoleColor.Reset);;
        fs.writeFileSync('saldo.txt', `${this.jugador.getSaldoTarj()}`);
    }
    jugar() {
        let seguir = true;
        while (seguir) {
            console.log(`** Tragamonedas  ${this.nombre}  **`);
            this.apuestaMinimaMaxima();
            const resultado = this.tirar();
            this.calcularResultado(resultado);
            const respuesta = rs.question(`Presione enter para Seguir / Escriba SALIR para terminar: `);
            console.clear();
            if (respuesta === null || respuesta.toLowerCase() == 'salir') {
                seguir = false;
                console.log(`Gracias por jugar!`);
            }
        }
    }
    
}
