"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { pistonExecutor } from "@/services/code-execution/piston-executor"
import { PlayIcon } from "@/lib/icons"
import { ArrowPathIcon } from "@heroicons/react/24/solid"
import {
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
  Cog6ToothIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline"
import Editor, { OnMount, loader } from "@monaco-editor/react"

// Configure Monaco to load from CDN
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs'
  }
})

import { SupportedLanguage, Topic } from "@/types/curriculum"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IconWrapper } from "@/components/common/icon-wrapper"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface CodePlaygroundProps {
  topic?: Topic
  initialCode?: Record<SupportedLanguage, string>
  onToggleSidebar?: () => void
  isSidebarOpen?: boolean
}

const LANGUAGES: { value: SupportedLanguage; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
]

// Code templates for quick insertion
const CODE_TEMPLATES: Record<SupportedLanguage, { label: string; code: string }[]> = {
  javascript: [
    {
      label: "Array Loop",
      code: "for (let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}"
    },
    {
      label: "Function",
      code: "function myFunction(param) {\n  // Your code here\n  return param;\n}"
    },
    {
      label: "Promise",
      code: "const myPromise = new Promise((resolve, reject) => {\n  // Your code here\n  resolve(result);\n});"
    },
  ],
  python: [
    {
      label: "For Loop",
      code: "for i in range(n):\n    print(i)"
    },
    {
      label: "Function",
      code: "def my_function(param):\n    # Your code here\n    return param"
    },
    {
      label: "List Comprehension",
      code: "result = [x for x in range(n) if x % 2 == 0]"
    },
  ],
  cpp: [
    {
      label: "For Loop",
      code: "for (int i = 0; i < n; i++) {\n    cout << i << endl;\n}"
    },
    {
      label: "Function",
      code: "int myFunction(int param) {\n    // Your code here\n    return param;\n}"
    },
    {
      label: "Vector Loop",
      code: "for (auto& item : vec) {\n    cout << item << endl;\n}"
    },
  ],
  java: [
    {
      label: "For Loop",
      code: "for (int i = 0; i < n; i++) {\n    System.out.println(i);\n}"
    },
    {
      label: "Method",
      code: "public static int myMethod(int param) {\n    // Your code here\n    return param;\n}"
    },
    {
      label: "Enhanced For",
      code: "for (int item : array) {\n    System.out.println(item);\n}"
    },
  ],
}

