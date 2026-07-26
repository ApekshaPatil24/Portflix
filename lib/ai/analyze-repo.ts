import { env } from "process"

interface AIAnalysisResult {
  description: string
  techStack: string[]
}

export async function analyzeRepoWithAI(
  name: string,
  description: string | null,
  readmeContent: string | null,
  languages: string[] = []
): Promise<AIAnalysisResult> {
  const apiKey = env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. Please get a free key from Google AI Studio.")
  }

  const prompt = `
You are Curator AI, an expert developer portfolio assistant.
I am providing you with the name, short description, primary programming languages, and README content of a GitHub repository.
Your task is to analyze this repository and write a professional, compelling, and concise project description suitable for a portfolio.
Also, extract the main technologies used in this project into an array of strings. Do not guess randomly. Use the provided programming languages as a strong hint for the tech stack (e.g. Java means Spring/Backend, etc).

Repository Name: ${name}
Languages Detected: ${languages.length > 0 ? languages.join(", ") : "None detected"}
Description: ${description || "N/A"}
README Snippet (first 2000 chars): ${
    readmeContent ? readmeContent.substring(0, 2000) : "N/A"
  }

Respond ONLY with a valid JSON object in this exact format:
{
  "description": "A professional, 2-3 sentence description of the project...",
  "techStack": ["React", "TypeScript", "Node.js"]
}
`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        }
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Gemini API Error:", errorData)
      throw new Error("Failed to generate AI analysis")
    }

    const data = await response.json()
    const content = data.candidates[0].content.parts[0].text
    let cleanContent = content.trim()
    if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.replace(/^```(json)?\n?/, "").replace(/\n?```$/, "")
    }

    console.log("Curator AI Raw Output:", cleanContent)
    
    const parsed = JSON.parse(cleanContent) as AIAnalysisResult

    return parsed
  } catch (error) {
    console.error("AI Analysis failed:", error)
    // Fallback if AI fails
    return {
      description: description || "No description provided.",
      techStack: [],
    }
  }
}
