import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { loopsQuiz } from "@/topics/foundations/loops/quiz"

export const loops: Topic = {
  id: "loops",
  title: "Loops",
  description: "Iterating through data and repeating actions efficiently.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(n)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 4,
  difficulty: "Easy",
  content: "", // Content loaded from data/content/markdown/foundations/loops.md
  quiz: loopsQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Fizz Buzz",
      url: "https://leetcode.com/problems/fizz-buzz/",
      difficulty: "Easy",
    },
    {
      title: "GeeksforGeeks: Loops in Python",
      url: "https://www.geeksforgeeks.org/loops-in-python/",
      difficulty: "Easy",
    },
    {
      title: "HackerRank: Loops",
      url: "https://www.hackerrank.com/challenges/python-loops/problem",
      difficulty: "Easy",
    },
  ],
  practiceProblems: [
    {
      id: "sum-n",
      title: "Sum of First N Numbers",
      description: "Write a program that uses a loop to calculate the sum of the first `N` natural numbers.",
      difficulty: "Easy",
      testCases: [
        { input: "5", expectedOutput: "15", explanation: "1+2+3+4+5 = 15" },
        { input: "10", expectedOutput: "55", explanation: "1+2+...+10 = 55" }
      ],
      starterCode: {
        javascript: "function solve(n) {\n  let sum = 0;\n  // Your code here\n  return sum;\n}",
        python: "def solve(n):\n    total = 0\n    # Your code here\n    return total",
        java: "public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        int sum = 0;\n        // Your code here\n        System.out.println(sum);\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std; int main() { int n = 5, sum = 0; /* Loop here */ cout << sum << endl; return 0; }"
      }
    }
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ", // Loops Tutorial
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Loops Hindi
  }
}
