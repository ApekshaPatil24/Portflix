import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Single Project GET Endpoint Placeholder" })
}

export async function PUT() {
  return NextResponse.json({ message: "Single Project PUT Endpoint Placeholder" })
}

export async function DELETE() {
  return NextResponse.json({ message: "Single Project DELETE Endpoint Placeholder" })
}