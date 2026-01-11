export enum AlgorithmType {
  BASICS = "BASICS",
  SORTING = "SORTING",
  SEARCHING = "SEARCHING",
  DATA_STRUCTURE = "DATA_STRUCTURE",
  GRAPH = "GRAPH",
  DP = "DP",
  GREEDY = "GREEDY",
  BACKTRACKING = "BACKTRACKING",
  BIT_MANIPULATION = "BIT_MANIPULATION",
  STRING = "STRING",
  MATH = "MATH",
  RANGE_QUERY = "RANGE_QUERY",
  NETWORK_FLOW = "NETWORK_FLOW",
  GEOMETRY = "GEOMETRY",
}

export enum VisualizerType {
  BAR_CHART = "BAR_CHART",
  GRID = "GRID",
  LINKED_LIST = "LINKED_LIST",
  STACK = "STACK",
  QUEUE = "QUEUE",
  PATHFINDING = "PATHFINDING",
  BINARY_TREE = "BINARY_TREE",
  AVL_TREE = "AVL_TREE",
  HEAP = "HEAP",
  DP = "DP",
  HASH_TABLE = "HASH_TABLE",
  TRIE = "TRIE",
  GRAPH = "GRAPH",
  NONE = "NONE",
}

export type SupportedLanguage = "cpp" | "java" | "python" | "javascript"

export interface PracticeLink {
  title: string
  url: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

// Category reference for extensibility
export type CategoryId = "dsa" | "frontend" | "system-design" | "backend" | "database" | "devops" | "mobile"

export interface Topic {
  id: string
  title: string
  description: string
  categoryId?: CategoryId // Category identifier: dsa, frontend, system-design, etc. (defaults to "dsa")
  category: AlgorithmType // Algorithm category for DSA topics
  complexity: {
    time: string
    space: string
  }
  visualizerType: VisualizerType
  content: string // Markdown or MDX text
  module: string // "Module 1: Foundations"
  order: number
  practiceLinks?: PracticeLink[]
  starterCode?: Record<SupportedLanguage, string> // Starter code for the runner
  difficulty?: "Easy" | "Medium" | "Hard"
  quiz?: QuizQuestion[]
  practiceProblems?: PracticeProblem[]
  tags?: string[] // Search tags for fuzzy matching
  youtubeLink?: string | { en?: string; hi?: string } // Optional YouTube tutorial link(s) - can be string or language-specific object
}

export interface PracticeProblem {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  starterCode?: Record<SupportedLanguage, string>
  testCases?: {
    input: any
    expectedOutput: any
    explanation?: string
  }[]
  hints?: string[]
}

export interface ChatMessage {
  id: string
  role: "user" | "model"
  text: string
  timestamp: number
}

// Auxiliary data types for different visualizers
export interface GraphAuxiliary {
  nodes?: Array<{ id: string | number; x: number; y: number }>
  edges?: Array<{ from: string | number; to: string | number }>
  activeNode?: string | number
  visited?: (string | number)[]
}

export interface HashTableAuxiliary {
  buckets?: number[][]
  currentBucket?: number
}

export interface DPAuxiliary {
  dp?: (number | null)[]
  dpTable?: (number | null)[][]
  row?: number
  col?: number
}

export interface HeapAuxiliary {
  heap?: number[]
}

export interface PathfindingAuxiliary {
  visited?: number[]
  path?: number[]
  grid?: number[][]
}

export type VisualizationAuxiliary =
  | GraphAuxiliary
  | HashTableAuxiliary
  | DPAuxiliary
  | HeapAuxiliary
  | PathfindingAuxiliary
  | Record<string, unknown>

export interface VisualizationStep {
  array: number[]
  activeIndices: number[]
  sortedIndices: number[]
  description: string
  auxiliary?: VisualizationAuxiliary
}
