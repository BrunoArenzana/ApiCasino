import { Juegos } from './juegos';
import { Jugador } from './jugador';
export class Casino{
private nombre:string;
//private jugador:Jugador;
//private juegos:Juegos[]


//private creditoCasino:number;

constructor(pNombre:string){
    this.nombre=pNombre

    
}

getNombre(){
    return this.nombre
}
setNombre(nombre:string){
    this.nombre=nombre
};


/*getComprarCreditoTarjeta(){
    return this.jugador.getSaldoTarj()
};



getCambiarSaldoTarjeta(){
    return this.jugador.getSaldo()

};*/

}