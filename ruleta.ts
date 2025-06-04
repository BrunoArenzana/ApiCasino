import * as rs from 'readline-sync';
import { Jugador } from './jugador';
import { iApostar } from './iApostar';
import { opcion1 } from '.';
import * as fs from 'fs'; //adapter mediante un interface


export class Ruleta implements iApostar {
    // Colores para la consola, ponemos el nombre del color + "texto a cambiar color " + reset (el reset, ejecuta el final del cambio de color!)
    private RESET = "\x1b[0m";
    private ROJO = "\x1b[31m";
    private VERDE = "\x1b[32m";
    private AMARILLO = "\x1b[33m";
    private AZUL = "\x1b[34m";
    private MAGENTA = "\x1b[35m";
    private CIAN = "\x1b[36m";

    // propios de nuestra ruleta
    private saldo: number;
    private rojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]; // Guardo los rojos en un arreglo (buscado en "https://www.casino.es/ruleta/como-jugar-ruleta/")
    private ultimoNumero: number | null = null;
    private ultimoColor: string | null = null;  // lo uso cuando le asigno this.ultimoColor=color, no se poe que queda en gris...
    private apuestasActuales: Array<{ tipo: 'numero' | 'color' | 'par-impar'; opcion: string | number; monto: number; }> = []; // creo el arreglo para guardar las apuestas xq pueden ser varias diferentes!
    private jugador: Jugador;
    private apuestaMinima = 50;
    private apuestaMaxima = 1001;
    
    constructor(pJugador: Jugador) {
        if (!pJugador) throw new Error("Jugador requerido");
        this.jugador = pJugador;
        this.saldo = this.jugador.getSaldoTarj();
    }    
    apuestaMinimaMaxima(): void {
        if(this.jugador.getSaldoTarj() < this.apuestaMinima) {
            console.log("No tiene saldo suficiente, debe comprar más saldo");
        opcion1();
        }
    }    
    public jugar(): void {
        console.log(`Bienvenido a la Ruleta Loca!!! Saldo inicial: $${this.saldo}`);
        this.apuestaMinimaMaxima();

        while (this.saldo > 0) {
            this.mostrarMenu();
            const opcion = rs.question('Opcion: ');

            switch (opcion) {
                //usamos los Break para cortar la ejecucion al seleccionar, salvo en opcion invalida, se va a repetir hasta seleccionar una opcion valida
                case '1': this.agregarApuesta(); break;
                case '2': this.mostrarApuestas(); break;
                case '3': this.girarRuleta(); break;
                case '4': return this.terminarJuego();
                default: console.log('Opcion inválida');
            }
        }
        console.log('\n¡Te quedaste sin saldo! Fin del juego.');
    }
    private mostrarMenu() {
        let total: number;
        //usamos un color asignado al principio y reseteamos el color 
        console.log(this.ROJO + '\n=== MENU PRINCIPAL ===' + this.RESET);
        console.log('1. Agregar apuesta');
        console.log('2. Ver apuestas');
        console.log('3. Girar ruleta');
        console.log('4. Salir');
        total = this.calcularMontoApuestas();
        console.log(this.MAGENTA + `Saldo actual: $${this.jugador.getSaldoTarj()-total}` + this.RESET);
        }

    private calcularMontoApuestas(): number{
        let total: number = 0;   
        this.apuestasActuales.forEach(apuesta => {
        total+=apuesta.monto        
        });
        return total;
    }
    private agregarApuesta() {
        //usamos un color asignado al principio y reseteamos el color 
        console.log(this.ROJO + '\n=== TIPOS DE APUESTA ===' + this.RESET);
        console.log(this.VERDE + '1. Número (0-36)' + this.RESET);
        console.log(this.AZUL + '2. Color (rojo/negro)' + this.RESET);
        console.log(this.CIAN + '3. Par/Impar' + this.RESET);

        const tipo = rs.question('Tipo de apuesta (1-3): ');
        let opcion: string | number=0;
        let tipoApuesta: 'numero' | 'color' | 'par-impar' ="color"; // asigno por defecto por que el doWhile me rompe el alma
        //el tipo de apuesta
        //dependiento del tipo de apuesta elegimos en switch
        switch (tipo) {
            case '1':
                tipoApuesta = 'numero';
                do {
                    opcion = rs.questionInt('Numero (0-36): ');
                    if (opcion < 0 || opcion > 36) {
                        console.log('Número inválido. Debe ser entre 0 y 36');
                        
                    }
                } while (opcion < 0 || opcion > 36)
                break;

            case '2':
                tipoApuesta = 'color';
                do{
                opcion = rs.question('Color (rojo/negro): ').toLowerCase();
                    if (opcion !== 'rojo' && opcion !== 'negro') {
                        //la opcion si o si tiene que se o negro o rojo, que son los colores de las ruletas, el verde se lo reserva la casa!
                        console.log('Color inválido. Debe ser "rojo" o "negro"');
                    }
                } while (opcion !== 'rojo' && opcion !== 'negro')
                break;

            case '3':
                tipoApuesta = 'par-impar';
                do {
                    opcion = rs.question('Par o impar: ').toLowerCase();
                    if (opcion !== 'par' && opcion !== 'impar') {
                        //la opcion debe ser par o impar, si no, no podra continuar y volvera a preguntar
                        console.log('Opción inválida. Debe ser "par" o "impar"');
                    }
                } while (opcion !== 'par' && opcion !== 'impar');
                break;

            default:
                console.log('Opción inválida');
                this.agregarApuesta();
                break;
        }
        let montoActualizado: number = this.calcularMontoApuestas();
        console.log(`Ingrese el monto a apostar (saldo disponible: $${this.saldo-montoActualizado})`);
        const monto = rs.questionFloat('Monto: ');

        if (monto <= this.apuestaMinima || monto > this.saldo - montoActualizado || monto>=this.apuestaMaxima) {
            
            //verificamos el monto de la apuesta , que no sea menor a 0 ni mayor al saldo actual
            console.log(`Monto inválido. La apuesta minima es de ${this.apuestaMinima}, la maxima es de ${this.apuestaMaxima} y no mayor a su saldo`);
            return;
        }
        this.apuestasActuales.push({ tipo: tipoApuesta, opcion, monto });
        //guardamos la apuesta generada en un arreglo, por que puede haber mas de 1 apuesta
        console.log(`Apuesta agregada: $${monto} a ${opcion}`);
    }
    private mostrarApuestas() {
        if (this.apuestasActuales.length === 0) {
            console.log('\nNo hay apuestas actuales');
            return;
        }

        console.log('\n=== APUESTAS ACTUALES ===');
        this.apuestasActuales.forEach((apuesta, i) => {
            console.log(`${i + 1}. $${apuesta.monto} a ${apuesta.opcion} (${apuesta.tipo})`);
        });
    }
    private girarRuleta() {
        if (this.apuestasActuales.length === 0) {
            console.log('\nNo hay apuestas para jugar');
            return;
        }

        const numero = Math.floor(Math.random() * 37); // hasta el 37 para que el maximo sea el 36!!
        const color = this.determinarColor(numero);
        const esPar = numero !== 0 && numero % 2 === 0;

        this.ultimoNumero = numero;
        this.ultimoColor = color;

        console.log(this.ROJO + `\n=== RESULTADO ===` + this.RESET);
        console.log(this.AMARILLO + `Número: ${numero} ${color} - ${numero === 0 ? 'cero' : esPar ? 'par' : 'impar'}` + this.RESET);

        this.verificarApuestas();
        this.apuestasActuales = [];
    }

    private verificarApuestas() {
        if (this.ultimoNumero === null) return;

        const numero = this.ultimoNumero;
        const color = this.determinarColor(numero);
        const esPar = numero !== 0 && numero % 2 === 0;
        let gananciaTotal = 0;

        console.log(this.VERDE + '\n=== RESULTADOS de Tus Apuestas!!! ===' + this.RESET);
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
                `$${apuesta.monto} a ${apuesta.opcion} (${apuesta.tipo}): ` +
                `${gano ? 'GANADA' : 'PERDIDA'} ` +
                `${gananciaNeta >= 0 ? '+' : ''}$${gananciaNeta+apuesta.monto}`
            );
        });

        this.saldo += gananciaTotal;
          this.jugador.setSaldo(this.saldo);
              
                fs.writeFileSync('saldo.txt', `${this.saldo}`);
        
        console.log(`\nSaldo actual: $${this.saldo}`);
    }

    private determinarColor(numero: number): string {
        return numero === 0 ? 'verde' :
            this.rojos.includes(numero) ? 'rojo' : 'negro';
    }

    private terminarJuego() {
        console.log(`\nGracias por jugar! Saldo final: $${this.saldo}`);
    }

}