export enum ConsoleColor {
    Red = "\x1b[31m",
    Green = "\x1b[32m",
    Blue = "\x1b[34m",
    Yellow = "\x1b[33m",
    Cyan = "\x1b[36m",
    Magenta = "\x1b[35m",
    Reset = "\x1b[0m"
}
//console.log(ConsoleColor.Red + "texto a colorear"+ ConsoleColor.Reset);