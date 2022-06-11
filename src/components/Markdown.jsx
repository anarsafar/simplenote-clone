import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Markdown({ currentNote }) {
  return (
    <ReactMarkdown
      className="markdown-container"
      children={currentNote.data}
      components={{ code: MarkdownHighlighter }}
    />
  );
}

const MarkdownHighlighter = ({ value = "", language = null }) => {
  return (
    <SyntaxHighlighter language={language} style={docco} children={value} />
  );
};

export default Markdown;
