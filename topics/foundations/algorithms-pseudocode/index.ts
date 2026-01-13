import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { algorithmsPseudocodeQuiz } from "@/topics/foundations/algorithms-pseudocode/quiz"

export const algorithmsPseudocode: Topic = {
  id: "algorithms-pseudocode",
  title: "Algorithms & Pseudocode",
  description: "Writing logic without syntax constraints using pseudocode.",
  category: AlgorithmType.BASICS,
  complexity: { time: "N/A", space: "N/A" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 2,
  difficulty: "Easy",
  content: "", // Content loaded dynamically
  quiz: algorithmsPseudocodeQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Fizz Buzz",
      url: "https://leetcode.com/problems/fizz-buzz/",
      difficulty: "Easy",
    },
  ],
  practiceProblems: [
    {
      id: "fizzbuzz",
      title: "FizzBuzz",
      description: "Print numbers from 1 to `n`. For multiples of 3 print 'Fizz', for 5 print 'Buzz', for both print 'FizzBuzz'.",
      difficulty: "Easy",
      testCases: [
        { input: "5", expectedOutput: "1, 2, Fizz, 4, Buzz", explanation: "Basic FizzBuzz sequence" }
      ],
      starterCode: {
        javascript: "function solve(n) {\n  // Print sequence\n}",
        python: "def solve(n):\n    # Print sequence\n    pass",
        java: "public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        // Your code here\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    int n = 5;\n    // Your code\n    return 0;\n}"
      }
    }
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=6h2b-O0DMCo", // Algorithms & Pseudocode
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Pseudocode Hindi
  }
}
