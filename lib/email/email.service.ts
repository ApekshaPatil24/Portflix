import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendNotificationEmail({ to, subject, html }: EmailOptions) {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || "Portflix Alerts <noreply@portflix.dev>"

  // If SMTP configurations are active, send actual email
  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
          user,
          pass,
        },
      })

      const info = await transporter.sendMail({
        from,
        to,
        subject,
        html,
      })

      console.log(`[SMTP_EMAIL_SENT] Message ID: ${info.messageId}`)
      return { sent: true, provider: "smtp", messageId: info.messageId }
    } catch (err) {
      console.error("[SMTP_EMAIL_ERROR] Failed to send email via SMTP:", err)
    }
  }

  // Local development fallback: Output to terminal console in a beautiful frame
  const plainTextSubject = subject.toUpperCase()
  const border = "═".repeat(60)
  
  console.log(`
╔${border}╗
║                DEVELOPMENT EMAIL LOGGER MOCK                 ║
╠${border}╣
║ TO:      ${to.padEnd(50)} ║
║ FROM:    ${from.padEnd(50)} ║
║ SUBJECT: ${plainTextSubject.padEnd(50)} ║
╠${border}╣
║ HTML CONTENT PREVIEW:                                        ║
║                                                              ║
${html
  .split("\n")
  .map(line => `║ ${line.trim().slice(0, 56).padEnd(56)} ║`)
  .join("\n")}
╚${border}╝
`)

  return { sent: true, provider: "console" }
}
