import Split from "react-split";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import Note from "./Note";
import AllNotes from "./AllNotes";
import "../css/style.css";

function Container() {
  const [noteList, setNoteList] = useState([]);
  const [currentNote, setCurrentNote] = useState({});
  const [shouldUpdateNoteList, setShouldUpdateNoteList] = useState(false);

  const addNewNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "New Note",
      subtitle: "",
      data: "",
    };
    setNoteList((prevNoteList) => [newNote, ...prevNoteList]);
    setShouldUpdateNoteList(true);
  };

  const getCurrentNote = (id) => {
    setCurrentNote(noteList.find((note) => note.id === id && note));
  };

  const editCurrentNote = (e) => {
    setShouldUpdateNoteList(true);
    setCurrentNote((prevCurrentNote) => ({
      ...prevCurrentNote,
      data: e.target.value,
    }));
  };

  useEffect(() => {
    noteList.length > 0 && shouldUpdateNoteList && setCurrentNote(noteList[0]);
    setShouldUpdateNoteList(false);
    // console.log("NoteList from Container", noteList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteList]);

  useEffect(() => {
    // console.log("CurrentNote from Container", currentNote);
    if (shouldUpdateNoteList) {
      const newNotes = noteList.filter((note) =>
        note.id !== currentNote.id ? note : null
      );
      newNotes.unshift(currentNote);
      setNoteList(newNotes);
      setShouldUpdateNoteList(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNote]);

  return (
    <>
      <Split
        direction="horizontal"
        sizes={[30, 70]}
        minSize={260}
        cursor="col-resize"
        className="split"
      >
        <AllNotes
          noteList={noteList}
          addNewNote={addNewNote}
          getCurrentNote={getCurrentNote}
          currentNote={currentNote}
        />
        <Note
          noteList={noteList}
          currentNote={currentNote}
          editCurrentNote={editCurrentNote}
        />
      </Split>
    </>
  );
}

export default Container;
