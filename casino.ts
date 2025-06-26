
export class Casino {
    private nombre: string;
    //private jugador:Jugador;
    //private juegos:Juegos[]

    constructor(pNombre: string) {
        this.nombre = pNombre
    }

    getNombre() {
        return this.nombre
    }

}