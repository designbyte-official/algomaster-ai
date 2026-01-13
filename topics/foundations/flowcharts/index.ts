import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { flowchartsQuiz } from "@/topics/foundations/flowcharts/quiz"

export const flowcharts: Topic = {
  id: "flowcharts",
  title: "Flowcharts",
  description: "Visualizing program flow using standard symbols and diagrams.",
  category: AlgorithmType.BASICS,
  complexity: { time: "N/A", space: "N/A" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 1,
  difficulty: "Easy",
  content: "", // Content loaded dynamically
  quiz: flowchartsQuiz,
  practiceLinks: [],
  practiceProblems: [
    {
      id: "even-odd",
      title: "Check Even or Odd",
      description: "Write a program that checks if a number `n` is even or odd. Print 'Even' or 'Odd'.",
      difficulty: "Easy",
      testCases: [
        { input: "4", expectedOutput: "Even", explanation: "4 is divisible by 2" },
        { input: "7", expectedOutput: "Odd", explanation: "7 is not divisible by 2" }
      ],
      starterCode: {
        javascript: "function solve(n) {\n  // Return 'Even' or 'Odd'\n}",
        python: "def solve(n):\n    # Return 'Even' or 'Odd'\n    pass",
        java: "public class Main {\n    public static void main(String[] args) {\n        int n = 4;\n        // Print Even or Odd\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    int n = 4;\n    // Print Even or Odd\n    return 0;\n}"
      }
    }
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=SWRDqTx8dgc", // Flowchart Tutorial
    hi: "https://www.youtube.com/watch?v=Kk6mRlq0x9E" // Flowchart in Hindi
  }
}
