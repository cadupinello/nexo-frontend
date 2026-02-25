import type { ReactNode } from "react";

interface HeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  tools?: ReactNode;
}

export function Header({ title, subtitle, actions, tools }: HeaderProps) {
  return (
    <header className="navbar h-14 border-b border-border-ui bg-bg-start px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center gap-4">
        <h2 className="text-sm font-bold tracking-tight text-text-primary">
          {title}
        </h2>
        {subtitle && (
          <div className="badge badge-outline border-border-ui bg-panel px-2 py-0.5 font-semibold text-[10px] text-text-secondary uppercase tracking-widest h-auto">
            {subtitle}
          </div>
        )}
      </div>

      <div className="flex-none flex items-center gap-3">
        {tools && <div className="mr-4">{tools}</div>}
        {actions}
      </div>
    </header>
  );
}
