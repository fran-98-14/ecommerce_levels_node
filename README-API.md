<a name="top" hidden></a>

# Levels Service

Microservicio para gestión de Niveles de Usuario
	

- [RabbitMQ_GET](#rabbitmq-get)
   - [Pago Realizado](#pago-realizado)

- [RabbitMQ_POST](#rabbitmq-post)
   - [Fanout Puntos Asignados](#puntos-asignados)

- [Niveles](#niveles)
   - [Listar Niveles](#listar-niveles)
   - [Crear / Editar Nivel](#crear-nivel)
   - [Eliminar nivel](#eliminar-nivel)
   - [Nivel de Usuario](#nivel-de-usuario)
	

# <a name="rabbitmq-get"></a> RabbitMQ_GET

## <a name='pago-realizado'></a> Pago realizado
[Back to top](#top)

<p>Escucha mensajes &quot;payment_placed&quot; emitidos por Order.</p>

	TOPIC order/payment_placed



### Ejemplo

Mensaje

```json
{
"type": "payment_placed",
"message" : {
    "orderId": "{orderId}",
     "amount": "{totalAmount}",
     "payments":[
      {
         "method": "Payment method",
         "amount": "Payment amount"
      }
     ]
   }
}
```


# <a name="rabbitmq-post"></a> RabbitMQ_POST

## <a name='puntos-asignados'></a> Puntos asignados
[Back to top](#top)


<p>Emite un broadcast &quot;points_assigned&quot;.</p>

	FANOUT levels/points_assigned



### Ejemplo

Mensaje

```json
{
"type": "points_assigned",
"message" : {
     "userId": "{userId}",
     "previousLevel": "{Nivel anterior}",
     "newLevel": "{Nivel alcanzado}",
     "points": "{Puntos actuales}",
     "nextExpire" : "{fecha sig expiracion}",
     "nextExpirePoints": "{puntos a expirar}"
   }
}
```

# <a name='niveles'></a> Niveles

## <a name='listar-niveles'></a> Listar niveles
[Back to top](#top)

<p>Obtiene una lista de los niveles creados. No requiere auth, por si se desean mostrar los niveles disponibles sin hacer login.</p>

	GET /levels



### Ejemplos

#### Respuesta

      HTTP/1.1 200 OK

```json
[
   {
      "minPoints": "0",
      "level": "1",
   },
   {
      "minPoints": "100",
      "level": "2",
   },
   {
      "minPoints": "500",
      "level": "3",
   }
]
```


#### Error 

      HTTP/1.1 500 Internal Server Error

```json
{
   "error" : "msg error"
}
```


## <a name="crear-nivel"></a> Crear o editar nivel
[Back to top](#top)

<p>Crea un nuevo nivel. El usuario logueado debe tener permisos &quot;admin&quot;.</p>
<p>El nivel se crea agregando una nueva cantidad mínima de puntos con la cual se pasará al siguiente nivel.</p>
<p>El nivel que corresponda a cada cantidad mínima se obtendrá en forma dinámica dependiendo los minPoints cargados.</p>


	POST /level

### Validaciones
- Se debe ingresar un valor mayor a 0.
- El valor ingresado no debe existir previamente.
  

### Ejemplo

Body

```json
{
   "minPoints": "{mínimo de puntos para subir nivel}",
}
```

Header Autorización

```
Authorization: bearer {token}
```


#### Respuesta

Respuesta 
<p>La respuesta devolverá la lista completa de niveles creados.</p>

      HTTP/1.1 200 OK

```json
[
   {
      "minPoints": 0,
      "level": 1,
   },
   {
      "minPoints": 100,
      "level": 2,
   },
   {
      "minPoints": 500,
      "level": 3,
   }
]
```


#### Error

      HTTP/1.1 401 Unauthorized

```json
{
   "error" : "Unauthorized"
}
```
      HTTP/1.1 400 Bad Request

```json
{
   "error": "{Mensaje de error}"
}
```

## <a name="eliminar-nivel"></a> Eliminar nivel
[Back to top](#top)

<p>Elimina el nivel ingresando el minPoints a eliminar. El usuario logueado debe tener permisos &quot;admin&quot;.</p>

	DELETE /level


### Ejemplo

#### Body

```json
{
   "minPoints": 100
}
```

#### Header Autorización

```
Authorization=bearer {token}
```



#### Respuesta

Respuesta

      HTTP/1.1 200 OK


#### Error Response

      HTTP/1.1 401 Unauthorized

```json
{
   "error" : "Unauthorized"
}
```

***

      HTTP/1.1 404 Not Found

```json
{
   "error" : "Not Found"
}
```


## <a name='nivel-de-usuario'></a> Nivel de Usuario

[Back to top](#top)

<p>Devuelve el nivel del usuario obtenido desde el token proporcionado, los puntos necesarios para subir de nivel y la fecha y cantidad de expiración de los próximos puntos a expirar.</p>
<p>El nivel se calculará en base a los puntos registrados para el usuario y la lista de puntos mínimos cargados.</p>

	GET /level


### Ejemplo

Header Autorización


      Authorization=bearer {token}



#### Respuesta

Respuesta

      HTTP/1.1 200 OK

```json
{
   "level": "1",
   "points": "475",
   "pointsToUpgrade": "25",
   "pointsExpireDate": "2024-01-26T15:30:00.000Z",
   "pointsToExpire": "120"
}
```


#### Error

      HTTP/1.1 401 Unauthorized

```json
{
   "error" : "Unauthorized"
}
```

      HTTP/1.1 500 Internal Server Error

```json
{
   "error" : "Not Found"
}
```
