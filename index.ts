import * as rs from "readline-sync";
import { Casino } from "./casino";
import { Jugador } from "./jugador";
import { TragamonedasLogo } from "./tragamonedas1";
import { TragamonedasNumeros } from "./tragamonedas2";
import { MayorMenor } from './mayorMenor';
import { Ruleta } from "./ruleta";
import { Login } from "./login";

let casino1 = new Casino(`Casino 404`);


let nombreJugador1:string = rs.question(`Ingrese su nombre: `);
let edadJugador1:number = rs.questionInt(`Ingrese su edad: `);
export let passwJugador1:string = rs.question(`Ingrese su Ingrese una contraseña: `,{ hideEchoBack: true  });

const login1 = new Login(nombreJugador1,passwJugador1,edadJugador1)
const loginValido = login1.validateLogin(); // agregado para verificar clave
const jugador1 = Jugador.getInstance(nombreJugador1);


if (!loginValido) {
    console.log('No se puede continuar debido a errores de validación');
    salir();
} else {
    // de esta forma instanciamos el jugador solo si el logueo es valido
    const jugador1 = Jugador.getInstance(nombreJugador1);
    
    console.log(`\nBienvenido ${nombreJugador1} al ${casino1.getNombre}!`);
    console.log('Login exitoso. Redirigiendo al menú principal...');
}
// Menú Principal
export function elegirTarea() {
    console.clear();
    console.log(`* Bienvenido ${jugador1.getName()} al Casino ${casino1.getNombre()} *`);
    console.log(`1- Comprar Saldo Tarjeta`);
    console.log(`2- Cambiar Saldo Tarjeta`);
    console.log(`3- Jugar`);
    console.log(`4- Salir del Casino`);
}

export function opcion1() {
    jugador1.setSaldoCarga();
}

export function opcion2() {
    jugador1.retiraEfectivo();
}

export function opcion3() {
    let salir = false;
    while (!salir) {
        console.clear();
        console.log(`** Menú de Juegos **`);
        console.log(`1- Jugar Ruleta`);
        console.log(`2- Jugar Mayor/Menor`);
        console.log(`3- Jugar Tragamonedas`);
        console.log(`4- Volver al Menú Principal`);

        let opcionJuego = rs.questionInt(`Seleccionar juego (1-4): `);
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
                ejecutarMenu();
                //se vuelve a ruleta ver, se envio a ejecutarmenu()
                //salir = true;
                break;
            default:
                console.log(`Opción inválida. Intente de nuevo.`);
        }
    }
}

function submenuTragamonedas() {
    let salir = false;
    while (!salir) {
        console.clear();
        console.log(`== Estas en Tragamonedas ==`);
        console.log(`1- Jugar Tragamonedas Logo`);
        console.log(`2- Jugar Tragamonedas Números`);
        console.log(`3- Volver al menú anterior`);

        let opcionTraga = rs.questionInt(`Seleccionar juego (1-3): `);
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
                console.log(`Opción inválida. Intente de nuevo.`);
        }
    }
}

function jugarRuleta() {
    console.log(`Has seleccionado jugar a la Ruleta.`);
    const ruleta = new Ruleta(jugador1);
    ruleta.jugar();
}

function jugarMayorMenor() {
    console.log(`Has seleccionado jugar a Mayor/Menor.`);
    const juegoMayorMenor = new MayorMenor(jugador1, 10, 500);
    juegoMayorMenor.jugar();
}

function jugarTragamonedas1() {
    console.clear();
    const tragamonedasF = new TragamonedasLogo(jugador1);
    tragamonedasF.jugar();
    console.log(`Has seleccionado jugar: ${tragamonedasF.getNombre()}`);
}

function jugarTragamonedas2() {
    console.clear();
    const tragamonedasN = new TragamonedasNumeros(jugador1);
    tragamonedasN.jugar();
    console.log(`Has seleccionado jugar: tragamonedasN.getNombre()`);
}


export function salir() {
    console.log(`Gracias por Jugar en ${casino1.getNombre()}`);
    process.exit(0);
}

export function ejecutarMenu() {
    while (true) {
        elegirTarea();
        let opcion = rs.questionInt(`Seleccionar Tarea (1-4): `);
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
                const respuesta = rs.question(`Escriba "salir" para salir del casino, de lo contrario, presione enter para continuar: `);
                if (respuesta === null || respuesta.toLowerCase() === 'salir') {
                    if (jugador1.getSaldoTarj() > 0) {
                        console.log(`Aún quedan créditos en su tarjeta. Retírelos para poder salir del casino, gracias.`);
                        rs.question(`Presione enter para retirar su dinero. `);
                        jugador1.retiraEfectivoSalida();
                    }
                    salir();
                }
                break;

            default:
                console.log(`Opción inválida. Por favor, selecciona un número entre 1 y 4.`);
                break;
        }
    }
}

ejecutarMenu();
