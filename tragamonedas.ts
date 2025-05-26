
export class Tragamonedas {
    private nombre: string;
    private figuras: string[];
    constructor(pNombre: string, pFiguras: string[]) {
        this.nombre = pNombre;
        this.figuras = pFiguras
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
        console.log(`< ${rodillo1} - ${rodillo2} - ${rodillo3} - ${rodillo4} >`);

        return resultado;
    }

    public calcularResultado(resultado: string[]): void {
    let saldo =100
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
        saldo = (moneda * 3) + saldo; 
        console.log("Ganaste apuesta x 3", "Saldo = " +saldo)
        ;
    } else if (repetido === 3) {
        saldo = (moneda * 5) + saldo;
        console.log("Ganaste apuesta x 5", "Saldo = " +saldo);
    } else if (repetido === 4) {
        saldo = (moneda * 10) + saldo;
        console.log("JACKPOT!!");
        console.log("GANASTE APUESTA X 10", "Saldo = " +saldo);
    } else {
        saldo = saldo -moneda
        console.log("Intenta de nuevo", "Saldo = " +saldo);
    }
}

}