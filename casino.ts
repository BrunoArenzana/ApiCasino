import * as rs from 'readline-sync';
export class Casino{
private nombre:string
private creditoCasino:number;

constructor(pNombre:string){
    this.nombre=pNombre
    this.creditoCasino=0;
    
}
getNombre(){
    return this.nombre
}
setNombre(nombre:string){
    this.nombre=nombre
};
getCreditoCasino(){
    return this.creditoCasino;
}
setCreditoCasino(credito:number){
    this.creditoCasino=credito
}

cargarCredito(){
console.log("$1.- = 3 Creditos Casino")
this.creditoCasino=rs.questionInt("Cuantos creditos quiere cargar?: ")
console.log("usted cargo "+ this.creditoCasino+ "Creditos")
    return this.creditoCasino;

}

recuperarCredito():number{

let dinero: number=this.getCreditoCasino()/3;
console.log("usted ha ganado "+dinero)
    return dinero
    

}
}