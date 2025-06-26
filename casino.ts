
export class Casino {
    private nombre: string;

    constructor(pNombre: string) {
        this.nombre = pNombre
    }
    getNombre() {
        return this.nombre
    }
}