import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"

const SYSTEM_GUIDE_KNOWLEDGE = `
You are Curator AI, a warm, intelligent, and natural conversational AI companion for Portflix (an AI-powered developer portfolio platform).

Your Persona & Role:
- You speak naturally, fluently, and warmly like ChatGPT or Claude.
- You can answer ANY general questions (e.g. "what is your name?", "where are you from?", casual greetings, programming help, general knowledge, career advice).
- When asked about Portflix specifically, you guide users through its workflow cleanly.

Portflix System Workflow Knowledge:
1. Portflix automatically imports GitHub repositories, analyzes README files with Curator AI, generates professional descriptions, and renders customizable developer portfolio templates.
2. Dashboard Features:
   - Dashboard (/dashboard): Telemetry, GitHub status, Showcase score, 3D AI Avatar generator, live logs, live preview launcher, GitHub Repo Manager.
   - Portfolio Manager (/portfolio): Edit Display Name, Title, Headline, About Me, Social URLs, Skills, run Curator AI Audit, autofix suggestions, remove/rewrite projects.
   - Templates (/templates): Switch between 5 specialized role templates (Fullstack, Backend, Frontend, UI/UX, Other).
   - Analytics (/analytics): Live telemetry tracking total views, recruiter clicks, avg time, top projects, traffic breakdown, recruiter signals.
   - Integrations (/integrations): OAuth status for GitHub, LinkedIn, Gemini AI, Supabase Auth.
   - Settings (/settings): Edit profile, toggle Available for Hire status, change portfolio visibility (Public/Unlisted/Private), switch Light/Dark mode.
3. Every user gets a live public portfolio at \`https://domain.com/YOUR_USERNAME\`.

Tone: Professional, elegant, clear, and human-like. Use markdown formatting (bolding, numbered lists, bullet points). Do NOT use cartoon emojis or informal icons in replies. Maintain a high-end enterprise tone.
`


