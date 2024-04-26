// NoteViewEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backendUrl from '../config';

const NoteViewEdit = () => {
  const { id } = useParams(); // Extracting the id parameter from the URL
  const [note, setNote] = useState(null); // State to store the note
  const [editedNote, setEditedNote] = useState(null); // State to store the edited note
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login page if token is not available
          return;
        }

        const response = await fetch(`${backendUrl}/notes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch note');
        }

        const data = await response.json();
        setNote(data); // Set the fetched note
        setEditedNote({ ...data }); // Set the edited note with the fetched note data
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNote(); // Call fetchNote when the component mounts
  }, [id, navigate]); // Dependency array with id and history

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login page if token is not available
        return;
      }

      const response = await fetch(`${backendUrl}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedNote) // Send the edited note data in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      // Optionally, handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Render loading message while fetching the note
  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Note Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <textarea
            className="form-control"
            value={editedNote.content} // Use editedNote for editing
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })} // Update editedNote content
            rows="6"
          />
          <button className="btn btn-primary mt-3" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default NoteViewEdit;
