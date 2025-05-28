import * as rs from "readline-sync";
import { Casino } from "./casino";
import { TragamonedasLogo } from "./tragamonedas1";
import { TragamonedasNumeros } from "./tragamonedas2";
let casino1 = new Casino("Casino 404");
import { Ruleta } from "./ruleta";

function elegirTarea() {    
    console.clear();
    console.log("* Bienvenidos al Casino " + casino1.getNombre());
    console.log("1- Cargar créditos");
    console.log("2- Cobrar créditos");
    console.log("3- Jugar");
    console.log("4- Salir del Casino");
}

function opcion1() {
    casino1.cargarCredito();
}

function opcion2() {
    casino1.recuperarCredito();
}

function opcion3() {
    let salir = false;
    while (!salir) {
        console.clear();
        console.log("** Menú de Juegos **");
        console.log("1- Jugar Ruleta");
        console.log("2- Jugar Mayor/Menor");
        console.log("3- Jugar Tragamonedas");
        console.log("4- Volver al Menú Principal");

        let opcionJuego = rs.questionInt("Seleccionar juego (1-4): ");
        switch (opcionJuego) {
            case 1:
                jugarRuleta();
                break;
            case 2:
                jugarMayorMenor();
                break;
            case 3:
                submenuTragamonedas();
                break;
            case 4:
                salir = true;
                break;
            default:
                console.log("Opción inválida. Intente de nuevo.");
        }
    }
}

function submenuTragamonedas() {
    let salir = false;
    while (!salir) {
        console.clear();
        console.log("==Estas en Tragamonedas==");
        console.log("1- Jugar Tragamonedas 1");
        console.log("2- Jugar Tragamonedas 2");
        console.log("3- Volver al menú anterior");

        let opcionTraga = rs.questionInt("Seleccionar juego (1-3): ");
        switch (opcionTraga) {
            case 1:
                jugarTragamonedas1();
                break;
            case 2:
                jugarTragamonedas2();
                break;
            case 3:
                salir = true;
                break;
            default:
                console.log("Opción inválida. Intente de nuevo.");
        }
        
    }
}

function jugarRuleta() {
    console.log("Has seleccionado jugar a la Ruleta.");
    const ruleta = new Ruleta(1000);
    ruleta.jugar();
}

function jugarMayorMenor() {
    console.log("Has seleccionado jugar a Mayor/Menor.");
    //mayor y menor
}
function jugarTragamonedas1() {
    console.clear();
   
    const tragamonedasF =  new TragamonedasLogo();
    tragamonedasF.jugar();
    console.log("Has seleccionado jugar: ");
}   

function jugarTragamonedas2() {
    console.clear();
    const tragamonedasN =  new TragamonedasNumeros();
    tragamonedasN.jugar();
    console.log("Has seleccionado jugar :");
}   

function salir() {
    console.log("Gracias por Jugar en ." + casino1.getNombre());
}

function ejecutarMenu() {
    while (true) {
        elegirTarea();
        let opcion = rs.questionInt("Seleccionar Tarea (1-4): ");
        switch (opcion) {
            case 1:
                opcion1();
                break;
            case 2:
                opcion2();
                break;
            case 3:
                opcion3();
                break;
            case 4:
                salir();
                return;
            default:
                console.log("Opción inválida. Por favor, selecciona un número entre 1 y 4.");
        }
    }
}

ejecutarMenu();
