"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Bell,
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  Mail,
  Briefcase,
  UserCircle,
  Send,
  Tag,
  Loader2,
  Sun,
  Moon,
  Monitor,
  Check,
  CheckCheck,
  AlertCircle,
  ExternalLink,
  BookOpen,
  FolderDown,
  Award,
} from "lucide-react";
import { Logo } from "@/components/common/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Posts", href: "/admin/posts", icon: FileText },
  { title: "Categories", href: "/admin/categories", icon: Tag },
  { title: "Comments", href: "/admin/comments", icon: MessageSquare },
  { title: "Readers", href: "/admin/readers", icon: BookOpen },
  { title: "Services", href: "/admin/services", icon: Briefcase },
  { title: "Case Studies", href: "/admin/case-studies", icon: Award },
  { title: "Leads", href: "/admin/leads", icon: UserCircle },
  { title: "Subscribers", href: "/admin/subscribers", icon: Users },
  { title: "Campaigns", href: "/admin/campaigns", icon: Send },
  { title: "Chat", href: "/admin/chat", icon: Mail },
  { title: "Resources", href: "/admin/resources", icon: FolderDown },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  href?: string;
  read: boolean;
  time: string;
}

// Mock notifications - in production, fetch from API
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Lead",
    message: "John Smith submitted a contact form",
    type: "success",
    href: "/admin/leads",
    read: false,
    time: "5 min ago",
  },
  {
    id: "2",
    title: "New Subscriber",
    message: "jane@example.com joined the newsletter",
    type: "info",
    href: "/admin/subscribers",
    read: false,
    time: "1 hour ago",
  },
  {
    id: "3",
    title: "Resource Downloaded",
    message: '"State of Cybersecurity 2025" was downloaded',
    type: "info",
    href: "/admin/resources",
    read: true,
    time: "3 hours ago",
  },
];

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const { setTheme } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const user = session?.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex items-center h-16 px-4 border-b">
                <Logo href="/admin" size="sm" animated={false} className="w-28 h-8" />
              </div>
              <nav className="p-4 space-y-1">
                {sidebarItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="lg:hidden">
            <Logo href="/admin" size="sm" animated={false} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 p-0" align="end" forceMount>
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                    onClick={markAllAsRead}
                  >
                    <CheckCheck className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
              </div>
              <ScrollArea className="h-80">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Bell className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">No notifications</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You&apos;re all caught up!
                    </p>
                  </div>
                ) : (
                  <div className="py-1">
                    {notifications.map((notification, index) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-muted/50",
                          !notification.read && "bg-primary/5",
                          index !== notifications.length - 1 && "border-b border-border/50"
                        )}
                        onClick={() => {
                          markAsRead(notification.id);
                          if (notification.href) {
                            router.push(notification.href);
                          }
                        }}
                      >
                        <div className={cn(
                          "shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                          notification.type === "success" && "bg-green-500/10",
                          notification.type === "warning" && "bg-yellow-500/10",
                          notification.type === "info" && "bg-blue-500/10"
                        )}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn(
                              "text-sm truncate",
                              !notification.read ? "font-semibold" : "font-medium"
                            )}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="shrink-0 w-2 h-2 mt-1.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-[10px] text-muted-foreground/70 mt-1.5">
                            {notification.time}
                          </p>
                        </div>
                        {notification.href && (
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              {notifications.length > 0 && (
                <div className="border-t px-4 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full h-8 text-xs text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <Link href="/admin/notifications">View all notifications</Link>
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                {isLoggingOut ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
