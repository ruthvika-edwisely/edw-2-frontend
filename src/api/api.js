// mockData.js - Simulates Flask API responses
// Later, replace these functions with actual fetch() calls to your Flask backend


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
      id: "lang_1",
      name: "python",
      compilerLanguageId: 71, // judge0 python3
      createdAt: "2025-02-10T12:00:00Z"
    },
    {
      id: "lang_2",
      name: "java",
      compilerLanguageId: 62, // judge0 java17
      createdAt: "2025-02-10T12:00:00Z"
    },
    {
      id: "lang_3",
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
      problemId: "prob_1",
      status: "Wrong Answer",
      createdAt: "2025-02-12T10:05:00Z"
    },
    {
      id: "sub_2",
      userId: "user_1",
      problemId: "prob_1",
      status: "Runtime Error",
      createdAt: "2025-02-11T18:30:00Z"
    },
    {
      id: "sub_3",
      userId: "user_1",
      problemId: "prob_1",
      status: "Time Limit Exceeded",
      createdAt: "2025-02-10T14:20:00Z"
    },
    {
      id: "sub_4",
      userId: "user_1",
      problemId: "prob_1",
      status: "Accepted",
      createdAt: "2025-02-12T10:10:00Z"
    },
    {
      id: "sub_5",
      userId: "user_1",
      problemId: "prob_1",
      status: "Time Limit Exceeded",
      createdAt: "2025-02-10T14:20:00Z"
    },
    {
      id: "sub_6",
      userId: "user_1",
      problemId: "prob_1",
      status: "Time Limit Exceeded",
      createdAt: "2025-02-10T14:20:00Z"
    },
    {
      id: "sub_7",
      userId: "user_1",
      problemId: "prob_1",
      status: "Time Limit Exceeded",
      createdAt: "2025-02-10T14:20:00Z"
    },
    {
      id: "sub_8",
      userId: "user_1",
      problemId: "prob_1",
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
        languageId: "lang_1",
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
        languageId: "lang_1",
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
        languageId: "lang_2",
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
        languageId: "lang_3",
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
        languageId: "lang_3",
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
        languageId: "lang_3",
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
        languageId: "lang_3",
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
        languageId: "lang_3",
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



export const getSnippetsByProblem = (problemId) => {
  return [
    {
      id: "snip_1",
      problemId: "prob_1",
      languageId: "lang_1",
      code: `class Solution:\n    def twoSum(self, nums, target):\n        pass`,
      createdAt: "2025-02-09T12:00:00Z"
    },
    {
      id: "snip_2",
      problemId: "prob_1",
      languageId: "lang_2",
      code: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}`,
      createdAt: "2025-02-09T12:00:00Z"
    },
    {
      id: "snip_3",
      problemId: "prob_1",
      languageId: "lang_3",
      code: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        return {};\n    }\n};`,
      createdAt: "2025-02-09T12:00:00Z"
    }
  ];
};



// GET /api/problems/:id
export const getProblemById = (problemId) => {
  return {
    id: "prob_1",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    xpReward: 10
  };
};

// GET /api/problems/:id/hints
export const getProblemHints = (problemId) => {
  return [
    {
      id: "hint_1",
      problemId: "prob_1",
      content: "Try using a hash map to store the numbers you've seen so far.",
      orderIndex: 1
    },
    {
      id: "hint_2",
      problemId: "prob_1",
      content: "For each number, check if target - current number exists in your hash map.",
      orderIndex: 2
    },
    {
      id: "hint_3",
      problemId: "prob_1",
      content: "The time complexity can be reduced to O(n) with this approach.",
      orderIndex: 3
    }
  ];
};

// GET /api/problems/:id/constraints
export const getProblemConstraints = (problemId) => {
  return [
    {
      id: "const_1",
      problemId: "prob_1",
      description: "2 <= nums.length <= 10^4",
      orderIndex: 1
    },
    {
      id: "const_2",
      problemId: "prob_1",
      description: "-10^9 <= nums[i] <= 10^9",
      orderIndex: 2
    },
    {
      id: "const_3",
      problemId: "prob_1",
      description: "-10^9 <= target <= 10^9",
      orderIndex: 3
    },
    {
      id: "const_4",
      problemId: "prob_1",
      description: "Only one valid answer exists",
      orderIndex: 4
    }
  ];
};

