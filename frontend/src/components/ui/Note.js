import {MdDeleteForever, MdEditNote} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Note = ({id, title, content, updated_at, deleteNote}) => {
    const navigate = useNavigate();

    const date = new Date(updated_at);
    updated_at = date.toLocaleString();
    return (
    <div className="note">
        <div className="note__header justify-content-between">
            <h5 className="nsm_title fw-bold">{title}</h5>
            <MdEditNote
                className="note__edit text-primary fs-5"
                aria-hidden="true"
                title="Edit note"
                size="1.2em"
                onClick={() => navigate(`/notes/${id}`)}
            ></MdEditNote>
        </div>
        <hr className='my-0 py-0'/>
        <div className="note__body">{content}</div>
        <div className="note__footer justify-content-between">

        <div className="note__date">{updated_at}</div>
        <MdDeleteForever
            className="note__delete text-danger fs-5"
            aria-hidden="true"
            title="Delete note"
            onClick={() => deleteNote(id)}
        ></MdDeleteForever>
      </div>
    </div>
    );
}

export default Note;