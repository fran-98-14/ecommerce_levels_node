# Microservicio Levels (Niveles de Usuario)
El microservicio Levels permite asignar niveles a los usuarios dependiendo de la cantidad de puntos que estos hayan acumulado mediante sus compras. Para mantener la simplicidad y la integración con otros microservicios del contexto actual del [ecommerce](https://github.com/nmarsollier/ecommerce), la cantidad de puntos se obtiene del monto de una orden realizada.

Levels expone una interfaz REST que permite obtener el nivel y los puntos de un usuario, y permitirá a los usuarios con permisos admin gestionar los niveles y los puntos requeridos para alcanzarlos.

## Gestión de niveles
El servicio contendrá una lista de números que representará la cantidad de puntos que deberá obtener un usuario para subir al siguiente nivel.
El número de dicho nivel se calculará en base al índice de esta lista ordenada, así el usuario admin podrá ingresar los puntos donde se cambia de nivel sin tener que gestionar rangos ni números de nivel (para mantener esta lógica simple).


## Dependencias
- Auth: Sólo un usuario autenticado podrá consultar su nivel y sólo un usuario con permisos Admin podrá gestionar los niveles y puntos requeridos.
- RabbitMQ: Se utilizará para escuchar mensajes que impliquen una suba de nivel y para enviar mensajes cuando se asignen los puntos a un usuario.
- MongoDB
- Node

### Comunicación con RabbitMQ
El microservicio recibirá mensajes en el exchange "sell_flow" con topic "order_placed" del microservicio de Órdenes. 