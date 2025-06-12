import * as fs from 'fs';

export class Juego{

    private nombre:string;
    private saldo:number;

    constructor(pNombre:string,pSaldo:number){
        this.nombre=pNombre;
        this.saldo=pSaldo;
    }
    
    public jugar():void{
        let resultado:number = 0;
        if(Math.random() > 0.5){
            resultado = 1000 //gano
        }else{
            resultado = -500 // perdio
        }
            this.saldo+=resultado;
        
        let resultadoString:string = ""

        fs.appendFileSync('archivo.txt', '\n'+(this.saldo).toString());
    }
}


let nuevoJuego = new Juego("Braian",5000);
nuevoJuego.jugar();
//Se ha(n) compartido en


//
import * as f
s from 'fs';
/*
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
*/
let saldo:number = 100;
let saldofinal:string = "segundo intento de grabar el saldo final: "+saldo;

//fs.writeFileSync('archivo.txt',saldofinal);
let infoNueva:string = "esta es informacion nueva";

//fs.appendFileSync('archivo.txt','\n'+infoNueva);
//let infoDelTxt = fs.readFileSync('archivo.txt','utf-8');
//console.log(infoDelTxt);

//let palabras:string[] = infoDelTxt.split(" ");
//console.table(palabras);

if(fs.existsSync('archivo3.txt')){
    console.log("existe");
}else{
    console.log("no existe");
}
//fs.writeFileSync('archivo2.txt',saldofinal);