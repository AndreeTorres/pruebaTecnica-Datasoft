# backendDS

Backend desarrollado con Spring Boot para la prueba tecnica de Datasoft.

## Tecnologias

- Java 21
- Spring Boot 3.3.5
- Spring Web
- Spring Data JPA
- Spring Security
- JWT con `jjwt`
- H2 Database
- Lombok

## Como ejecutar

Desde IntelliJ IDEA:

1. Abrir la carpeta `backendDS` como proyecto Maven.
2. Esperar a que IntelliJ descargue las dependencias.
3. Ejecutar la clase `BackendDsApplication`.

Desde terminal, si Maven esta instalado:

```bash
mvn spring-boot:run
```

La API queda disponible en:

```text
http://localhost:8080
```

La consola H2 queda disponible en:

```text
http://localhost:8080/h2-console
```

Credenciales H2:

```text
JDBC URL: jdbc:h2:mem:datasoftdb
User: sa
Password:
```

## Usuario de prueba

```json
{
  "username": "admin",
  "password": "admin123"
}
```

## Endpoints

### Listar generos

```http
GET /genres
```

Endpoint publico.

### Listar libros

```http
GET /books
GET /books?genreId=1
```

Endpoint publico. El parametro `genreId` es opcional.

### Login

```http
POST /login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Respuesta:

```json
{
  "token": "jwt-generado",
  "tokenType": "Bearer",
  "username": "admin"
}
```

### Detalle de libro

```http
GET /books/{id}
Authorization: Bearer <token>
```

Endpoint protegido con JWT.

### Actualizar libro

```http
PUT /books/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "description": "Buenas practicas para escribir codigo mantenible.",
  "publishedYear": 2008,
  "price": 45.99,
  "genreId": 2
}
```

Endpoint protegido con JWT.

## Estructura

```text
com.datasoft.backendds.controller   Controladores REST
com.datasoft.backendds.service      Logica de negocio
com.datasoft.backendds.repository   Repositorios JPA
com.datasoft.backendds.model        Entidades JPA
com.datasoft.backendds.dto          DTOs de entrada y salida
com.datasoft.backendds.security     JWT y carga de usuarios
com.datasoft.backendds.config       Seguridad y datos iniciales
com.datasoft.backendds.exception    Manejo global de errores
```

## Base de datos

La configuracion actual usa H2 en memoria y crea las tablas al iniciar:

- `genres`
- `books`
- `users`

Relaciones:

- Un genero puede tener muchos libros.
- Un genero puede estar asociado como genero favorito de muchos usuarios.
- Un libro pertenece a un genero.
