# Simple User Manager

Full-stack user management app:

- Backend: Spring Boot + PostgreSQL
- Frontend: React (Vite) + Chakra UI
- Endpoints: login, register, create/read/update/delete users
- Containerization: Docker + Docker Compose

## Project Structure

- `backend`: Spring Boot API
- `frontend`: React app
- `docker-compose.yml`: runs database, backend, and frontend

## Run with Docker

From project root:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8081/api`
- PostgreSQL: `localhost:5432`

## Main API Endpoints

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`

Users:

- `GET /api/users`
- `GET /api/users/{id}`
- `POST /api/users`
- `PUT /api/users/{id}`
- `DELETE /api/users/{id}`

## Example payloads

Register / Create user:

```json
{
  "name": "Ahmad",
  "email": "ahmad@example.com",
  "password": "secret123"
}
```

Login:

```json
{
  "email": "ahmad@example.com",
  "password": "secret123"
}
```
