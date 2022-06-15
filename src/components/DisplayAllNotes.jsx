import pinIcon from "../images/pin-icon.svg";
import { Link } from "react-router-dom";

function DisplayAllNotes({ noteList, getCurrentNote, currentNote, pinNote }) {
  const displayNoteElements = (
    <div className="note-list">
      {noteList.map((note) => {
        return (
          <Link key={note.id} to="note" className="note-link">
            <div
              className={
                currentNote.id === note.id
                  ? "note-element active-note"
                  : "note-element"
              }
              onClick={() => getCurrentNote(note.id)}
            >
              <div className="note-data">
                <p className="note-title">{note.title}</p>
                <p className="note-subtitle">{note.subtitle}</p>
              </div>
              <img
                src={pinIcon}
                alt="Pin"
                className={note.isPinned ? "pin pin-active" : "pin"}
                onClick={(e) => pinNote(e, note.id)}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
  return displayNoteElements;
}

export default DisplayAllNotes;
