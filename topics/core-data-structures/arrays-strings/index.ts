import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { arraysStringsQuiz } from "@/topics/core-data-structures/arrays-strings/quiz"

export const arraysStrings: Topic = {
  id: "arrays-strings",
  title: "Arrays & Strings",
  description: "Fundamental data structures for storing sequences of data.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(n)", space: "O(n)" },
  visualizerType: VisualizerType.GRID,
  module: "2. Core Data Structures",
  order: 4,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  practiceLinks: [
    {
      title: "LeetCode: Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Best Time to Buy and Sell Stock",
      url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Longest Substring Without Repeating Characters",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Arrays",
      url: "https://www.geeksforgeeks.org/array-data-structure/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Reverse String",
      url: "https://leetcode.com/problems/reverse-string/",
      difficulty: "Easy",
    },
  ],
  quiz: arraysStringsQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=QJNwK2uJyGs", // Arrays & Strings Tutorial
    hi: "https://www.youtube.com/watch?v=z9bZufPHFLU" // Arrays in Hindi
  },
  practiceProblems: [
    {
      id: "two-sum",
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      difficulty: "Easy",
      testCases: [
        {
          input: { nums: [2, 7, 11, 15], target: 9 },
          expectedOutput: [0, 1],
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: { nums: [3, 2, 4], target: 6 },
          expectedOutput: [1, 2],
          explanation: "nums[1] + nums[2] == 6, so we return [1, 2]."
        },
        {
          input: { nums: [3, 3], target: 6 },
          expectedOutput: [0, 1], 
          explanation: "nums[0] + nums[1] == 6."
        }
      ],
      starterCode: {
        javascript: `function twoSum(nums, target) {
  // Write your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        python: `def two_sum(nums, target):
    # Write your code here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`
      }
    }
  ]
}
