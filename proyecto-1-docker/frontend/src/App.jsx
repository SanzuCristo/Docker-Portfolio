import { useState, useEffect } from "react";

const API = "http://localhost:8000";

function App() {
    const [tareas, setTareas] = useState([]);
    const [titulo, setTitulo] = useState("");


    const cargarTareas = async () => {
        try {
            const res = await fetch(`${API}/tareas`);
            const data = await res.json();
            setTareas(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al cargar tareas:", error);
            setTareas([]);
        }
    };



    const crearTarea = async () => {
        if (!titulo.trim()) return;
        await fetch(`${API}/tareas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo })
        });
        setTitulo("");
        cargarTareas();
    };

    const eliminarTarea = async (id) => {
        await fetch(`${API}/tareas/${id}`, { method: "DELETE" });
        cargarTareas();
    };
    useEffect(() => {
        cargarTareas();
    }, []);

    return (
        <div style={{ maxWidth: 500, margin: "60px auto", fontFamily: "sans-serif" }}>
            <h1>📝 Lista de Tareas</h1>

            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && crearTarea()}
                    placeholder="Nueva tarea..."
                    style={{ flex: 1, padding: "8px 12px", fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <button
                    onClick={crearTarea}
                    style={{ padding: "8px 16px", fontSize: 16, borderRadius: 6, background: "#4f46e5", color: "white", border: "none", cursor: "pointer" }}
                >
                    Agregar
                </button>
            </div>

            {tareas.length === 0 && <p style={{ color: "#999" }}>No hay tareas aún.</p>}

            <ul style={{ listStyle: "none", padding: 0 }}>
                {tareas.map((t) => (
                    <li key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", marginBottom: 8, background: "#f9f9f9", borderRadius: 8, border: "1px solid #eee" }}>
                        <span>{t.titulo}</span>
                        <button
                            onClick={() => eliminarTarea(t.id)}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#e11d48" }}
                        >
                            🗑️
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )

};

export default App;
