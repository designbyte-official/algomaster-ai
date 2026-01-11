import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { stackQuiz } from "@/topics/core-data-structures/stack/quiz"

export const stack: Topic = {
  id: "stack",
  title: "Stack",
  description: "LIFO data structure for managing elements.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(1)", space: "O(n)" },
  visualizerType: VisualizerType.STACK,
  module: "2. Core Data Structures",
  order: 6,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  practiceLinks: [
    {
      title: "LeetCode: Valid Parentheses",
      url: "https://leetcode.com/problems/valid-parentheses/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Min Stack",
      url: "https://leetcode.com/problems/min-stack/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Evaluate Reverse Polish Notation",
      url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Stack Data Structure",
      url: "https://www.geeksforgeeks.org/stack-data-structure/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Daily Temperatures",
      url: "https://leetcode.com/problems/daily-temperatures/",
      difficulty: "Medium",
    },
  ],
  quiz: stackQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=I37kGX-nZEI", // Stack Data Structure
    hi: "https://www.youtube.com/watch?v=JvuaAgDar1c" // Stack Hindi
  },
  practiceProblems: [
    {
      id: "valid-parentheses",
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
      difficulty: "Easy",
      testCases: [
        {
          input: { s: "()" },
          expectedOutput: true,
          explanation: "Simple pair."
        },
        {
          input: { s: "()[]{}" },
          expectedOutput: true,
          explanation: "Multiple matching pairs."
        },
        {
          input: { s: "(]" },
          expectedOutput: false,
          explanation: "Mismatched closing bracket."
        }
      ],
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Write your code here
    const stack = [];
    const map = {
        "(": ")",
        "[": "]",
        "{": "}"
    };
    
    for (let char of s) {
        if (map[char]) {
            stack.push(char);
        } else {
            if (stack.length === 0) return false;
            let last = stack.pop();
            if (map[last] !== char) return false;
        }
    }
    return stack.length === 0;
}`,
        python: `def is_valid(s):
    # Write your code here
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
            
    return not stack`,
        java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}`,
        cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                st.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return st.empty();
    }
};`
      }
    }
  ]
}