export function CodePlayground({
  topic,
  initialCode,
  onToggleSidebar,
  isSidebarOpen = true,
}: CodePlaygroundProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("javascript")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState<string>("")
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState<
    "idle" | "running" | "success" | "error" | "timeout"
  >("idle")
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [editorError, setEditorError] = useState<string | null>(null)
  const [editorLoadTimeout, setEditorLoadTimeout] = useState(false)
  const [editorKey, setEditorKey] = useState(0)

  // Editor preferences
  const [fontSize, setFontSize] = useState(14)
  const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">("vs-dark")
  const [autoSave, setAutoSave] = useState(true)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showStdinInput, setShowStdinInput] = useState(false)
  const [stdinValue, setStdinValue] = useState("")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Load preferences from localStorage
  useEffect(() => {
    const savedPrefs = localStorage.getItem("editorPreferences")
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs)
        if (prefs.fontSize) setFontSize(prefs.fontSize)
        if (prefs.theme) setEditorTheme(prefs.theme)
        if (typeof prefs.autoSave === "boolean") setAutoSave(prefs.autoSave)
      } catch (e) {
        console.error("Failed to load editor preferences", e)
      }
    }
  }, [])

  // Save preferences to localStorage
  useEffect(() => {
    const prefs = {
      fontSize,
      theme: editorTheme,
      autoSave,
    }
    localStorage.setItem("editorPreferences", JSON.stringify(prefs))
  }, [fontSize, editorTheme, autoSave])

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !topic) return

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }

    autoSaveTimerRef.current = setTimeout(() => {
      const saveKey = `code_${topic.id}_${language}`
      localStorage.setItem(saveKey, code)
    }, 2000) // Save after 2 seconds of inactivity

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }
    }
  }, [code, language, topic, autoSave])

  // Add timeout for editor loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isEditorReady && !editorError) {
        setEditorLoadTimeout(true)
        setEditorError("Editor is taking too long to load. Please try refreshing or retry.")
      }
    }, 30000) // 30 second timeout for initial editor load

    return () => clearTimeout(timeout)
  }, [isEditorReady, editorError])

  // Reset editor state when retrying
  const handleRetryEditor = useCallback(() => {
    setEditorError(null)
    setEditorLoadTimeout(false)
    setIsEditorReady(false)
    setEditorKey((prev) => prev + 1) // Force remount
  }, [])

  // Memoize starter code calculation
  const starterCode = useMemo(() => {
    // Try to load saved code first
    if (topic && autoSave) {
      const saveKey = `code_${topic.id}_${language}`
      const savedCode = localStorage.getItem(saveKey)
      if (savedCode) return savedCode
    }

    return (
      initialCode?.[language] ||
      topic?.starterCode?.[language] ||
      getDefaultStarterCode(language)
    )
  }, [initialCode, topic, language, autoSave])

  useEffect(() => {
    // Reset code when topic, language, or initialCode changes
    setCode(starterCode)
    if (editorRef.current) {
      editorRef.current.setValue(starterCode)
    }
    setOutput("")
    setStatus("idle")
    setExecutionTime(null)
  }, [starterCode])

  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    try {
      editorRef.current = editor
      setIsEditorReady(true)
      setEditorError(null)
      setEditorLoadTimeout(false)

      if (monaco) {
        monaco.editor.setTheme(editorTheme)
      }

      // Set initial code if editor is ready
      if (editor && starterCode) {
        editor.setValue(starterCode)
        setCode(starterCode)
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Monaco editor initialization error:", error)
      }
      const errorMessage = error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : "Failed to initialize editor"
      setEditorError(errorMessage)
      setIsEditorReady(false)
    }
  }, [starterCode, editorTheme])

  const handleEditorWillMount = () => {
    setIsEditorReady(false)
    setEditorError(null)
  }

  const handleRun = useCallback(async () => {
    // Get latest code from state or editor
    const currentCode = editorRef.current ? editorRef.current.getValue() : code

    setIsRunning(true)
    setStatus("running")
    setOutput("Running...")
    setExecutionTime(null)

    try {
      // Use unified Piston executor for all languages
      const result = await pistonExecutor.execute(currentCode, language)

      setOutput(result.output || "(No output)")
      setExecutionTime(result.executionTime || null)

      if (result.error) {
        setOutput((prev) => prev + "\n\nError:\n" + result.error)
        setStatus("error")
      } else {
        setStatus(result.status)
      }
    } catch (e) {
      const errorMessage = e instanceof Error
        ? e.message
        : typeof e === 'string'
          ? e
          : String(e)
      setOutput(`Error: ${errorMessage}`)
      setStatus("error")
    } finally {
      setIsRunning(false)
    }
  }, [code, language])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter to run
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault()
        handleRun()
      }
      // Ctrl/Cmd + K to clear console
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setOutput("")
        setStatus("idle")
        setExecutionTime(null)
      }
      // Ctrl/Cmd + R to reset code
      if ((e.ctrlKey || e.metaKey) && e.key === "r") {
        e.preventDefault()
        handleResetCode()
      }
      // F11 to toggle fullscreen
      if (e.key === "F11") {
        e.preventDefault()
        setIsFullscreen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleRun])

  const handleResetCode = useCallback(() => {
    const defaultCode = initialCode?.[language] || topic?.starterCode?.[language] || getDefaultStarterCode(language)
    setCode(defaultCode)
    if (editorRef.current) {
      editorRef.current.setValue(defaultCode)
    }
    // Clear saved code
    if (topic) {
      const saveKey = `code_${topic.id}_${language}`
      localStorage.removeItem(saveKey)
    }
  }, [language, initialCode, topic])

  const handleCopyCode = useCallback(async () => {
    const currentCode = editorRef.current ? editorRef.current.getValue() : code
    try {
      await navigator.clipboard.writeText(currentCode)
      // Could add a toast notification here
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }, [code])

  const handleDownloadCode = useCallback(() => {
    const currentCode = editorRef.current ? editorRef.current.getValue() : code
    const extension = language === "cpp" ? "cpp" : language === "python" ? "py" : language === "java" ? "java" : "js"
    const filename = `code.${extension}`

    const blob = new Blob([currentCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [code, language])

  const handleClearConsole = useCallback(() => {
    setOutput("")
    setStatus("idle")
    setExecutionTime(null)
  }, [])

  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => Math.min(prev + 2, 24))
  }, [])

  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => Math.max(prev - 2, 10))
  }, [])

  const insertTemplate = useCallback((templateCode: string) => {
    if (editorRef.current) {
      const editor = editorRef.current
      const selection = editor.getSelection()
      const id = { major: 1, minor: 1 }
      const op = {
        identifier: id,
        range: selection,
        text: templateCode,
        forceMoveMarkers: true
      }
      editor.executeEdits("insert-template", [op])
      editor.focus()
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev)
    if (onToggleSidebar && !isFullscreen) {
      // Collapse sidebar when entering fullscreen
      onToggleSidebar()
    }
  }, [isFullscreen, onToggleSidebar])

  return (
    <div className={cn(
      "bg-card flex h-full min-h-[600px] flex-col overflow-hidden",
      isFullscreen && "fixed inset-0 z-50"
    )}>
      {/* Toolbar */}
      <div className="bg-muted/30 flex items-center justify-between border-b p-3.5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          {onToggleSidebar && !isFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-9 w-9"
              onClick={onToggleSidebar}
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
            </Button>
          )}

          <div className="bg-border/60 hidden h-4 w-px sm:block"></div>

          <Select
            value={language}
            onValueChange={(v) => setLanguage(v as SupportedLanguage)}
          >
            <SelectTrigger className="bg-background border-border/60 h-9 w-[140px] text-xs font-semibold">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  className="text-xs"
                >
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="bg-border/60 h-4 w-px"></div>

          <span className="text-muted-foreground text-xs font-medium">
            main.
            {language === "cpp"
              ? "cpp"
              : language === "python"
                ? "py"
                : language === "java"
                  ? "java"
                  : "js"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Code Templates Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-9 w-9"
                title="Code Templates"
              >
                <CodeBracketIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Code Templates</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CODE_TEMPLATES[language].map((template, idx) => (
                <DropdownMenuItem
                  key={idx}
                  onClick={() => insertTemplate(template.code)}
                >
                  {template.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-9 w-9"
                title="Settings"
              >
                <Cog6ToothIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Editor Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="px-2 py-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Font Size</span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={decreaseFontSize}
                    >
                      <MinusIcon className="h-3 w-3" />
                    </Button>
                    <span className="text-xs font-mono w-8 text-center">{fontSize}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={increaseFontSize}
                    >
                      <PlusIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                checked={editorTheme === "vs-dark"}
                onCheckedChange={(checked) => {
                  const newTheme = checked ? "vs-dark" : "light"
                  setEditorTheme(newTheme)

                }}
              >
                Dark Theme
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={autoSave}
                onCheckedChange={setAutoSave}
              >
                Auto-save
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={showStdinInput}
                onCheckedChange={setShowStdinInput}
              >
                Show Input (stdin)
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reset Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-9 w-9"
            onClick={handleResetCode}
            title="Reset Code (Ctrl+R)"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </Button>

          {/* Copy Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-9 w-9"
            onClick={handleCopyCode}
            title="Copy Code"
          >
            <ClipboardDocumentIcon className="h-5 w-5" />
          </Button>

          {/* Download Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-9 w-9"
            onClick={handleDownloadCode}
            title="Download Code"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-9 w-9"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen (F11)" : "Fullscreen (F11)"}
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="h-5 w-5" />
            ) : (
              <ArrowsPointingOutIcon className="h-5 w-5" />
            )}
          </Button>

          <div className="bg-border/60 h-4 w-px"></div>

          {/* Run Button */}
          <Button
            size="sm"
            className={cn(
              "h-9 gap-2 px-4 font-semibold transition-all",
              status === "success" &&
              "bg-emerald-600 text-white hover:bg-emerald-700",
              status === "error" &&
              "bg-destructive hover:bg-destructive/90 text-white"
            )}
            onClick={handleRun}
            disabled={isRunning}
            aria-label={isRunning ? "Code is running" : "Run code (Ctrl+Enter)"}
            aria-busy={isRunning}
            title="Run Code (Ctrl+Enter)"
          >
            {isRunning ? (
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
            ) : (
              <IconWrapper icon={PlayIcon} size={16} />
            )}
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-[#1e1e1e]">
        <ResizablePanelGroup direction="vertical">
          {/* Top Panel: Editor */}
          <ResizablePanel defaultSize={70} minSize={30}>
            <div className="relative h-full w-full">
              {editorError || editorLoadTimeout ? (
                <div
                  className="flex h-full items-center justify-center bg-[#1e1e1e] p-8"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="text-center space-y-3">
                    <p className="text-red-400 font-semibold">Editor Error</p>
                    <p className="text-zinc-400 text-sm" aria-label="Error message">
                      {editorError || "Editor failed to load"}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditorError(null)
                          setEditorLoadTimeout(false)
                          setIsEditorReady(false)
                          // Force remount by changing key
                          window.location.reload()
                        }}
                      >
                        Reload Page
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRetryEditor}
                      >
                        Retry
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Editor
                  key={`editor-${language}-${editorKey}`}
                  height="100%"
                  defaultLanguage={language === "cpp" ? "cpp" : language}
                  language={language === "cpp" ? "cpp" : language}
                  theme={editorTheme}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  onMount={handleEditorDidMount}
                  beforeMount={handleEditorWillMount}
                  loading={
                    <div className="flex h-full items-center justify-center bg-[#1e1e1e]">
                      <div className="text-center space-y-3">
                        <ArrowPathIcon className="h-8 w-8 animate-spin text-primary mx-auto" />
                        <div className="space-y-1">
                          <p className="text-zinc-300 text-sm font-medium">Loading editor...</p>
                          <p className="text-zinc-500 text-xs">Initializing Monaco Editor</p>
                        </div>
                      </div>
                    </div>
                  }
                  options={{
                    minimap: { enabled: false },
                    fontSize: fontSize,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontLigatures: true,
                  }}
                />
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-white/10" />

          {/* Bottom Panel: Console */}
          <ResizablePanel defaultSize={30} minSize={10}>
            <div className="flex h-full flex-col bg-[#1e1e1e]">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
                    Console Output
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-zinc-400 hover:text-zinc-200"
                    onClick={handleClearConsole}
                    title="Clear Console (Ctrl+K)"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  {executionTime !== null && (
                    <span className="font-mono text-[10px] text-zinc-400">
                      ⏱ {executionTime.toFixed(0)}ms
                    </span>
                  )}
                  {status === "success" && (
                    <span className="font-mono text-[10px] text-emerald-400">
                      ✓ Exit Code: 0
                    </span>
                  )}
                  {status === "error" && (
                    <span className="font-mono text-[10px] text-red-400">
                      ✗ Exit Code: 1
                    </span>
                  )}
                </div>
              </div>

              {/* Stdin Input (optional) */}
              {showStdinInput && (
                <div className="border-b border-white/10 bg-white/5 p-3">
                  <label className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase mb-1.5 block">
                    Input (stdin)
                  </label>
                  <Textarea
                    value={stdinValue}
                    onChange={(e) => setStdinValue(e.target.value)}
                    placeholder="Enter input for your program..."
                    className="min-h-[60px] bg-[#1e1e1e] border-white/20 text-zinc-300 text-xs font-mono resize-none"
                  />
                </div>
              )}

              <div className="flex-1 overflow-auto p-0 font-mono text-sm">
                <Tabs defaultValue="output" className="h-full flex flex-col">
                  <div className="px-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <TabsList className="bg-transparent h-10 border-none p-0">
                      <TabsTrigger 
                        value="output" 
                        className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-10 px-4 text-[11px] font-bold uppercase tracking-wider"
                      >
                        Output
                      </TabsTrigger>
                      {topic?.practiceProblems?.[0]?.testCases && (
                        <TabsTrigger 
                          value="tests" 
                          className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-10 px-4 text-[11px] font-bold uppercase tracking-wider"
                        >
                          Test Cases
                        </TabsTrigger>
                      )}
                    </TabsList>
                  </div>

                  <TabsContent value="output" className="flex-1 m-0 p-5 overflow-auto custom-scrollbar">
                    {output ? (
                      <pre
                        className={cn(
                          "leading-relaxed whitespace-pre-wrap",
                          status === "error" ? "text-red-400" : "text-zinc-300"
                        )}
                      >
                        {output}
                      </pre>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center space-y-2 text-zinc-600 opacity-50">
                        <IconWrapper icon={PlayIcon} size={32} />
                        <span className="text-xs">Run code to see output</span>
                        <span className="text-[10px] text-zinc-700">Ctrl+Enter to run</span>
                      </div>
                    )}
                  </TabsContent>

                  {topic?.practiceProblems?.[0]?.testCases && (
                    <TabsContent value="tests" className="flex-1 m-0 p-4 overflow-auto custom-scrollbar">
                      <div className="space-y-4">
                        {topic.practiceProblems[0].testCases.map((tc: { input: any; expectedOutput: any; explanation?: string }, idx: number) => (
                           <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">Test Case {idx + 1}</span>
                                <Badge variant="outline" className="text-[10px] bg-zinc-800 text-zinc-400 border-zinc-700">
                                  Not Run
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-[10px] text-zinc-500 uppercase mb-1">Input</p>
                                  <pre className="bg-black/20 p-2 rounded text-xs text-zinc-300">{JSON.stringify(tc.input, null, 2)}</pre>
                                </div>
                                <div>
                                  <p className="text-[10px] text-zinc-500 uppercase mb-1">Expected</p>
                                  <pre className="bg-black/20 p-2 rounded text-xs text-zinc-300">{JSON.stringify(tc.expectedOutput, null, 2)}</pre>
                                </div>
                              </div>
                           </div>
                        ))}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

function getDefaultStarterCode(lang: SupportedLanguage): string {
  switch (lang) {
    case "javascript":
      return `// Common libraries available (Node.js environment)
// const assert = require('assert');
// const fs = require('fs');

console.log('Hello from JavaScript!');`
    case "python":
      return `# Common libraries available
# import sys
# import math
# import collections
# from typing import List, Dict, Set

print('Hello from Python!')`
    case "cpp":
      return `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    return 0;
}`
    case "java":
      return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}`
    default:
      return ""
  }
}
