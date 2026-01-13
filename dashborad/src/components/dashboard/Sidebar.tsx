import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings, 
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: MessageSquare, label: "WhatsApp", href: "/whatsapp" },
  { icon: Users, label: "Usuários", href: "/usuarios" },
  { icon: Settings, label: "Configurações", href: "/configuracoes" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside 
      className={cn(
        // Desktop: make sidebar fixed so it always stays in place while the
        // body scrolls. Mobile: keep sticky behavior. Use top/bottom anchors
        // instead of a calc min-height to avoid sub-pixel rounding gaps when
        // the page is scrolled or zoomed.
        "left-0 overflow-y-auto self-start z-20 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        // fixed anchors on md+ and sticky on small screens
        "md:fixed md:top-16 md:bottom-0 sticky",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">b2bomni</span>
          </div>
        )}
        {collapsed && (
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center mx-auto">
            <MessageSquare className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => {
            const next = !collapsed;
            setCollapsed(next);
            // notify layout listeners (Index) so they can adjust content margin
            try {
              window.dispatchEvent(new CustomEvent('sidebar:toggle', { detail: { collapsed: next } }));
            } catch (e) {}
          }}
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "hidden"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                active 
                  ? "bg-sidebar-accent text-sidebar-primary glow-border" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", active && "text-primary")} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center"
        )}>
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
            JD
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">João Demo</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// Dispatch initial state so listeners can sync on first render
try {
  window.dispatchEvent(new CustomEvent('sidebar:toggle', { detail: { collapsed: false } }));
} catch (e) {}
