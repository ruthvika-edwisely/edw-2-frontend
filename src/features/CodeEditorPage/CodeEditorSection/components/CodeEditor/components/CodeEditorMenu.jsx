import { Box, Button, Divider, MenuItem, Select, Tooltip } from '@mui/material';
import { MoonStar, Sun } from 'lucide-react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePanelVisibility } from '../../../../../../store/features/showAIPanel/showAISlice';
import { useTheme } from '@mui/material/styles';

const CodeEditorMenu = ({ editorTheme, setEditorTheme, language, setLanguage }) => {

    const theme = useTheme();
    const showAi = useSelector((state) => state.showAIPanel.showAI);
    const dispatch = useDispatch();

    const isLight = theme.palette.mode === "light";

    const changeEditorTheme = () => {
        setEditorTheme(editorTheme === "vs-light" ? "vs-dark" : "vs-light");
    };

    const changeEditorLanguage = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 1,
                bgcolor: isLight ? theme.palette.grey[100] : theme.palette.grey[1200],
                borderBottom: `1px solid ${isLight ? theme.palette.grey[300] : theme.palette.grey[1300]}`,
            }}
        >

            {/* LEFT */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                <Select
                    value={language}
                    onChange={changeEditorLanguage}
                    size="small"
                    sx={{
                        bgcolor: isLight
                            ? theme.palette.problemPage.selectBg
                            : theme.palette.grey[1200],

                        color: isLight
                            ? theme.palette.text.primary
                            : theme.palette.grey[200],

                        borderRadius: 1,

                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: isLight
                                ? theme.palette.grey[300]
                                : theme.palette.grey[600],
                        },

                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main,
                        },

                        "& .MuiSvgIcon-root": {
                            color: isLight
                                ? theme.palette.grey[700]
                                : theme.palette.grey[300],
                        },

                        // TEXT inside the select box
                        "& .MuiSelect-select": {
                            color: isLight
                                ? theme.palette.text.primary
                                : theme.palette.grey[100],
                        },
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: isLight
                                    ? theme.palette.grey[0]
                                    : theme.palette.grey[1100],

                                "& .MuiMenuItem-root": {
                                    color: isLight
                                        ? theme.palette.text.primary
                                        : theme.palette.grey[200],

                                    "&:hover": {
                                        bgcolor: isLight
                                            ? theme.palette.grey[100]
                                            : theme.palette.grey[900],
                                    }
                                }
                            }
                        }
                    }}
                >
                    <MenuItem value="python">Python</MenuItem>
                    <MenuItem value="java">Java</MenuItem>
                    <MenuItem value="cpp">C++</MenuItem>
                </Select>


                <Divider orientation="vertical" flexItem sx={{ bgcolor: isLight ? theme.palette.grey[300] : theme.palette.grey[600] }} />

                {/* THEME TOGGLE */}
                <Box sx={{ cursor: "pointer" }} onClick={changeEditorTheme}>
                    {editorTheme === "vs-light" ? (
                        <MoonStar
                            width={18}
                            height={18}
                            color={isLight ? theme.palette.grey[700] : theme.palette.grey[200]}
                        />
                    ) : (
                        <Sun
                            width={18}
                            height={18}
                            color={isLight ? theme.palette.warning.main : theme.palette.grey[200]}
                        />
                    )}
                </Box>

                {/* ASK AI BUTTON */}
                <Tooltip title="Ask AI for help">
                    <Button
                        onClick={() => dispatch(togglePanelVisibility())}
                        variant="outlined"
                        size="small"
                        sx={{
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            textTransform: "none",
                            "&:hover": {
                                bgcolor: isLight ? theme.palette.primary.light : theme.palette.grey[800],
                                borderColor: theme.palette.primary.main
                            }
                        }}
                    >
                        {!showAi ? "Ask AI" : "Close"}
                    </Button>
                </Tooltip>

            </Box>

            {/* RIGHT */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        textTransform: "none",
                        "&:hover": { bgcolor: theme.palette.primary.dark }
                    }}
                >
                    Run
                </Button>

                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        bgcolor: theme.palette.success[600],
                        color: theme.palette.common.white,
                        textTransform: "none",
                        "&:hover": { bgcolor: theme.palette.success[700] }
                    }}
                >
                    Submit
                </Button>

            </Box>

        </Box>
    );
};

export default CodeEditorMenu;