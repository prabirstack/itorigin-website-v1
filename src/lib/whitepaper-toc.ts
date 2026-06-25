export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Injects stable `id` attributes into h2/h3 elements of an HTML string and
 * returns the modified HTML plus the ordered list of headings for a TOC.
 * Sequential dedup keeps IDs unique and identical between TOC links and content.
 */
export function addHeadingIds(html: string): { html: string; headings: TocHeading[] } {
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();

  const out = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (full: string, lvl: string, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return full;
      const base = slugifyHeading(text) || "section";
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count > 0 ? `${base}-${count}` : base;
      headings.push({ id, text, level: Number(lvl) === 3 ? 3 : 2 });
      if (/\sid=/.test(attrs)) return full;
      return `<h${lvl}${attrs} id="${id}">${inner}</h${lvl}>`;
    },
  );

  return { html: out, headings };
}
