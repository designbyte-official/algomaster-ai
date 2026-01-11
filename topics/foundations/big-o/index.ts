import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { bigOQuiz } from "@/topics/foundations/big-o/quiz"

export const bigO: Topic = {
  id: "big-o",
  title: "Big O Notation",
  description: "Understanding algorithm efficiency and complexity analysis.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(1)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 6,
  difficulty: "Medium",
  content: "", // Content loaded from data/content/markdown/foundations/big-o.md
  quiz: bigOQuiz,
  practiceLinks: [
    {
      title: "GeeksforGeeks: Time Complexity",
      url: "https://www.geeksforgeeks.org/time-complexity-and-space-complexity/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Best Time to Buy and Sell Stock",
      url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      difficulty: "Easy",
    },
    {
      title: "Big-O Cheat Sheet",
      url: "https://www.bigocheatsheet.com/",
      difficulty: "Easy",
    },
  ],
  practiceProblems: [
    {
      id: "sum-o1",
      title: "O(1) Sum Calculation",
      description: "Calculate the sum of the first `n` natural numbers in O(1) time complexity. Hint: Use the mathematical formula `n * (n + 1) / 2` instead of a loop.",
      difficulty: "Easy",
      testCases: [
        { input: "10", expectedOutput: "55", explanation: "Sum from 1 to 10 is 55" },
        { input: "100", expectedOutput: "5050", explanation: "Sum from 1 to 100 is 5050" }
      ],
      starterCode: {
        javascript: "function solve(n) {\n  // Write O(1) solution\n  return 0;\n}",
        python: "def solve(n):\n    # Write O(1) solution\n    return 0",
        java: "public class Main {\n    public static void main(String[] args) {\n        // Write O(1) solution\n        int n = 10;\n        System.out.println(0);\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    int n = 10;\n    // Write O(1) solution\n    cout << 0 << endl;\n    return 0;\n}"
      }
    }
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=Mo4vesaut8g", // Big O Notation
    hi: "https://www.youtube.com/watch?v=Z0bH0cMY0E8" // Big O Hindi
  }
}
