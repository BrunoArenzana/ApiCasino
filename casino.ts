import { Juegos } from './abstractJuegos';
import { Jugador } from './jugador';
export class Casino {
    private nombre: string;
    //private jugador:Jugador;
    //private juegos:Juegos[]


    //private creditoCasino:number;

    constructor(pNombre: string) {
        this.nombre = pNombre
    }

    getNombre() {
        return this.nombre
    }

    setNombre(nombre: string) {
        this.nombre = nombre
    };

}