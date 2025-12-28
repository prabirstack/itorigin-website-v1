import { Shield } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Shield className="w-8 h-8 text-primary" />
        <span className="text-2xl font-bold">IT Origin</span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
      <p className="mt-8 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} IT Origin. All rights reserved.
      </p>
    </div>
  );
}
