export abstract class Jugador{
    private name: string;
    private saldo: number;
    private saldoTarjeta: number;

    constructor(pName:string,pSaldo:number,pSaldoTarj:number) {
        this.name = pName;
        this.saldo = pSaldo;
        this.saldoTarjeta = pSaldoTarj;
    }

    getSaldo(){
        return this.saldo;
    }
    getSaldoTarj() {
        return this.saldoTarjeta;
    }
    getName() {
        return this.name;
    }
}