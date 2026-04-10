import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase-client";

function App() {
  const [todoList, setTodoList] = useState([]);

  const [form, setForm] = useState({
    name: "",
    telefono: "",
    correo: "",
    area: "",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("tareas")
      .select("*");

    if (error) {
      console.log("Error fetching: ", error);
    } else {
      setTodoList(data || []);
    }
  };

  const addTodo = async () => {
    if (!form.name.trim()) return;

    const { data, error } = await supabase
      .from("tareas")
      .insert([form])
      .select()
      .single();

    if (error) {
      console.log("Error adding: ", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setForm({
        name: "",
        telefono: "",
        correo: "",
        area: "",
      });
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from("tareas")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("Error deleting: ", error);
    } else {
      setTodoList((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Registro</h1>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) =>
            setForm({ ...form, telefono: e.target.value })
          }
        />

        <input
          placeholder="Correo"
          value={form.correo}
          onChange={(e) =>
            setForm({ ...form, correo: e.target.value })
          }
        />

        <input
          placeholder="Área"
          value={form.area}
          onChange={(e) =>
            setForm({ ...form, area: e.target.value })
          }
        />

        <button onClick={addTodo}>
          Agregar
        </button>
      </div>

      {/* LISTA */}
      <ul>
        {todoList.map((item) => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            <p><b>Nombre:</b> {item.name}</p>
            <p><b>Tel:</b> {item.telefono}</p>
            <p><b>Correo:</b> {item.correo}</p>
            <p><b>Área:</b> {item.area}</p>

            <button onClick={() => deleteTask(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;