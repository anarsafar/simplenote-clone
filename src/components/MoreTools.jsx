import { forwardRef } from "react";

const MoreTools = forwardRef(
  (
    { currentNote, noteList, pinNote, handleShouldUseMarkdown, handleDelete },
    ref
  ) => {
    const checked = noteList.find(
      (note) => note.id === currentNote.id
    ).isPinned;
    return (
      <div className="more-tools-container" ref={ref}>
        <label className="note-action">
          <span>Pin to top</span>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => pinNote(e, currentNote.id)}
          />
        </label>
        <label className="note-action">
          <span>Markdown</span>
          <input
            type="checkbox"
            checked={currentNote && currentNote.shouldUseMarkdown}
            onChange={handleShouldUseMarkdown}
          />
        </label>
        <div className="note-action">
          <button onClick={() => handleDelete(currentNote.id)}>Delete</button>
        </div>
      </div>
    );
  }
);

export default MoreTools;
