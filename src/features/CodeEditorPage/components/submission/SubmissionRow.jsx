import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import { Clock, Database } from "lucide-react";
import { getStatusColor, normalizeStatus, getLanguageDisplay, getRelativeTimeOrDate } from "../../utils/formatFunctions.js";
import PrimaryActionButton from "../../../../components/buttons/PrimaryActionButton.jsx";
import CompHeading from "../CompHeading.jsx";

const SubmissionRow = ({sub, index, handleViewCode, regSubLen}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

    return (
        <Box
            key={sub.id}
            sx={{
            display: "grid",
            gridTemplateColumns: "1.5fr 0.75fr 0.75fr 1fr 1fr auto",
            alignItems: "center",
            gap: 3,
            px: 5,
            py: 3,
            borderBottom: index < regSubLen - 1 ? `1px solid ${palette.cardBorder}` : "none",
            transition: "all 0.2s ease",
            "&:hover": { backgroundColor: palette.exampleBg },
            cursor: "pointer",
            }}
            onClick={() => handleViewCode(sub)}
        >
            {/* Status and Date Column */}
            <Stack spacing={0.5}>
                <CompHeading 
                    title={normalizeStatus(sub.status)}
                    variant="body1"
                    sx={{
                        fontWeight: 600,
                        fontSize: "0.938rem",
                        color: getStatusColor(sub.status),
                    }}
                />

                <CompHeading 
                    title={getRelativeTimeOrDate(sub.created_at)}
                    variant="body1"
                    sx={{ color: palette.textTertiary, fontSize: "0.813rem" }}
                />
            </Stack>


            <Chip
                label={sub.mode}
                size="small"
                sx={{
                height: 20,
                fontSize: "0.7rem",
                fontWeight: 600,
                borderRadius: "6px",
                bgcolor: sub.is_run ? palette.exampleBg : palette.selectHover,
                color: palette.textSecondary,
                }}
            />
            

            {/* Language */}
            <CompHeading 
                variant="body1"
                title={getLanguageDisplay(sub.language_name)}
                sx={{ color: palette.textPrimary, fontSize: "0.938rem" }}
            />


            {/* Execution Time */}
            <Stack direction="row" spacing={1} alignItems="center">
                <Clock size={16} color={palette.textTertiary} />
                <CompHeading 
                    variant="body1"
                    title={sub.totalExecTime ? `${Math.round(sub.totalExecTime)} ms` : "N/A"}
                    sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}
                />
            </Stack>


            {/* Memory */}
            <Stack direction="row" spacing={1} alignItems="center">
                <Database size={16} color={palette.textTertiary} />
                <CompHeading 
                    variant="body1"
                    title={sub.totalExecMemory ? `${sub.totalExecMemory.toFixed(2)} MB` : "N/A"}
                    sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}
                />
            </Stack>


            {/* View Code Button */}
            <PrimaryActionButton 
                label="View Code"
                variant="outlined"
                onClick={(e) => {
                    e.stopPropagation();
                    handleViewCode(sub);
                }}
                sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    px: 3,
                    py: 1,
                    borderRadius: "8px",
                    borderColor: palette.selectBorder,
                    color: palette.textPrimary,
                    whiteSpace: "nowrap",
                    "&:hover": {
                    borderColor: palette.tabIndicator,
                    backgroundColor: palette.selectHover,
                    },
                }}
            />
            
        </Box>
    );
};


export default SubmissionRow;