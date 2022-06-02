import newNoteIcon from "../images/new-note.svg";
import searchIcon from "../images/search-icon.svg";
import clearIcon from "../images/clear-icon.svg";
import createIcon from "../images/create-icon.svg";
import pinIcon from "../images/pin-icon.svg";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function NoteList() {
  const [noteList, setNoteList] = useState([]);

  function createNote() {
    const newNote = {
      id: uuidv4(),
      title: "New Note...",
      data: "",
    };

    setNoteList((oldNotes) => {
      return [...oldNotes, newNote];
    });
  }

  const createElement = (
    <div className="create-note">
      <img src={createIcon} alt="Create" className="create-icon-image" />
      <button className="create-note-button" onClick={createNote}>
        Create your first note
      </button>
    </div>
  );

  const displayNoteElements = (
    <div className="note-list">
      {noteList.map((note) => {
        return (
          <div className="note-element" key={note.id}>
            <p>{note.title}</p>
            <img src={pinIcon} alt="Pin" className="pin" />
          </div>
        );
      })}
    </div>
  );
  console.log(noteList);

  return (
    <section className="column-container">
      <header className="all-notes__header">
        <p>Menu</p>
        <p>All Notes</p>
        <img
          src={newNoteIcon}
          alt="Create new note"
          className="create-note-btn"
          onClick={createNote}
        />
      </header>
      <div className="input">
        <img src={searchIcon} alt="Search Icon" />
        <input type="text" placeholder="Search all notes" />
        <img src={clearIcon} alt="Clear Icon" className="clear-icon" />
      </div>
      {noteList.length === 0 && createElement}
      {noteList.length > 0 && displayNoteElements}
    </section>
  );
}

export default NoteList;
