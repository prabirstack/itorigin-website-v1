"use client";

import { useState, useEffect } from "react";
import { List, Linkedin, Facebook, Link2, Check } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const TABLE_OF_CONTENTS: TocItem[] = [
  { id: "introduction", text: "Introduction", level: 2 },
  { id: "key-takeaways", text: "Key Takeaways", level: 2 },
  { id: "best-practices", text: "Best Practices", level: 2 },
  { id: "continuous-monitoring", text: "Continuous Monitoring", level: 3 },
  { id: "security-assessments", text: "Regular Security Assessments", level: 3 },
  { id: "conclusion", text: "Conclusion", level: 2 },
];

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
      }
    );

    // Observe all headings
    TABLE_OF_CONTENTS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      TABLE_OF_CONTENTS.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((err) => {
      console.error("Failed to copy URL:", err);
    });
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="lg:sticky lg:top-24 p-6 rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-black">Table of Contents</h3>
      </div>

      <nav>
        <ul className="space-y-2">
          {TABLE_OF_CONTENTS.map((item) => (
            <li
              key={item.id}
              className={`${item.level === 3 ? "ml-4" : ""}`}
            >
              <button
                onClick={() => handleClick(item.id)}
                className={`text-sm text-left w-full py-1.5 px-3 rounded-lg transition-all ${
                  activeId === item.id
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Share Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs font-semibold text-foreground mb-3">Share this article</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleShare("twitter")}
            className="p-2 rounded-lg border border-border hover:bg-accent hover:border-foreground transition-all group"
            aria-label="Share on X (formerly Twitter)"
            title="Share on X"
          >
            <RiTwitterXFill className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="p-2 rounded-lg border border-border hover:bg-accent hover:border-[#0A66C2] transition-all group"
            aria-label="Share on LinkedIn"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-[#0A66C2] transition-colors" />
          </button>
          <button
            onClick={() => handleShare("facebook")}
            className="p-2 rounded-lg border border-border hover:bg-accent hover:border-[#1877F2] transition-all group"
            aria-label="Share on Facebook"
            title="Share on Facebook"
          >
            <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-[#1877F2] transition-colors" />
          </button>
          <button
            onClick={handleCopyLink}
            className={`p-2 rounded-lg border transition-all ${
              copied
                ? "bg-green-500/10 border-green-500 text-green-500"
                : "border-border hover:bg-accent hover:border-primary"
            }`}
            aria-label="Copy link"
            title={copied ? "Link copied!" : "Copy link"}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Link2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
