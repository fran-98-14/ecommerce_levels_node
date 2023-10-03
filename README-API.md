<a name="top" hidden></a>

# Levels Service

Microservicio para gestión de Niveles de Usuario
	

- [RabbitMQ](#rabbitmq)
   - Escuchar Ordenes
   - Publicar Subida de nivel
- [Niveles](#niveles)
   - [Listar Niveles](#listar-niveles)
   - [Crear / Editar Nivel](#crear-nivel)
   - [Eliminar nivel](#eliminar-nivel)
   - [Nivel de Usuario](#nivel-de-usuario)
	

# <a name='niveles'></a> Niveles

## <a name='listar-niveles'></a> Listar niveles
[Back to top](#top)

<p>Obtiene una lista de los niveles creados. No requiere auth, por si se desean mostrar los niveles disponibles sin hacer login.</p>

	GET /levels



### Examples

#### Success Response

Respuesta

```
HTTP/1.1 200 OK
{
   [
      {
         "id": "{id del nivel}",
         "minPoints": "{número mínimo de puntos para el nivel}",
         "level": "{número del nivel}",
      },
      {
         "id": "{id del nivel}",
         "minPoints": "{número mínimo de puntos para el nivel}",
         "level": "{número del nivel}",
      },
   ]
}
```


#### Error Response

500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "msg error"
}
```


## <a name='crear-nivel'></a> Crear o editar nivel
[Back to top](#top)

<p>Crea un o edita un nivel. El usuario logueado debe tener permisos &quot;admin&quot;.</p>
<p>Para editar, proporcionar un id válido.</p>
<p>El nivel se crea agregando una cantidad mínima de puntos con la cual se pasará al siguiente nivel.</p>
<p>El nivel que corresponda a cada cantidad mínima se obtendrá en forma dinámica dependiendo los minPoints cargados.</p>


	POST /level

### Validaciones
- Se debe ingresar un valor mayor a 0.
- El valor ingresado no debe existir previamente.
  

### Examples

Body

```
{
   "id": "{id a editar}",
   "minPoints": "{mínimo de puntos para subir nivel}",
}
```

Header Autorización

```
Authorization=bearer {token}
```


#### Success Response

Respuesta

```
HTTP/1.1 200 OK
{
   [
   {
      "id": "{id del nivel}",
      "minPoints": "{número mínimo de puntos para el nivel}",
      "level": "{número del nivel}",
   },
   {
      "id": "{id del nivel}",
      "minPoints": "{número mínimo de puntos para el nivel}",
      "level": "{número del nivel}",
   },
   ]
}
```


#### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
{
   "error" : "Unauthorized"
}
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```

## <a name="eliminar-nivel"></a> Eliminar nivel
[Back to top](#top)

<p>Elimina el nivel con el id especificado. El usuario logueado debe tener permisos &quot;admin&quot;.</p>

	DELETE /level


### Examples

#### Body

```json
{
   "id": "{id a eliminar}"
}
```

#### Header Autorización

```
Authorization=bearer {token}
```



#### Success Response

Respuesta

```
HTTP/1.1 200 OK
```


#### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
{
   "error" : "Unauthorized"
}
```

404 Unauthorized

```
HTTP/1.1 404 Not Found
{
   "error" : "Not Found"
}
```


## <a name='nivel-de-usuario'></a> Nivel de Usuario

[Back to top](#top)

<p>Devuelve el nivel del usuario obtenido desde el token proporcionado, los puntos necesarios para subir de nivel y la fecha y cantidad de expiración de los próximos puntos a expirar.</p>
<p>El nivel se calculará en base a los puntos registrados para el usuario y la lista de puntos mínimos cargados.</p>

	GET /level


### Examples

Header Autorización

```
Authorization=bearer {token}
```


#### Success Response

Respuesta

```
HTTP/1.1 200 OK
{
   "level": "{Número de nivel}",
   "points": "{Número de puntos del usuario}",
   "pointsToUpgrade": "{Puntos necesarios para subir de nivel}",
   "pointsExpireDate": "{Siguiente fecha que expiran puntos}",
   "pointsToExpire": "{Cantidad de puntos que expiran}"
}
```


#### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
{
   "error" : "Unauthorized"
}
```

500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
