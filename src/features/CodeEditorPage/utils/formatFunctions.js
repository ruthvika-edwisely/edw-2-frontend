export const normalizeStatus = (status) => {
    if (!status) return "Unknown";
    if (status === "AC" || status === "Accepted") return "Accepted";
        
    return status;
};

export const getStatusColor = (status) => {
    const normalized = normalizeStatus(status);
    if (normalized === "Accepted") {
        return "#22c55e";
    }
    return "#ef4444";
};

export const getDateTimeDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };


export const getLanguageDisplay = (languageName) => {
    if (!languageName) return "Unknown";
    return languageName.charAt(0).toUpperCase() + languageName.slice(1);
  };



export const getRelativeTimeOrDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    // If less than 24 hours, show relative time
    if (diffInHours < 24) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInSeconds = Math.floor(diffInMs / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds} sec${diffInSeconds !== 1 ? 's' : ''} ago`;
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
      } else {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
      }
    }

    // If more than 24 hours, show date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };


export const getTestCaseProgress = (submission) => {
    const passed = submission.executed_testcase_count || 0;
    const total = submission.total_testcases_count || 0;
    return { passed, total, percentage: total > 0 ? (passed / total) * 100 : 0 };
  };




export const getFailedTestCases = (testcaseResults) => {
    if (!testcaseResults || testcaseResults.length === 0) return [];
    return testcaseResults
      .map((result, index) => ({
        ...result,
        testCaseNumber: index + 1,
      }))
      .filter((result) => result.status !== "Accepted" && result.status !== "AC");
  };




  // Helper function to format output value
export const formatOutput = (value) => {
    if (value === null || value === undefined || value === "") {
      return "None";
    }
    return String(value);
  };




  
