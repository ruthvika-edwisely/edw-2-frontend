import { Editor } from '@monaco-editor/react';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const CodeEditorMain = ({ editorTheme, language, isDefault, setIsDefault }) => {
  const problemId = useSelector(state => state.problem.id);
  const user = useSelector(state => state.auth.user);
  const userId = user?.id;
  const snippetsData = useSelector(state => state.problem.snippets);
  const langs = useSelector(state => state.problem.languages);

  const langObj = langs.find(
    (lang) => lang.name.toLowerCase() === language.toLowerCase()
  );
  const langId = langObj?.id;

  const snippet = snippetsData.find((s) => s.language_id == langId);
  const storageKey = `code-user-${userId}-problem-${problemId}-${language}`;

  const [code, setCode] = useState("");

  const saveTimer = useRef(null);

  // ✅ Load code when language or problem changes
  useEffect(() => {
    if (!problemId || !language) return;

    const langObj = langs.find(
      (lang) => lang.name.toLowerCase() === language.toLowerCase()
    );
    const langId = langObj?.id;

    const snippet = snippetsData.find((s) => s.language_id == langId);

    if (saveTimer.current) clearTimeout(saveTimer.current);

    const savedCode = localStorage.getItem(storageKey);

    setCode(savedCode ?? snippet?.code ?? "");
  }, [problemId, language, snippet?.code]);

  // ✅ Handle reset to default code
  useEffect(() => {
    if (isDefault && snippet?.code) {
      // Clear the saved code from localStorage
      localStorage.removeItem(storageKey);
      
      // Set code to default snippet
      setCode(snippet.code);
      
      // Reset the flag
      setIsDefault(false);
    }
  }, [isDefault, snippet?.code, storageKey, setIsDefault]);

  // ✅ Save code only when user types
  const handleChange = (value) => {
    setCode(value);

    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(() => {
      localStorage.setItem(storageKey, value);
    }, 1000);
  };

  console.log("snippet : ", code);

  return (
    <Editor
      key={language}
      height="100%"
      width="100%"
      language={language}
      theme={editorTheme}
      value={code}
      onChange={handleChange}
    />
  );
};

export default CodeEditorMain;