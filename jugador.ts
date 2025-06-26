import * as rs from 'readline-sync';
import * as fs from 'fs';
import { opcion3, salir } from '.';
import { passwJugador1 } from '.';
import { ConsoleColor } from './consoleColor';
export class Jugador {
    static inst: Jugador;
    private name: string;
    private saldo: number;
    private saldoTarjeta: number;
    //declaracion del archivo txt
    private static ARCHIVO_SALDO = 'saldo.txt';
    
    private constructor(pName: string) {
        this.name = pName;
        this.saldo = 0;
        this.saldoTarjeta = 0;
    }
    // Patron de diseño Singleton 
    static getInstance(name: string = ''): Jugador {
        if (!Jugador.inst) {
            Jugador.inst = new Jugador(name);
        }
        return Jugador.inst;
    }
    setSaldoCarga() {
        console.log(ConsoleColor.Bold + ConsoleColor.Yellow + `            $1 = 3 creditos` + ConsoleColor.Reset)
        let montoIngresado = rs.questionInt(ConsoleColor.Italic + ConsoleColor.Green + '...Cuanto saldo quiere cargar?: ' + ConsoleColor.Reset + ConsoleColor.Reset);
        while (montoIngresado < 100) {
            console.clear();
            console.log(ConsoleColor.Red + 'El monto no puede ser menor a 100 creditos' + ConsoleColor.Reset);
            console.log(ConsoleColor.Bold + ConsoleColor.Yellow + `          $1 = 3 creditos` + ConsoleColor.Reset)
            montoIngresado = rs.questionInt(ConsoleColor.Italic + ConsoleColor.Green + '...Cuanto saldo quiere cargar?: ' + ConsoleColor.Reset + ConsoleColor.Reset);
        }
        let saldoAnterior = fs.readFileSync('saldo.txt', 'utf-8')
        let parsedSaldo = parseInt(saldoAnterior);
        if (isNaN(parsedSaldo) || parsedSaldo === undefined) {
            parsedSaldo = 0;
        }
        //---------------------------------
        this.saldoTarjeta = (montoIngresado * 3) + parsedSaldo;
        fs.writeFileSync('saldo.txt', `${this.getSaldoTarj()}`)
        console.log(`Sus créditos son: ` + ConsoleColor.Yellow + `${this.getSaldoTarj()}` + ConsoleColor.Reset);
        this.guardarSaldo();
    }
    private guardarSaldo(): void {
        fs.writeFileSync('saldo.txt', `${this.getSaldoTarj()}`);
        rs.question(`presione` + ConsoleColor.Green + ` ENTER` + ConsoleColor.Reset + ` para ir a Juegos `)
        opcion3()
    }
    setSaldo(pSaldo: number): void {
        this.saldoTarjeta = pSaldo;
    }
    retiraEfectivo() {
        let intentos: number = 3
        for (let i = 3; i >= 0; i--) {
            let ingresar = rs.question(ConsoleColor.Blue + "Ingrese su password para retirar saldo: " + ConsoleColor.Reset, { hideEchoBack: true });
            if (ingresar === passwJugador1) {
                let retirar = this.getSaldoTarj() / 3;
                this.saldo += parseFloat(retirar.toFixed(2));
                this.saldoTarjeta = 0;
                console.log(`Retiraste: ` + ConsoleColor.Yellow + `$${parseFloat(retirar.toFixed(2))}.-` + ConsoleColor.Reset);
                this.guardarSaldo();


            } else {
                intentos--
                console.log(ConsoleColor.Red + "password incorrecta" + ConsoleColor.Reset);
                console.log("Tiene " + ConsoleColor.Red + intentos + ConsoleColor.Reset + " si no ingresa la password correcta perdera su saldo")
                if (intentos === 0) {
                    console.log(ConsoleColor.Red + "no puede recuperar su saldo" + ConsoleColor.Reset)
                    console.log(ConsoleColor.Red + "cuenta bloqueada, debe salir del casino" + ConsoleColor.Reset)

                    salir()
                }
            }
        }
    }
    retiraEfectivoSalida() {
        let intentos: number = 3
        for (let i = 3; i >= 0; i--) {
            let ingresar = rs.question("Ingrese su password para retirar saldo: ", { hideEchoBack: true });
            if (ingresar === passwJugador1) {
                let retirar = this.getSaldoTarj() / 3;
                this.saldo += parseFloat(retirar.toFixed(2));
                this.saldoTarjeta = 0;
                console.log(`Retiraste: ` + ConsoleColor.Yellow + `$${parseFloat(retirar.toFixed(2))}.-` + ConsoleColor.Reset);
                fs.writeFileSync('saldo.txt', `${this.getSaldoTarj()}`);
                break;
            } else {
                intentos--
                console.log(ConsoleColor.Red + "password incorrecta" + ConsoleColor.Reset);
                console.log("Tiene " + ConsoleColor.Red + intentos + ConsoleColor.Reset + " si no ingresa la password correcta perdera su saldo")
                if (intentos === 0) {
                    console.log(ConsoleColor.Red + "No puede recuperar su saldo" + ConsoleColor.Reset)
                    console.log(ConsoleColor.Red + "cuenta bloqueada, debe salir del casino" + ConsoleColor.Reset)

                    salir()
                }
            }
        }
    }
    modificarSaldoTarj(cantidad: number) {
        this.saldoTarjeta += cantidad;       
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