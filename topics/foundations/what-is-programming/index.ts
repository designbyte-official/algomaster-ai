import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { whatIsProgrammingQuiz } from "@/topics/foundations/what-is-programming/quiz"

export const whatIsProgramming: Topic = {
  id: "what-is-programming",
  title: "What is Programming?",
  description: "Introduction to coding, how computers understand code, and the role of programming languages.",
  category: AlgorithmType.BASICS,
  complexity: { time: "N/A", space: "N/A" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 0,
  difficulty: "Easy",
  content: "", // Content loaded dynamically
  quiz: whatIsProgrammingQuiz,
  practiceLinks: [],
  practiceProblems: [
    {
      id: "hello-world",
      title: "Hello World",
      description: "Write a program that prints 'Hello, World!' to the console.",
      difficulty: "Easy",
      testCases: [
        { input: "", expectedOutput: "Hello, World!", explanation: "Standard output" }
      ],
      starterCode: {
        javascript: "console.log('Hello, World!');",
        python: "print('Hello, World!')",
        java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}"
      }
    }
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=zOjov-2OZ0E", // Programming with Mosh
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // CodeWithHarry Hindi
  }
}
