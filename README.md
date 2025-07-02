## Introduction
![Screenshot 2025-07-02 141939](https://github.com/user-attachments/assets/1e125fe5-8e7f-41f1-bbbe-30661fb2e742)

A Movie Review system where users can sign up, log in, browse movies, rate and review them, and manage a list of favorite titles. The system follows the MVC pattern and offers a simple interface to explore movie details, read other users' reviews, and interact with movie content. It connects to an external movie API and stores user profiles, favorites, and reviews in a database.

## Entity Relationship Diagram (ERD):
The diagram below shows the relationships between the main collections in the system: `User`, `Favorite`, `Review`, and `Movie`.

![WhatsApp Image 2025-06-24 at 3 00 49 PM](https://github.com/user-attachments/assets/1ba199a5-1b4a-4633-a613-18870c347ea3)

## Features:
- User authentication (sign up and log in)
- User profile with list of favorite movies and reviews
- Search for movies using an external movie API
- Write and view reviews for any movie
- Add or remove movies from your favorites list

## Technologies Used:
- **Node.js** — JavaScript runtime environment for server-side development  
- **Express** — Fast, minimal web framework for building RESTful APIs  
- **MongoDB** — NoSQL database for flexible and scalable data storage  
- **Mongoose** — Elegant MongoDB object modeling for Node.js  
- **Axios** — HTTP client to communicate with the backend API
- **cors** — Middleware to enable cross-origin requests 
- **bcrypt** — Library to hash passwords securely  
- **jsonwebtoken (JWT)** — JSON Web Token implementation for authentication
- **morgan** — HTTP request logger middleware for development
- **React** — JavaScript library for building user interfaces
- **React Router DOM** — Declarative routing for React applications
- **Axios** — Promise-based HTTP client to communicate with the backend
- **Vite** — Next-generation frontend build tool for fast development and bundling  
- **@vitejs/plugin-react-swc** — Vite plugin for fast React compilation using the SWC compiler

## Screenshots:

### 🔐 User Authentication
- **Sign In / Register Pages**
![Sign In](./screenshots/signin.png)
![Register](./screenshots/signup.png)

### 🎬 Browse Movies
- **Movies List Page**
![Movies List](./screenshots/movies-list.png)

### ⭐ Rate & Review Movies
- **Movie Review Pages**
![Movie Reviews](./screenshots/movie-details.png)

### ❤️ Favorites
- **User's Favorite Movies Page**
![Favorites](./screenshots/favorites.png)

### 🧑‍💼 User Profile
- **View Other Users’ Reviews and Profiles**
![User Profile](./screenshots/user-profile.png)