// GET /api/problems/:id/editorial
export const getProblemEditorial = (problemId) => {
  return {
    id: "edit_1",
    problemId: "prob_1",
    title: "Two sum",

    overview: `
The **Two Sum** problem asks us to find two indices such that their values add up to a given target.

A few common approaches are:
- Brute Force using nested loops
- Hash Map for an optimal O(n) solution

Below are detailed explanations of both approaches.
    `,

    approaches: [
      {
        id: "brute_force",
        title: "Approach 1: Brute Force",
        explanation: `
The simplest idea is to check every possible pair of numbers.

### **Algorithm**
1. Loop through each index \`i\`
2. For each \`i\`, loop through each index \`j > i\`
3. If \`nums[i] + nums[j] == target\`, return \`[i, j]\`

### **Why it works**
We explore all combinations, so if a solution exists, we will find it.

### **Complexity**
- **Time:** O(n²)  
- **Space:** O(1)
        `,
        code: {
          python: `
class Solution:
    def twoSum(self, nums, target):
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
          `,
          java: `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
}
          `,
          cpp: `
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};
          `
        }
      },

      {
        id: "optimal_hashmap",
        title: "Approach 2: Hash Map (Optimal O(n))",
        explanation: `
We can solve the problem in **one pass** using a hash map.

### **Key Idea**
While iterating over the array:
- Compute the complement: \`target - nums[i]\`
- If the complement is already in the map → we found the answer
- Otherwise, store the current number in the map

### **Algorithm**
1. Create an empty hash map
2. Loop through each index \`i\`
3. Let \`num = nums[i]\`
4. Compute \`complement = target - num\`
5. If complement is in the map, return \`[map[complement], i]\`
6. Otherwise, store \`map[num] = i\`

### **Why it works**
The map keeps track of previously seen values, so we instantly know if a matching pair exists.

### **Complexity**
- **Time:** O(n)  
- **Space:** O(n)
        `,
        code: {
          python: `
class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, value in enumerate(nums):
            complement = target - value
            if complement in seen:
                return [seen[complement], i]
            seen[value] = i
          `,
          java: `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }

            seen.put(nums[i], i);
        }

        return new int[]{};
    }
}
          `,
          cpp: `
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;

        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];

            if (seen.count(complement)) {
                return {seen[complement], i};
            }

            seen[nums[i]] = i;
        }

        return {};
    }
};
          `
        }
      }
    ],

    videoUrl: "https://www.youtube.com/watch?v=KLlXCFG5TnA" // good Two Sum editorial video
  };
};


// GET /api/problems/:id/testcases
export const getProblemTestCases = (problemId) => {
  return [
    {
      id: "test_1",
      problemId: "prob_1",
      input: "[2,7,11,15]\n9",
      expectedOutput: "[0,1]",
      isHidden: false,
      orderIndex: 1
    },
    {
      id: "test_2",
      problemId: "prob_1",
      input: "[3,2,4]\n6",
      expectedOutput: "[1,2]",
      isHidden: false,
      orderIndex: 2
    },
    {
      id: "test_3",
      problemId: "prob_1",
      input: "[3,3]\n6",
      expectedOutput: "[0,1]",
      isHidden: false,
      orderIndex: 3
    },
    {
      id: "test_4",
      problemId: "prob_1",
      input: "[1,5,3,7,8,9]\n12",
      expectedOutput: "[2,4]",
      isHidden: true,
      orderIndex: 4
    },
    {
      id: "test_5",
      problemId: "prob_1",
      input: "[-1,-2,-3,-4,-5]\n-8",
      expectedOutput: "[2,4]",
      isHidden: true,
      orderIndex: 5
    }
  ];
};

// GET /api/problems/:id/tags
export const getProblemTags = (problemId) => {
  return [
    {
      id: "tag_1",
      name: "Array",
      category: "topic"
    },
    {
      id: "tag_2",
      name: "Hash Table",
      category: "topic"
    },
    {
      id: "tag_3",
      name: "Google",
      category: "company"
    },
    {
      id: "tag_4",
      name: "Amazon",
      category: "company"
    }
  ];
};

// GET /api/problems (list all problems)
export const getAllProblems = () => {
  return [
    {
      id: "prob_1",
      title: "Two Sum",
      difficulty: "Easy",
      xpReward: 10
    },
    {
      id: "prob_2",
      title: "Add Two Numbers",
      difficulty: "Medium",
      xpReward: 20
    },
    {
      id: "prob_3",
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      xpReward: 30
    }
  ];
};