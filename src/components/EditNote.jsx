import { useEffect, useRef } from "react";

function EditNote({ currentNote, editCurrentNote }) {
  const noteRef = useRef();

  useEffect(() => {
    noteRef.current.focus();
    //make sure clean up
  }, [currentNote]);

  useEffect(() => {
    // console.log("CurrentNote from EditNote", currentNote);
  }, [currentNote]);

  return (
    <textarea
      className="note-body"
      spellCheck="false"
      ref={noteRef}
      value={currentNote.data === undefined ? "" : currentNote.data}
      onChange={editCurrentNote}
    ></textarea>
  );
}

export default EditNote;
