'use client'

import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from '../firebase/firebase.config'

export default function Home() {
  const [form, setForm] = useState({
    nombre: '',
    area: '',
    telefono: '',
    correo: ''
  });

  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async () => {
    await addDoc(collection(db, 'tareas'), form);

    setForm({
      nombre: '',
      area: '',
      telefono: '',
      correo: ''
    });

    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    await deleteDoc(doc(db, 'tareas', id));
    fetchItems();
  };

  const handleEdit = async (id: string) => {
    const nombre = prompt("Nuevo nombre");
    const area = prompt("Nueva área");
    const telefono = prompt("Nuevo teléfono");
    const correo = prompt("Nuevo correo");

    if (!nombre || !area || !telefono || !correo) return;

    await updateDoc(doc(db, 'tareas', id), {
      nombre,
      area,
      telefono,
      correo
    });

    fetchItems();
  };

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, 'tareas'));
    setItems(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
    );
  };

  return (
    <div className="font-sans grid gap-4 items-center justify-items-center min-h-screen p-8">

      <h1>NextJS Firebase</h1>

      {/* Inputs */}
      <input
        type="text"
        placeholder="Nombre"
        className="border-2 p-1"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />

      <input
        type="text"
        placeholder="Área"
        className="border-2 p-1"
        value={form.area}
        onChange={(e) => setForm({ ...form, area: e.target.value })}
      />

      <input
        type="text"
        placeholder="Teléfono"
        className="border-2 p-1"
        value={form.telefono}
        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
      />

      <input
        type="email"
        placeholder="Correo"
        className="border-2 p-1"
        value={form.correo}
        onChange={(e) => setForm({ ...form, correo: e.target.value })}
      />

      <button
        className="border p-2"
        onClick={handleAdd}
      >
        Agregar
      </button>

      {/* Lista */}
      <ul>
        {items.map((item: any) => (
          <li key={item.id} className="mb-2 border p-2">
            <p><b>Nombre:</b> {item.nombre}</p>
            <p><b>Área:</b> {item.area}</p>
            <p><b>Tel:</b> {item.telefono}</p>
            <p><b>Correo:</b> {item.correo}</p>

            <button
              className="p-2 border bg-yellow-500 text-white mr-2"
              onClick={() => handleEdit(item.id)}
            >
              Edit
            </button>

            <button
              className="p-2 border bg-red-500 text-white"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}