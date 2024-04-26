import { React } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const CreateNote = ({ textHandler, textHandlerTitle, saveHandler, inputText, inputTitle }) => {
    const charLimit = 100;
    const charLeft = charLimit - inputText.length;
    return (
        <div className="note">
        <input
            type="text"
            placeholder="Title..."
            className="title_added"
            maxLength="50"
            onChange={textHandlerTitle}
            value={inputTitle}
        />
        <hr className="my-1"/>
        <textarea
            cols="10"
            rows="3"
            placeholder="Type content...."
            onChange={textHandler}
            maxLength="100"
            value={inputText}
        ></textarea>
        <div className="note__footer">
            <span className="label fs-6">{charLeft} left</span>
            <button className="note__save" onClick={saveHandler}>Save</button>
        </div>
        <LinearProgress
            className="char__progress"
            variant="determinate"
            value={charLeft}
        />
    </div>
    );
};

export default CreateNote;