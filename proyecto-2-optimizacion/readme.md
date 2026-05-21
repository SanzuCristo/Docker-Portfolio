# Proyecto 2 — Optimización con Multi-Stage Builds

Misma app del Proyecto 1, reescrita con Dockerfiles optimizados usando multi-stage builds para reducir el tamaño de las imágenes.

## Resultados

| Imagen | Antes | Después | Reducción |
|---|---|---|---|
| Frontend | 506MB | 92MB | **-82%** |
| Backend | 276MB | 259MB | -6% |

## ¿Qué es un multi-stage build?

Un Dockerfile con múltiples etapas: una para construir la app 
y otra limpia solo para correrla. Todo lo que se usó para construir 
(Node.js, compiladores, pip) queda fuera de la imagen final.

## Tecnologías añadidas

- **Nginx Alpine** — sirve el frontend compilado (reemplaza a Vite/Node en runtime)
- **Multi-stage Dockerfile** — separación de etapa build y etapa runtime

## Cómo correrlo

```bash
git clone https://github.com/SanzuCristo/docker-portfolio
cd docker-portfolio/proyecto-2-optimizacion
docker compose up --build
```

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://localhost:8000/tareas |
| Docs API | http://localhost:8000/docs |