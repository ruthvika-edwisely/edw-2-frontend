import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// src/data/users.js

export const users = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "sarahchen",
    email: "sarah@gmail.com",
    password: "sarah123",
    avatar: "https://i.pravatar.cc/150?img=1",
    xp: 8450,
    problemsSolved: 127,
    rank: 1
  },
  {
    id: 2,
    name: "Mike Johnson",
    username: "mikej",
    email: "mike@gmail.com",
    password: "mike123",
    avatar: "https://i.pravatar.cc/150?img=2",
    xp: 7890,
    problemsSolved: 112,
    rank: 2
  },
  {
    id: 3,
    name: "Emma Liu",
    username: "emmaliu",
    email: "emma@gmail.com",
    password: "emma123",
    avatar: "https://i.pravatar.cc/150?img=3",
    xp: 7250,
    problemsSolved: 98,
    rank: 3
  },
  {
    id: 4,
    name: "David Park",
    username: "davidp",
    email: "david@gmail.com",
    password: "david123",
    avatar: "https://i.pravatar.cc/150?img=4",
    xp: 6800,
    problemsSolved: 89,
    rank: 4
  },
  {
    id: 5,
    name: "Lisa Wang",
    username: "lisaw",
    email: "lisa@gmail.com",
    password: "lisa123",
    avatar: "https://i.pravatar.cc/150?img=5",
    xp: 6500,
    problemsSolved: 85,
    rank: 5
  },
  {
    id: 6,
    name: "James Wilson",
    username: "jamesw",
    email: "james@gmail.com",
    password: "james123",
    avatar: "https://i.pravatar.cc/150?img=6",
    xp: 6350,
    problemsSolved: 82,
    rank: 6
  },
  {
    id: 7,
    name: "Alex Dev",
    username: "alexdev",
    email: "admin@gmail.com",
    password: "admin123",
    avatar: "https://i.pravatar.cc/150?img=7",
    xp: 6180,
    problemsSolved: 45,
    rank: 7,
    isCurrentUser: true
  }
];
export const loginUserMock = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const token = btoa(`${email}:${password}`); // simple mock token
      resolve({ user, token });
    } else {
      reject("Invalid credentials");
    }
  });
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



export const getUserSubmissions = (userId) => {
  return [
    {
      id: "sub_1",
      userId: "user_1",
      problemId: "1",
      status: "Wrong Answer",
      createdAt: "2025-02-12T10:05:00Z"
    },
    {
      id: "sub_2",
      userId: "user_1",
      problemId: "1",
      status: "Runtime Error",
      createdAt: "2025-02-11T18:30:00Z"
    },
    {
      id: "sub_3",
      userId: "user_1",
      problemId: "1",
      status: "Time Limit Exceeded",
      createdAt: "2025-02-10T14:20:00Z"
    },
    {
      id: "sub_4",
      userId: "user_1",
      problemId: "1",
      status: "Accepted",
      createdAt: "2025-02-12T10:10:00Z"
    },
    {
      id: "sub_5",
      userId: "user_1",
      problemId: "1",
      status: "Time Limit Exceeded",
      createdAt: "2025-02-10T14:20:00Z"
    },
    {
      id: "sub_6",
      userId: "user_1",
      problemId: "1",
      status: "Time Limit Exceeded",
      createdAt: "2025-02-10T14:20:00Z"
    },
    {
      id: "sub_7",
      userId: "user_1",
      problemId: "1",
      status: "Time Limit Exceeded",
      createdAt: "2025-02-10T14:20:00Z"
    },
    {
      id: "sub_8",
      userId: "user_1",
      problemId: "2",
      status: "Time Limit Exceeded",
      createdAt: "2025-02-10T14:20:00Z"
    },
  ];
};


