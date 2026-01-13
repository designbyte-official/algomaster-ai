import { generateModuleSlug, generateTopicSlug } from "@/utils/common/slug"

import { Topic, VisualizerType } from "@/types/curriculum"

import { bellmanFord } from "@/topics/advanced-graphs/bellman-ford"
// Module 6: Advanced Graphs
import { dijkstra } from "@/topics/advanced-graphs/dijkstra"
import { kruskal } from "@/topics/advanced-graphs/kruskal"
import { unionFind } from "@/topics/advanced-graphs/union-find"
import { bitManipulation } from "@/topics/advanced-techniques/bit-manipulation"
import { fenwickTree } from "@/topics/advanced-techniques/fenwick-tree"
// Module 8: Advanced Techniques
import { segmentTree } from "@/topics/advanced-techniques/segment-tree"
import { backtrackingIntro } from "@/topics/algorithmic-paradigms/backtracking-intro"
import { dpIntro } from "@/topics/algorithmic-paradigms/dp-intro"
// Module 7: Algorithmic Paradigms
import { greedyIntro } from "@/topics/algorithmic-paradigms/greedy-intro"
import { knapsack } from "@/topics/algorithmic-paradigms/knapsack"
import { lcs } from "@/topics/algorithmic-paradigms/lcs"
// Module 2: Core Data Structures
import { arraysStrings } from "@/topics/core-data-structures/arrays-strings"
import { hashing } from "@/topics/core-data-structures/hashing"
import { linkedList } from "@/topics/core-data-structures/linked-list"
import { queue } from "@/topics/core-data-structures/queue"
import { stack } from "@/topics/core-data-structures/stack"
import { algorithmsPseudocode } from "@/topics/foundations/algorithms-pseudocode"
import { bigO } from "@/topics/foundations/big-o"
import { flowcharts } from "@/topics/foundations/flowcharts"
import { loops } from "@/topics/foundations/loops"
import { recursion } from "@/topics/foundations/recursion"
// Module 1: Foundations
import { variablesDatatypes } from "@/topics/foundations/variables-datatypes"
import { whatIsProgramming } from "@/topics/foundations/what-is-programming"
import { bfs } from "@/topics/graph-algorithms/bfs"
import { dfs } from "@/topics/graph-algorithms/dfs"
// Module 5: Graph Algorithms
import { graphReps } from "@/topics/graph-algorithms/graph-reps"
import { topoSort } from "@/topics/graph-algorithms/topo-sort"
import { binarySearch } from "@/topics/searching-sorting/binary-search"
import { bubbleSort } from "@/topics/searching-sorting/bubble-sort"
import { insertionSort } from "@/topics/searching-sorting/insertion-sort"
// Module 3: Searching & Sorting
import { linearSearch } from "@/topics/searching-sorting/linear-search"
import { mergeSort } from "@/topics/searching-sorting/merge-sort"
import { quickSort } from "@/topics/searching-sorting/quick-sort"
import { selectionSort } from "@/topics/searching-sorting/selection-sort"
import { avlTree } from "@/topics/trees-heaps/avl-tree"
// Module 4: Trees & Heaps
import { bst } from "@/topics/trees-heaps/bst"
import { heaps } from "@/topics/trees-heaps/heaps"
import { trie } from "@/topics/trees-heaps/trie"

export const TOPICS: Topic[] = [
  // Module 1
  whatIsProgramming,
  flowcharts,
  algorithmsPseudocode,
  variablesDatatypes,
  loops,
  recursion,
  bigO,
  // Module 2
  arraysStrings,
  linkedList,
  stack,
  queue,
  hashing,
  // Module 3
  linearSearch,
  binarySearch,
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  // Module 4
  bst,
  heaps,
  avlTree,
  trie,
  // Module 5
  graphReps,
  bfs,
  dfs,
  topoSort,
  // Module 6
  dijkstra,
  bellmanFord,
  kruskal,
  unionFind,
  // Module 7
  greedyIntro,
  dpIntro,
  knapsack,
  lcs,
  backtrackingIntro,
  // Module 8
  segmentTree,
  fenwickTree,
  bitManipulation,
]

// Helper functions
export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find((topic) => topic.id === id)
}

export function getTopicsByModule(module: string): Topic[] {
  return TOPICS.filter((topic) => topic.module === module)
}

export function getModules(): string[] {
  return Array.from(new Set(TOPICS.map((topic) => topic.module))).sort()
}

/**
 * Get module by slug
 */
export function getModuleBySlug(slug: string): string | undefined {
  const modules = getModules()
  return modules.find((m) => generateModuleSlug(m) === slug)
}

/**
 * Check if a slug is a module or topic
 */
export function isModuleSlug(slug: string): boolean {
  return getModuleBySlug(slug) !== undefined
}

/**
 * Get a topic by its slug (URL-friendly identifier)
 */
export function getTopicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((topic) => {
    const topicSlug = generateTopicSlug(topic.title)
    return topicSlug === slug || topic.id === slug
  })
}

// Overrides to ensure all topics have visualizers (Hot-patch)
try {
  const overrides: Record<string, VisualizerType> = {
    hashing: VisualizerType.HASH_TABLE,
    trie: VisualizerType.TRIE,
    "graph-reps": VisualizerType.GRAPH,
    "topo-sort": VisualizerType.GRAPH,
    kruskal: VisualizerType.GRAPH,
    "union-find": VisualizerType.GRAPH,
    "bellman-ford": VisualizerType.GRAPH,
    "segment-tree": VisualizerType.BINARY_TREE, // Reuse Tree visualizer
    "fenwick-tree": VisualizerType.BINARY_TREE, // Reuse Tree visualizer
    "arrays-strings": VisualizerType.GRID, // Array operations visualization
    recursion: VisualizerType.STACK, // Visualize recursion with call stack
  }

  TOPICS.forEach((topic) => {
    if (overrides[topic.id]) {
      topic.visualizerType = overrides[topic.id]
    }
  })
} catch (e) {
  console.error("Failed to apply visualizer overrides", e)
}
