import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Analytics GET Endpoint Placeholder" })
}

export async function POST() {
  return NextResponse.json({ message: "Analytics POST Endpoint Placeholder" })
}