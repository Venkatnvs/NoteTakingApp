# Django-React Note Taking App

This is a simple note-taking application built using Django for the backend and React for the frontend. It allows users to create, read, update, and delete notes. Each note has a title and content, and users can register and login to manage their notes.

## Features

- User registration and login: Users can register for a new account and login to access their notes.
- Create, read, update, delete (CRUD) operations on notes: Users can perform CRUD operations on their notes, including creating new notes, viewing existing notes, updating note details, and deleting notes.
- User-specific notes: Each note is associated with the user who created it, ensuring that users can only access their own notes.
- Frontend-backend interaction: The React frontend communicates with the Django backend using RESTful API endpoints to perform CRUD operations on notes.

## Technologies Used

- Backend:
  - Django: A high-level Python web framework for building web applications.
  - Django REST Framework: A powerful toolkit for building Web APIs in Django.
  - PostgreSQL: A powerful, open-source relational database system.
  
- Frontend:
  - React: A JavaScript library for building user interfaces.
  - React Router: A routing library for React applications.

- Database:
  - PostgreSQL: A powerful, open-source relational database system.

- Docker:
  - Docker: A platform for developing, shipping, and running applications in containers.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Venkatnvs/NoteTakingApp.git
````
2. Navigate to the project directory:
```bash
cd NoteTakingApp
```
3. Create a `.env` file in the `backend` directory with the following environment variables:
```bash
SECRET_KEY=your_secret_key
DEBUG=False or True
JWT_SECRET_KEY=your_jwt_key
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=your_database_port
```
Replace `your_secret_key`, `your_jwt_key`, `your_database_user`, `your_database_password`, `your_database_name`, and `your_database_port` with your actual credentials.
4. Start the Docker containers:
```bash
docker-compose up -d --build
docker compose exec backend python manage.py migrate --noinput
docker compose exec backend python manage.py collectstatic --noinput
```
5. Access the application in your web browser:
Frontend - [http://localhost:3000/](http://localhost:3000/)
BAckend - [http://localhost:8000/](http://localhost:8000/)

## API Endpoints

All API endpoints require authentication.

### Authentication

Authentication is required for accessing all API endpoints. Users need to register for a new account and login to access their notes. 

- `POST /api/auth/register/`: Register a new user.
- `POST /api/auth/login/`: Log in to the application.

### Notes

The following endpoints allow users to perform CRUD operations on notes:

- `GET /api/notes/`: Get a list of all notes.
- `GET /api/notes/<id>/`: Get details of a specific note.
- `POST /api/notes/`: Create a new note.
- `PUT /api/notes/<id>/`: Update an existing note.
- `DELETE /api/notes/<id>/`: Delete a note.

## Authors

- N.Venkat Swaroop (@Venkatnvs) [venkatnvs2005@gmail.com](mailto:venkatnvs2005@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.