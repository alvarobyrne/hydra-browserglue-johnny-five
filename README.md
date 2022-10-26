****[johnny-five]: http://johnny-five.io
[hydra-web-app]:https://hydra.ojack.xyz/
[hydra-repo]:https://github.com/hydra-synth/hydra
# hydra-browserglue-johnny-five
|||
|-|-|
|hydra  ([web][hydra-web-app], [repositorio][hydra-repo]) pegado a arduino usando [browserglue] y [johnny-five]; hydra controlado por arduino/ arduino controlando a hydra |hydra ([web app][hydra-web-app], [repo][hydra-repo]) glued with arduino using [browserglue] and [johnny-five]; hydra controlled by arduino/arduino controlling hydra|
|||

## 1 browserglue: ejecutable / executable - servidor / server

### 1.1
|||
|-|-|
|Aquí se usa [browserglue] un _software_ que expone varias conecciones OSC al navegador usando _websockets_ |Here [browserglue] is used, a software which "exposes multiple OSC connections to the browser through WebSockets"|
|Para empezar, bajá el servidor de browserglue que es un ejecutable disponible mac/win/linux en [los _releases_ de browser glue][browserglue-executable]. |To begin with, download the browserglue server which is an executable available for win/mac/linux from their [releases page at github][browserglue-executable], |
|Ejecutalo después de bajarlo, entonces se lanza el servidor que va a enrutar los mensajes de osc que generemos con johhny-five y los va a enviar vía _websockets_ al navegador, a hydra|One then has launched a server which will route OSC messages generated with johnny-five and send them via websockets to the browser, to hydra|
|en windows bajar archivos ejecutables es dificil en cuanto que el sistema operative lanza advertencias y trata de impedir que bajés este tipo de archivos: toca confirmar varias veces que querés bajar el archivo y ejecutarlo|in windows, downloading executable files is not as straightforward: the operating system will try to prevent you and warn you at multiple steps that downloading such file is not recommended|


[browserglue]:https://github.com/munshkr/browserglue
[browserglue-executable]:https://github.com/munshkr/browserglue/releases


## 2 johnny-five

### 2.0 prerrequisitos / requirements
|||
|-|-|
|Tenés que tener instalados `node` ( y `npm`, que se instala cuando se instala `node`)|must have `node` installed (and `npm` which is installed with `node`)|
|||

### 2.1

|||
|-|-|
|descargá este repo o clonalo y, en la línea de comandos, en la carpeta en la que descargaste o clonaste el repo, ejecutá (en la línea de comandso):|download this repo or clone it and, in a terminal window, in the folder you downloaded or cloned it,  run (in the terminal console): |
|||

```
npm install
```

### 2.3

[potentiometer example]: http://johnny-five.io/examples/potentiometer/

[potentiometer code]: https://github.com/rwaldron/johnny-five/blob/main/eg/potentiometer.js

|||
|-|-|
|En este repositorio se usa el ejemplo del sensor más sencillo: un potenciometro [el ejemplo][potentiometer example], [el código][potentiometer code] |In this repo we use the example of the simplest sensor [potentiometer example], [potentiometer code].|
|||


