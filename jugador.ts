import * as rs from 'readline-sync';
export class Jugador{
    private name: string;
    private saldo: number;
    private saldoTarjeta: number;
    private retirar:number;

    constructor(pName:string
    ) {
        this.name = pName;
            }

    getSaldo(){
        return this.saldo;
    }
    setSaldoTarj(){
        let montoIngresado =rs.questionInt("Cuanto saldo quiere cargar?:")
        this.saldoTarjeta = montoIngresado * 3;
        console.log("su creditos son: " + this.saldoTarjeta);
        
    }
    retiraEfectivo(){
        let retirar = this.getSaldoTarj()/3;
        this.saldo += retirar;
        console.log("Retiraste"+this.retirar)
    }
    getSaldoTarj() {
        return this.saldoTarjeta;
    }
    getName() {
        return this.name;
    }
    setName(){

    }
}