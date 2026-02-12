import { Metadata } from "next";
import { TeamPage } from "./team-page";

export const metadata: Metadata = {
  title: "Our Team | ITOrigin - Meet Our Cybersecurity Experts",
  description: "Meet the talented team of cybersecurity experts at ITOrigin. Our certified professionals bring decades of experience in protecting organizations from digital threats.",
  keywords: [
    "cybersecurity team",
    "security experts",
    "ITOrigin team",
    "security professionals",
    "SOC analysts",
    "penetration testers",
    "security consultants"
  ],
  openGraph: {
    title: "Our Team | ITOrigin - Meet Our Cybersecurity Experts",
    description: "Meet the talented team of cybersecurity experts at ITOrigin. Our certified professionals bring decades of experience in protecting organizations from digital threats.",
    type: "website",
    url: "https://itorigin.com/about/team",
    images: [
      {
        url: "/images/og-team.jpg",
        width: 1200,
        height: 630,
        alt: "ITOrigin Team"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | ITOrigin - Meet Our Cybersecurity Experts",
    description: "Meet the talented team of cybersecurity experts at ITOrigin.",
    images: ["/images/og-team.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/about/team"
  }
};

export default function Page() {
  return <TeamPage />;
}
