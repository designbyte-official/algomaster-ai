import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { queueQuiz } from "@/topics/core-data-structures/queue/quiz"

export const queue: Topic = {
  id: "queue",
  title: "Queue",
  description: "FIFO data structure for managing elements.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(1)", space: "O(n)" },
  visualizerType: VisualizerType.QUEUE,
  module: "2. Core Data Structures",
  order: 7,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  practiceLinks: [
    {
      title: "LeetCode: Design Circular Queue",
      url: "https://leetcode.com/problems/design-circular-queue/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Queue Data Structure",
      url: "https://www.geeksforgeeks.org/queue-data-structure/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Moving Average from Data Stream",
      url: "https://leetcode.com/problems/moving-average-from-data-stream/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Design Hit Counter",
      url: "https://leetcode.com/problems/design-hit-counter/",
      difficulty: "Medium",
    },
  ],
  quiz: queueQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=wjI1WNcIntg", // Queue Data Structure
    hi: "https://www.youtube.com/watch?v=Yrz3iaznJLw" // Queue Hindi
  },
  practiceProblems: [
    {
      id: "implement-queue-using-stacks",
      title: "Implement Queue using Stacks",
      description: "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).",
      difficulty: "Easy",
      testCases: [
        {
          input: { operations: ["MyQueue", "push", "push", "peek", "pop", "empty"], values: [[], [1], [2], [], [], []] },
          expectedOutput: [null, null, null, 1, 1, false],
          explanation: "Standard queue operations."
        }
      ],
      starterCode: {
        javascript: `class MyQueue {
    constructor() {
        this.s1 = [];
        this.s2 = [];
    }

    /** 
     * @param {number} x
     * @return {void}
     */
    push(x) {
        // Write your code here
        this.s1.push(x);
    }

    /**
     * @return {number}
     */
    pop() {
        // Write your code here
        if (this.s2.length === 0) {
            while (this.s1.length > 0) {
                this.s2.push(this.s1.pop());
            }
        }
        return this.s2.pop();
    }

    /**
     * @return {number}
     */
    peek() {
        // Write your code here
        if (this.s2.length === 0) {
            while (this.s1.length > 0) {
                this.s2.push(this.s1.pop());
            }
        }
        return this.s2[this.s2.length - 1];
    }

    /**
     * @return {boolean}
     */
    empty() {
        // Write your code here
        return this.s1.length === 0 && this.s2.length === 0;
    }
}`,
        python: `class MyQueue:

    def __init__(self):
        self.s1 = []
        self.s2 = []

    def push(self, x: int) -> None:
        # Write your code here
        self.s1.append(x)

    def pop(self) -> int:
        # Write your code here
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2.pop()

    def peek(self) -> int:
        # Write your code here
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]

    def empty(self) -> bool:
        # Write your code here
        return not self.s1 and not self.s2`,
        java: `class MyQueue {
    Stack<Integer> s1;
    Stack<Integer> s2;

    public MyQueue() {
        s1 = new Stack<>();
        s2 = new Stack<>();
    }
    
    public void push(int x) {
        // Write your code here
        s1.push(x);
    }
    
    public int pop() {
        // Write your code here
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.pop();
    }
    
    public int peek() {
        // Write your code here
        if (s2.isEmpty()) {
             while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.peek();
    }
    
    public boolean empty() {
        // Write your code here
        return s1.isEmpty() && s2.isEmpty();
    }
}`,
        cpp: `class MyQueue {
    stack<int> s1;
    stack<int> s2;
public:
    MyQueue() {
        
    }
    
    void push(int x) {
        // Write your code here
        s1.push(x);
    }
    
    int pop() {
        // Write your code here
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        int x = s2.top();
        s2.pop();
        return x;
    }
    
    int peek() {
        // Write your code here
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        return s2.top();
    }
    
    bool empty() {
        // Write your code here
        return s1.empty() && s2.empty();
    }
};`
      }
    }
  ]
}
