import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Markdown from 'react-markdown'

const Editorial = ({editorialData}) => {

  const [approachIndex, setApproachIndex] = useState(0);
  const [language, setLanguage] = useState("python");
  const editorial = editorialData;
;
  const approach = editorial.approaches[approachIndex];
  const languages = Object.keys(approach.code);

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      {/* Title */}
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        {editorial.title}
      </Typography>

      <Chip 
        label="Editorial"
        color="warning"
        size="small"
      />

      {/* Overview */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          <Markdown>
            {editorial.overview}
          </Markdown>
        </Typography>
      </Paper>

      {/* Approach Tabs */}
      <Tabs
        value={approachIndex}
        onChange={(e, v) => {
          setApproachIndex(v);
          setLanguage("python"); 
        }}
        sx={{ mb: 3 }}
      >
        {editorial.approaches.map((a) => (
          <Tab key={a.id} label={a.title} />
        ))}
      </Tabs>

      {/* Explanation */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
        >
          <Markdown>
            {approach.explanation}
          </Markdown>
        </Typography>
      </Paper>

      {/* Language Selector */}
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel>Language</InputLabel>
        <Select
          value={language}
          label="Language"
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Code Block */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <SyntaxHighlighter language={language} style={oneDark}>
          {approach.code[language].trim()}
        </SyntaxHighlighter>
      </Paper>

      {/* Video Section */}
      {editorial.videoUrl && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Video Explanation
          </Typography>

          <iframe
            width="100%"
            height="400"
            src={editorial.videoUrl.replace("watch?v=", "embed/")}
            title="Video Explanation"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </Box>
  );
}

export default Editorial