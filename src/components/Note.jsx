import toggleListIcon from "../images/toggle-icon.svg";
import moreToolsIcon from "../images/more-tools.svg";

function Note() {
  return (
    <section className="column-container">
      <header className="note-header">
        <img src={toggleListIcon} alt="Toggle List" />
        <img src={moreToolsIcon} alt="More Tools" />
      </header>
    </section>
  );
}

export default Note;
