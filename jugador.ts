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

    private guardarSaldo(): void {

        const datos = {
            name: this.name,
            saldo: this.saldo,
            saldoTarjeta: this.saldoTarjeta
        };
        fs.writeFileSync(Jugador.ARCHIVO_SALDO, JSON.stringify(datos));
    }


    private cargarSaldo(): void {

        if (fs.existsSync(Jugador.ARCHIVO_SALDO)) {
            const datos = fs.readFileSync(Jugador.ARCHIVO_SALDO, 'utf-8');
            if (datos) {
                //modificado antes de Karen
                const { name,saldo, saldoTarjeta } = JSON.parse(datos);
                this.name = name || this.name;
                this.saldo = saldo || 0;
                this.saldoTarjeta = saldoTarjeta || 0;
            }
        }

    }

    setSaldoCarga() {
        let montoIngresado = rs.questionInt("¿Cuánto saldo quiere cargar?: ");
        while (montoIngresado < 100) {
            console.log("El monto no puede ser menor a 100");
            montoIngresado = rs.questionInt("¿Cuánto saldo quiere cargar?: ");
        }
        this.saldoTarjeta = montoIngresado * 3;
        console.log("Sus créditos son: " + this.saldoTarjeta);
        this.guardarSaldo();
    }

    setSaldo(pSaldo:number){
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