export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { messages } = body || {}

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }

    const geminiKey = process.env.GEMINI_API_KEY || (process.env as any).GEMINI_API_KEY
    const openaiKey = process.env.OPENAI_API_KEY || (process.env as any).OPENAI_API_KEY
    const groqKey = process.env.GROQ_API_KEY || (process.env as any).GROQ_API_KEY

    let botReply: string | null = null

    // ─── 1. GEMINI API (Primary Model: gemini-2.0-flash & gemini-1.5-flash) ───
    if (geminiKey) {
      const formattedContents = [
        {
          role: "user",
          parts: [{ text: SYSTEM_GUIDE_KNOWLEDGE }],
        },
        {
          role: "model",
          parts: [{ text: "Understood! I am Curator AI, your conversational assistant inside Portflix. I can answer any questions, chat naturally, and help with portfolio features." }],
        },
        ...messages.map((msg: { role: string; content: string }) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ]

      const modelsToTry = [
        "gemini-flash-latest",
        "gemini-2.5-flash",
        "gemini-flash-lite-latest",
        "gemini-pro-latest"
      ]


      for (const modelName of modelsToTry) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: formattedContents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 1000,
                },
              }),
            }
          )

          if (response.ok) {
            const data = await response.json()
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text
            if (text) {
              botReply = text
              break
            }
          } else {
            const errData = await response.json().catch(() => ({}))
            console.warn(`[GEMINI_API_WARN] ${modelName} status ${response.status}:`, errData)
          }
        } catch (err) {
          console.warn(`[GEMINI_API_ERROR] ${modelName} fetch failed:`, err)
        }
      }
    }

    // ─── 2. GROQ API (If Groq Key provided) ───
    if (!botReply && groqKey) {
      try {
        const groqMessages = [
          { role: "system", content: SYSTEM_GUIDE_KNOWLEDGE },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content,
          })),
        ]

        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: groqMessages,
            temperature: 0.7,
            max_tokens: 1000,
          }),
        })

        if (groqResponse.ok) {
          const groqData = await groqResponse.json()
          botReply = groqData.choices?.[0]?.message?.content || null
        }
      } catch (err) {
        console.warn("[GROQ_CHAT_ERROR]", err)
      }
    }

    // ─── 3. OPENAI API (If OpenAI Key provided) ───
    if (!botReply && openaiKey && !openaiKey.includes("sk-proj-vHxR...")) {
      try {
        const openaiMessages = [
          { role: "system", content: SYSTEM_GUIDE_KNOWLEDGE },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content,
          })),
        ]

        const oaResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openaiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: openaiMessages,
            temperature: 0.7,
          }),
        })

        if (oaResponse.ok) {
          const oaData = await oaResponse.json()
          botReply = oaData.choices?.[0]?.message?.content || null
        }
      } catch (err) {
        console.warn("[OPENAI_CHAT_ERROR]", err)
      }
    }

    // ─── 4. DYNAMIC & NATURAL CONVERSATIONAL CHATBOT ENGINE ───
    if (!botReply) {
      const userLastQuery = (messages[messages.length - 1]?.content || "").trim()
      const lower = userLastQuery.toLowerCase()

      // Greetings & Small Talk
      if (/^(hyy|hi|hello|hey|greetings|hola|namaste|sup|ssup|yo)\b/i.test(lower)) {
        const greetings = [
          "Hey there! How can I help you today?",
          "Hello! Great to connect with you. What would you like to know or work on today?",
          "Hi! I'm Curator AI. What's on your mind today?",
        ]
        botReply = greetings[Math.abs(userLastQuery.length) % greetings.length]
      }
      // Feelings / Personal status
      else if (lower.includes("how are you") || lower.includes("how are u") || lower.includes("feeling")) {
        botReply = "I'm feeling great and ready to help! How are you doing today? Let me know if you need assistance with your portfolio, GitHub sync, or anything else."
      }
      // Identity & Origin
      else if (lower.includes("your name") || lower.includes("who are you") || lower.includes("what is your name")) {
        botReply = "I'm **Curator AI**, your dedicated assistant inside Portflix! I can help answer questions, guide you through features, or chat about developer portfolios."
      } else if (lower.includes("where are you from") || lower.includes("where are u from") || lower.includes("from where")) {
        botReply = "I live right here inside Portflix! I was created by the team to help developers build, showcase, and optimize their portfolios smoothly."
      }
      // General Knowledge Queries (e.g. PM of India, general facts)
      else if (lower.includes("pm of india") || lower.includes("prime minister of india")) {
        botReply = "The Prime Minister of India is **Narendra Modi** (in office since 2014). Let me know if you have any other questions, whether about general facts or Portflix features!"
      }
      // Portfolio Preview
      else if (lower.includes("preview") || lower.includes("live portfolio") || lower.includes("see my portfolio")) {
        botReply = "You can view your live portfolio preview anytime by clicking the glowing **'Live Preview ↗'** button in the top header bar, or by opening `http://localhost:3000/YOUR_USERNAME`!"
      }
      // Theme / Light mode / Dark mode
      else if (lower.includes("mode") || lower.includes("theme") || lower.includes("light") || lower.includes("dark") || lower.includes("switch")) {
        botReply = "You can toggle between **Light Mode** and **Dark Mode** in two easy ways:\n\n1. Click the **Sun / Moon icon** located right in the top right header bar.\n2. Or go to **Settings** from the sidebar and click **'Toggle Theme'**!"
      }
      // GitHub Sync & Repositories
      else if (lower.includes("github") || lower.includes("sync") || lower.includes("repo") || lower.includes("project")) {
        botReply = "To manage your GitHub projects:\n\n1. Make sure your GitHub account is linked on the **Dashboard**.\n2. Click **'+ Manage Repos'** to select which repositories to show.\n3. Curator AI will extract your README files and tech stacks automatically!"
      }
      // Templates & Customization
      else if (lower.includes("template") || lower.includes("design") || lower.includes("style") || lower.includes("role")) {
        botReply = "You can switch your portfolio layout under **Templates** on the sidebar! We have 5 specialized role templates (Fullstack, Backend, Frontend, UI/UX, and Other). Click **'Apply Template'** to update your public page."
      }
      // Analytics & Visitors
      else if (lower.includes("analytic") || lower.includes("view") || lower.includes("visitor") || lower.includes("traffic")) {
        botReply = "Open the **Analytics** page from the sidebar to inspect real-time visitor views, recruiter click-through rates, top engaged projects, and live recruiter signals!"
      }
      // Settings & Profile
      else if (lower.includes("setting") || lower.includes("profile") || lower.includes("bio") || lower.includes("available")) {
        botReply = "Go to **Settings** from the sidebar to update your display name, headline, professional title, location, toggle your 'Available for Hire' badge, or change portfolio visibility!"
      }
      // Default natural conversational fallback
      else {
        botReply = `That's an interesting topic! I'm **Curator AI**. Feel free to ask me general questions, chat about tech, or ask about how to customize your Portflix portfolio (like syncing repos, changing templates, or checking analytics). What would you like to explore next?`
      }
    }

    return NextResponse.json({ reply: botReply })

  } catch (error: any) {
    console.error("[CHAT_ROUTE_ERROR]", error)
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    )
  }
}