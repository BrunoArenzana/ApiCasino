export abstract class ConsoleDecoration {

    protected colors = {
        red: "\x1b[31m",
        green: "\x1b[32m",
        blue: "\x1b[34m",
        yellow: "\x1b[33m",
        cyan: "\x1b[36m",
        magenta: "\x1b[35m",
        reset: "\x1b[0m"
    };

    abstract msjColor(message: string): void;
}
    /*
    aplicar asi en las clases para decorar

    msjColor(message: string): void {
        console.log(`${this.red}ERROR: ${message}${this.reset}`);
         .blue o cualq color- mensaje - this.reset para volver al colo normal de la consola!!! 
        }
    }


    */




// 