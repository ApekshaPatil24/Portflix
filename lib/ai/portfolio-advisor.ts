

export interface PortfolioAuditSuggestion {
  // Represents a single suggestion from Curator AI 2.0
  id: string
  type: string
  message: string
  canAutoFix: boolean
}

export async function analyzePortfolio(
  portfolio: any,
  projects: any[]
): Promise<PortfolioAuditSuggestion[]> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.")
  }

  const prompt = `
You are Curator AI, a world-class expert developer portfolio advisor.
I am providing you with the exact current state of a user's portfolio and their projects.
Your task is to analyze it like a real human recruiter and suggest brilliant improvements to make it a perfect, world-class portfolio.

Portfolio State:
Display Name: ${portfolio.displayName || "N/A"}
Professional Title: ${portfolio.professionalTitle || "N/A"}
Headline: ${portfolio.headline || "N/A"}
About Me: ${portfolio.about || "N/A"}
Location: ${portfolio.location || "N/A"}
Skills: ${portfolio.skills?.length > 0 ? portfolio.skills.join(", ") : "N/A"}
GitHub: ${portfolio.githubUrl || "N/A"}
LinkedIn: ${portfolio.linkedinUrl || "N/A"}
Twitter: ${portfolio.twitterUrl || "N/A"}
Number of Projects: ${projects.length}

Instructions:
1. Act like a real AI. Analyze the data deeply.
2. YOU MUST ALWAYS PROVIDE AT LEAST 3 SUGGESTIONS. Even if the portfolio seems perfect, find something to improve (e.g. suggesting adding a Twitter link, adding more skills, making the Headline punchier).
3. If a section is filled out but is unprofessional (like "Hellooooooo" for About Me, or "SDE 3" for headline), suggest rewriting it professionally!
4. If they are missing important contact details (like LinkedIn or Twitter), suggest adding them.
5. If their skills list is weak or missing, suggest generating a strong one based on their projects.

For any suggestion where you can generate the text yourself (like 'about', 'headline', 'professionalTitle', 'skills'), set "canAutoFix" to true and "type" to that exact field name.
For things you CANNOT generate yourself (like a LinkedIn URL or a real-world location), set "canAutoFix" to false.

Respond ONLY with a valid JSON array matching this exact schema:
[
  {
    "id": "unique_string_id",
    "type": "field_name_like_about_or_skills",
    "message": "The suggestion text to show the user.",
    "canAutoFix": true_or_false
  }
]
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
          temperature: 0.2,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data = await response.json()
    const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!textResult) {
      throw new Error("No text returned from Gemini API")
    }

    const cleanJson = textResult.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const suggestions = JSON.parse(cleanJson)
    return suggestions

  } catch (error) {
    console.error("Curator AI Audit Error:", error)
    return []
  }
}

export async function generatePortfolioSection(
  sectionType: string,
  portfolio: any,
  projects: any[]
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.")
  }

  const projectContext = projects.map(p => `Project: ${p.title}\nDescription: ${p.description}\nStack: ${p.techStack.join(", ")}`).join("\n\n")

  let systemPrompt = ""

  if (sectionType === "about") {
    systemPrompt = `Write a professional, compelling 2-paragraph "About Me" summary for this developer based heavily on the tech stacks and descriptions of their projects below. Speak in the first person ("I am a..."). Do not sound like a robot.`
  } else if (sectionType === "headline") {
    systemPrompt = `Write a short, punchy, one-sentence professional headline for this developer based on their projects (e.g. "Building scalable systems and dynamic web experiences").`
  } else if (sectionType === "professionalTitle") {
    systemPrompt = `Suggest a 2-4 word professional title based on their projects (e.g. "Full Stack Engineer" or "React Developer"). Respond with ONLY the title.`
  } else if (sectionType === "skills") {
    systemPrompt = `Extract a list of the top 5-10 core skills/technologies this developer uses based on their projects. Return a comma-separated list of ONLY the skill names (e.g. "React, Node.js, TypeScript").`
  } else {
    throw new Error("Unsupported section type for auto-fix")
  }

  const prompt = `
You are Curator AI, an expert developer portfolio advisor.
Task: ${systemPrompt}

User Name: ${portfolio.displayName || "A developer"}
Current Title: ${portfolio.professionalTitle || "N/A"}

User's Projects:
${projectContext || "No projects provided. Just write a generic, highly professional summary."}

Respond ONLY with the raw generated text. No formatting, no quotes.
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
          temperature: 0.7,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data = await response.json()
    const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!textResult) {
      throw new Error("No text returned from Gemini API")
    }

    return textResult.trim()

  } catch (error) {
    console.error("Curator AI Auto-Fix Error:", error)
    throw error
  }
}
