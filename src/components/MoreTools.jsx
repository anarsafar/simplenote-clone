import React, { forwardRef } from "react";

const MoreTools = forwardRef((props, ref) => {
  return (
    <div className="more-tools-container" ref={ref}>
      <div className="note-action">
        <span>Pin to top</span>
        <input type="checkbox" />
      </div>
      <div className="note-action">
        <span>Markdown</span>
        <input type="checkbox" />
      </div>
      <div className="note-action">
        <button>Delete</button>
      </div>
    </div>
  );
});

export default MoreTools;
