import * as rs from 'readline-sync';
import { Jugador } from './jugador';
import { iApostar } from './iApostar';
import { opcion1 } from '.';
import * as fs from 'fs';
import { Juegos } from './abstractJuegos';
import { ConsoleColor } from './consoleColor';



export class Ruleta extends Juegos implements iApostar {
    // propios de nuestra ruleta
    private saldo: number;
    private rojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]; // Guardo los rojos en un arreglo (buscado en "https://www.casino.es/ruleta/como-jugar-ruleta/")
    private ultimoNumero: number | null = null;
    private ultimoColor: string | null = null;  // lo uso cuando le asigno this.ultimoColor=color, no se poe que queda en gris...
    private apuestasActuales: Array<{ tipo: 'numero' | 'color' | 'par-impar'; opcion: string | number; monto: number; }> = []; // creo el arreglo para guardar las apuestas xq pueden ser varias diferentes!
    protected jugador: Jugador;
    private apuestaMinima = 50;
    private apuestaMaxima = 1000;

    constructor(pJugador: Jugador) {
        super()
        if (!pJugador) throw new Error("Jugador requerido");
        this.jugador = pJugador;
        this.saldo = this.jugador.getSaldoTarj();
    }
    //apuesta minimaMaxima verifica que el saldo de la tarjeta sea mayor al minimo requerido por el juego
    apuestaMinimaMaxima(): void {
        if (this.jugador.getSaldoTarj() < this.apuestaMinima) {
            console.log(ConsoleColor.Red + "No tiene saldo suficiente, debe comprar más saldo" + ConsoleColor.Reset);
            opcion1();
        }
    }
    //jugar es el unico metodo publico, desde ahi llamamos al resto de los metodos de la ruleta segun cada opcion
    jugar(): void {
        console.log(ConsoleColor.Green + `Bienvenido a la Ruleta Loca!!! Saldo inicial: $${this.saldo}` + ConsoleColor.Reset);
        this.apuestaMinimaMaxima();
        //verificamos que mientras el saldo sea mayor que 0 pesos, nos muestre el menu de juego con las opciones
        while (this.saldo >= 0) {
            this.mostrarMenu();
            const opcion = rs.question('Opcion: ');

            switch (opcion) {
                //usamos los Break para cortar la ejecucion al seleccionar, salvo en opcion invalida, se va a repetir hasta seleccionar una opcion valida
                case '1': this.agregarApuesta(); break;
                case '2': this.mostrarApuestas(); break;
                case '3': this.girarRuleta(); break;
                case '4': return this.terminarJuego(); break;
                default: console.log(ConsoleColor.Red + `Opción inválida. Intente de nuevo opciones 1 a 4.` + ConsoleColor.Reset);
                    rs.question(`Presione` + ConsoleColor.Green + ` ENTER` + ConsoleColor.Reset + ` para Seguir`);
            }
        }
        console.log(ConsoleColor.Red+'\n¡Te quedaste sin saldo! Fin del juego.'+ConsoleColor.Reset);
    }
    private mostrarMenu() {
        let total: number;
        console.log(ConsoleColor.Green + '\n=== MENU PRINCIPAL ===' + ConsoleColor.Reset);
        console.log(ConsoleColor.Magenta + '1-' + ConsoleColor.Reset + ' Agregar apuesta');
        console.log(ConsoleColor.Magenta + '2-' + ConsoleColor.Reset + ' Ver apuestas');
        console.log(ConsoleColor.Magenta + '3-' + ConsoleColor.Reset + ' Girar ruleta');
        console.log(ConsoleColor.Magenta + '4-' + ConsoleColor.Reset + ' Salir');
        total = this.calcularMontoApuestas();
        console.log(ConsoleColor.Green + `Credito actual: `+ConsoleColor.Reset+ConsoleColor.Yellow+` ${this.jugador.getSaldoTarj() - total}`+ConsoleColor.Reset);
    }
    private calcularMontoApuestas(): number {
        let total: number = 0;
        this.apuestasActuales.forEach(apuesta => {
            total += apuesta.monto
        });
        return total;
    }
    private agregarApuesta() {
        
        //usamos un color asignado al principio y reseteamos el color 
        console.log(ConsoleColor.Green+'\n=== TIPOS DE APUESTA ==='+ConsoleColor.Reset);
        console.log(ConsoleColor.Magenta+'1'+` -`+ConsoleColor.Reset+ 'Número (0-36)');
        console.log(ConsoleColor.Magenta+'2'+` -`+ ConsoleColor.Reset+'Color (rojo/negro)');
        console.log(ConsoleColor.Magenta+'3'+` -`+ ConsoleColor.Reset+'Par/Impar');

        const tipo = rs.question('Tipo de apuesta (1-3): ');
        let opcion: string | number = 0;
        let tipoApuesta: 'numero' | 'color' | 'par-impar' = "color"; // asigno por defecto por que el doWhile me rompe el alma
        //el tipo de apuesta
        //dependiento del tipo de apuesta elegimos en switch
        switch (tipo) {
            case '1':
                tipoApuesta = 'numero';
                do {
                    opcion = rs.questionInt('Numero (0-36): ');
                    if (opcion < 0 || opcion > 36) {
                        console.log(ConsoleColor.Red+'Número inválido. Debe ser entre 0 y 36'+ConsoleColor.Reset);

                    }
                } while (opcion < 0 || opcion > 36)
                break;

            case '2':
                tipoApuesta = 'color';
                do {
                    opcion = rs.question('Color (rojo/negro): ').toLowerCase();
                    if (opcion !== 'rojo' && opcion !== 'negro') {
                        //la opcion si o si tiene que se o negro o rojo, que son los colores de las ruletas, el verde se lo reserva la casa!
                        console.log(ConsoleColor.Red+'Color inválido. Debe ser "rojo" o "negro"'+ConsoleColor.Reset);
                    }
                } while (opcion !== 'rojo' && opcion !== 'negro')
                break;

            case '3':
                tipoApuesta = 'par-impar';
                do {
                    opcion = rs.question('Par o impar: ').toLowerCase();
                    if (opcion !== 'par' && opcion !== 'impar') {
                        //la opcion debe ser par o impar, si no, no podra continuar y volvera a preguntar
                        console.log(+ConsoleColor.Red+'Opción inválida. Debe ser "par" o "impar"'+ConsoleColor.Reset);
                    }
                } while (opcion !== 'par' && opcion !== 'impar');
                break;

            default:
                console.log('Opción inválida');
                this.agregarApuesta();
                break;
        }
        //monto actualizado matiene el saldo actualizado descontando el valor del arreglo de apuestas
        let montoActualizado: number = this.calcularMontoApuestas();
        console.log(`Ingrese el monto a apostar ` + ConsoleColor.Yellow+`credito disponible: ${this.saldo - montoActualizado}`)+ConsoleColor.Reset;
        const monto = rs.questionFloat('Monto: ');

        if (monto < this.apuestaMinima || monto > this.saldo - montoActualizado || monto > this.apuestaMaxima) {
            //verificamos el monto de la apuesta , que no sea menor a 0 ni mayor al saldo actual
            console.log(ConsoleColor.Red+`Monto inválido.`+ConsoleColor.Reset+` La apuesta minima es de ${this.apuestaMinima}, la maxima es de ${this.apuestaMaxima} y no menor a su saldo`);
            return;
        }
        this.apuestasActuales.push({ tipo: tipoApuesta, opcion, monto });
        //guardamos la apuesta generada en un arreglo, por que puede haber mas de 1 apuesta
        console.log(ConsoleColor.Green+`Apuesta agregada: `+ConsoleColor.Reset+ConsoleColor.Yellow+` ${monto} creditos `+ConsoleColor.Reset+`al ${opcion}`);
    }
    private mostrarApuestas() {
        if (this.apuestasActuales.length === 0) {
            console.log('\nNo hay apuestas actuales');
            return;
        }

        console.log(ConsoleColor.Green+'\n=== APUESTAS ACTUALES ==='+ConsoleColor.Reset);
        this.apuestasActuales.forEach((apuesta, i) => {
            console.log(`${i + 1}. ${apuesta.monto} a ${apuesta.opcion} (${apuesta.tipo})`);
        });
    }
    private girarRuleta() {
        if (this.apuestasActuales.length === 0) {
            console.log(+ConsoleColor.Red+'\nNo hay apuestas para jugar'+ConsoleColor.Reset);
            return;
        }

        const numero = Math.floor(Math.random() * 37); // hasta el 37 para que el maximo sea el 36!!
        const color = this.determinarColor(numero);
        const esPar = numero !== 0 && numero % 2 === 0;

        this.ultimoNumero = numero;
        this.ultimoColor = color;

        console.log(ConsoleColor.Green+`\n=== RESULTADO ===`+ ConsoleColor.Reset);
        console.log(`Número: ${numero} ${color} - ${numero === 0 ? 'cero' : esPar ? 'par' : 'impar'}`);

        this.verificarApuestas();
        this.apuestasActuales = [];
    }
    private verificarApuestas() {
        if (this.ultimoNumero === null) return;

        const numero = this.ultimoNumero;
        const color = this.determinarColor(numero);
        const esPar = numero !== 0 && numero % 2 === 0;
        let gananciaTotal = 0;

        console.log(ConsoleColor.Green+'\n=== RESULTADOS de Tus Apuestas!!! ==='+ConsoleColor.Reset);
        this.apuestasActuales.forEach(apuesta => {
            let gano = false;
            let multiplicador = 1;

            switch (apuesta.tipo) {
                case 'numero':
                    if (numero === apuesta.opcion) {
                        multiplicador = 36;
                        gano = true;
                    }
                    break;

                case 'color':
                    if (color === apuesta.opcion) {
                        multiplicador = 2;
                        gano = true;
                    }
                    break;

                case 'par-impar':
                    if ((apuesta.opcion === 'par' && esPar) ||
                        (apuesta.opcion === 'impar' && !esPar && numero !== 0)) {
                        multiplicador = 2;
                        gano = true;
                    }
                    break;
            }
            const gananciaNeta = gano ? (apuesta.monto * multiplicador - apuesta.monto) : -apuesta.monto;
            gananciaTotal += gananciaNeta;

            //use interpolacion ternaria, comparamos el valor del atribo con una condicion, si no, es la otra opcion, lo vimos con marcelo 1 clase y luego
            //en tutorias con Rafa!
            console.log(
                `creditos apostados ${apuesta.monto} al ${apuesta.opcion} (${apuesta.tipo}): ` +
                `${gano ? 'GANADA' : 'PERDIDA'} ` +
                `${gananciaNeta >= 0 ? '+' : ''}${gananciaNeta + apuesta.monto} creditos`
            );
        });

        this.saldo += gananciaTotal;
        this.jugador.setSaldo(this.saldo);

        fs.writeFileSync('saldo.txt', `${this.saldo}`);

        console.log(`\nCredito actual: `+ConsoleColor.Yellow+`${this.saldo}`+ConsoleColor.Reset);
    }

    private determinarColor(numero: number): string {
        return numero === 0 ? 'verde' :
            this.rojos.includes(numero) ? 'rojo' : 'negro';
    }

    private terminarJuego() {
        console.log(+ConsoleColor.Green+`\nGracias por jugar!`+ConsoleColor.Reset+` Saldo final: `+ConsoleColor.Yellow + `$${this.saldo}`+ConsoleColor.Reset);
    }

public getApuestaMinima(): number {
  return this.apuestaMinima;
}

public setApuestaMinima(valor: number): void {
  this.apuestaMinima = valor;
}

public getApuestaMaxima(): number {
  return this.apuestaMaxima;
}

public setApuestaMaxima(valor: number): void {
  this.apuestaMaxima = valor;
}
}