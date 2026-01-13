import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { hashingQuiz } from "@/topics/core-data-structures/hashing/quiz"

export const hashing: Topic = {
  id: "hashing",
  title: "Hashing",
  description: "Efficient data storage and retrieval using hash functions.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(1)", space: "O(n)" },
  visualizerType: VisualizerType.HASH_TABLE,
  module: "2. Core Data Structures",
  order: 8,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  practiceLinks: [
    {
      title: "LeetCode: Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Group Anagrams",
      url: "https://leetcode.com/problems/group-anagrams/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Longest Substring Without Repeating Characters",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Hashing Data Structure",
      url: "https://www.geeksforgeeks.org/hashing-data-structure/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Design HashMap",
      url: "https://leetcode.com/problems/design-hashmap/",
      difficulty: "Easy",
    },
  ],
  quiz: hashingQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=2BldESGZKC8", // Hashing Explained
    hi: "https://www.youtube.com/watch?v=W5q0xgxmRd8" // Hashing Hindi
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
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
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
        HashMap<Integer, Integer> map = new HashMap<>();
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
