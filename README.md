### cMT-SNMP

Es un proyecto basado en *node-net-snmp* (https://github.com/markabrahams/node-net-snmp) modificado para funcionar en un HMI Weintek de la serie cMT a través del objeto JS. Utilizo la librería *browserify* para reemplazar las librerías nativas de *nodejs* con aquellas que son ejecutables en un entorno JS (*browser*). 

Las modificaciones realizadas se deben a las diferencias entre el engine JS del HMI y Node.js:

1. Reemplazo de la lib **dgram** por [weintek-emitter](https://github.com/sfcaracciolo/weintek-emitter).
2. Incorporación de [randombytes-shim](https://github.com/chr15m/randombytes-shim) para reemplazar `crypto.randomBytes()`.
3. Eliminación de `Error.captureStackTrace`.
4. Reimplementación de `Encryption.decryptPduDes` cambiando `crypto.createDecipheriv` por `CryptoJS.DES.decrypt`. Es decir, se ha incorporado [crypto-js](https://www.npmjs.com/package/crypto-js) únicamente para desencriptar DES por una falla que ocurre en el engine JS (en Node.js funciona correctamente).
5. Se ha modificado el funcionamiento de `ModuleStore` y `lib/mib.js` con el objetivo de incorporar las Mib en el proyecto que use esta lib, a través de [brfs](https://www.npmjs.com/package/brfs), debido a que el Engine JS no implementa **fs**.
6. El `request` del agente se hace asincrónico para iniciar la Mib correctamente.
7. `process.uptime()` se ha forzado a 0. Se recomienda inicializar `sysUpTime` para usar el valor correcto.
