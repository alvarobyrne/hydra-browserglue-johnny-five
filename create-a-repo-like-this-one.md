# how to create a repo as this one
# cómo crear un repositorio como este


## 1 
|||
|-|-|
|En una carpeta vacía, en la línea de commandos, ejecutá el comando |In an empty folder, in the command line or terminal, run the following|
|||
```
npm init -y
```
## 2 
|||
|-|-|
|con eso se crea el archivo `package.json` , es decir, se inicia un proyecto de node|after such a `package.json` file will be created, in other words, a node project has been initialized|
|Ahora instalá `johnny-five` usando el siguiente commando |now install `johnny-five` with the following terminal command|
|||
```
npm install johnny-five
```
## 3 
|||
|-|-|
|también instalá una biblioteca que te permita enviar mensajes OSC, `osc-min` por ejemplo|also install a library that allows you to send OSC messages, for instance, osc-min|
|||
```
npm install osc-min
```

|||
|-|-|
|ahora copiá un programa de la larga lista de ejemplos que corresponde a la cantidad tan grande de sensores y actuadores que hay en el mundo|now pick a program at the huge list of examples which corresponds to the huge amount of sensors and actuators that are available in the world|
- http://johnny-five.io/examples/

|||
|-|-|
|el código de esa lista de ejemplos lo podés encontrar en el mismo repo de [johnny-five], específicamente en [este link][johnny-five examples source code]| the source code of such a list of examples may be found in [johnny-five]'s repo, especifically at this [link][johnny-five examples source code]|
  

[johnny-five examples source code]: https://github.com/rwaldron/johnny-five/tree/main/eg

[johnny-five]: http://johnny-five.io