export const getSubmissionAnswers = (submissionId) => {
  const data = {
    sub_4: [
      {
        id: "subAns_4",
        submissionId: "sub_4",
        code: `class Solution:\n    def twoSum(self, nums, target):\n        seen = {}\n        for i, val in enumerate(nums):\n            diff = target - val\n            if diff in seen:\n                return [seen[diff], i]\n            seen[val] = i`,
        languageId: "1",
        totalExecTime: "1 ms",
        totalExecMemory: "12 MB",
        status: "Accepted",
        mode: "submit",
        createdAt: "2025-02-12T10:10:05Z"
      }
    ],

    sub_1: [
      {
        id: "subAns_1",
        submissionId: "sub_1",
        code: `class Solution:\n    def twoSum(self, nums, target):\n        return []`,
        languageId: "1",
        totalExecTime: "0 ms",
        totalExecMemory: "10 MB",
        status: "Wrong Answer",
        mode: "submit",
        createdAt: "2025-02-12T10:05:10Z"
      }
    ],

    sub_2: [
      {
        id: "subAns_2",
        submissionId: "sub_2",
        code: `public class Solution {\n    public int[] addTwoNumbers(...) {\n        int x = 5 / 0; // crash\n    }\n}`,
        languageId: "2",
        totalExecTime: "-",
        totalExecMemory: "-",
        status: "Runtime Error",
        mode: "submit",
        createdAt: "2025-02-11T18:30:10Z"
      }
    ],

    sub_3: [
      {
        id: "subAns_3",
        submissionId: "sub_3",
        code: `while(true) {}`, // infinite loop cause TLE
        languageId: "3",
        totalExecTime: ">2s",
        totalExecMemory: "14 MB",
        status: "Time Limit Exceeded",
        mode: "submit",
        createdAt: "2025-02-10T14:20:10Z"
      }
    ],

    sub_5: [
      {
        id: "subAns_5",
        submissionId: "sub_5",
        code: `while(true) {}`, // infinite loop cause TLE
        languageId: "3",
        totalExecTime: ">2s",
        totalExecMemory: "14 MB",
        status: "Time Limit Exceeded",
        mode: "submit",
        createdAt: "2025-02-10T14:20:10Z"
      }
    ],

    sub_6: [
      {
        id: "subAns_6",
        submissionId: "sub_6",
        code: `while(true) {}`, // infinite loop cause TLE
        languageId: "3",
        totalExecTime: ">2s",
        totalExecMemory: "14 MB",
        status: "Time Limit Exceeded",
        mode: "submit",
        createdAt: "2025-02-10T14:20:10Z"
      }
    ],

    sub_7: [
      {
        id: "subAns_7",
        submissionId: "sub_7",
        code: `while(true) {}`, // infinite loop cause TLE
        languageId: "3",
        totalExecTime: ">2s",
        totalExecMemory: "14 MB",
        status: "Time Limit Exceeded",
        mode: "submit",
        createdAt: "2025-02-10T14:20:10Z"
      }
    ],

    sub_8: [
      {
        id: "subAns_8",
        submissionId: "sub_8",
        code: `while(true) {}`, // infinite loop cause TLE
        languageId: "3",
        totalExecTime: ">2s",
        totalExecMemory: "14 MB",
        status: "Time Limit Exceeded",
        mode: "submit",
        createdAt: "2025-02-10T14:20:10Z"
      }
    ]
  };

  return data[submissionId] || [];
};



export const getSnippetsByProblem = async(problemId) => {
  const snippet_data = await axios.get(`${BASE_URL}/problems/${problemId}/snippets`);
  return snippet_data.data.data;
};


export const getProblemById = async(problemId) => {
  const problem_data = await axios.get(`${BASE_URL}/problems/${problemId}`)
  return problem_data.data.data;
};


export const getProblemHints = async(problemId) => {
  const problem_hints = await axios.get(`${BASE_URL}/problems/${problemId}/hints`);
  return problem_hints.data.data;
};


export const getProblemConstraints = async(problemId) => {
  const problem_constraints = await axios.get(`${BASE_URL}/problems/${problemId}/constraints`);
  return problem_constraints.data.data;
};


export const getProblemEditorial = async(problemId) => {
  const editorial_data = await axios.get(`${BASE_URL}/problems/${problemId}/editorial`);
  console.log(editorial_data.data.data);
  return editorial_data.data.data;
};


export const getProblemTestCases = async(problemId) => {
  const testcases_data = await axios.get(`${BASE_URL}/problems/${problemId}/testcases`);
  return testcases_data.data.data;
};


export const getProblemTags = async(problemId) => {
  const tags_data = await axios.get(`${BASE_URL}/problems/${problemId}/tags`);
  return tags_data.data.data;
};

// GET /api/problems (list all problems)

export const getProblems = async (difficulty = "all") => {
  try {
    const url =
      difficulty === "all"
        ? `${BASE_URL}/problems`
        : `${BASE_URL}/problems?difficulty=${difficulty}`;
    const res = await axios.get(url);
    return res.data.data || res.data;
  } catch (err) {
    console.error("Error fetching problems:", err);
    return [];
  }
};
