import * as rs from 'readline-sync';
export class Tragamonedas {
    private nombre: string;
    private figuras: string[];
    private saldo:number;
    constructor(pNombre: string, pFiguras: string[], pSaldo:number) {
        this.nombre = pNombre;
        this.figuras = pFiguras
        this.saldo=pSaldo;
    }
    getNombre(){
        return this.nombre;
    }
    getSaldo(){
        return this.saldo;
    }

    public random(): string {
        const i = Math.floor(Math.random() * this.figuras.length);
        return this.figuras[i];
    }

    public tirar(): string[] {
        const rodillo1 = this.random();
        const rodillo2 = this.random();
        const rodillo3 = this.random();
        const rodillo4 = this.random();
        const resultado = [rodillo1, rodillo2, rodillo3, rodillo4];
        console.log(`   < ${rodillo1} - ${rodillo2} - ${rodillo3} - ${rodillo4} >`);

        return resultado;
    }

    public calcularResultado(resultado: string[]): void {

    let moneda:number=10
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
 
    if (repetido === 2) {
        this.saldo = (moneda * 3) + this.saldo; 
        console.log("Ganaste apuesta x 3", "Saldo = " + this.getSaldo() )
        ;
    } else if (repetido === 3) {
        this.saldo = (moneda * 5) + this.saldo;
        console.log("Ganaste apuesta x 5", "Saldo = " +this.getSaldo());
    } else if (repetido === 4) {
        this.saldo = (moneda * 10) + this.saldo;
        console.log("JACKPOT!!");
        console.log("GANASTE APUESTA X 10", "Saldo = " +this.getSaldo());
    } else {
        this.saldo = this.saldo -moneda;
        console.log("Intenta de nuevo", "Saldo = " +this.getSaldo());
    }
}
public jugar() {
    let seguir = true;
    while (seguir) {
        console.log("** Tragamonedas "+this.nombre+" **")
        this.calcularResultado(this.tirar());
        const respuesta = rs.question("Presione enter para Seguir / Escriba SALIR para terminar: ");
        console.clear()
        if (respuesta === null || respuesta.toLowerCase() == 'salir') {
            seguir = false;
            console.log("Gracias por jugar!");
        }
    }
}

}