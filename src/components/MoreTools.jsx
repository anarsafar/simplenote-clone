import { forwardRef, useEffect } from "react";

const MoreTools = forwardRef(
  ({ currentNote, pinNote, handleShouldUseMarkdown }, ref) => {
    useEffect(() => {
      console.log("CurrentNote from MoreTools", currentNote);
    }, [currentNote]);

    return (
      <div className="more-tools-container" ref={ref}>
        <label className="note-action">
          <span>Pin to top</span>
          <input
            type="checkbox"
            checked={currentNote.isPinned}
            onChange={(e) => pinNote(e, currentNote.id)}
          />
        </label>
        <label className="note-action">
          <span>Markdown</span>
          <input
            type="checkbox"
            checked={currentNote.shouldUseMarkdown}
            onChange={handleShouldUseMarkdown}
          />
        </label>
        <div className="note-action">
          <button>Delete</button>
        </div>
      </div>
    );
  }
);

export default MoreTools;
