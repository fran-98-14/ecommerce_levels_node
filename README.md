# Microservicio Levels (Niveles de Usuario)
El microservicio Levels permite asignar distintas categorías a los usuarios dependiendo de la cantidad de puntos que estos hayan acumulado mediante sus compras. Para mantener la simplicidad y la integración con otros microservicios del contexto actual del ecommerce, los puntos se obtienen del monto de una orden realizada.

Levels expone una interfaz REST que permite obtener el nivel y los puntos de un usuario, y permitirá a los usuarios con permisos admin gestionar niveles y puntos requeridos.

## Dependencias
- Auth: Sólo un usuario autenticado con permisos Admin podrá gestionar los niveles de usuario y los puntos requeridos.
- RabbitMQ: Levels deberá escuchar eventos de Order para aplicar puntos a un usuario.
- MongoDB
- Node