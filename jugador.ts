import * as rs from 'readline-sync';
import * as fs from 'fs';
import { opcion3 } from '.';
import { passwJugador1 } from '.';
export class Jugador {
    private static inst: Jugador;
    private name: string;
    private saldo: number;
    private saldoTarjeta: number;
    private retirar: number;
    private static ARCHIVO_SALDO = 'saldo.txt';
    constructor(pName: string) {
        this.name = pName;
        this.saldo = 0;
        this.saldoTarjeta = 0;
        this.retirar = 0;
    }
    static getInstance(name: string = ''): Jugador {
        if (!Jugador.inst) {
            Jugador.inst = new Jugador(name);
        }
        return Jugador.inst;
    }
    setSaldoCarga() {
        let montoIngresado = rs.questionInt('¿Cuánto saldo quiere cargar?: ');
        while (montoIngresado < 100) {
            console.log('El monto no puede ser menor a 100 creditos');
            montoIngresado = rs.questionInt('¿Cuánto saldo quiere cargar?: ');
        }
        let saldoAnterior = fs.readFileSync('saldo.txt', 'utf-8')
        let parsedSaldo = parseInt(saldoAnterior);
        if (isNaN(parsedSaldo) || parsedSaldo === undefined) {
            parsedSaldo = 0;
        }
        //---------------------------------
        this.saldoTarjeta = (montoIngresado * 3) + parsedSaldo;
        fs.writeFileSync('saldo.txt', `${this.getSaldoTarj()}`)
        console.log(`Sus créditos son: ${this.getSaldoTarj()}`);
        this.guardarSaldo();
    }
    private guardarSaldo(): void {
        fs.writeFileSync('saldo.txt', `${this.getSaldoTarj()}`);
        rs.question(`presione unta tecla para ir a Juegos `)
        opcion3()
    }

    setSaldo(pSaldo: number): void {
        this.saldoTarjeta = pSaldo;
    }

    retiraEfectivo() {
        for (let i = 0; i < 3; i++) {
            let ingresar = rs.question("Ingrese su contraseña para retirar saldo: ")
            if (ingresar === passwJugador1) {
                let retirar = this.getSaldoTarj() / 3;
                this.saldo += parseFloat(retirar.toFixed(2));
                this.saldoTarjeta = 0;
                console.log(`Retiraste: $${parseFloat(retirar.toFixed(2))}.-`);
                this.guardarSaldo();


            } else {
                console.log("Contraseña incorrecta");
                rs.question("enter")
            }
        }


    }


    //agregado
    retiraEfectivoSalida() {
        for (let i = 0; i < 3; i++) {
            let ingresar = rs.question("Ingrese su contraseña para retirar saldo: ")
            if (ingresar === passwJugador1) {
                let retirar = this.getSaldoTarj() / 3;
                this.saldo += parseFloat(retirar.toFixed(2));
                this.saldoTarjeta = 0;
                console.log(`Retiraste: $${parseFloat(retirar.toFixed(2))}.-`);
                fs.writeFileSync('saldo.txt', `${this.getSaldoTarj()}`);
                break;


            } else {
                console.log("Contraseña incorrecta");
                rs.question("enter")
            }
        }


    }

    modificarSaldoTarj(cantidad: number) {
        this.saldoTarjeta += cantidad;
        //this.guardarSaldo();
    }
    getSaldoTarj() {
        return this.saldoTarjeta;
    }
    getName() {
        return this.name;
    }
    setName(pName: string) {
        this.name = pName;
        this.guardarSaldo();
    }

}