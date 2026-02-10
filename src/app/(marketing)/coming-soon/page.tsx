import { Metadata } from "next";
import { ComingSoonContent } from "./coming-soon-content";

export const metadata: Metadata = {
  title: "Coming Soon | IT Origin",
  description:
    "This page is coming soon. Stay tuned for exciting new content and features from IT Origin.",
};

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ for?: string }>;
}) {
  const params = await searchParams;
  return <ComingSoonContent context={params.for} />;
}
