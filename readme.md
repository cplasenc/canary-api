# Canary API

> Backend API para app-directorio de Actividades y Tours en las Islas Canarias

## Uso

Renombrar 'config/cofig.production.env" a "config/config.env" y actualizar la configuración.

## Instalar dependencias
```
npm install
```

## Ejecutar
```
# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en modo producción
npm start
```

## Documentación

* [Actividades](#actividades)

  * [Actividades por Organizadores](#1-actividades-por-organizadores)
  * [Actualiza una actividad](#2-actualiza-una-actividad)
  * [Consigue todas las actividades](#3-consigue-todas-las-actividades)
  * [Consigue una actividad](#4-consigue-una-actividad)
  * [Crea Actividad de Organizador](#5-crea-actividad-de-organizador)
  * [Elimina una actividad](#6-elimina-una-actividad)
  * [Subir Imagen](#7-subir-imagen)

* [Autentificación](#autentificación)

  * [Actualizar contraseña](#1-actualizar-contraseña)
  * [Actualizar detalles de usuario](#2-actualizar-detalles-de-usuario)
  * [Cerrar Sesión](#3-cerrar-sesión)
  * [Inicio de sesión](#4-inicio-de-sesión)
  * [Recuperación de contraseña](#5-recuperación-de-contraseña)
  * [Registro](#6-registro)
  * [Reiniciar contraseña](#7-reiniciar-contraseña)

* [Opiniones](#opiniones)

  * [Actualizar Opinion](#1-actualizar-opinion)
  * [Añadir Una Opinión](#2-añadir-una-opinión)
  * [Consigue Opiniones para Actividad](#3-consigue-opiniones-para-actividad)
  * [Consigue Todas las Opiniones](#4-consigue-todas-las-opiniones)
  * [Consigue Una Opinión](#5-consigue-una-opinión)
  * [Eliminar Opinion](#6-eliminar-opinion)

* [Organizadores](#organizadores)

  * [Actualizar Organizador](#1-actualizar-organizador)
  * [Consigue Organizador Por Radio](#2-consigue-organizador-por-radio)
  * [Consigue Un Organizador](#3-consigue-un-organizador)
  * [Crear Nuevo Organizador](#4-crear-nuevo-organizador)
  * [Eliminar Organizador](#5-eliminar-organizador)
  * [Todos los Organizadores](#6-todos-los-organizadores)

* [Usuarios](#usuarios)

  * [Actualizar un usuario](#1-actualizar-un-usuario)
  * [Consigue Todos los Usuarios](#2-consigue-todos-los-usuarios)
  * [Consigue Un Solo Usuario](#3-consigue-un-solo-usuario)
  * [Crear un usuario](#4-crear-un-usuario)
  * [Elmina un usuario](#5-elmina-un-usuario)


--------


## Actividades
Actividades disponibles. Los organizadores crean las actividades, y esas actividades van asociadas a organizadores.



### 1. Actividades por Organizadores


Consigue las actividades según el id de organizador


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/organizadores/id/actividades
```



### 2. Actualiza una actividad


Actualiza una actividad en la base de datos según Id


***Endpoint:***

```bash
Method: PUT
Type: 
URL: {{URL}}/api/v1/actividades/id
```



### 3. Consigue todas las actividades


Consigue todas las actividades disponibles en la base de datos.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/actividades
```



### 4. Consigue una actividad


Consigue una actividad por Id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/actividades/id
```



### 5. Crea Actividad de Organizador


Crea una actividad para un organizador específico


***Endpoint:***

```bash
Method: POST
Type: 
URL: {{URL}}/api/v1/organizadores/id/actividades
```



### 6. Elimina una actividad


Elimina una actividad de la base de datos según Id


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/actividades/id
```



### 7. Subir Imagen


Ruta para subir la imagen de una actividad


***Endpoint:***

```bash
Method: PUT
Type: 
URL: {{URL}}/api/v1/actividades/5d725a4a7b292f5f8ceff789/photo
```



## Autentificación
Funcionalidades para los usuarios.



### 1. Actualizar contraseña


Actualiza la contraseña del usuario conectado, envia en el cuerpo la contraseña actual y la nueva


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatepassword
```



### 2. Actualizar detalles de usuario


Permite modificar nombre y email de un usuario


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatedetails
```



### 3. Cerrar Sesión


Cierra la sesión de usuario y elimina la cookie


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/auth/logout
```



### 4. Inicio de sesión


Comprueba usuario y contraseña e inicia sesión


***Endpoint:***

```bash
Method: POST
Type: 
URL: {{URL}}/api/v1/auth/login
```



### 5. Recuperación de contraseña


Ruta para recuperar la contraseña


***Endpoint:***

```bash
Method: POST
Type: 
URL: {{URL}}/api/v1/auth/forgotpassword
```



### 6. Registro


Registro de usuarios


***Endpoint:***

```bash
Method: POST
Type: 
URL: {{URL}}/api/v1/auth/register
```



### 7. Reiniciar contraseña


Ruta para cambiar la contraseña por una nueva


***Endpoint:***

```bash
Method: PUT
Type: 
URL: {{URL}}/api/v1/auth/resetpassword
```



## Opiniones
Opiniones de las actividades. Cada actividad puede tener asociada un número indefinido de actividades.



### 1. Actualizar Opinion


Permite edita ry actualizar una opinión a admin y al usuario que la creó.


***Endpoint:***

```bash
Method: PUT
Type: 
URL: {{URL}}/api/v1/opiniones/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 2. Añadir Una Opinión


Añade una opinión a una actividad concreta, según Id


***Endpoint:***

```bash
Method: POST
Type: 
URL: {{URL}}/api/v1/actividades/actividadId/opiniones
```



### 3. Consigue Opiniones para Actividad


Consigue las opiniones para una actividad específica, según Id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/actividades/5d725a4a7b292f5f8ceff789/opiniones
```



### 4. Consigue Todas las Opiniones


Consigue todas las opiniones de la base de datos y se asocia con el nombre y la descripción de la actividad


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/opiniones
```



### 5. Consigue Una Opinión


Consigue una opinión de la base de datos según Id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/opiniones/5d7a514b5d2c12c7449be022
```



### 6. Eliminar Opinion


Permite eliminar una opinión de la base de datos al usuario que añadió la opinión


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/opiniones/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



## Organizadores
Funcionalidad CRUD para organizadores. Los organizadores pueden publicar infinitas actividades.



### 1. Actualizar Organizador


UPDATE- Actualiza un solo organizador en la base de datos.


***Endpoint:***

```bash
Method: PUT
Type: 
URL: {{URL}}/api/v1/organizadores/1
```



### 2. Consigue Organizador Por Radio


Consigue al organizador de la actividad según un determinado radio dentro de un código postal (en kilómetros)


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/organizers/radius/38100/20
```



### 3. Consigue Un Organizador


GET - Consigue un organizador por ID


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/organizadores/5d725a1b7b292f5f8ceff788
```



### 4. Crear Nuevo Organizador


Crea una nueva empresa en la base de datos. Debe estar autentificado y debe ser admin o publisher.


***Endpoint:***

```bash
Method: POST
Type: 
URL: {{URL}}/api/v1/organizadores
```



### 5. Eliminar Organizador


DELETE - Elimina una empresa de la base de datos.


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/organizadores/1
```



### 6. Todos los Organizadores


GET - Consigue todas los organizadores desde la base de datos. Incluye paginación, filtrado, etc.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/organizadores
```



## Usuarios
Funcionalidad para gestionar usuarios.



### 1. Actualizar un usuario


Actualizar un usuario en la base de datos (admin)


***Endpoint:***

```bash
Method: PUT
Type: 
URL: {{URL}}/api/v1/users/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 2. Consigue Todos los Usuarios


Consigue todos los usuarios (admin)


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users
```



### 3. Consigue Un Solo Usuario


Consigue on único usuario según id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 4. Crear un usuario


Añade un usuario a la base de datos


***Endpoint:***

```bash
Method: POST
Type: 
URL: {{URL}}/api/v1/users/
```



### 5. Elmina un usuario


Elimina un usuario de la base de datos (admin)


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/users/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



---
[Back to top](#canaryapi)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-03-08 11:34:18 by [docgen](https://github.com/thedevsaddam/docgen)
