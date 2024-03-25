# MD - Links 

## Presentación 
En este proyecto se desarrolló una librería en Node.js que funcionará como
herramienta para analizar links dentro de archivos Markdown. Esta librería
está disponible de dos formas: como un módulo publicado en GitHub, que las
usuarias podrán instalar e importar en otros proyectos, y como una interfaz
de línea de comandos (CLI) que permitirá utilizar la librería directamente
desde el terminal.

## Funcionalidades

Extracción: Encuentra y extrae todos los enlaces presentes en un archivo Markdown.
Estadísticas Básicas: Informa cuántos enlaces existen y cuántos de ellos son únicos.
Validación: Verifica si los enlaces son válidos, y notifica su estado (http status, OK o fail).

## Instalación

Para instalar la librería, ejecuta el siguiente comando:

npm install SilvanaMora/DEV011-md-links

Comandos

- Extracción:
mdLinks <path> 

Resultado: Array de objetos con información sobre los enlaces encontrados, incluyendo el texto, el enlace y el path absoluto.

- Estadísticas Básicas:
mdLinks <path> -s/--stats 

Resultado: Objeto con el número total de enlaces y el número total de enlaces únicos.

Estadísticas con Validación:
mdLinks <path> -v/--validate -s/--stats 

Resultado: Objeto con el número total de enlaces, número de enlaces rotos y el número total de enlaces únicos.

- Validación de Enlaces:
mdLinks <path> -v/--validate 

Resultado: Array de objetos con información extendida, incluyendo el estado (OK o roto) de cada enlace.

##  La biblioteca realiza las siguientes validaciones antes de entregar los resultados:

1. Existencia de la ruta: Se verifica que la ruta proporcionada por el usuario exista en el sistema. En caso de no existir, se notificará un error.

2. Formato Markdown: Se comprueba que el archivo presente en la ruta indicada tenga un formato Markdown válido. Si no se cumple con este formato, se informará del error al usuario.

3. Presencia de enlaces: Se analiza el contenido del archivo Markdown para identificar la presencia de enlaces. Si no se encuentra ningún enlace, se devolverá un array vacío como resultado.

En resumen, la biblioteca realiza un conjunto de validaciones para garantizar que la información proporcionada por el usuario sea válida y pueda ser procesada correctamente. De esta manera, se asegura la entrega de resultados precisos y confiables.

## Gracias por visitarnos 