![potentiometer connected to arduino](http://johnny-five.io/img/breadboard/potentiometer.png)

|||
|-|-|
|y, en el archivo `index.js` (de este repositorio), se le adiciona el envío de mensajes OSC|and, at the `index.js` file (in this repo), OSC message sending has been added|
| ejecutá el programa con el siguiente commando | run this file with the command line tool|
|||

```
node index.js
```
|||
|-|-|
|ahí ya podés mover la perilla del potenciometro y se están enviando mensajes OSC con los valores del voltaje en el potencimetro|now one can move the potentiometers knob and OSC messages are being sent with|
|a continuación se describe cómo recibir/escuchar esos mensajes en [hydra][hydra-web-app] |in what follows we explain how to listen/receive such messages in [hydra][hydra-web-app] |
|el servidor descrito en la sección 1.1 está enrutando esos mensajes OSC al navegador, ahora hay que ejecutar cierto código en el navegador que escuche esos mensajes y los use|the server described in section 1.1 is routing those messages to the browser, now some code should be ran in the browser in order to receive the messages and use them|


## 3  hydra y browserglue client
### 3.0
|||
|-|-|
|En esta sección se presenta el código que tenés que ejecutar en [hydra][hydra-web-app]| In this section the code which must be executed at [hydra][hydra-web-app] is shown|
|Ejecutá estas lineas una por una, si ejecutás todo el sketch de una, no te va a funcionar (esto tal vez no es cierto pero mejor hacelo así , ja ja)|Run this lines one by one, it won't work if you run all the sketch at once(this might not be true, but better do so, ha ha)|
|||
### 3.1 
|||
|-|-|
|Cargá `browserglue` en `hydra` ejecutando la siguiente línea de código,esto es,  oprimí `ctrl+enter` con el cursor sobre la linea misma|Load `browserglue` into `hydra` running the following line of code, that is, press `ctrl+enter` with cursor caret on the line itself|
|||

```js
await import("https://unpkg.com/browserglue")
```

### 3.2
|||
|-|-|
|Creá un cliente de `browserglue` |Create a browserglue client|
|||

```js
window.bg = new browserglue.Client();
```
### 3.3
|||
|-|-|
|Las siguientes lineas de código crean un canal de comunicación usando _websockects_ que se comunica con el ejecutable de la sección 1.1 de este documento | The next portion of code creates a browserglue channel that bridges with the executable refered at section 1.1 above|
|los valores de la variables `address` y  `senderPort` deben coincidir con los valores de las mismas variables en el código del archivo  `index.js` |the values of variables `address` and `senderPort` must be the same as the values of the variableswith the same name in the `index.js` file.|
|||

```js
address = "/foo"
senderPort = 4000
channel = await bg.addChannel(address, senderPort);
```

### 3.4
|||
|-|-|
|código encargado de escuchar los mensajes enviados por el canal y de usar el valor en un boceto de hydra  |code in charge of receiving the websocket messages and use the value received in hydra functions|
|||
```js
pot=0
norm = 1/1024;
channel.on('message', async msg => {
  console.log('msg: ', msg.args[0]);
  pot = msg.args[0]*norm;
  
});


//finally, for example
osc(()=>1+pot*200).out()
```
### 3.5 
|||
|-|-|
|captura de pantalla del código funcionando: hay más código en la captura que el  código explicado en este documento, es código que puede ser de ayuda al desarrollar un boceto  |screenshot of working code: there's more code on the screenshot than the explained in this doc, it is just code that might help while developing the a sketch|
|||

![](SharedScreenshot.jpg)

|||
|-|-|
|aunque puede que el boceto no se ejecute  adecaudamente al hacerle _click_ al siguiente  _link_ (porque hay que ejecutar ciertas líneas con un retraso entre sí) , ahí está [el código][the code] en hydra web-app. Esto al parecer no es cierto, a veces funciona | Although the sketch might not run properly when clicking on the following link (since there must be some delay between the execution of some lines) [the code] is there. This might not be true, sometimes it works|
|el código completo del boceto de hydra también está en el archivo [hydra-sketch.js][file] de este repo|the whole hydra sketch code is also at file [hydra-sketch.js][file] in this repo|
|||

[file]: https://github.com/alvarobyrne/hydra-browserglue-johnny-five/blob/main/hydra-sketch.js
[the code]: https://hydra.ojack.xyz/?code=YXdhaXQlMjBpbXBvcnQoJTIyaHR0cHMlM0ElMkYlMkZ1bnBrZy5jb20lMkZicm93c2VyZ2x1ZSUyMiklMEFjb25zb2xlLmxvZyhicm93c2VyZ2x1ZSklMEElMEFodXNoKCklMEElMkYlMkZjb25zdCUyMCU3QiUyMENsaWVudCUyQyUyME1lc3NhZ2UlMjAlN0QlMjAlM0QlMjBicm93c2VyZ2x1ZSUzQiUwQSUwQXdpbmRvdy5iZyUyMCUzRCUyMG5ldyUyMGJyb3dzZXJnbHVlLkNsaWVudCgpJTNCJTBBJTBBJTJGJTJGJTIwU3Vic2NyaWJlJTIwdG8lMjBhbGwlMjBzZXJ2ZXIlMjBldmVudHMlMEFiZy5vbignY29ubmVjdCclMkMlMjAoKCklMjAlM0QlM0UlMjBjb25zb2xlLmxvZyglMjIlNUJjb25uZWN0JTVEJTIyKSkpJTNCJTBBYmcub24oJ2Rpc2Nvbm5lY3QnJTJDJTIwKCgpJTIwJTNEJTNFJTIwY29uc29sZS5sb2coJTIyJTVCZGlzY29ubmVjdCU1RCUyMikpKSUzQiUwQSUwQWF3YWl0JTIwYmcucmVtb3ZlQWxsQ2hhbm5lbHMoKSUzQiUwQSUwQWFkZHJlc3MlMjAlM0QlMjAlMjIlMkZmb28lMjIlMEFzZW5kZXJQb3J0JTIwJTNEJTIwNDAwMCUwQWNoYW5uZWwlMjAlM0QlMjBhd2FpdCUyMGJnLmFkZENoYW5uZWwoYWRkcmVzcyUyQyUyMHNlbmRlclBvcnQpJTNCJTBBJTBBcG90JTNEMCUwQW5vcm0lMjAlM0QlMjAxJTJGMTAyNCUzQiUwQWNoYW5uZWwub24oJ21lc3NhZ2UnJTJDJTIwYXN5bmMlMjBtc2clMjAlM0QlM0UlMjAlN0IlMEElMjAlMjBjb25zb2xlLmxvZygnbXNnJTNBJTIwJyUyQyUyMG1zZy5hcmdzJTVCMCU1RCklM0IlMEElMjAlMjBwb3QlMjAlM0QlMjBtc2cuYXJncyU1QjAlNUQqbm9ybSUzQiUwQSUyMCUyMCUwQSU3RCklM0IlMEElMEElMkYlMkZjaGFubmVsLnJlbW92ZSgpJTBBJTBBb3NjKCgpJTNEJTNFMSUyQnBvdCoyMDApLm91dCgpJTBBJTBB

<small>a gist would have been enough</small>