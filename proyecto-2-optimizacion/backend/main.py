# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware  
# pyrefly: ignore [missing-import]
from sqlalchemy import create_engine, Column, Integer, String, Boolean 
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import declarative_base, sessionmaker 
import os

app = FastAPI()

#Permite que React se comunique con la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Conexion a PostgreSLQ usando variables de entorno
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# Modelo de tabla "tareas"
class Tarea(Base):
    __tablename__ = "tareas"
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    completada = Column(Boolean, default=False)

# Conexion a la BD y reintentos

import time

def conectar_reintentos():
    for intento in range(10):
        try:
            Base.metadata.create_all(bind=engine)
            print("Conectado a la base de datos")
            return
        except Exception as e:
            print("Intento {intento + 1}/10 - DB no lista, esperando..")
            time.sleep(3)
    raise Exception("No se pudo conectar a la base de datos")

conectar_reintentos()

# -- Rutas de las API --

@app.get("/tareas")
def obtener_tareas():
    db = SessionLocal()
    tareas = db.query(Tarea).all()
    db.close()
    return tareas
    
@app.post("/tareas")
def crear_tarea(datos: dict):
    db = SessionLocal()
    nueva = Tarea(titulo=datos['titulo'])
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    db.close()
    return nueva

@app.delete("/tareas/{id}")
def eliminar_tarea(id: int):
    db = SessionLocal()
    tarea = db.query(Tarea).filter(Tarea.id == id).first()
    db.delete(tarea)
    db.commit()
    db.close()
    return {"message": "Tarea eliminada"}
