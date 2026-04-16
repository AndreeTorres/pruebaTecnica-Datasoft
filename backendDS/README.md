# backendDS

Backend desarrollado con Spring Boot para la prueba tecnica de Datasoft.

El proyecto implementa una API REST para consultar generos, listar libros, consultar detalle de libros, actualizar libros y autenticar usuarios con JWT.

## Tecnologias

- Java 21
- Spring Boot 3.3.5
- Spring Web
- Spring Data JPA
- Spring Security
- JWT con `jjwt`
- PostgreSQL
- Lombok

## Requisitos

- Java 21
- Maven o soporte Maven desde IntelliJ IDEA
- Docker Desktop
- Contenedor PostgreSQL corriendo localmente

## Como ejecutar

Desde IntelliJ IDEA:

1. Abrir la carpeta `backendDS` como proyecto Maven.
2. Esperar a que IntelliJ descargue las dependencias.
3. Verificar que el contenedor de PostgreSQL este levantado.
4. Ejecutar la clase `BackendDsApplication`.

Desde terminal, si Maven esta instalado:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/pruebaDatasoft
export DB_USERNAME=postgres
export DB_PASSWORD=admin12345
export JPA_DDL_AUTO=update
mvn spring-boot:run
```

La API queda disponible en:

```text
http://localhost:8080
```

## Base de datos PostgreSQL

La base de datos se esta ejecutando en un contenedor Docker de PostgreSQL. El backend se conecta a ese contenedor por medio del puerto expuesto en la maquina local.

Configuracion actual del backend:

```text
DB_URL=jdbc:postgresql://localhost:5432/pruebaDatasoft
DB_USERNAME=postgres
DB_PASSWORD=admin12345
JPA_DDL_AUTO=update
```

Estos valores estan definidos como valores por defecto en `src/main/resources/application.properties`, pero tambien pueden sobreescribirse con variables de entorno.

El contenedor equivalente se puede levantar asi:

```bash
docker run --name datasoft-postgres \
  -e POSTGRES_DB=pruebaDatasoft \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=admin12345 \
  -p 5432:5432 \
  -d postgres:16
```

Si el contenedor ya existe, solo debe estar iniciado:

```bash
docker start datasoft-postgres
```

Para revisar que el contenedor este activo:

```bash
docker ps
```

La columna `PORTS` debe mostrar una asignacion similar a:

```text
0.0.0.0:5432->5432/tcp
```

Eso permite que Spring Boot se conecte usando `localhost:5432`.

## Datos iniciales

Al iniciar la aplicacion, `DataInitializer` inserta datos de prueba si la tabla de generos esta vacia:

- Generos: Ficcion, Tecnologia, Historia.
- Libros: Clean Code, Cien anios de soledad, Sapiens.
- Usuario administrador para login.

## Usuario de prueba

```json
{
  "username": "admin",
  "password": "admin123"
}
```

El password se guarda en base de datos usando BCrypt.

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

## Coleccion de Insomnia

Se preparo la coleccion local de Insomnia llamada `pruebaDatasoft` con estas peticiones:

- `Login`
- `Listar generos`
- `Listar libros`
- `Listar libros por genero`
- `Detalle de libro`
- `Actualizar libro`

Variables configuradas en el ambiente de Insomnia:

```text
base_url=http://localhost:8080
token=
book_id=1
genre_id=1
```

Flujo recomendado:

1. Ejecutar `Login`.
2. Copiar el valor `token` de la respuesta.
3. Pegar ese valor en la variable de ambiente `token`.
4. Ejecutar los endpoints protegidos: `Detalle de libro` y `Actualizar libro`.

## Estructura

```text
Arquitectura n-capas
com.datasoft.backendds.controller   Controladores REST
com.datasoft.backendds.service      Logica de negocio
com.datasoft.backendds.repository   Repositorios JPA
com.datasoft.backendds.model        Entidades JPA
com.datasoft.backendds.dto          DTOs de entrada y salida
com.datasoft.backendds.security     JWT y carga de usuarios
com.datasoft.backendds.config       Seguridad y datos iniciales
com.datasoft.backendds.exception    Manejo global de errores
```

## Tablas

Spring Boot crea o actualiza estas tablas con JPA/Hibernate:

- `genres`
- `books`
- `users`

Relaciones:

- Un genero puede tener muchos libros.
- Un genero puede estar asociado como genero favorito de muchos usuarios.
- Un libro pertenece a un genero.
