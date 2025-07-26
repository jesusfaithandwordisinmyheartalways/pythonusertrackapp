Project Title

Real-Time User Note Tracking App (Django + React + WebSockets)


Developed a full-stack real-time user note tracking application using Django, Django REST Framework, Django Channels, 
and React. The app allows users to add, edit, delete, and view client-related notes with instant 
updates across connected clients using WebSockets.




 Backend (Python / Django)

Tech Stack:
	•	Django & Django REST Framework (API)
	•	Django Channels (WebSocket support)
	•	Redis (for channel layer)
	•	SQLite (dev DB, easily swappable for PostgreSQL)
	•	CORS headers for cross-origin support

Features:
	1.	RESTful API using Django REST Framework:
	•	GET /api/notes/: List all notes
	•	POST /api/notes/: Add new note
	•	PUT /api/notes/<id>/: Update note
	•	DELETE /api/notes/<id>/: Delete note
	2.	Real-Time WebSocket Communication via Django Channels:
	•	Live sync of note data between users on the frontend
	•	WebSocket endpoint: ws://<host>/ws/notes/
	•	On any note update (add/edit/delete), all clients receive updated data immediately via a broadcast
	3.	Model Design:
	•	A simple Note model with:
	•	client: Client name
	•	content: Note text
	4.	ASGI Support:
	•	Fully configured for async communication using Daphne ASGI server
	•	ProtocolTypeRouter supports both HTTP and WebSocket protocols
	5.	Redis Integration:
	•	Redis used as the backend for Django Channels (channel layer)
	•	Configurable via REDIS_URL environment variable for cloud deployment (e.g. Render)
	6.	Modular Structure:
	•	Clean separation of concerns (views, serializers, routing, consumers)
	•	Admin-ready Django app setup (extensible for auth, permissions)

⸻

 Frontend (React + TypeScript)

Tech Stack:
	•	React + TypeScript
	•	Tailwind CSS (or basic utility classes)
	•	WebSocket API
	•	Fetch API for REST calls
	•	LocalStorage for basic persistence

Features:
	1.	Note Management UI:
	•	Add client notes using input fields
	•	Edit and delete notes via UI buttons
	•	Stored in both local state and localStorage
	2.	Live Updates via WebSockets:
	•	Opens a WebSocket connection on load
	•	Receives full updated note list on every change
	•	Automatically refreshes the UI without reload
	3.	Persistent State:
	•	Uses localStorage to cache last known notes
	•	Graceful fallback when offline or reloading
	4.	Component Breakdown:
	•	UserNote.tsx: Add, update, delete client notes
	•	ClientData.tsx: Passive view of notes, auto-syncs in real time









 SCREENSHOTS:

<img width="2880" height="1296" alt="user track python app Screenshot" src="https://github.com/user-attachments/assets/d602932a-3a7e-4369-a1d4-7b43d7011b22" />


 
