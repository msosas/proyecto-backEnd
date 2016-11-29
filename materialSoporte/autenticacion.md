# Autenticación

## Autenticación HTTP Básica

Este tipo de autenticación require que el cliente envie sus credenciales en cada request HTTP. Esta es la forma más simple de autenticación, para usarla `http` nos provee un header especial: `Authorization`. En este header el cliente va a guardar sus credenciales de la siguiente forma:

* El `username` y el `password` van concatenados en una misma string separados por `:`, ej: `username:password`
* Este string se codifica usando [`Base64`](https://en.wikipedia.org/wiki/Base64).
* El keyword `Basic` acompaña este string codificado. Por ejemplo: `header "Authorization: Basic am9objpzZWNyZXQ="`

Implementar esta forma de autenticarse es fácil en Node:

```javascript
var basicAuth = require('basic-auth');

function unauthorized(res) {   // Constestamos que no está autorizado.
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.send(401);
};

module.exports =  function auth(req, res, next) {
  var auth  = basicAuth(req) || {};
  var name = auth[0];
  var pass = auth[1];

  if (!name || !pass) { // si no mandaron credenciales no están autorizados
    return unauthorized(res);
  };

  if (name === 'username' && pass === 'password') { // Si coinciden con lo que esperamos pueden seguir
    // En general controlariamos contra una base de datos para saber si es un usuario válido
    return next();
  }
  return unauthorized(res);
};
```


## Cookies

## Tokens

## Signatures