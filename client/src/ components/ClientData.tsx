


import React, { useEffect, useState } from "react";
import { Note } from "../types";




const ClientData: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);



  const userLoadNotes = () => {
    const userNotes = localStorage.getItem("notes");
    if (userNotes) {
      setNotes(JSON.parse(userNotes));
    }
  };




  useEffect(() => {
    userLoadNotes();

    const socket = new WebSocket("ws://localhost:8000/ws/notes/");
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "note_update") {
          setNotes(data.notes);
          localStorage.setItem("notes", JSON.stringify(data.notes));
        }
      };

    return () => {
      socket.close();
    };
  }, []);





  return (
    <div className="p-4">
      <div className="text-xl font-bold mb-4">Client Notes</div>


    <div>
    <ul>
        {notes.map((data) => (
          <li key={data.id}>
            <p>
              <strong>{data.client}</strong>: {data.content}
            </p>
          </li>
        ))}
      </ul>
    </div>



    </div>
  );
};





export default ClientData;