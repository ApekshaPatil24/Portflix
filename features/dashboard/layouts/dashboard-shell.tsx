import Sidebar from "../components/sidebar/sidebar";
import Topbar from "../components/topbar/topbar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="relative flex min-h-screen bg-[#03030d] text-zinc-300 overflow-hidden font-sans">
      {/* Glow blobs */}
      <div className="absolute top-[-10%] left-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] -z-10 h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      {/* Futuristic grid overlay */}
      <div 
        className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
      />

      <Sidebar />

      <div className="relative flex flex-1 flex-col overflow-y-auto">
        <Topbar />

        <main className="flex-1 p-6 md:p-8 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}