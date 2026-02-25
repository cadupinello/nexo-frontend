import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

import {
  BookOpen,
  GitGraph,
  LayoutDashboardIcon,
  MessageSquare,
  Play,
  Send
} from "lucide-react";
import { useEffect } from "react";
import { authClient } from "../../lib/auth-client";
import { Sidebar, SidebarItem } from "../../shared/components/layout/Sidebar";
import { LoadingSpinner } from "../../shared/components/ui/LoadingSpinner";

export const Route = createFileRoute("/_app")({
  component: LayoutDashboard,
});

const itemsNav = [
  {
    to: "/",
    title: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    to: "/chat-builder",
    title: "Chat Builder",
    icon: MessageSquare,
  },
  {
    to: "/flow-builder",
    title: "Flow Builder",
    icon: GitGraph,
  },
  {
    to: "/simulate",
    title: "Simulator",
    icon: Play,
  },
  {
    to: "/integrations",
    title: "Integrations",
    icon: Send,
  },
  {
    to: "/docs",
    title: "Docs",
    icon: BookOpen,
  },
];

function LayoutDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !session) {
      navigate({ to: "/login" });
    }
  }, [session, isPending, navigate]);


  if (isPending) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-bg-start">
        <LoadingSpinner size={40} />
        <p className="animate-pulse text-xs font-black uppercase tracking-widest text-text-secondary">
          Autenticando...
        </p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-start text-text-primary">
      <Sidebar>
        {itemsNav.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            title={item.title}
            Icon={item.icon}
          />
        ))}
      </Sidebar>

      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 relative overflow-hidden bg-bg-end/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
