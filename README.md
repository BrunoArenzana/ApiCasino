
Titulo proyecto : ApiCasino (Trabajo final cuatrimestre)

Descripción
ApiCasino del  grupo 'Error404', es una api que simula la funcionalidad de un casino estándar, permitiendo el logueo
de un usuario, validando una password y verificando la edad, en caso de ser todo correcto, se le permite el acceso
al menú dentro del casino, donde podrá cargar créditos, jugar diferentes juegos, consultar saldo, y cambiar los créditos 
por los pesos correspondientes al retirarse del casino.
Cada juego actualiza el saldo en momento en que se 'completa' la jugada y se obtiene el resultado, manteniendo así al usuario
informado siempre del crédito disponible para continuar jugando o tomar la decisión de retirarse.
Todos los juego manejan valores de apuestas mínimas y máximas (establecidas por el grupo de desarrollo de la Api) y valores de pagos también diferentes.
En cada caso, se verificara que las apuestas estén dentro del rango establecido y que no superen el crédito de juego disponible.
Los menú sencillos, numeración y colores aplicados permiten al usuario una fácil interacción y navegación de la Api.

Tecnologías Utilizadas:
			-NodeJs entorno de ejecución
 			-Visual Studio Code Editor de codigo
Librerias utilizadas:
			- ReadlineSync (interacciones con el usuario)
			- ReadfileSync (Manejo de documento txt)
-Almacenamiento loca y copia en GitHub.
-GitHub para repositorio y trabajo.
-Planilla de casos de uso (Excel)
-Tablero Kanban (Herramienta incorporada en GitHub)
-Diagrams.net para diseño de UML

Lenguajes de Programación Utilizados:
	-TypeScript

Instalación de ApiCasino del grupo Error404
1- Instalar NodeJs y Visual Studio Code.
2- Asegurarse de tener las librerías e instalar las dependencias del proyecto ( npm install )
3- Clonar el repositorio desde https://github.com/BrunoArenzana/ApiCasino.git
4- Abrir con Visual Studio Code y ejecutar la consola desde el archivo index.ts
5- Ejecutar comando ts-node index  (ts-node index.ts)
6- Funcionalidades:
		-Logueo usuario
		-Menu principal
				-Comprar créditos
				-Cambiar créditos
				-Jugar
				-Salir
		
		-Menú juegos (selección)
				-Ruleta
				-MayorMenor
				-Tragamonedas
					Variante- Simbolos
					Variante- Numeros

	Grupo Error404

	Schneider Querian 
	Garcia Marcelo Javier
	Arenzana Bruno

