import newNoteIcon from "../images/new-note.svg";
import searchIcon from "../images/search-icon.svg";
import clearIcon from "../images/clear-icon.svg";
import createIcon from "../images/create-icon.svg";
import { useState } from "react";
import DisplayNoteElements from "./DisplayNoteElements";

function NoteList({ noteList, createNote }) {
  const [searchNote, setSearchNote] = useState("");

  const handleSearch = (e) => {
    setSearchNote(e.target.value);
  };

  const handleClear = () => {
    setSearchNote("");
  };

  // // Run useEffect only Component Update based on "searchNote" state
  // const isInitialMount = useRef(true);

  // useEffect(() => {
  //   const filterSearch = () => {
  //     console.log("Input update from new Effect");
  //     const searchElement = searchNote.toLowerCase();

  //     noteList.filter((note) => {
  //       const noteListElement = note.title.toLowerCase();
  //       if (noteListElement.includes(searchElement)) {
  //         console.log("found");
  //       }
  //     });
  //   };

  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     filterSearch();
  //   }
  //   // return filterSearch;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchNote]);

  const createElementComponent = (
    <div className="create-note">
      <img src={createIcon} alt="Create" className="create-icon-image" />
      <button className="create-note-button" onClick={createNote}>
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
          onClick={createNote}
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
        <DisplayNoteElements noteList={noteList} />
      ) : (
        createElementComponent
      )}
    </section>
  );
}

export default NoteList;
