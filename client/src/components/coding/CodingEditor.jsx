import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import CodingLanguage from "./CodingLanguage";
import { CODE_SNIPPETS } from "../../constants";
import CodeOutput from "./CodeOutput";

const CodingEditor = () => {
  const editorRef = useRef();
  const [code, setCode] = useState(CODE_SNIPPETS["python"]);
  const [language,setLanguage] = useState("python")

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus;
  };

  const onSelect = (language) => {
    setLanguage(language)
    setCode(CODE_SNIPPETS[language])   
  }

  return (
    <>
      <CodingLanguage language={language} onSelect={onSelect} />
      <Editor
        height="60vh"
        theme="vs-dark"
        language={language}
        onMount={onMount}
        value={code}
        onChange={(value) => setCode(value)}
      />
      <CodeOutput editorRef={editorRef} language={language} />
    </>
  );
};

export default CodingEditor;
