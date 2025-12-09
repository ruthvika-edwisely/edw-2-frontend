import { Editor } from '@monaco-editor/react';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getAllLanguages } from '../../../../../../api/api.js';

const CodeEditorMain = ({ editorTheme, language }) => {
  const snippetsData = useSelector(state => state.problem.snippets);
  const langs = getAllLanguages();
  const langObj = langs.find((lang) => lang.name.toLowerCase() === language.toLowerCase());
  const langId = langObj?.id;

  const snippet = snippetsData.find((s) => s.language_id == langId);
  const initialCode = snippet?.code ?? "";

  // State to store code for the current language
  const [code, setCode] = useState(() => {
    return localStorage.getItem(`code-${language}`) ?? initialCode;
  });

  // Ref for debounce timer
  const saveTimer = useRef(null);

  // Save code to localStorage with debounce
  const handleChange = (value) => {
    setCode(value);

    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(() => {
      localStorage.setItem(`code-${language}`, value);
    }, 1000); // 1 second debounce
  };

  // Load code from localStorage when language changes
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current); // cancel any pending save
    const saved = localStorage.getItem(`code-${language}`);
    setCode(saved ?? snippet?.code ?? "");
  }, [language, snippet?.code]);

  return (
    <Editor
      key={language} // important: remount editor when language changes
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