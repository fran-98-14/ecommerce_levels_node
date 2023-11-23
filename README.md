# Microservicio Levels (Niveles de Usuario)
El microservicio Levels permite que los usuarios acumulen puntos por sus compras realizadas. En base a la cantidad de puntos que el usuario haya acumulado, se le asignará un nivel. 

Permitirá la gestión de niveles por un usuario administrador. Estos niveles quedarán deterimnados por una lista de "puntos mínimos" que determinarán la cantidad de puntos necesaria para alcanzar el nivel siguiente. El número del nivel será calculado en base a estos puntos mínimos que se hayen cargados.

Levels escuchará un evento lanzado por el microservicio de Órdenes del [ecommerce](https://github.com/nmarsollier/ecommerce), el cual indica que se ha completado el pago de una Orden. Al recibir este evento, Levels guardará la cantidad de puntos que le corresponden al usuario en base a su compra, con una fecha de expiración.

El Microservicio expone mediante su interfaz REST un endpoint para obtener el nivel actual del usuario autenticado que realiza la consulta, basándose en todos los puntos que tenga guardados y que aún no hayan expirado.

Levels emitirá un evento de tipo broadcast cuando registre una compra realizada, informando el nivel anterior, el nivel actual, el total de puntos del usuario, la cantidad de puntos necesaria para el siguiente nivel y la cantidad y fecha de expiración del próximo vencimiento de puntos.

## Dependencias
- Microservicio Auth: Sólo un usuario autenticado podrá consultar su nivel y sólo un usuario con permisos Admin podrá gestionar los niveles y puntos requeridos.
- RabbitMQ: Se utilizará para escuchar mensajes que impliquen que se ha concretado una compra y para enviar broadcast relacionados a los niveles.
- MongoDB
- Node
- Express

### [API (REST y Rabbit)](README-API.md)

## Docker

### Build

```bash
docker build --no-cache -t dev-levels-node .
```

### El contenedor

```bash
# Mac | Windows
docker run -it --name dev-levels-node -p 3010:3010 -v %cd%:/app dev-levels-node

# Linux
docker run -it --add-host host.docker.internal:172.17.0.1 --name dev-levels-node -p 3010:3010 -v $PWD:/app dev-levels-node
```
