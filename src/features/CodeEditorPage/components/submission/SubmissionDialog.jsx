import {
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  Box
} from "@mui/material";

import {
  X,
  Clock,
  Database
} from "lucide-react";

import { useTheme } from "@mui/material/styles";



import { getStatusColor, normalizeStatus, getDateTimeDisplay, getLanguageDisplay } from "../../utils/formatFunctions.js";
import DialogSkeleton from "../skeletons/DialogSkeleton.jsx";
import CompHeading from "../CompHeading.jsx";
import MetricCard from "./MetricCard.jsx";
import CodeBlock from "../CodeBlock.jsx";

const SubmissionDialog = ({openDialog, setOpenDialog, isLoadingSubmission, submitCode, selectedSubmissionData, copied, handleCopy}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;


  return (
    <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
            sx: {
            backgroundColor: palette.cardBg,
            borderRadius: 3,
            maxHeight: "90vh",
            },
        }}
        >
        <Box
            sx={{
            px: 4,
            py: 3,
            borderBottom: `1px solid ${palette.cardBorder}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: palette.cardBg,
            }}
        >

            <CompHeading 
                title={"Submission Details"}
                variant="h6"
                sx={{ fontWeight: 700, color: palette.textPrimary }}
            />
            <IconButton
                onClick={() => setOpenDialog(false)}
                sx={{ color: palette.textSecondary }}
            >
                <X size={20} />
            </IconButton>

        </Box>

        
        {isLoadingSubmission || submitCode 
            ? 
                (<DialogSkeleton />) 
            : selectedSubmissionData ? (
                <DialogContent sx={{ p: 0, backgroundColor: palette.cardBg }}>
                    <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}` }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <CompHeading 
                                title={normalizeStatus(selectedSubmissionData.status)}
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "1.125rem",
                                    color: getStatusColor(selectedSubmissionData.status),
                                }}
                            />

                            {selectedSubmissionData.mode === "Submit" && 
                                <CompHeading 
                                    title={`${Math.max(selectedSubmissionData?.status === "AC" ? selectedSubmissionData.testcases_executed : selectedSubmissionData.testcases_executed-1, 0) || 0} / ${selectedSubmissionData.total_testcases || 0} testcases passed`}
                                    sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}
                                />
                            }
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center">

                            <CompHeading 
                                title={getDateTimeDisplay(selectedSubmissionData.created_at)}
                                sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}
                            />

                        
                            <CompHeading 
                                title={` Mode : ${selectedSubmissionData.mode}`}
                                sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}
                            />
                        
                        </Stack>
                    </Box>

                    {/* Metrics Cards - Side by Side */}
                    <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}`, display: "flex", flexDirection: "column", gap: 1.5 }}>
                        
                        <Stack direction="row" spacing={2}>
                            {/* Runtime Card */}
                            <MetricCard 
                                icon={Clock}
                                title={"Runtime"}
                                data={selectedSubmissionData?.total_exec_time ? `${Math.round(selectedSubmissionData.total_exec_time)} ms`: "N/A"}
                            />

                            {/* Memory Card */}
                            <MetricCard 
                                icon={Database}
                                title={"Memory"}
                                data={selectedSubmissionData?.total_exec_memory ? `${selectedSubmissionData.total_exec_memory.toFixed(2)} MB` : "N/A"}
                            />
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            {/* Time complexity Card */}
                            <MetricCard 
                                title={"Time Complexity"}
                                data={selectedSubmissionData?.time_complexity ? `${selectedSubmissionData.time_complexity}`: "N/A"}
                            />

                            {/* Space complexity Card */}
                            <MetricCard 
                                title={"Space Complexity"}
                                data={selectedSubmissionData?.space_complexity ? `${selectedSubmissionData.space_complexity}` : "N/A"}
                            />
                        </Stack>

                    </Box>

                    {/* Code Block */}

                    <CodeBlock 
                        language={selectedSubmissionData?.language_name || "N/A"}
                        code={selectedSubmissionData?.code || ""}
                        copied={copied}
                        handleCopy={handleCopy}
                    />
                </DialogContent>
        ) : null}
        </Dialog>
  )
}

export default SubmissionDialog