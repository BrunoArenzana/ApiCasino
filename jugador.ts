import * as rs from 'readline-sync';
import * as fs from 'fs';
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
        let nuevoSaldo=parseInt(saldoAnterior);
        console.log(nuevoSaldo)
        rs.question("tecla")
        //---------------------------------
        this.saldoTarjeta = (montoIngresado * 3) + nuevoSaldo;
        fs.writeFileSync('saldo.txt', `${this.getSaldoTarj()}`)
        console.log("Sus créditos son: ");
        this.guardarSaldo();
    }
    private guardarSaldo(): void {
    fs.writeFileSync('saldo.txt', `${this.getSaldoTarj()}`);
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
        rs.question("Presione enter")
        
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