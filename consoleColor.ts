export enum ConsoleColor {
    Red = "\x1b[31m",
    Green = "\x1b[32m",
    Blue = "\x1b[34m",
    Yellow = "\x1b[33m",
    Cyan = "\x1b[36m",
    Magenta = "\x1b[35m",
    Reset = "\x1b[0m",
    Bold = "\x1b[1m" ,
    Dim = "\x1b[2m", 
    Italic = "\x1b[3m", // cursiva
    Underline = "\x1b[4m", //subrayado
    Blink = "\x1b[5m ", //parpadea no funca
    Inverse = "\x1b[7m", 
    Hidden = "\x1b[8m",
    Strikethrough = "\x1b[9m ",
}
//console.log(ConsoleColor.Red + "texto a colorear"+ ConsoleColor.Reset);