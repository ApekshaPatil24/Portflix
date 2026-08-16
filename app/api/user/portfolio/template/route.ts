import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { TEMPLATES } from "@/lib/templates/registry"

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { templateKey } = body

    const validKey = TEMPLATES.find(t => t.key === templateKey)
    if (!validKey) {
      return NextResponse.json({ error: "Invalid template key" }, { status: 400 })
    }

    // Only update templateKey — all other data is untouched
    const updated = await prisma.portfolio.update({
      where: { userId: currentUser.dbUser.id },
      data: { templateKey },
    })

    return NextResponse.json({ 
      message: "Template applied successfully",
      templateKey: updated.templateKey 
    })
  } catch (error: any) {
    console.error("[TEMPLATE_PATCH_ERROR]", error)
    return NextResponse.json({ error: "Failed to apply template" }, { status: 500 })
  }
}
