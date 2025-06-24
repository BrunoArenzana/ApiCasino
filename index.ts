import * as rs from "readline-sync";
import { Casino } from "./casino";
import { Jugador } from "./jugador";
import { TragamonedasLogo } from "./tragamonedas1";
import { TragamonedasNumeros } from "./tragamonedas2";
import { MayorMenor } from './mayorMenor';
import { Ruleta } from "./ruleta";
import { Login } from "./login";
import { ConsoleColor } from "./consoleColor";

let casino1 = new Casino(`Casino 404`);


let nombreJugador1:string = rs.question(ConsoleColor.Bold+ConsoleColor.Blue + `Ingrese su nombre: `+ ConsoleColor.Reset);
let edadJugador1:number = rs.questionInt(ConsoleColor.Bold +ConsoleColor.Blue +`Ingrese su edad: `+ConsoleColor.Reset);
export let passwJugador1:string = rs.question(ConsoleColor.Bold +ConsoleColor.Blue + `Ingrese una password (debe recordarla): `+ConsoleColor.Reset,{ hideEchoBack: true  });

const login1 = new Login(nombreJugador1,passwJugador1,edadJugador1)
const loginValido = login1.validateLogin(); // agregado para verificar clave
const jugador1 = Jugador.getInstance(nombreJugador1);


if (!loginValido) {
    console.log(ConsoleColor.Red +'No se puede continuar debido a errores de validación'+ConsoleColor.Reset);
    salir();
} else {
    // de esta forma instanciamos el jugador solo si el logueo es valido
    const jugador1 = Jugador.getInstance(nombreJugador1);
    
    console.log(ConsoleColor.Green +`\nBienvenido ${nombreJugador1} al ${casino1.getNombre}!`+ConsoleColor.Green);
    console.log(ConsoleColor.Green +'Login exitoso. Redirigiendo al menú principal...'+ConsoleColor.Green);
}
// Menú Principal
export function elegirTarea() {
    console.clear();
    console.log(ConsoleColor.Green+`** Bienvenido ${jugador1.getName()} al Casino ${casino1.getNombre()} **` +ConsoleColor.Reset);
    console.log(ConsoleColor.Magenta+`1-`+ConsoleColor.Reset+` Comprar Saldo Tarjeta`);
    console.log(ConsoleColor.Magenta+`2-`+ConsoleColor.Reset+` Cambiar Saldo Tarjeta`);
    console.log(ConsoleColor.Magenta+`3-`+ConsoleColor.Reset+` Jugar`);
    console.log(ConsoleColor.Magenta+`4-`+ConsoleColor.Reset+` Salir del Casino`);
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
        console.log(ConsoleColor.Green+`** Menú de Juegos **`+ConsoleColor.Reset);
        console.log(ConsoleColor.Magenta+`1-`+ConsoleColor.Reset+` Jugar Ruleta`);
        console.log(ConsoleColor.Magenta+`2-`+ConsoleColor.Reset+` Jugar Mayor/Menor`);
        console.log(ConsoleColor.Magenta+`3-`+ConsoleColor.Reset+` Jugar Tragamonedas`);
        console.log(ConsoleColor.Magenta+`4-`+ConsoleColor.Reset+` Volver al Menú Principal`);

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
               console.log(ConsoleColor.Red+`Opción inválida. Intente de nuevo opciones 1 a 4.`+ConsoleColor.Reset);
                rs.question(`Presione` + ConsoleColor.Green+ ` ENTER`+ConsoleColor.Reset+` para Seguir`);
        }
    }
}

function submenuTragamonedas() {
    let salir = false;
    while (!salir) {
        console.clear();
        console.log(ConsoleColor.Green+`** Estas en Tragamonedas **`+ConsoleColor.Reset);
        console.log(ConsoleColor.Magenta+`1- `+ConsoleColor.Reset+` Jugar Tragamonedas Logo`);
        console.log(ConsoleColor.Magenta+`2- `+ConsoleColor.Reset+` Jugar Tragamonedas Números`);
        console.log(ConsoleColor.Magenta+`3- `+ConsoleColor.Reset+` Volver al menú anterior`);

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
                console.log(ConsoleColor.Red+`Opción inválida. Intente de nuevo opciones 1 a 3.`+ConsoleColor.Reset);
                rs.question(`Presione` + ConsoleColor.Green+ ` ENTER`+ConsoleColor.Reset+` para Seguir`);
        }
    }
}

function jugarRuleta() {
    console.log(ConsoleColor.Cyan+`Has seleccionado jugar a la Ruleta.`+ConsoleColor.Reset);
    const ruleta = new Ruleta(jugador1);
    ruleta.jugar();
}

function jugarMayorMenor() {
    console.log(ConsoleColor.Cyan+`Has seleccionado jugar a Mayor/Menor.`+ConsoleColor.Reset);
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
    console.log(ConsoleColor.Cyan+`Has seleccionado jugar: tragamonedasN.getNombre()`+ConsoleColor.Reset);
}


export function salir() {
    console.log(ConsoleColor.Bold+ConsoleColor.Green+`Gracias por Jugar en ${casino1.getNombre()}`+ConsoleColor.Reset);
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
                const respuesta = rs.question(`Escriba `+ ConsoleColor.Red+ "SALIR"+ ConsoleColor.Reset+` para salir del casino, de lo contrario, presione`+ConsoleColor.Green+` ENTER`+ConsoleColor.Reset+` para continuar: `);
                if (respuesta === null || respuesta.toLowerCase() === 'salir') {
                    if (jugador1.getSaldoTarj() > 0) {
                        console.log(ConsoleColor.Bold+`Aún quedan créditos en su tarjeta. Retírelos para poder salir del casino, gracias.`+ConsoleColor.Reset);
                        rs.question(`Presione`+ConsoleColor.Green+` ENTER`+ConsoleColor.Reset+` para retirar su dinero. `);
                        jugador1.retiraEfectivoSalida();
                    }
                    salir();
                }
                break;

            default:
                console.log(ConsoleColor.Red+`Opción inválida. Intente de nuevo opciones 1 a 4.`+ConsoleColor.Reset);
                rs.question(`Presione` + ConsoleColor.Green+ ` ENTER`+ConsoleColor.Reset+` para Seguir`);
                break;
        }
    }
}

ejecutarMenu();
