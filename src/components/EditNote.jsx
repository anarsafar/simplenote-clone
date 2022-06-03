import { useContext, useEffect, useRef } from "react";

function EditNote() {
  const noteRef = useRef();

  useEffect(() => {
    noteRef.current.focus();
    //make sure clean up
  });

  const handleChange = (e) => {};

  return (
    <textarea
      className="note-body"
      spellCheck="false"
      ref={noteRef}
      onChange={handleChange}
    ></textarea>
  );
}

export default EditNote;
