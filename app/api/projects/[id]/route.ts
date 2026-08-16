import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.dbUser.id },
      include: { portfolio: true },
    })

    if (!user || !user.portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project || project.portfolioId !== user.portfolio.id) {
      return NextResponse.json({ error: "Project not found or unauthorized" }, { status: 404 })
    }

    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({
      message: "Project successfully removed from portfolio",
      deletedId: id,
    })
  } catch (error: any) {
    console.error("[PROJECT_DELETE_ERROR]", error)
    return NextResponse.json(
      { error: error?.message || "Failed to remove project" },
      { status: 500 }
    )
  }
}