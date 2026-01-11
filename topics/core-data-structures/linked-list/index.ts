import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { linkedListQuiz } from "@/topics/core-data-structures/linked-list/quiz"

export const linkedList: Topic = {
  id: "linked-list",
  title: "Linked Lists",
  description: "Dynamic data structure with nodes connected by pointers.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(n)", space: "O(n)" },
  visualizerType: VisualizerType.LINKED_LIST,
  module: "2. Core Data Structures",
  order: 5,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  practiceLinks: [
    {
      title: "LeetCode: Reverse Linked List",
      url: "https://leetcode.com/problems/reverse-linked-list/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Merge Two Sorted Lists",
      url: "https://leetcode.com/problems/merge-two-sorted-lists/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Linked List Cycle",
      url: "https://leetcode.com/problems/linked-list-cycle/",
      difficulty: "Easy",
    },
    {
      title: "GeeksforGeeks: Linked List",
      url: "https://www.geeksforgeeks.org/data-structures/linked-list/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Remove Nth Node From End",
      url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
      difficulty: "Medium",
    },
  ],
  quiz: linkedListQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=WwfhLC16bis", // Linked Lists Explained
    hi: "https://www.youtube.com/watch?v=ofc7s8zffjQ" // Linked List Hindi
  },
  practiceProblems: [
    {
      id: "reverse-linked-list",
      title: "Reverse Linked List",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      difficulty: "Easy",
      testCases: [
        {
          input: { head: [1, 2, 3, 4, 5] },
          expectedOutput: [5, 4, 3, 2, 1],
          explanation: "The list is reversed from 1->2->3->4->5 to 5->4->3->2->1."
        },
        {
          input: { head: [1, 2] },
          expectedOutput: [2, 1],
          explanation: "1->2 becomes 2->1."
        },
        {
          input: { head: [] },
          expectedOutput: [],
          explanation: "Empty list remains empty."
        }
      ],
      starterCode: {
        javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
    // Write your code here
    let prev = null;
    let current = head;
    while(current !== null) {
        let nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    return prev;
}`,
        python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
def reverse_list(head):
    # Write your code here
    prev = None
    current = head
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    return prev`,
        java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your code here
        ListNode prev = null;
        ListNode current = head;
        while (current != null) {
            ListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        return prev;
    }
}`,
        cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your code here
        ListNode* prev = nullptr;
        ListNode* current = head;
        while (current != nullptr) {
            ListNode* nextTemp = current->next;
            current->next = prev;
            prev = current;
            current = nextTemp;
        }
        return prev;
    }
};`
      }
    }
  ]
}
