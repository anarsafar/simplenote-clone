import pinIcon from "../images/pin-icon.svg";

function DisplayNoteElements({ noteList }) {
  const handleNote = (ID) => {
    const note = noteList.map((note) => {
      return note.id === ID ? note : null;
    });
    const [noteData] = note;
    return noteData;
  };

  const displayNoteElements = (
    <div className="note-list">
      {noteList.map((note) => {
        return (
          <div
            className="note-element"
            key={note.id}
            onClick={() => handleNote(note.id)}
          >
            <div className="note-data">
              <p className="note-title">{note.title}</p>
              <p className="note-subtitle">{note.subtitle}</p>
            </div>
            <img src={pinIcon} alt="Pin" className="pin" />
          </div>
        );
      })}
    </div>
  );
  return displayNoteElements;
}

export default DisplayNoteElements;
