import Split from "react-split";
import Note from "./Note";
import NoteList from "./NoteList";
import "../css/style.css";

function Container() {
  return (
    <>
      <Split
        direction="horizontal"
        sizes={[30, 70]}
        minSize={280}
        cursor="col-resize"
        className="split"
      >
        <NoteList />
        <Note />
      </Split>
    </>
  );
}

export default Container;
