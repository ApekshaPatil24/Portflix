import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Projects GET Endpoint Placeholder" })
}

export async function POST() {
  return NextResponse.json({ message: "Projects POST Endpoint Placeholder" })
}