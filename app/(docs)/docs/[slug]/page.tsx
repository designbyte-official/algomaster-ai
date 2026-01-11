import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import "highlight.js/styles/github-dark.css"

import { getTopicBySlug } from "@/data/curriculum"
import { generateTopicSlug } from "@/utils/common/slug"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/common/ui/loading-spinner"
import { CodePlayground } from "@/components/features/learning/code-editor/code-playground"
import { DataStructureVisualizer } from "@/components/features/learning/visualizers/data-structure-visualizer"
import { PracticeView } from "@/components/features/learning/views/practice-view"
import { TopicSidebar } from "@/components/features/docs/topic-sidebar"

// Force dynamic rendering if we want to ensure fresh data,
// though static generation (generateStaticParams) is better for docs.
// For now, let's just make it work.

export async function generateStaticParams() {
  const { TOPICS } = await import("@/data/curriculum")
  return TOPICS.map((topic) => ({
    slug: generateTopicSlug(topic.title),
  }))
}

export default async function DocsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // 1. Fetch Topic
  // In a real app we might fetch from topic.id too, but slug is primary
  const topic = getTopicBySlug(slug)

  if (!topic) {
    notFound()
  }

  // 2. Navigation Logic (Prev/Next)
  const { TOPICS } = await import("@/data/curriculum")
  const { getTopicNavigation } = await import("@/utils/curriculum/topic-navigation")
  const { prevTopic, nextTopic } = getTopicNavigation(topic, TOPICS)

  return (
    <div className="flex w-full h-full">
      <div id="main-scroll-area" className="flex-1 min-w-0 overflow-y-auto scroll-smooth">
        <div className="max-w-4xl px-6 py-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Link href="/docs" className="hover:text-primary transition-colors">
                  Docs
                </Link>
                <span>/</span>
                <span className="text-foreground font-medium">{topic.module}</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {topic.title}
              </h1>

              <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed">
                {topic.description}
              </p>
            </div>

            <Separator />

            <Tabs defaultValue="explanation" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-[800px]">
                <TabsTrigger value="explanation">Explanation</TabsTrigger>
                <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
                <TabsTrigger value="practice">Practice</TabsTrigger>
                <TabsTrigger value="code">Code Interpreter</TabsTrigger>
              </TabsList>

              <TabsContent value="explanation" className="mt-6">
                <div className="min-w-0 space-y-6">
                  <Card className="border-none bg-transparent shadow-none">
                    <CardContent className="prose prose-slate dark:prose-invert prose-headings:scroll-m-20 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-7 prose-p:mb-6 prose-code:font-mono prose-code:text-sm prose-code:bg-muted prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:rounded prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none max-w-none p-0">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight, rehypeSlug]}
                        components={{
                          pre: ({ node: _node, ...props }) => (
                            <div className="bg-muted/50 relative my-6 rounded-lg border p-4">
                              <pre
                                {...props}
                                className="overflow-x-auto bg-transparent p-0"
                              />
                            </div>
                          ),
                        }}
                      >
                        {topic.content}
                      </ReactMarkdown>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="visualizer" className="mt-6">
                <div className="min-h-[500px]">
                  <Suspense
                    fallback={
                      <div className="flex h-[500px] items-center justify-center">
                        <LoadingSpinner size="lg" />
                      </div>
                    }
                  >
                    <DataStructureVisualizer topic={topic} />
                  </Suspense>
                </div>
              </TabsContent>

              <TabsContent value="practice" className="mt-6">
                <div className="min-h-[600px]">
                  <Suspense
                    fallback={
                      <div className="flex h-[600px] items-center justify-center">
                        <LoadingSpinner size="lg" />
                      </div>
                    }
                  >
                    <PracticeView topic={topic} />
                  </Suspense>
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <Suspense
                  fallback={
                    <div className="flex h-[600px] items-center justify-center rounded-lg border bg-muted/50">
                      <div className="text-center space-y-3">
                        <LoadingSpinner size="lg" />
                        <p className="text-sm text-muted-foreground">Loading code editor...</p>
                      </div>
                    </div>
                  }
                >
                  <CodePlayground topic={topic} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <TopicSidebar
        topic={topic}
        prevTopic={prevTopic}
        nextTopic={nextTopic}
      />
    </div>
  )
}
