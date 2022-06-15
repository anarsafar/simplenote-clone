/* eslint-disable react-hooks/exhaustive-deps */
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useRef } from "react";
import Note from "./Note";
import AllNotes from "./AllNotes";
import "../css/style.css";

function Container() {
  const [noteList, setNoteList] = useState(() => {
    const savedData = localStorage.getItem("noteList");
    const initialNoteList = JSON.parse(savedData);

    return initialNoteList || [];
  });

  const [currentNote, setCurrentNote] = useState(() => {
    const initialValue = noteList[0];
    return initialValue || {};
  });

  const [shouldUpdateNoteList, setShouldUpdateNoteList] = useState(false);
  const allNotesRef = useRef();
  const notesRef = useRef();

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

  const handleTodo = () => {
    console.log("todo");
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

  const handleDelete = (id) => {
    const newNoteList = noteList.filter((note) => note.id !== id);
    const indexCurrent = noteList.indexOf(currentNote);

    setNoteList(newNoteList);

    if (newNoteList.length === 0) {
      setCurrentNote({});
    } else if (indexCurrent === newNoteList.length) {
      setCurrentNote(newNoteList[newNoteList.length - 1]);
    } else {
      setCurrentNote(noteList[indexCurrent + 1]);
    }
  };

  const handleToggle = () => {
    allNotesRef.current.classList.toggle("disable-all-notes");
    notesRef.current.classList.toggle("toggle-note-container");
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
    localStorage.setItem("noteList", JSON.stringify(noteList));
    setShouldUpdateNoteList(false);
  }, [noteList]);

  useEffect(() => {
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
      <div className="grid-container">
        <AllNotes
          noteList={noteList}
          addNewNote={addNewNote}
          getCurrentNote={getCurrentNote}
          currentNote={currentNote}
          pinNote={pinNote}
          ref={allNotesRef}
        />
        <Note
          noteList={noteList}
          currentNote={currentNote}
          editCurrentNote={editCurrentNote}
          pinNote={pinNote}
          handleShouldUseMarkdown={handleShouldUseMarkdown}
          handleDelete={handleDelete}
          handleTodo={handleTodo}
          handleToggle={handleToggle}
          addNewNote={addNewNote}
          ref={notesRef}
        />
      </div>
    </>
  );
}

export default Container;
