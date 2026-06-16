# FreelanceHub API

API en NestJS para registrar servicios freelance y explorar un catalogo publico de servicios.

## Requisitos

- Node.js
- Docker y Docker Compose
- npm

## Configuracion

1. Instalar dependencias:

```bash
npm install
```

2. Crear variables de entorno:

```bash
cp .env.example .env
```

3. Levantar PostgreSQL:

```bash
docker compose up -d postgres
```

4. Ejecutar la API:

```bash
npm run start:dev
```

La API usa `PORT=3000` por defecto. Swagger queda disponible en:

```text
http://localhost:3000/api
```

## Usuario seed

Al iniciar la aplicacion se crea un freelancer por defecto si no existe:

```text
email: freelancer@example.com
password: password123
```

## Endpoints principales

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"freelancer@example.com","password":"password123"}'
```

### Publicar servicio

Usar el token recibido en login. El proveedor se toma del JWT, no del body.

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

### Catalogo publico

No requiere token.

```bash
curl http://localhost:3000/public/services
```

## Scripts

```bash
npm run build
npm run start
npm run start:dev
```
