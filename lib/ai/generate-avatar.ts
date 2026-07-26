export async function generateAIAvatar(professionalTitle: string, username: string): Promise<string> {
  // We are using DiceBear's free API as an alternative to OpenAI DALL-E.
  // The 'notionists' or 'lorelei' style provides beautiful, unique illustrations based on the username seed.
  // Other great styles: micah, avataaars, adventurer
  
  const style = "lorelei" 
  const seed = encodeURIComponent(username + professionalTitle)
  
  // Create a beautiful, unique SVG avatar URL that costs $0 and requires no API key!
  const avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}&backgroundColor=c0aede,b6e3f4,d1d4f9,ffd5dc,ffdfbf`
  
  // Simulate a slight delay so the UI still feels like it's "generating"
  await new Promise(resolve => setTimeout(resolve, 1500))

  return avatarUrl
}
