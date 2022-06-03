import toggleListIcon from "../images/toggle-icon.svg";
import moreToolsIcon from "../images/more-tools.svg";
import openMarkdown from "../images/open-mark.svg";
import closeMarkDown from "../images/close-mark.svg";
import EditNote from "./EditNote";
import Markdown from "./Markdown";
import { useState } from "react";

function Note({ noteList }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleMarkDownVisibility = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <section className="column-container">
      <header className="note-header">
        <img
          src={toggleListIcon}
          alt="Toggle List"
          className={noteList.length !== 0 ? "show-element" : ""}
        />
        <img
          src={isVisible ? closeMarkDown : openMarkdown}
          alt="Display Markdown"
          onClick={handleMarkDownVisibility}
          className={noteList.length !== 0 ? "show-element" : ""}
        />
        <img
          src={moreToolsIcon}
          alt="More Tools"
          className={noteList.length !== 0 ? "show-element" : ""}
        />
      </header>
      {isVisible ? <Markdown /> : noteList.length !== 0 ? <EditNote /> : null}
    </section>
  );
}

export default Note;