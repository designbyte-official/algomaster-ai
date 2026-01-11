"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ListIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface TableOfContentsProps {
  content: string
  containerId?: string
}

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents({ content, containerId = "main-scroll-area" }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings from markdown content
  useEffect(() => {
    const lines = content.split("\n")
    const extractedHeadings: Heading[] = []
    
    // Simple regex to match markdown headings # and ## (h2 and h3)
    // We skip h1 as it's the title
    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        const text = match[2].trim()
        // Match github-slugger logic (used by rehype-slug)
        const id = text
          .toLowerCase()
          .trim()
          .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
          .replace(/\s/g, '-')
        
        extractedHeadings.push({ id, text, level })
      }
    })

    setHeadings(extractedHeadings)
  }, [content])

  // Retry logic to find elements after hydration/rendering
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
        // Trigger re-render to attach observers once DOM is likely ready
        setMounted(true) 
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Scroll Spy Logic
  useEffect(() => {
    if (!containerId) return

    const container = document.getElementById(containerId)
    if (!container) return

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
          
          // Optional: Update URL hash without jumping
          // Using history.replaceState to avoid polluting history
          if (window.history.replaceState) {
             window.history.replaceState(null, "", `#${entry.target.id}`)
          }
        }
      })
    }

    const observerOptions = {
      root: container,
      // Trigger when the element is in the top 50% of the viewport.
      // 0px top margin means it starts tracking as soon as it enters.
      // -50% bottom means we stop tracking it when it's in the bottom half? No.
      // Logic: -10% from top, -40% from bottom. "Active" zone is near top.
      rootMargin: "-10% 0px -40% 0px", 
      threshold: 0
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Track all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings, containerId])

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(id)
    const container = document.getElementById(containerId)
    
    if (element && container) {
      // Manual smooth scroll inside container
      const topPos = element.offsetTop - 24 // 24px padding top
      container.scrollTo({ top: topPos, behavior: "smooth" })
      
      // Update active state immediately for response
      setActiveId(id)
      window.history.replaceState(null, "", `#${id}`)
    }
  }

  if (headings.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <ListIcon size={14} />
        <h3 className="text-xs font-bold uppercase tracking-widest">
          On This Page
        </h3>
      </div>
      
      <div className="relative border-l border-border/40 pl-3">
        {/* Active Indicator Line (Optional visual detail) */}
       
        <ul className="space-y-2.5 text-sm">
          {headings.map(({ id, text, level }) => (
            <li key={id} style={{ paddingLeft: level === 3 ? "12px" : "0px" }}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(id, e)}
                className={cn(
                  "block transition-all duration-200 hover:text-primary leading-tight line-clamp-2 cursor-pointer",
                  activeId === id 
                    ? "font-bold text-primary translate-x-1" 
                    : "text-muted-foreground font-medium"
                )}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
