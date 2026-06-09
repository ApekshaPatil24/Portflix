import crypto from "crypto"

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY!

if (
  !ENCRYPTION_KEY ||
  ENCRYPTION_KEY.length !== 32
) {
  throw new Error(
    "ENCRYPTION_KEY must be exactly 32 characters"
  )
}

const IV_LENGTH = 16

export function encrypt(
  text: string
) {
  const iv =
    crypto.randomBytes(IV_LENGTH)

  const cipher =
    crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    )

  let encrypted =
    cipher.update(
      text,
      "utf8",
      "hex"
    )

  encrypted += cipher.final("hex")

  return (
    iv.toString("hex") +
    ":" +
    encrypted
  )
}

export function decrypt(
  encryptedText: string
) {
  const parts =
    encryptedText.split(":")

  const iv = Buffer.from(
    parts.shift()!,
    "hex"
  )

  const encrypted =
    parts.join(":")

  const decipher =
    crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    )

  let decrypted =
    decipher.update(
      encrypted,
      "hex",
      "utf8"
    )

  decrypted += decipher.final(
    "utf8"
  )

  return decrypted
}