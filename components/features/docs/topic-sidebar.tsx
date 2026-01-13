"use client"

import { useState } from "react"
import Link from "next/link"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"
import { ROUTES } from "@/constants/routes"
import { ArrowLeft01Icon, ArrowRight01Icon, ClockIcon, ComputerIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableOfContents } from "@/components/features/docs/table-of-contents"
import type { Topic } from "@/types/curriculum"
import { generateTopicSlug } from "@/utils/common/slug"

interface TopicSidebarProps {
  topic: Topic
  prevTopic: Topic | null
  nextTopic: Topic | null
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  if (!url) {
    return null
  }
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
  return match ? match[1] : null
}

// Get YouTube link based on language preference
function getYouTubeLink(topic: Topic, language: "en" | "hi" = "en"): string | null {
  if (!topic.youtubeLink) {
    return null
  }

  if (typeof topic.youtubeLink === "string") {
    return topic.youtubeLink
  }

  if (typeof topic.youtubeLink === "object") {
    return topic.youtubeLink[language] || topic.youtubeLink.en || null
  }

  return null
}

export function TopicSidebar({ topic, prevTopic, nextTopic }: TopicSidebarProps) {
  const [videoLanguage, setVideoLanguage] = useState<"en" | "hi">("en")

  const getDifficultyVariant = () => {
    if (topic.difficulty === "Easy") {
      return "default"
    }
    if (topic.difficulty === "Hard") {
      return "destructive"
    }
    return "secondary"
  }

  const youtubeLink = getYouTubeLink(topic, videoLanguage)
  const videoId = youtubeLink ? getYouTubeId(youtubeLink) : null
  const hasMultipleLanguages = typeof topic.youtubeLink === "object" &&
    topic.youtubeLink.en && topic.youtubeLink.hi

  return (
    <aside className="h-full w-full shrink-0 overflow-hidden border-l border-border/30 bg-background/95 backdrop-blur-sm">
      <div className="h-full overflow-y-auto px-5 py-6 space-y-8 custom-scrollbar">
        {/* Table of Contents - Top Priority */}
        <TableOfContents content={topic.content} />

        {/* Separator */}
        <div className="h-px bg-border/40 w-full" />
        {/* Topic Details Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Topic Details
            </h3>
          </div>

          <div className="space-y-3">
            {/* Difficulty */}
            <Card className="border-border/40 p-0 bg-background">
              <CardContent className="p-3">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  Difficulty
                </p>
                <Badge
                  variant={getDifficultyVariant()}
                  className="w-full justify-center py-2 text-sm font-bold"
                >
                  {topic.difficulty || "Medium"}
                </Badge>
              </CardContent>
            </Card>

            {/* Complexity */}
            {(topic.complexity?.time && topic.complexity.time !== "N/A") ||
              (topic.complexity?.space && topic.complexity.space !== "N/A") ? (
              <Card className="border-border/40 bg-background p-0">
                <CardContent className="p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    Complexity
                  </p>
                  <div className="space-y-2.5">
                    {topic.complexity?.time && topic.complexity.time !== "N/A" && (
                      <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-2.5">
                        <div className="shrink-0 rounded-md bg-primary/10 p-2">
                          <IconWrapper icon={ClockIcon} size={14} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground mb-0.5 uppercase tracking-wide">
                            Time
                          </p>
                          <p className="text-sm font-mono font-bold text-foreground">
                            {topic.complexity.time}
                          </p>
                        </div>
                      </div>
                    )}
                    {topic.complexity?.space && topic.complexity.space !== "N/A" && (
                      <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-2.5">
                        <div className="shrink-0 rounded-md bg-primary/10 p-2">
                          <IconWrapper icon={ComputerIcon} size={14} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground mb-0.5 uppercase tracking-wide">
                            Space
                          </p>
                          <p className="text-sm font-mono font-bold text-foreground">
                            {topic.complexity.space}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>

        {/* YouTube Video Section */}
        {videoId && (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Learn More
                </h3>
                {hasMultipleLanguages && (
                  <Tabs value={videoLanguage} onValueChange={(v) => setVideoLanguage(v as "en" | "hi")} className="w-auto">
                    <TabsList className="h-7 bg-muted/50">
                      <TabsTrigger value="en" className="text-[10px] px-2.5 py-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">EN</TabsTrigger>
                      <TabsTrigger value="hi" className="text-[10px] px-2.5 py-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">HI</TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              </div>
              <Card className="overflow-hidden border-border/40 bg-background p-0">
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <LiteYouTubeEmbed
                      id={videoId}
                      title={`${topic.title} Tutorial`}
                      wrapperClass="yt-lite"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Navigation Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Navigation
          </h3>

          <div className="space-y-2.5">
            {prevTopic && (
              <Card className="border-border/40 hover:border-primary/40 transition-all p-0 cursor-pointer group">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-0 hover:bg-transparent"
                  asChild
                >
                  <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
                    <CardContent className="p-3 w-full">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 rounded-md bg-muted/50 group-hover:bg-primary/10 p-2 transition-colors">
                          <IconWrapper
                            icon={ArrowLeft01Icon}
                            size={14}
                            className="text-muted-foreground group-hover:text-primary transition-colors"
                          />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground mb-0.5 uppercase tracking-wide">
                            Previous
                          </p>
                          <p className="text-sm font-bold truncate text-foreground leading-tight group-hover:text-primary transition-colors">
                            {prevTopic.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Button>
              </Card>
            )}

            {nextTopic && (
              <Card className="border-primary/30 p-0 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-0 hover:bg-transparent"
                  asChild
                >
                  <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
                    <CardContent className="p-3 w-full">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-xs font-semibold text-primary/80 mb-0.5 uppercase tracking-wide">
                            Next
                          </p>
                          <p className="text-sm font-bold truncate text-primary leading-tight">
                            {nextTopic.title}
                          </p>
                        </div>
                        <div className="shrink-0 rounded-md bg-primary/20 group-hover:bg-primary/30 p-2 transition-colors">
                          <IconWrapper
                            icon={ArrowRight01Icon}
                            size={14}
                            className="text-primary"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Button>
              </Card>
            )}

            {!prevTopic && !nextTopic && (
              <Card className="border-dashed border-border/40 bg-muted/30">
                <CardContent className="p-4 text-center">
                  <p className="text-xs font-medium text-muted-foreground">
                    No navigation available
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

