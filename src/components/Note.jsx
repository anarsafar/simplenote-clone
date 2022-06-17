import toggleListIcon from "../images/toggle-icon.svg";
import moreToolsIcon from "../images/more-tools.svg";
import openMarkdown from "../images/open-mark.svg";
import closeMarkDown from "../images/close-mark.svg";
import checkboxIcon from "../images/checkbox.svg";
import infoIcon from "../images/info.svg";
import createNote from "../images/new-note.svg";

import EditNote from "./EditNote";
import Markdown from "./Markdown";
import MoreTools from "./MoreTools";
import ErrorBoundary from "../Error/ErrorBoundary";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { Link } from "react-router-dom";

import { useState, useRef, useEffect, forwardRef } from "react";

const Note = forwardRef(
  (
    {
      noteList,
      currentNote,
      editCurrentNote,
      pinNote,
      handleShouldUseMarkdown,
      handleDelete,
      handleTodo,
      handleToggle,
      addNewNote,
      verticalLineRef,
      handleInfo
    },
    ref
  ) => {
    const [isMoreToolsVisible, setIsMoreToolsVisible] = useState(false);
    const [isMarkDownVisible, setIsMarkDownVisible] = useState(false);

    const moreToolsRef = useRef();
    const linkRef = useRef();
    const { width } = useWindowDimensions();

    const handleMarkDownVisibility = () => {
      setIsMarkDownVisible((prevIsVisible) => !prevIsVisible);
    };

    const handleMoreToolsVisibility = () => {
      setIsMoreToolsVisible((prevVisible) => !prevVisible);
    };

    useEffect(() => {
      if (width < 750) {
        linkRef.current.classList.add("display-link");
      } else {
        linkRef.current.classList.remove("display-link");
      }
    }, [width]);

    useEffect(() => {
      const checkIsOutside = (e) => {
        const isMoreTools =
          e.target.alt === "More Tools" ||
          moreToolsRef.current.contains(e.target);

        if (e.target.className === "delete-btn" || !isMoreTools) {
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
      <section className="column-container note-container" ref={ref}>
        <header className="note-header">
          <img
            src={createNote}
            alt="Create Note"
            className="show-element"
            onClick={addNewNote}
          />
          <div className="vertical-line" ref={verticalLineRef}></div>
          <Link to="/" className="go-back-link" ref={linkRef}>
            <svg
              className="icon-back"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <rect x="0" fill="none" width="24" height="24"></rect>
              <path
                fill="#646970"
                d="M21 11H6.83l5.72-5.72 -1.42-1.41L3 12l8.13 8.13 1.42-1.41L6.83 13H21V11z"
              ></path>
            </svg>
          </Link>

          <img
            src={toggleListIcon}
            alt="Toggle List"
            onClick={handleToggle}
            className={noteList.length !== 0 ? "show-element toggle" : "toggle"}
          />
          {currentNote && currentNote.shouldUseMarkdown && (
            <img
              src={isMarkDownVisible ? closeMarkDown : openMarkdown}
              alt="Display Markdown"
              onClick={handleMarkDownVisibility}
              className={
                noteList.length !== 0 ? "show-element markdown" : "markdown"
              }
            />
          )}
          <img
            src={checkboxIcon}
            alt="Checkbox Icon"
            onClick={handleTodo}
            className={noteList.length !== 0 ? "show-element" : ""}
          />
          <img
            src={infoIcon}
            alt="Info Icon"
            className={noteList.length !== 0 ? "show-element info" : "info"}
            onClick={handleInfo}
          />
          <img
            src={moreToolsIcon}
            alt="More Tools"
            onClick={handleMoreToolsVisibility}
            className={noteList.length !== 0 ? "show-element" : ""}
          />
          {isMoreToolsVisible && (
            <ErrorBoundary>
              <MoreTools
                ref={moreToolsRef}
                currentNote={currentNote}
                noteList={noteList}
                pinNote={pinNote}
                handleShouldUseMarkdown={handleShouldUseMarkdown}
                handleDelete={handleDelete}
              />
            </ErrorBoundary>
          )}
        </header>
        {isMarkDownVisible && currentNote.shouldUseMarkdown ? (
          <Markdown currentNote={currentNote} />
        ) : noteList.length !== 0 ? (
          <EditNote
            currentNote={currentNote}
            editCurrentNote={editCurrentNote}
          />
        ) : null}
      </section>
    );
  }
);

export default Note;
