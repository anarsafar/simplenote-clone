import Split from "react-split";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Note from "./Note";
import AllNotes from "./AllNotes";
import "../css/style.css";

function Container() {
  const [noteList, setNoteList] = useState([]);

  function addNote() {
    setNoteList((oldNotes) => {
      return [
        ...oldNotes,
        {
          id: uuidv4(),
          title: "New Note...",
          subtitle: "",
          data: "",
        },
      ];
    });
  }

  return (
    <>
      <Split
        direction="horizontal"
        sizes={[30, 70]}
        minSize={260}
        cursor="col-resize"
        className="split"
      >
        <AllNotes noteList={noteList} addNote={addNote} />
        <Note noteList={noteList} />
      </Split>
    </>
  );
}

export default Container;
