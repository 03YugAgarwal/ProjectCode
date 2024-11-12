import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import CodingLanguage from "./CodingLanguage";
import { CODE_SNIPPETS, BASE_URL } from "../../constants";
import CodeOutput from "./CodeOutput";
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom";

const CodingEditor = ({ data }) => {
  const editorRef = useRef();
  const [code, setCode] = useState(CODE_SNIPPETS["python"]);
  const [language, setLanguage] = useState("python");
  const params = useParams();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setCode(CODE_SNIPPETS[selectedLanguage]);
  };

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const token = Cookies.get("user_token");
        if (!token) {
          console.error("User token not found.");
          return;
        }

        const response = await fetch(`${BASE_URL}/answer/code`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
          body: JSON.stringify({
            questionNumber: data.number,
            assignmentID: params.assignmendid
          })
        });

        if (response.status === 404) {
          setCode(CODE_SNIPPETS[language]);
        } else if (response.ok) {
          const result = await response.json();
          setCode(result.code);
        } else {
          console.error("Failed to fetch code:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };

    fetchCode();
  }, [data.number, params.id, language]);

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
      <CodeOutput editorRef={editorRef} language={language} data={data} />
    </>
  );
};

export default CodingEditor;