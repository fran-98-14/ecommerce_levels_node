# Microservicio Levels (Niveles de Usuario)
El microservicio Levels permite asignar distintas categorías a los usuarios dependiendo de la cantidad de puntos que estos hayan acumulado mediante sus compras. Para mantener la simplicidad y la integración con otros microservicios del contexto actual del [ecommerce](https://github.com/nmarsollier/ecommerce), los puntos se obtienen del monto de una orden realizada.

Levels expone una interfaz REST que permite obtener el nivel y los puntos de un usuario, y permitirá a los usuarios con permisos admin gestionar los niveles y los puntos requeridos para alcanzarlos.

## Gestión de niveles
El servicio contendrá una lista de números que representará la cantidad de puntos que deberá obtener un usuario para subir al siguiente nivel.
El número de dicho nivel se calculará en base al índice de esta lista ordenada, así el usuario admin podrá ingresar los puntos donde se cambia de nivel sin tener que gestionar rangos ni números de nivel.


## Dependencias
- Auth: Sólo un usuario autenticado con permisos Admin podrá gestionar los niveles de usuario y los puntos requeridos.
- RabbitMQ: Levels deberá escuchar eventos de Order para aplicar puntos a un usuario.
- MongoDB
- Node