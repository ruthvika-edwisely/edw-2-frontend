import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material'
import { Check, Copy } from 'lucide-react'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({code, language, copied, handleCopy}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

  return (
    <Box
        sx={{
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${palette.codeBlockBorder}`,
        }}
    >
        {/* Code Header */}
        <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 1.5,
            backgroundColor: palette.codeBlockBorder,
            borderBottom: `1px solid ${palette.codeBlockBorder}`,
        }}
        >
        <Typography
            sx={{
            color: palette.textTertiary,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            }}
        >
            {language}
        </Typography>

        <Tooltip title={copied ? "Copied!" : "Copy code"} placement="left">
            <IconButton
            size="small"
            onClick={handleCopy}
            sx={{
                color: palette.textTertiary,
                "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: palette.textPrimary,
                },
            }}
            >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            </IconButton>
        </Tooltip>
        </Box>

        {/* Code */}
        <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
                margin: 0,
                padding: "24px",
                fontSize: "0.938rem",
                borderRadius: 0,
                lineHeight: 1.7,
            }}
            showLineNumbers
            lineNumberStyle={{
                minWidth: "3em",
                paddingRight: "1.5em",
                opacity: 0.4,
                userSelect: "none",
            }}
        >
            {code}
        </SyntaxHighlighter>
    </Box>
  )
}

export default CodeBlock