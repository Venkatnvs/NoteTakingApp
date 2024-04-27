import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import backendUrl from '../config';
import { MdArrowBack } from 'react-icons/md';

const NoteViewEdit = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [editedNote, setEditedNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
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
        setNote(data); 
        setEditedNote({ ...data });
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${backendUrl}/notes/${id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedNote)
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      navigate('/notes');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  if (!note) {
    return <div className='text-white'>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="col-md-12 mt-3 mx-3">
        <h5 className="text-muted">
          <Link to="/notes" className="text-white">
            <MdArrowBack className="mb-1" />
            Back to Notes
          </Link>
        </h5>
      </div>
      <div className="row justify-content-center align-content-center mt-2">
        <div className="col-md-9">
          <div className="card bg-transparent ctm_card">
            <div className="card-header">
              <h2 className="text-center text-white">Edit Note</h2>
            </div>
            <div className="card-body">
            <div className="form-group">
              <label className="text-white">Title: </label>
              <input
                type="text"
                className="form-control"
                value={editedNote.title}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, title: e.target.value })
                }
                />
            </div>
            <div className="form-group mt-1">
              <label className="text-white mt-3">Content: </label>
              <textarea
                className="form-control"
                value={editedNote.content}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, content: e.target.value })
                }
                rows="5"
              />
            </div>
              <div className='text-center mt-3'>
                <button className="btn btn-primary ctm_btn" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteViewEdit;
