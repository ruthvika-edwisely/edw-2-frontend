import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider
} from "@mui/material";

import { getAllLanguages, getSubmissionAnswers, getUserSubmissions } from "../../../../api/api.js";
import { X } from "lucide-react";

const statusColors = {
  "Accepted": "success",
  "Wrong Answer": "error",
  "Runtime Error": "warning",
  "Time Limit Exceeded": "warning"
};

const Submissions = ({ userId, problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const languages = getAllLanguages();

  useEffect(() => {
    const data = getUserSubmissions(userId).filter(
      (s) => s.problemId === problemId
    );
    setSubmissions(data);
  }, [userId, problemId]);

  const handleViewCode = (submission) => {
    const answer = getSubmissionAnswers(submission.id)[0];

    setSelectedSubmission(submission);
    setSelectedAnswer(answer);
    setOpenDialog(true);
  };

  return (   

    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={600}>
        Submissions
      </Typography>

      {submissions.map((sub) => (
        <Card key={sub.id} sx={{ borderRadius: 2, p: 1 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Stack spacing={1}>
                <Chip
                  label={sub.status}
                  color={statusColors[sub.status] || "default"}
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />

                <Typography variant="body2" color="text.secondary">
                  Submitted: {new Date(sub.createdAt).toLocaleString()}
                </Typography>
              </Stack>

              <Button
                variant="contained"
                onClick={() => handleViewCode(sub)}
              >
                View Code
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}

      {/* View Code Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Submission Code
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{ position: "absolute", right: 16, top: 16 }}
          >
          <X />
          </IconButton>
        </DialogTitle>
        <Divider />

        <DialogContent>
          {selectedAnswer ? (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Chip
                  label={selectedAnswer.status}
                  color={statusColors[selectedAnswer.status] || "default"}
                />

                <Chip label={`Time: ${selectedAnswer.totalExecTime}`} />
                <Chip label={`Memory: ${selectedAnswer.totalExecMemory}`} />

                <Chip
                  label={
                    languages.find(
                      (l) => l.id === selectedAnswer.languageId
                    )?.name
                  }
                  variant="outlined"
                />
              </Stack>

              <pre
                style={{
                  background: "#1e1e1e",
                  padding: "16px",
                  borderRadius: "8px",
                  color: "#fff",
                  overflowX: "auto",
                  fontSize: "14px"
                }}
              >
                {selectedAnswer.code}
              </pre>
            </Stack>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default Submissions;
