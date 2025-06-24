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

    constructor(pNombre: string, pFiguras: string[], pApuestaMinima: number, pApuestaMaxima: number) {
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
    setNombre(pNombre:string):void{
        this.nombre = pNombre;
    }
    apuestaMinimaMaxima(): void {
        if (this.jugador.getSaldoTarj() < this.apuestaMinima) {
            console.log(ConsoleColor.Red + `No tiene creditos suficientes, debe comprar más creditos`+ ConsoleColor.Reset );
            opcion1();
            return;
        }
        let apuesta: number = rs.questionInt(`Introduce una apuesta entre ${this.apuestaMinima} y ${this.apuestaMaxima}: `);
        console.clear()//agregado para probar
        console.log(ConsoleColor.Green+`** Tragamonedas ${this.nombre} **`+ConsoleColor.Reset);
        while (
            apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima || apuesta > this.jugador.getSaldoTarj()
        ) {
            console.log(ConsoleColor.Red +`Apuesta inválida. Debe estar entre ${this.apuestaMinima} y ${this.apuestaMaxima}. y no puede superar ${this.jugador.getSaldoTarj()} que es sus creditos actuales`+ ConsoleColor.Reset);
            apuesta = rs.questionInt('Intenta nuevamente: ');
            console.clear();//agregado
            console.log(ConsoleColor.Green+`** Tragamonedas ${this.nombre} **`+ConsoleColor.Reset);

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
            nuevoSaldo = this.jugador.getSaldoTarj() + (this.apuesta * 3.5)
            console.log(ConsoleColor.Green+'Ganaste apuesta x 3.5 !'+ConsoleColor.Reset);
        } else if (repetido === 4) {
            nuevoSaldo = this.jugador.getSaldoTarj() + (this.apuesta * 7)
            console.log(ConsoleColor.Green+'JACKPOT!!'+ConsoleColor.Reset);
            console.log(ConsoleColor.Green+'GANASTE APUESTA X 7'+ConsoleColor.Reset);
        } else {
            nuevoSaldo = this.jugador.getSaldoTarj() - this.apuesta;
            console.log('No tuviste suerte. Intenta de nuevo')
        }
        this.jugador.setSaldo(nuevoSaldo);
        console.log(`creditos actuales: `+ConsoleColor.Yellow + `${this.jugador.getSaldoTarj()}`+ConsoleColor.Reset);;
        fs.writeFileSync('saldo.txt', `${this.jugador.getSaldoTarj()}`);
    }
    jugar() {
        let seguir = true;
        while (seguir) {
            console.log(ConsoleColor.Green+`** Tragamonedas ${this.nombre} **`+ConsoleColor.Reset);

            this.apuestaMinimaMaxima();
            console.log("-----------------------")//agregado
            const resultado = this.tirar();
            console.log("-----------------------")//agregado
            this.calcularResultado(resultado);
            const respuesta = rs.question(`Presione` + ConsoleColor.Green+ ` ENTER`+ConsoleColor.Reset+` para Seguir o escriba` + ConsoleColor.Red+ ` SALIR`+ ConsoleColor.Reset+` para terminar: `);
            console.clear();
            if (respuesta === null || respuesta.toLowerCase() == 'salir') {
                seguir = false;
                console.log(+ConsoleColor.Green+`Gracias por jugar!`+ConsoleColor.Reset);
            }
        }
    }
    
}
