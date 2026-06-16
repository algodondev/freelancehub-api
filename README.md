# FreelanceHub API

API en NestJS para publicar servicios freelance y explorar un catalogo publico.

## Requisitos Previos

Se asume que ya tienes `npm` instalado.

Tambien necesitas:

- Node.js compatible con el proyecto
- Docker y Docker Compose para levantar PostgreSQL

Verifica que esten disponibles:

```bash
node -v
npm -v
docker --version
docker compose version
```

## Configuracion Inicial

1. Instala las dependencias:

```bash
npm install
```

2. Crea el archivo de variables de entorno:

```bash
cp .env.example .env
```

El archivo `.env.example` ya incluye valores locales listos para usar:

```text
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=freelancehub
DB_PASSWORD=freelancehub
DB_NAME=freelancehub
TYPEORM_SYNCHRONIZE=true
JWT_SECRET=freelancehub-dev-secret
```

3. Levanta la base de datos PostgreSQL:

```bash
docker compose up -d postgres
```

4. Confirma que el contenedor esta corriendo:

```bash
docker ps
```

Debe aparecer un contenedor llamado `freelancehub-postgres`.

## Ejecutar La Aplicacion

Modo desarrollo con recarga automatica:

```bash
npm run start:dev
```

La API queda disponible en:

```text
http://localhost:3000
```

Swagger queda disponible en:

```text
http://localhost:3000/api
```

OpenAPI JSON:

```text
http://localhost:3000/api-json
```

## Usuario Seed

Cuando la aplicacion inicia, crea este freelancer automaticamente si no existe:

```text
email: freelancer@example.com
password: password123
```

Este usuario se usa para obtener el token JWT.

## Probar Endpoints

### Health/default

```bash
curl http://localhost:3000/
```

Respuesta esperada:

```text
Hello World!
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"freelancer@example.com","password":"password123"}'
```

Respuesta esperada:

```json
{
  "access_token": "..."
}
```

Guarda el valor de `access_token`.

### Publicar Servicio

Este endpoint requiere JWT. El proveedor se toma del token, no del body.

```bash
curl -X POST http://localhost:3000/services \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Diseño de logo profesional",
    "category": "Diseño",
    "description": "Diseño de logo con 3 propuestas iniciales y archivos finales.",
    "price": 150
  }'
```

Respuesta esperada:

```json
{
  "id": 1,
  "title": "Diseño de logo profesional",
  "category": "Diseño",
  "description": "Diseño de logo con 3 propuestas iniciales y archivos finales.",
  "price": 150,
  "provider": {
    "name": "Demo Freelancer"
  }
}
```

### Catalogo Publico

No requiere token.

```bash
curl http://localhost:3000/public/services
```

Respuesta esperada:

```json
[
  {
    "id": 1,
    "title": "Diseño de logo profesional",
    "category": "Diseño",
    "description": "Diseño de logo con 3 propuestas iniciales y archivos finales.",
    "price": 150,
    "provider": {
      "name": "Demo Freelancer"
    }
  }
]
```

## Comandos Utiles

Compilar el proyecto:

```bash
npm run build
```

Ejecutar sin watch:

```bash
npm run start
```

Detener PostgreSQL:

```bash
docker compose down
```

Detener PostgreSQL y borrar los datos locales:

```bash
docker compose down -v
```

## Notas

- `TYPEORM_SYNCHRONIZE=true` esta configurado para desarrollo local.
- No se debe enviar `providerId` al crear servicios.
- El endpoint `POST /services` requiere `Authorization: Bearer <TOKEN>`.
- El endpoint `GET /public/services` es publico.
