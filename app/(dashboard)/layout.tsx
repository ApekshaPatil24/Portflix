//FRONTEND: protected pages (has sidebar)
//sidebar + topbar wrapper for ALL dashboard pages

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}