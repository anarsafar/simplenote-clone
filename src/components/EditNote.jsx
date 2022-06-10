import { useEffect, useRef } from "react";

function EditNote({ currentNote, editCurrentNote }) {
  const noteRef = useRef();

  useEffect(() => {
    noteRef.current.focus();
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
