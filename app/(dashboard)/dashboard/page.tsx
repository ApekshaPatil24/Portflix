//dashboard = home stats

"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import DashboardPage from "@/features/dashboard/dashboard-page";

export default function Page() {
  return <DashboardPage />;
}