import {MdDeleteForever} from 'react-icons/md';

const Note = ({id, title, content, updated_at, deleteNote}) => {
    const date = new Date(updated_at);
    updated_at = date.toLocaleString();
    return (
    <div className="note">
        <div className="nsm_title fw-bold">{title}</div>
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