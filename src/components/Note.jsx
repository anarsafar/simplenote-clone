import toggleListIcon from "../images/toggle-icon.svg";
import moreToolsIcon from "../images/more-tools.svg";
import openMarkdown from "../images/open-mark.svg";
import closeMarkDown from "../images/close-mark.svg";
import EditNote from "./EditNote";
import Markdown from "./Markdown";
import { useState, useRef, useEffect } from "react";
import MoreTools from "./MoreTools";

function Note({ noteList, currentNote, editCurrentNote }) {
  const [isMarkDownVisible, setIsMarkDownVisible] = useState(false);
  const [isMoreToolsVisible, setIsMoreToolsVisible] = useState(false);
  const moreToolsRef = useRef();

  const handleMarkDownVisibility = () => {
    setIsMarkDownVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleMoreToolsVisibility = () => {
    setIsMoreToolsVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    const checkIsOutside = (e) => {
      const isMoreTools =
        e.target.alt === "More Tools" ||
        moreToolsRef.current.contains(e.target);
      if (!isMoreTools) {
        setIsMoreToolsVisible((prevVisible) => !prevVisible);
      }
    };

    if (isMoreToolsVisible) {
      document.addEventListener("click", checkIsOutside);
    }

    return () => {
      document.removeEventListener("click", checkIsOutside);
    };
  }, [isMoreToolsVisible]);

  return (
    <section className="column-container">
      <header className="note-header">
        <img
          src={toggleListIcon}
          alt="Toggle List"
          className={noteList.length !== 0 ? "show-element" : ""}
        />
        <img
          src={isMarkDownVisible ? closeMarkDown : openMarkdown}
          alt="Display Markdown"
          onClick={handleMarkDownVisibility}
          className={noteList.length !== 0 ? "show-element" : ""}
        />
        <img
          src={moreToolsIcon}
          alt="More Tools"
          onClick={handleMoreToolsVisibility}
          className={noteList.length !== 0 ? "show-element" : ""}
        />
        {isMoreToolsVisible && <MoreTools ref={moreToolsRef} />}
      </header>
      {isMarkDownVisible ? (
        <Markdown />
      ) : noteList.length !== 0 ? (
        <EditNote currentNote={currentNote} editCurrentNote={editCurrentNote} />
      ) : null}
    </section>
  );
}

export default Note;
