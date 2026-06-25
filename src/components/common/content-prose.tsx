import parse from "html-react-parser";
import { cn } from "@/lib/utils";

interface ContentProseProps {
  html: string;
  className?: string;
}

/**
 * Rich-text HTML renderer for whitepaper detail pages.
 * Content is admin-only authored via Tiptap (constrained tag set). Rendered with
 * html-react-parser (parses to React elements — no raw-HTML injection attribute).
 * The blog keeps its own existing renderer; this is whitepaper-scoped.
 */
export function ContentProse({ html, className }: ContentProseProps) {
  return (
    <div className={cn("prose prose-lg dark:prose-invert max-w-none", className)}>
      {parse(html)}
    </div>
  );
}
