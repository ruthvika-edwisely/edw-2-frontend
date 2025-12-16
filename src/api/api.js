import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies
});

// Login function
export const loginUserAPI = async ({ email, password }) => {
  try {
    const res = await api.post("/users/login", { email, password });
    return res.data.data; // backend returns { success, message, data: user }
  } catch (err) {
    throw err.response?.data?.message || "Login failed";
  }
};

export const getAllProblems = async () => {
  try {
    const res = await api.get("/problems/"); // /api/v1/problems/
    const problemsRaw = res.data.data || [];

    if (!problemsRaw.length) return { dailyChallenge: null, problems: [] };

    // Normalize problems
    const problems = problemsRaw.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      difficulty: p.difficulty,
      status: p.solved_status ? "solved" : "unsolved",
      xp: p.xp_reward || 0,
      topics: p.tags
        .filter(tag => tag.category === "Topic")
        .map(tag => tag.name),
      companies: p.tags
        .filter(tag => tag.category === "Company")
        .map(tag => tag.name),
      acceptance: p.acceptance || 0, // optional, if backend provides
    }));

    // Take first unsolved problem as daily challenge
    const dailyChallenge = problems.find(p => p.status === "unsolved") || problems[0];

    return { dailyChallenge, problems };
  } catch (err) {
    console.error("Error fetching problems:", err);
    return { dailyChallenge: null, problems: [] };
  }
};
export const fetchTags = async () => {
  try {
    const res = await api.get("/tags/");
    return res.data.data; // array of tags
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch tags";
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get(`/users/`);
    return response.data.data; // assuming API returns array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
// src/data/users.js



// api.js


// api.js

export const userProgress = {
  currentUser: {
    xp: 1850,
    problemsSolved: 45,
  },

  difficultyProgress: {
    easy: { solved: 20, total: 100 },
    medium: { solved: 15, total: 200 },
    hard: { solved: 10, total: 50 },
  },

  weeklyActivity: [
    { day: "Mon", problems: 4 },
    { day: "Tue", problems: 3 },
    { day: "Wed", problems: 6 },
    { day: "Thu", problems: 2 },
    { day: "Fri", problems: 5 },
    { day: "Sat", problems: 7 },
    { day: "Sun", problems: 4 },
  ],
};

export const getUserById = (userId) => {
  return {
    id: "user_1",
    username: "subhash",
    email: "subhash@example.com",
    passwordHash: "hashed_password_123",
    role: "user",
    totalXP: 120,
    rank: 42,
    clgId: "clg_1",
    createdAt: "2025-02-10T12:00:00Z"
  };
};


export const getAllColleges = () => {
  return [
    {
      id: "clg_1",
      name: "Indian Institute of Technology Bombay",
      location: "Mumbai, India"
    },
    {
      id: "clg_2",
      name: "VIT Vellore",
      location: "Tamil Nadu, India"
    },
    {
      id: "clg_3",
      name: "BITS Pilani",
      location: "Rajasthan, India"
    }
  ];
};


export const getAllLanguages = () => {
  return [
    {
      id: "1",
      name: "python",
      compilerLanguageId: 71, // judge0 python3
      createdAt: "2025-02-10T12:00:00Z"
    },
    {
      id: "2",
      name: "java",
      compilerLanguageId: 62, // judge0 java17
      createdAt: "2025-02-10T12:00:00Z"
    },
    {
      id: "3",
      name: "cpp",
      compilerLanguageId: 54, // judge0 g++17
      createdAt: "2025-02-10T12:00:00Z"
    }
  ];
};



// export const getUserSubmissions = (userId) => {
//   return [
//     {
//       id: "sub_1",
//       userId: "user_1",
//       problemId: "1",
//       status: "Wrong Answer",
//       createdAt: "2025-02-12T10:05:00Z"
//     },
//     {
//       id: "sub_2",
//       userId: "user_1",
//       problemId: "1",
//       status: "Runtime Error",
//       createdAt: "2025-02-11T18:30:00Z"
//     },
//     {
//       id: "sub_3",
//       userId: "user_1",
//       problemId: "1",
//       status: "Time Limit Exceeded",
//       createdAt: "2025-02-10T14:20:00Z"
//     },
//     {
//       id: "sub_4",
//       userId: "user_1",
//       problemId: "1",
//       status: "Accepted",
//       createdAt: "2025-02-12T10:10:00Z"
//     },
//     {
//       id: "sub_5",
//       userId: "user_1",
//       problemId: "1",
//       status: "Time Limit Exceeded",
//       createdAt: "2025-02-10T14:20:00Z"
//     },
//     {
//       id: "sub_6",
//       userId: "user_1",
//       problemId: "1",
//       status: "Time Limit Exceeded",
//       createdAt: "2025-02-10T14:20:00Z"
//     },
//     {
//       id: "sub_7",
//       userId: "user_1",
//       problemId: "1",
//       status: "Time Limit Exceeded",
//       createdAt: "2025-02-10T14:20:00Z"
//     },
//     {
//       id: "sub_8",
//       userId: "user_1",
//       problemId: "2",
//       status: "Time Limit Exceeded",
//       createdAt: "2025-02-10T14:20:00Z"
//     },
//   ];
// };


// export const getSubmissionAnswers = (submissionId) => {
//   const data = {
//     sub_4: [
//       {
//         id: "subAns_4",
//         submissionId: "sub_4",
//         code: `class Solution:\n    def twoSum(self, nums, target):\n        seen = {}\n        for i, val in enumerate(nums):\n            diff = target - val\n            if diff in seen:\n                return [seen[diff], i]\n            seen[val] = i`,
//         languageId: "1",
//         totalExecTime: "1 ms",
//         totalExecMemory: "12 MB",
//         status: "Accepted",
//         mode: "submit",
//         createdAt: "2025-02-12T10:10:05Z"
//       }
//     ],

//     sub_1: [
//       {
//         id: "subAns_1",
//         submissionId: "sub_1",
//         code: `class Solution:\n    def twoSum(self, nums, target):\n        return []`,
//         languageId: "1",
//         totalExecTime: "0 ms",
//         totalExecMemory: "10 MB",
//         status: "Wrong Answer",
//         mode: "submit",
//         createdAt: "2025-02-12T10:05:10Z"
//       }
//     ],

//     sub_2: [
//       {
//         id: "subAns_2",
//         submissionId: "sub_2",
//         code: `public class Solution {\n    public int[] addTwoNumbers(...) {\n        int x = 5 / 0; // crash\n    }\n}`,
//         languageId: "2",
//         totalExecTime: "-",
//         totalExecMemory: "-",
//         status: "Runtime Error",
//         mode: "submit",
//         createdAt: "2025-02-11T18:30:10Z"
//       }
//     ],

//     sub_3: [
//       {
//         id: "subAns_3",
//         submissionId: "sub_3",
//         code: `while(true) {}`, // infinite loop cause TLE
//         languageId: "3",
//         totalExecTime: ">2s",
//         totalExecMemory: "14 MB",
//         status: "Time Limit Exceeded",
//         mode: "submit",
//         createdAt: "2025-02-10T14:20:10Z"
//       }
//     ],

//     sub_5: [
//       {
//         id: "subAns_5",
//         submissionId: "sub_5",
//         code: `while(true) {}`, // infinite loop cause TLE
//         languageId: "3",
//         totalExecTime: ">2s",
//         totalExecMemory: "14 MB",
//         status: "Time Limit Exceeded",
//         mode: "submit",
//         createdAt: "2025-02-10T14:20:10Z"
//       }
//     ],

//     sub_6: [
//       {
//         id: "subAns_6",
//         submissionId: "sub_6",
//         code: `while(true) {}`, // infinite loop cause TLE
//         languageId: "3",
//         totalExecTime: ">2s",
//         totalExecMemory: "14 MB",
//         status: "Time Limit Exceeded",
//         mode: "submit",
//         createdAt: "2025-02-10T14:20:10Z"
//       }
//     ],

//     sub_7: [
//       {
//         id: "subAns_7",
//         submissionId: "sub_7",
//         code: `while(true) {}`, // infinite loop cause TLE
//         languageId: "3",
//         totalExecTime: ">2s",
//         totalExecMemory: "14 MB",
//         status: "Time Limit Exceeded",
//         mode: "submit",
//         createdAt: "2025-02-10T14:20:10Z"
//       }
//     ],

//     sub_8: [
//       {
//         id: "subAns_8",
//         submissionId: "sub_8",
//         code: `while(true) {}`, // infinite loop cause TLE
//         languageId: "3",
//         totalExecTime: ">2s",
//         totalExecMemory: "14 MB",
//         status: "Time Limit Exceeded",
//         mode: "submit",
//         createdAt: "2025-02-10T14:20:10Z"
//       }
//     ]
//   };

//   return data[submissionId] || [];
// };

export const getProblemById = async(problemId) => {
  const problem_data = await api.get(`${BASE_URL}/problems/${problemId}`)
  console.log("prob_data : ", problem_data);
  return problem_data.data.data;
};


export const getSubmissionById = async(submissionId) => {
  const sub_data = await api.get(`${BASE_URL}/submissions/${submissionId}`);
  console.log('sub_ans data : ', sub_data);
  return sub_data.data.data;
};


// export const getSnippetsByProblem = async(problemId) => {
//   const snippet_data = await axios.get(`${BASE_URL}/problems/${problemId}/snippets`);
//   return snippet_data.data.data;
// };




// export const getProblemHints = async(problemId) => {
//   const problem_hints = await axios.get(`${BASE_URL}/problems/${problemId}/hints`);
//   return problem_hints.data.data;
// };


// export const getProblemConstraints = async(problemId) => {
//   const problem_constraints = await axios.get(`${BASE_URL}/problems/${problemId}/constraints`);
//   return problem_constraints.data.data;
// };


// export const getProblemEditorial = async(problemId) => {
//   const editorial_data = await axios.get(`${BASE_URL}/problems/${problemId}/editorial`);
//   console.log(editorial_data.data.data);
//   return editorial_data.data.data;
// };


// export const getProblemTestCases = async(problemId) => {
//   const testcases_data = await axios.get(`${BASE_URL}/problems/${problemId}/testcases`);
//   return testcases_data.data.data;
// };


// export const getProblemTags = async(problemId) => {
//   const tags_data = await axios.get(`${BASE_URL}/problems/${problemId}/tags`);
//   return tags_data.data.data;
// };

// GET /api/problems (list all problems)

export const getProblems = async () => {
  try {
    const url =`${BASE_URL}/problems/`;
        
    const res = await api.get(url);
    return res.data.data || res.data;
  } catch (err) {
    console.error("Error fetching problems:", err);
    return [];
  }
};

export const submitCode = async(submissionData) => {
  try {
    console.log("Submission data : ", submissionData);

    const res = await api.post(`${BASE_URL}/submissions/create`, submissionData);
    console.log("submission response : ", res.data);
    return res.data.message;
    
  } catch (error) {
    console.log("Error submitting code : ", error);
  }
};

export const sendAIMessageAPI = async ({ problemId, message, code }) => {
  const response = await api.post("/ai/chat", { problemId, message, code });
  return response.data;
};

// Get chat history for a problem
export const getAIChatHistoryAPI = async (problemId) => {
  const response = await api.get(`/ai/chat/history/${problemId}`);
  return response.data;
};

/* ------------------ Fetch Hints ------------------ */
export const getProblemHints = async (problemId, userId = null) => {
  try {
    const res = await api.get(`/aihints/${problemId}`, {
      params: userId ? { userId } : {},
    });
    return res.data.data || [];
  } catch (err) {
    console.error("Error fetching hints:", err);
    return [];
  }
};

/* ------------------ Unlock Hint (XP Deduction) ------------------ */
export const unlockHintAPI = async ({userId,hintId}) => {

  if (!userId) throw new Error("User not logged in");

  try {
    const res = await api.post("/aihints/unlock", { userId, hintId });
    return res.data;
  } catch (err) {
    console.error("Error unlocking hint:", err);
    throw err.response?.data?.message || "Failed to unlock hint";
  }
};


