export interface iApostar{
    saldo:number;
    apuesta:number;
    calcularGanancia():number;
    sumarSaldo():void;
    restarSaldo():void;
}