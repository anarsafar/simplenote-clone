import { useEffect, useRef } from "react";

function EditNote() {
  const noteRef = useRef();

  useEffect(() => {
    noteRef.current.focus();
    //make sure clean up
  });

  return (
    <textarea className="note-body" spellCheck="false" ref={noteRef}></textarea>
  );
}

export default EditNote;
