import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { nanoid } from "nanoid";

const sampleTestimonials = [
  {
    authorName: "Rajesh Kumar",
    authorRole: "Chief Technology Officer",
    authorCompany: "FinServ Technologies",
    authorImage: null,
    quote: "IT Origin's SOC services have completely transformed our security posture. Their 24/7 monitoring and rapid incident response have given us peace of mind. We've seen a 70% reduction in security incidents since partnering with them.",
    rating: 5,
    industry: "Financial Services",
    serviceUsed: "SOC Services",
    featured: true,
    verified: true,
    source: "direct",
  },
  {
    authorName: "Priya Sharma",
    authorRole: "Chief Information Security Officer",
    authorCompany: "HealthCare Plus",
    authorImage: null,
    quote: "The penetration testing team at IT Origin uncovered critical vulnerabilities that our internal team had missed for years. Their detailed reports and remediation guidance were invaluable. Highly professional and thorough!",
    rating: 5,
    industry: "Healthcare",
    serviceUsed: "Penetration Testing",
    featured: true,
    verified: true,
    source: "linkedin",
  },
  {
    authorName: "Amit Patel",
    authorRole: "VP of Engineering",
    authorCompany: "TechCorp India",
    authorImage: null,
    quote: "Their GRC expertise helped us achieve ISO 27001 certification in record time. The team's deep knowledge of compliance frameworks and hands-on approach made the entire process smooth and efficient.",
    rating: 5,
    industry: "Technology",
    serviceUsed: "Compliance Consulting",
    featured: true,
    verified: true,
    source: "direct",
  },
  {
    authorName: "Sneha Reddy",
    authorRole: "IT Director",
    authorCompany: "RetailMax",
    authorImage: null,
    quote: "We engaged IT Origin for a comprehensive security audit before our digital transformation. Their insights were eye-opening and helped us build security into our new architecture from day one.",
    rating: 5,
    industry: "Retail",
    serviceUsed: "Security Training",
    featured: false,
    verified: true,
    source: "email",
  },
  {
    authorName: "Vikram Singh",
    authorRole: "Managing Director",
    authorCompany: "Manufacturing Solutions Ltd",
    authorImage: null,
    quote: "The vulnerability assessment conducted by IT Origin was thorough and professional. They identified several critical issues in our OT environment that could have led to major operational disruptions.",
    rating: 5,
    industry: "Manufacturing",
    serviceUsed: "Vulnerability Assessment",
    featured: false,
    verified: true,
    source: "direct",
  },
  {
    authorName: "Ananya Krishnan",
    authorRole: "Head of Cybersecurity",
    authorCompany: "InsureTech Solutions",
    authorImage: null,
    quote: "IT Origin's managed detection and response service has been a game-changer for us. Their AI-powered threat detection catches threats that traditional solutions miss. Response times are exceptional.",
    rating: 5,
    industry: "Insurance",
    serviceUsed: "Managed Detection & Response",
    featured: true,
    verified: true,
    source: "g2",
  },
];

export async function seedTestimonials() {
  console.log("Seeding testimonials...");

  for (const testimonial of sampleTestimonials) {
    await db.insert(testimonials).values({
      id: nanoid(),
      ...testimonial,
      status: "approved",
      displayOrder: sampleTestimonials.indexOf(testimonial),
      verifiedAt: testimonial.verified ? new Date() : null,
      publishedAt: new Date(),
    });
  }

  console.log(`Seeded ${sampleTestimonials.length} testimonials`);
}

// Run if called directly
seedTestimonials()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding testimonials:", error);
    process.exit(1);
  });
