import { useEffect, useRef } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

function EditNote({ currentNote, editCurrentNote }) {
  const noteRef = useRef();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 750) {
      noteRef.current.focus();
    }
  }, [currentNote, width]);

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
