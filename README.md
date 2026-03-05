# DLBackend

Backend en Node.js con Express y Mongoose para gestionar FreeSpot, Feedback y User.

## Instalación

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Configura la base de datos en el archivo `.env` (por defecto usa MongoDB local).

## Uso

1. Inicia el servidor:
   ```bash
   node index.js
   ```
2. Endpoints disponibles:
   - `/api/freespots` CRUD de FreeSpot
   - `/api/feedbacks` CRUD de Feedback
   - `/api/users` CRUD de User

## Modelos

- **FreeSpot**: id, latitude, longitude, markedAt, markedBy, isActive
- **Feedback**: id, userId, spotId, comment, rating, createdAt
- **User**: id, name, email, phone, type, createdAt
