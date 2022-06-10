/* eslint-disable react-hooks/exhaustive-deps */
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
      isPinned: false,
      shouldUseMarkdown: false,
    };

    setNoteList((prevNoteList) => [newNote, ...prevNoteList]);
    setShouldUpdateNoteList(true);
  };

  const handleShouldUseMarkdown = () => {
    setCurrentNote((prevCurrent) => ({
      ...prevCurrent,
      shouldUseMarkdown: !prevCurrent.shouldUseMarkdown,
    }));
    setShouldUpdateNoteList(true);
  };

  const getCurrentNote = (id) => {
    setCurrentNote(noteList.find((note) => note.id === id && note));
  };

  const pinNote = (e, ID) => {
    e.stopPropagation();

    const newList = noteList.map((note) => {
      return note.id === ID
        ? {
            ...note,
            isPinned: !note.isPinned,
          }
        : note;
    });

    const [editedNote] = newList.filter((note) => note.id === ID);
    const noteListWithoutPin = newList.filter(
      (note) => !note.isPinned && note.id !== ID
    );

    const pinnedNotes = newList.filter(
      (note) => note.isPinned && note.id !== ID
    );

    if (editedNote.isPinned) {
      setNoteList([editedNote, ...pinnedNotes, ...noteListWithoutPin]);
    } else {
      setNoteList([...pinnedNotes, editedNote, ...noteListWithoutPin]);
    }

    setCurrentNote((prevCurrent) => ({
      ...prevCurrent,
      isPinned: !prevCurrent.isPinned,
    }));
  };

  const editCurrentNote = (e) => {
    setShouldUpdateNoteList(true);

    const allLinesFromInput = e.target.value.split("\n");
    const title = allLinesFromInput[0];
    const subtitle = allLinesFromInput[1];

    setCurrentNote((prevCurrentNote) => ({
      ...prevCurrentNote,
      title: title === undefined || title === "" ? "New Note" : title,
      subtitle: subtitle === undefined ? "" : subtitle,
      data: e.target.value,
    }));
  };

  useEffect(() => {
    if (shouldUpdateNoteList) {
      const pinnedNotes = noteList.filter((note) => note.isPinned);
      const withoutPinned = noteList.filter((note) => !note.isPinned);
      setNoteList([...pinnedNotes, ...withoutPinned]);
      setShouldUpdateNoteList(false);
    }
  }, [shouldUpdateNoteList]);

  useEffect(() => {
    noteList.length > 0 && shouldUpdateNoteList && setCurrentNote(noteList[0]);
    console.log("NoteList from Container", noteList);
    setShouldUpdateNoteList(false);
  }, [noteList]);

  useEffect(() => {
    console.log("CurrentNote from Container", currentNote);

    if (shouldUpdateNoteList) {
      const newNotes = noteList.filter((note) =>
        note.id !== currentNote.id ? note : null
      );

      const pinnedNotes = newNotes.filter((note) => note.isPinned);
      const withoutPinned = newNotes.filter((note) => !note.isPinned);
      withoutPinned.unshift(currentNote);

      setNoteList([...pinnedNotes, ...withoutPinned]);

      setShouldUpdateNoteList(false);
    }
  }, [currentNote]);

  return (
    <>
      <Split
        direction="horizontal"
        sizes={[30, 70]}
        minSize={280}
        cursor="col-resize"
        className="split"
      >
        <AllNotes
          noteList={noteList}
          addNewNote={addNewNote}
          getCurrentNote={getCurrentNote}
          currentNote={currentNote}
          pinNote={pinNote}
        />
        <Note
          noteList={noteList}
          currentNote={currentNote}
          editCurrentNote={editCurrentNote}
          pinNote={pinNote}
          handleShouldUseMarkdown={handleShouldUseMarkdown}
        />
      </Split>
    </>
  );
}

export default Container;
