import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { variablesDatatypesQuiz } from "@/topics/foundations/variables-datatypes/quiz"

export const variablesDatatypes: Topic = {
  id: "variables-datatypes",
  title: "Variables & Data Types",
  description: "Understanding how computers store and manipulate data.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(1)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 3,
  difficulty: "Easy",
  content: "", // Content loaded dynamically from data/content/markdown/variables-datatypes.md
  quiz: variablesDatatypesQuiz,
  practiceLinks: [],
  practiceProblems: [
    {
      id: "var-swap",
      title: "Variable Swap",
      description: "Given two variables `a` and `b`, swap their values so that `a` contains the original value of `b` and vice-versa. Output both values.",
      difficulty: "Easy",
      testCases: [
        { input: "5, 10", expectedOutput: "10, 5", explanation: "a=5, b=10 -> a=10, b=5" }
      ],
      starterCode: {
        javascript: "function solve(a, b) {\n  // Your code here\n  return [a, b];\n}",
        python: "def solve(a, b):\n    # Your code here\n    return a, b",
        java: "public class Main {\n    public static void main(String[] args) {\n        int a = 5, b = 10;\n        // Your code here\n        System.out.println(a + \", \" + b);\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 5, b = 10;\n    // Your code here\n    cout << a << \", \" << b << endl;\n    return 0;\n}"
      }
    },
    {
      id: "calc-interest",
      title: "Simple Interest",
      description: "Calculate the simple interest given Principal (P), Rate (R), and Time (T). Formula: SI = (P * R * T) / 100",
      difficulty: "Easy",
      testCases: [
        { input: "1000, 5, 2", expectedOutput: "100", explanation: "(1000 * 5 * 2) / 100 = 100" }
      ],
      starterCode: {
        javascript: "function solve(p, r, t) {\n  return (p * r * t) / 100;\n}",
        python: "def solve(p, r, t):\n    return (p * r * t) / 100",
        java: "public class Main {\n    public static void main(String[] args) {\n        double p=1000, r=5, t=2;\n        System.out.println((p * r * t) / 100);\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std; int main() { float p=1000, r=5, t=2; cout << (p*r*t)/100 << endl; return 0; }"
      }
    }
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=8yjkWGRlUmc", // Variables & Data Types
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Variables Hindi
  }
}
