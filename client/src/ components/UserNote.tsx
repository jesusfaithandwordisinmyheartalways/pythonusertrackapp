import React, { useState, useEffect } from "react";
import { Note } from "../types";




const UserNote: React.FC = () => {
  const [clients, setClients] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);




  const userFetchNotes = async () => {
    const response = await fetch("http://localhost:8000/api/notes/");
    const data = await response.json();
    setNotes(data);
    localStorage.setItem("notes", JSON.stringify(data));
  };




  const userAddNotes = async () => {
    const response = await fetch("http://localhost:8000/api/notes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client: clients, content }),
    });

    if (response.ok) {
      setClients("");
      setContent("");
    }
  };



  const updateNotes = async (id: number) => {
    const newContent = prompt("Enter new note");
    if (newContent) {
      await fetch(`http://localhost:8000/api/notes/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent }),
      });
    }
  };




  const deleteNote = async (id: number) => {
    await fetch(`http://localhost:8000/api/notes/${id}/`, {
      method: "DELETE",
    });
  };



  useEffect(() => {
    userFetchNotes();

    const socket = new WebSocket("ws://localhost:8000/ws/notes/");
    socket.onmessage = () => {
      userFetchNotes();
    };

    return () => {
      socket.close();
    };
  }, []);





  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Note</h2>

      <input onChange={(e) => setClients(e.target.value)} value={clients} className="border p-2 m-2" placeholder="Client name" />

      <input onChange={(e) => setContent(e.target.value)} value={content}placeholder="Note content" className="border p-2 m-2" />

      <button onClick={userAddNotes} className="bg-blue-500 text-white p-2 m-2" > Add Note </button>


      <div>
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="my-2 border p-2">
              <p>
                <strong>{note.client}</strong>: {note.content}
              </p>


              <button onClick={() => updateNotes(note.id)} className="bg-yellow-500 text-white px-2 py-1 mr-2" > Update </button>


              <button onClick={() => deleteNote(note.id)}  className="bg-red-500 text-white px-2 py-1"> Delete </button>
            </li>
          ))}
        </ul>



      </div>
    </div>
  );
};




export default UserNote;