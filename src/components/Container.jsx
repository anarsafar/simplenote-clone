import Split from "react-split";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Note from "./Note";
import NoteList from "./NoteList";
import "../css/style.css";

function Container() {
  const [noteList, setNoteList] = useState([]);
  const [displayEditNoteData, setEditNoteData] = useState();

  function createNote() {
    const newNote = {
      id: uuidv4(),
      title: "New Note...",
      subtitle: "",
      data: "Something",
    };

    setNoteList((oldNotes) => {
      return [...oldNotes, newNote];
    });
  }

  const contextData = { displayEditNoteData, setEditNoteData };
  return (
    <>
      <Split
        direction="horizontal"
        sizes={[30, 70]}
        minSize={280}
        cursor="col-resize"
        className="split"
      >
        <NoteList noteList={noteList} createNote={createNote} />
        <Note noteList={noteList} />
      </Split>
    </>
  );
}

export default Container;
