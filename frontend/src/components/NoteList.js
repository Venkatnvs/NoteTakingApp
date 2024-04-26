import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../config';
import Note from './ui/Note';
import './css/Note.css';
import Header from './Header_Nav';
import CreateNote from './ui/CreateNote';
import Search from './ui/Search';

const fetchNotes = async (token, setNotes) => {
  try {
    const response = await fetch(`${backendUrl}/notes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    
    const data = await response.json();
    setNotes(data);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
};

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const textHandlerTitle = (e) => {
    setInputTitle(e.target.value);
  };

  const searchHandler = (e) => {
    setSearchText(e.target.value);
  }
  
  const saveHandler = async () => {
    console.log(inputText, inputTitle);
    const token = localStorage.getItem('token');
    const data = {
      title: inputTitle,
      content: inputText
    };
    try {
      const response = await fetch(`${backendUrl}/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Failed to save note');
      }
      const newData = await response.json();
      setNotes(prevNotes => [...prevNotes, newData]);
      setInputText('');
      setInputTitle('');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login', { replace: true });
      return;
    }
    console.log('fetching notes');
    fetchNotes(token, setNotes);
  }, [navigate]);

  const deleteNote = (id) => {
    const token = localStorage.getItem('token');
    fetch(`${backendUrl}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok && response.status !== 204) {
        throw new Error('Failed to delete note');
      }
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    }).catch(error => {
      console.error('Error deleting note:', error);
    });
  };

  return (
    <div className="container">
      <Header />
      <div className="col-md-12 mt-3">
        <div className="d-flex justify-content-between align-content-center my-1 align-items-center">
          <h4 className="n_title">Note List</h4>
          <Search searchHandler={searchHandler}/>
        </div>
        <div className="notes">
          {notes.map(note => (note.title.toLowerCase().includes(searchText.toLowerCase()) || note.content.toLowerCase().includes(searchText.toLowerCase())) && (
            <Note 
              key={note.id}
              deleteNote={deleteNote}
              {...note} 
            />
          ))}
          <CreateNote 
            textHandler={textHandler}
            textHandlerTitle={textHandlerTitle}
            saveHandler={saveHandler}
            inputText={inputText}
            inputTitle={inputTitle}
          />
        </div>
      </div>
      {notes.length === 0 && <div className="text-center text-white my-3">No notes found</div>}
      {notes.length > 0 && <div className="badge bg-black-05 text-white">Total notes: {notes.length}</div>}
    </div>
  );
};

export default NoteList;
