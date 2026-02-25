import { Link, useNavigate } from "@tanstack/react-router";
import { Flame, LogOut, Settings } from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { WorkspaceSelector } from "../../../features/workspaces/components/WorkspaceSelector";
import { authClient } from "../../../lib/auth-client";

export function Sidebar({ children }: { children: ReactNode }) {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => navigate({ to: "/login" }),
      },
    });
  };

  return (
    <aside className="flex h-full w-72 flex-col border-r border-border-ui bg-bg-start">
      <div className="flex h-16 items-center gap-3 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
          <Flame size={18} className="fill-bg-start text-bg-start" strokeWidth={2.5} />
        </div>
        <span className="text-xl font-bold tracking-tight text-text-primary">
          Nexo<span className="text-primary">.</span>
        </span>
      </div>

      <nav className="menu flex-1 gap-1 overflow-y-auto px-4 py-6 text-text-secondary">
        {children}
      </nav>

      <div className="mt-auto space-y-6 border-t border-border-ui/30 p-6">
        <WorkspaceSelector />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="avatar">
              <div className="w-9 rounded-full ring ring-primary/20 ring-offset-2 ring-offset-bg-start">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.name || "Guest"}`}
                  alt="User"
                />
              </div>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-xs font-bold text-text-primary">
                {session?.user?.name || "Usuário"}
              </span>
              <span className="truncate text-[9px] uppercase tracking-widest text-text-secondary opacity-50">
                Plano Free
              </span>
            </div>
          </div>

          <div className="flex gap-1">
            <button className="btn btn-ghost btn-xs btn-square text-text-secondary hover:text-primary">
              <Settings size={14} />
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-xs btn-square text-text-secondary hover:text-danger"
              title="Sair"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function SidebarItem({
  to,
  title,
  Icon,
}: {
  to: string;
  title: string;
  Icon?: ElementType;
}) {
  return (
    <li>
      <Link
        to={to}
        activeProps={{ className: "bg-primary/10 text-primary font-bold shadow-sm" }}
        inactiveProps={{ className: "hover:bg-white/5" }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
      >
        {Icon && <Icon size={18} className="group-hover:scale-110 transition-transform" />}
        <span className="text-sm">{title}</span>
      </Link>
    </li>
  );
}
