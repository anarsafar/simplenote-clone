import newNoteIcon from "../images/new-note.svg";
import searchIcon from "../images/search-icon.svg";
import clearIcon from "../images/clear-icon.svg";
import createIcon from "../images/create-icon.svg";
import { useState } from "react";
import DisplayAllNotes from "./DisplayAllNotes";

function AllNotes({ noteList, addNote }) {
  const [searchNote, setSearchNote] = useState("");

  const handleSearch = (e) => {
    setSearchNote(e.target.value);
  };

  const handleClear = () => {
    setSearchNote("");
  };

  const createFirstElement = (
    <div className="create-note">
      <img src={createIcon} alt="Create" className="create-icon-image" />
      <button className="create-note-button" onClick={addNote}>
        Create your first note
      </button>
    </div>
  );

  return (
    <section className="column-container">
      <header className="all-notes__header">
        <p>Menu</p>
        <p>All Notes</p>
        <img
          src={newNoteIcon}
          alt="Create new note"
          className="create-note-btn"
          onClick={addNote}
        />
      </header>
      <div className="input">
        <img src={searchIcon} alt="Search Icon" />
        <input
          type="text"
          placeholder="Search all notes"
          value={searchNote}
          onChange={handleSearch}
        />
        <img
          src={clearIcon}
          onClick={handleClear}
          alt="Clear Icon"
          className={
            searchNote.length > 0 ? "clear-icon show-element" : "clear-icon"
          }
        />
      </div>
      {noteList.length > 0 ? (
        <DisplayAllNotes noteList={noteList} />
      ) : (
        createFirstElement
      )}
    </section>
  );
}

export default AllNotes;
