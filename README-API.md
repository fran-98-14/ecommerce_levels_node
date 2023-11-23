<a name="top"></a>
# Levels en Node v0.1.0

Microservicio de Niveles

# Table of contents

- [Niveles](#Niveles)
  - [Crear nivel](#Crear-nivel)
  - [Eliminar un nivel](#Eliminar-un-nivel)
  - [Obtener nivel usuario](#Obtener-nivel-usuario)
  - [Obtener niveles](#Obtener-niveles)
- [RabbitMQ_GET](#RabbitMQ_GET)
  - [Logout de Usuarios](#Logout-de-Usuarios)
  - [sell_flow, topic: payment_completed](#sell_flow,-topic:-payment_completed)
- [RabbitMQ_POST](#RabbitMQ_POST)
  - [Usuario subió de nivel](#Usuario-subió-de-nivel)

___


# <a name='Niveles'></a> Niveles

## <a name='Crear-nivel'></a> Crear nivel
[Back to top](#top)

<p>Crea un nuevo nivel por medio de los puntos mínimos asignados.</p>

```
POST /level
```

### Examples

Body

```json
{
  "minPoints": "{minPoints}",
}
```


### Success response example

#### Success response example - `Body`

```string
HTTP/1.1 200 Ok
```

### Error response example

#### Error response example - `400 Bad Request`

```json
 HTTP/1.1 400 Bad Request
"minPoints debe ser numérico mayor a 0."
```

#### Error response example - `401 Unauthorized`

```json
HTTP/1.1 401 Unauthorized
```

#### Error response example - `500 Server Error`

```json
HTTP/1.1 500 Internal Server Error
{
   "error" : "Internal error"
}
```

## <a name='Eliminar-un-nivel'></a> Eliminar un nivel
[Back to top](#top)

<p>Elimina un nivel dado un minPoints determinado</p>

```
DELETE /level
```

### Examples

Body

```json
{
  "minPoints": "{minPoints}",
}
```


### Success response example

#### Success response example - `Body`

```string
HTTP/1.1 200 Ok
```

### Error response example

#### Error response example - `404 Not Found `

```json
HTTP/1.1 404 Not Found
 {
     "error": {
         "code": 404,
         "error": "No se encontró el nivel."
     }
 }
```

#### Error response example - `400 Bad Request`

```json
 HTTP/1.1 400 Bad Request
{
 "error": {
      "code": 400,
      "error": "Debe proporcionar un minPoints numérico."
  }
}
```

#### Error response example - `401 Unauthorized`

```json
HTTP/1.1 401 Unauthorized
```

#### Error response example - `500 Server Error`

```json
HTTP/1.1 500 Internal Server Error
{
   "error" : "Internal error"
}
```

## <a name='Obtener-nivel-usuario'></a> Obtener nivel usuario
[Back to top](#top)

<p>Obtiene el nivel actual del usuario autenticado.</p>

```
GET /userLevel
```

### Success response example

#### Success response example - `Body`

```json
{
   "userId": "65401eff79049caff4f9531d",
   "userPoints": [
       {
           "points": 150,
           "_id": "655c0938d928e31ea6649bf2",
           "expires": "2024-11-20T01:34:48.776Z"
       },
       {
           "points": 150,
           "_id": "655c09a9d928e31ea6649bf7",
           "expires": "2024-11-20T01:36:41.933Z"
       },
       {
           "points": 150,
           "_id": "655c09a9d928e31ea6649bfc",
           "expires": "2024-11-20T01:36:41.966Z"
   ],
   "totalPoints": 450,
   "level": {
       "level": 2,
       "minPoints": 300
   }
}
```

### Error response example

#### Error response example - `401 Unauthorized`

```json
HTTP/1.1 401 Unauthorized
```

#### Error response example - `500 Server Error`

```json
HTTP/1.1 500 Internal Server Error
{
   "error" : "Internal error"
}
```

## <a name='Obtener-niveles'></a> Obtener niveles
[Back to top](#top)

<p>Obtiene los niveles creados hasta el momento.</p>

```
GET /levels
```

### Success response example

#### Success response example - `Body`

```json
[
    {
        "level": 1,
        "minPoints": 200
    },
    {
        "level": 2,
        "minPoints": 600
    }
]
```

### Error response example

#### Error response example - `500 Server Error`

```json
HTTP/1.1 500 Internal Server Error
{
   "error" : "Internal error"
}
```

# <a name='RabbitMQ_GET'></a> RabbitMQ_GET

## <a name='Logout-de-Usuarios'></a> Logout de Usuarios
[Back to top](#top)

<p>Escucha de mensajes logout desde auth.</p>

```
FANOUT auth/logout
```

### Success response example

#### Success response example - `Mensaje`

```json
{
   "type": "logout",
   "message": "{tokenId}"
}
```

## <a name='sell_flow,-topic:-payment_completed'></a> sell_flow, topic: payment_completed
[Back to top](#top)

<p>Escucha desde order cuando se completa un pago.</p>

```
TOPIC exchange:
```

### Success response example

#### Success response example - `Mensaje`

```json
{
   "type": "payment-completed",
   "message": {
        orderId: '655eaa1a9655b46c6049b193',
        userId: '65401eff79049caff4f9531d',
        totalAmount: 150
    }
}
```

# <a name='RabbitMQ_POST'></a> RabbitMQ_POST

## <a name='Usuario-subió-de-nivel'></a> Usuario subió de nivel
[Back to top](#top)

<p>levels emite un fanout notificando que un usuario subió de nivel con su última compra.</p>

```
FANOUT levels/levelUp
```

### Examples

Mensaje

```json
{
   "type": "level-up",
    "message": {
        "userId": "{userId}",
        "level": "{level}",
        "points": "{points}",
        "pointsNextLevel": "{pointsNextLevel}"
   }
}
```


