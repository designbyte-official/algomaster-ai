import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { recursionQuiz } from "@/topics/foundations/recursion/quiz"

export const recursion: Topic = {
  id: "recursion",
  title: "Recursion",
  description: "Functions that call themselves to solve problems.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(2^n)", space: "O(n)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 5,
  difficulty: "Medium",
  content: "", // Content loaded from data/content/markdown/foundations/recursion.md
  quiz: recursionQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Fibonacci Number",
      url: "https://leetcode.com/problems/fibonacci-number/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Pow(x, n)",
      url: "https://leetcode.com/problems/powx-n/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Recursion",
      url: "https://www.geeksforgeeks.org/recursion/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Climbing Stairs",
      url: "https://leetcode.com/problems/climbing-stairs/",
      difficulty: "Easy",
    },
  ],
  practiceProblems: [
    {
      id: "fib-recursive",
      title: "Recursive Fibonacci",
      description: "Calculate the nth Fibonacci number using recursion. Fib(0)=0, Fib(1)=1, Fib(n) = Fib(n-1) + Fib(n-2).",
      difficulty: "Easy",
      testCases: [
        { input: "5", expectedOutput: "5", explanation: "0, 1, 1, 2, 3, 5" },
        { input: "6", expectedOutput: "8", explanation: "5 + 3 = 8" }
      ],
      starterCode: {
        javascript: "function fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}",
        python: "def fib(n):\n    if n <= 1: return n\n    return fib(n - 1) + fib(n - 2)",
        java: "public class Main {\n    static int fib(int n) {\n        if (n <= 1) return n;\n        return fib(n - 1) + fib(n - 2);\n    }\n    public static void main(String[] args) {\n        System.out.println(fib(5));\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std; int fib(int n) { if(n<=1) return n; return fib(n-1)+fib(n-2); } int main() { cout << fib(5) << endl; return 0; }"
      }
    }
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=IJDJ0kBc2LM", // Recursion Explained
    hi: "https://www.youtube.com/watch?v=6wDD7gR2C8A" // Recursion Hindi
  }
}
