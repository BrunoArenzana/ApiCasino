import * as rs from 'readline-sync';
import * as fs from 'fs';
import { opcion3 } from '.';
export class Jugador {
    private static inst: Jugador;
    private name: string;
    private saldo: number;
    private saldoTarjeta: number;
    private retirar: number;
    protected jugador:Jugador;

    private static ARCHIVO_SALDO = 'saldo.txt';

    constructor(pName: string) {
        this.name = pName;
        this.saldo = 0;
        this.saldoTarjeta = 0;
        this.retirar = 0;
    }
    static getInstance(name: string = ""): Jugador {
        if (!Jugador.inst) {
            Jugador.inst = new Jugador(name);
        }
        return Jugador.inst;
    }

    setSaldoCarga() {
        //if undefine o number =0
        let montoIngresado = rs.questionInt("¿Cuánto saldo quiere cargar?: ");
        console.log(typeof(montoIngresado))
        while (montoIngresado < 100) {
            console.log("El monto no puede ser menor a 100");
            montoIngresado = rs.questionInt("¿Cuánto saldo quiere cargar*******?: ");
        }
        let saldoAnterior=fs.readFileSync('saldo.txt','utf-8')
        let parsedSaldo=parseInt(saldoAnterior);
        if(isNaN(parsedSaldo)){
            parsedSaldo=0;

        }
        
        console.log(parsedSaldo)
        rs.question("tecla")
        //---------------------------------
        this.saldoTarjeta = (montoIngresado * 3) + parsedSaldo;
        fs.writeFileSync('saldo.txt', `${this.getSaldoTarj()}`)
      
        console.log("Sus créditos son: ");
        this.guardarSaldo();
    }
    private guardarSaldo(): void {
    fs.writeFileSync('saldo.txt', `${this.getSaldoTarj()}`);
    opcion3()
    }

    setSaldo(pSaldo:number):void{
        this.saldoTarjeta = pSaldo;
    }
    retiraEfectivo() {
        let retirar = this.getSaldoTarj() / 3;
        this.saldo += retirar;
        this.saldoTarjeta = 0;
        console.log("Retiraste: " + retirar);
        this.guardarSaldo();
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

