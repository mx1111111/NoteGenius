NoteGenius

NoteGenius is a modern study productivity web application that helps students organize their learning process using flashcards, subject management, exam planning, and a built-in Pomodoro timer. It is designed as a fully client-side React application using local storage for persistence and authentication.




Description

NoteGenius is a personal learning workspace where users can:

Create and manage subjects
Build flashcards for active recall
Schedule and track exams
Use a Pomodoro timer for focused study sessions
Switch between light and dark mode
Persist all data per user using local storage authentication system

The application simulates a full learning management system without requiring a backend, making it fast, offline-friendly, and easy to deploy.



Workflow of the Application
1. Authentication Flow
Users register or log in using a simple username/password system
Accounts are stored in localStorage
Once authenticated:
A user session is created
User-specific data is isolated



2. Subject Management
Users create subjects (e.g., Math, Physics)
Each subject has:
Name
Color tag
Optional description
Subjects act as the main container for flashcards and exams
