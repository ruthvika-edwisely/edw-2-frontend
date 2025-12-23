import React, { useState, useMemo, useEffect } from "react";
import {
  Button,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Paper,
  Tooltip,
  Typography,
  Chip,
  LinearProgress,
  Collapse,
  Alert,
  Skeleton,
  Divider,
  Card,
} from "@mui/material";
import {
  X,
  Copy,
  Check,
  Clock,
  Database,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { updateSubmissionsData } from "../../../../store/features/problem/problemSlice";
import { getLatestSubmissionData } from "../../../../store/features/submission/submissionSlice";
import { getSubmissionById } from "../../../../api/api";
import { incrementXP } from "../../../../store/reducers/authReducer.js";
import SubmissionDialog from "../../components/submission/SubmissionDialog";
import SubmissionRow from "../../components/submission/SubmissionRow";
import SubmissionList from "../../components/submission/SubmissionList";
import DetailedResult from "../../components/submission/DetailedResult";

const Submissions = () => {
  const submissions = useSelector((state) => state.problem.submissions);
  const latestSubmissionData = useSelector((state) => state.submissions.currSubData);

  const dispatch = useDispatch();

  const theme = useTheme();
  const palette = theme.palette.problemPage;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubmissionData, setSelectedSubmissionData] = useState(null);
  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false);
  const submitCode = useSelector(state => state.submissions.submitCodeFlag);
  const [copied, setCopied] = useState(false);
  const [showTestCases, setShowTestCases] = useState(false);
  const [showLatestCode, setShowLatestCode] = useState(false);

  console.log("this is selected submission : ", selectedSubmissionData);
  
  // New state for controlling the view
  const [showDetailedResult, setShowDetailedResult] = useState(false);
  const [isLoadingDetailedResult, setIsLoadingDetailedResult] = useState(false);

  // Transform currSubData to detailed submission format
  const latestSubmission = useMemo(() => {
    if (!latestSubmissionData) return null;

    return {
      id: latestSubmissionData.submission_id,
      status: latestSubmissionData.submission_status,

      totalExecTime:
        latestSubmissionData.total_time ??
        latestSubmissionData.avg_time ??
        0,

      maxExecTime: latestSubmissionData.max_time ?? 0,

      totalExecMemory:
        latestSubmissionData.total_memory ??
        latestSubmissionData.avg_memory ??
        0,

      maxExecMemory: latestSubmissionData.max_memory ?? 0,

      executed_testcase_count:
        latestSubmissionData.executed_testcase_count ?? 0,

      testcase_count:
        latestSubmissionData.testcase_count ?? 0,

      total_testcases_count:
        latestSubmissionData.total_testcases_count ?? 0,

      testcase_results:
        latestSubmissionData.testcase_results ?? [],

      time_complexity: latestSubmissionData.time_complexity,
      space_complexity: latestSubmissionData.space_complexity,

      mode: latestSubmissionData.mode,

      created_at: new Date().toISOString(),
      language_name: latestSubmissionData.language_name || "Unknown",
      code: latestSubmissionData.code || null,
    };
  }, [latestSubmissionData]);



  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!latestSubmissionData || !user) return;
  
    const isAccepted =
      latestSubmissionData.submission_status === "AC" ||
      latestSubmissionData.submission_status === "Accepted";
  
    const xpEarned = latestSubmissionData.xp_earned;
    console.log("XP Earned:", xpEarned);
    // guard conditions
    if (!isAccepted) return;
    if (!xpEarned || xpEarned <= 0) return;
    if (latestSubmissionData.xpAwarded) return;
  
    // ✅ increment XP in auth slice
    dispatch(incrementXP(xpEarned));
  
    // ✅ mark locally so it never increments again
    dispatch(
      getLatestSubmissionData({
        ...latestSubmissionData,
        xpAwarded: true,
      })
    );
  }, [latestSubmissionData?.submission_id]);
  
  

  
  useEffect(() => {
    if (latestSubmission?.id) {
      setShowTestCases(false);
      setShowLatestCode(false);

      console.log('latest submission: ', latestSubmission);

      
      if (latestSubmission?.mode === "Submit") {
        setIsLoadingDetailedResult(true);
        setShowDetailedResult(true);
        
        
        setTimeout(() => {
          setIsLoadingDetailedResult(false);
        }, 800);
      } else {
        setShowDetailedResult(false);
        
        const totalSubmissions = structuredClone(submissions);
        totalSubmissions.push(latestSubmission);
        dispatch(updateSubmissionsData(totalSubmissions));
        dispatch(getLatestSubmissionData(null));
      }
    }
  }, [latestSubmission?.id, latestSubmission?.mode]); 

  // Sort submissions descending by created_at
  const sortedSubs = useMemo(() => {
    return [...submissions].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [submissions]);

  // Filter out the latest submission from the regular list if it exists in both
  const regularSubmissions = useMemo(() => {
    if (!latestSubmission?.id) return sortedSubs;
    return sortedSubs.filter((sub) => sub.id !== latestSubmission.id);
  }, [sortedSubs, latestSubmission]);

  const handleViewCode = async(submission) => {
    setOpenDialog(true);
    setIsLoadingSubmission(true);
    setSelectedSubmissionData(null);
    
    try {
      const data = await getSubmissionById(submission?.id);
      setSelectedSubmissionData(data);

    } catch (error) {
      console.error("Error fetching submission:", error);
  
    } finally {
      setIsLoadingSubmission(false);
    }
  };

  const handleCopy = (code) => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBackToSubmissions = () => {

    const totalSubmissions = structuredClone(submissions);
    totalSubmissions.push(latestSubmission);

    setShowDetailedResult(false);
    setIsLoadingDetailedResult(false);
    dispatch(updateSubmissionsData(totalSubmissions));
    dispatch(getLatestSubmissionData(null));
  };


  

  return (
    <>
      {showDetailedResult && latestSubmission?.id
        ? <DetailedResult 
            latestSubmission={latestSubmission}
            isLoadingDetailedResult={isLoadingDetailedResult}
            submitCode={submitCode}
            handleBackToSubmissions={handleBackToSubmissions}
            copied={copied}
            handleCopy={handleCopy}
          />  
        : <SubmissionList 
            submitCode={submitCode}
            regularSubmissions={regularSubmissions}
            handleViewCode={handleViewCode}
          />
      }

      {/* Code Dialog for Regular Submissions */}
      <SubmissionDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        isLoadingSubmission={isLoadingSubmission}
        submitCode={submitCode}
        selectedSubmissionData={selectedSubmissionData}
        copied={copied}
        handleCopy={handleCopy}
      />
      
    </>
  );
};

export default Submissions;