# Proyecto 1 — App Fullstack Dockerizada

App de lista de tareas con arquitectura de 3 servicios orquestados con Docker Compose.

## Arquitectura

React (Frontend) → FastAPI (Backend) → PostgreSQL (Base de datos)
:5173               :8000                 :5432

## Tecnologías

- **Frontend:** React + Vite
- **Backend:** Python + FastAPI
- **Base de datos:** PostgreSQL 15
- **Orquestación:** Docker Compose

## ¿Qué demuestra este proyecto?

- Comunicación entre contenedores mediante red interna de Docker
- Persistencia de datos con volúmenes
- Variables de entorno para configuración entre servicios
- Orden de arranque con `depends_on` y `healthcheck`

## Cómo correrlo

Requisitos: tener Docker Desktop instalado.

```bash
git clone https://github.com/SanzuCristo/docker-portfolio
cd docker-portfolio/proyecto-1-fullstack
docker compose up --build
```

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://localhost:8000/tareas |
| Docs API | http://localhost:8000/docs |