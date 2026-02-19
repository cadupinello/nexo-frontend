import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

import { GitGraph, LayoutDashboardIcon, Loader2, MessageSquare, Play, Send } from "lucide-react";
import { useEffect } from "react";
import { authClient } from "../../lib/auth-client";
import { Sidebar, SidebarItem } from "../../shared/components/layout/Sidebar";

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
    to: "/chat-builder",
    title: "Chat Builder",
    icon: MessageSquare,
  },
  {
    to: "/integrations",
    title: "Integrations",
    icon: Send,
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
      <div className="h-screen w-full flex flex-col items-center justify-center bg-bg-start text-primary gap-4">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="text-text-secondary animate-pulse">Autenticando...</p>
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
