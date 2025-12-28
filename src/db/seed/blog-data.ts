import { db } from "@/db";
import { users, categories, tags, posts, postTags } from "@/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import slugify from "slugify";

const BLOG_CATEGORIES = [
  { name: "Threat Intelligence", description: "Insights on emerging threats and attack vectors" },
  { name: "Penetration Testing", description: "Techniques and methodologies for security testing" },
  { name: "Compliance & GRC", description: "Governance, risk, and compliance guidance" },
  { name: "Cloud Security", description: "Securing cloud infrastructure and applications" },
  { name: "Security Operations", description: "SOC best practices and operational security" },
  { name: "Incident Response", description: "Handling security incidents effectively" },
  { name: "Security Awareness", description: "Building a security-conscious culture" },
  { name: "Best Practices", description: "Security frameworks and recommended practices" },
];

const BLOG_POSTS = [
  {
    slug: "advanced-threat-hunting-techniques-2025",
    title: "Advanced Threat Hunting Techniques for 2025",
    excerpt: "Explore cutting-edge threat hunting methodologies and tools that security teams are using to proactively identify sophisticated attacks before they cause damage.",
    content: `<h2>Introduction to Advanced Threat Hunting</h2>
<p>In 2025, threat hunting has evolved from a reactive practice to a proactive discipline that's essential for any mature security operation. Modern threat actors are increasingly sophisticated, using advanced techniques to evade traditional security controls.</p>

<h3>Key Threat Hunting Methodologies</h3>
<p>Effective threat hunting requires a structured approach that combines:</p>
<ul>
<li><strong>Hypothesis-driven hunting:</strong> Starting with educated assumptions about potential threats</li>
<li><strong>Intelligence-led hunting:</strong> Using threat intelligence to guide investigations</li>
<li><strong>Behavioral analytics:</strong> Identifying anomalies in user and system behavior</li>
</ul>

<h3>Essential Tools for Threat Hunters</h3>
<p>Modern threat hunters rely on a combination of tools including SIEM platforms, EDR solutions, and custom scripts for data analysis. The key is to correlate data across multiple sources to identify patterns that indicate malicious activity.</p>

<h3>Building a Threat Hunting Program</h3>
<p>Organizations looking to establish a threat hunting capability should focus on:</p>
<ol>
<li>Defining clear objectives and success metrics</li>
<li>Investing in training and skill development</li>
<li>Establishing processes for documenting and sharing findings</li>
<li>Integrating threat hunting with incident response</li>
</ol>

<p>By taking a proactive approach to threat detection, organizations can significantly reduce dwell time and minimize the impact of security breaches.</p>`,
    category: "Threat Intelligence",
    tags: ["Threat Hunting", "SOC", "Cyber Defense"],
    publishedAt: "2025-01-15",
    readTime: 8,
    image: "/images/blog/threat-hunting.jpg",
  },
  {
    slug: "zero-trust-architecture-implementation-guide",
    title: "Zero Trust Architecture: A Practical Implementation Guide",
    excerpt: "Learn how to implement Zero Trust security model in your organization with step-by-step guidance, real-world examples, and common pitfalls to avoid.",
    content: `<h2>Understanding Zero Trust</h2>
<p>Zero Trust is a security framework that requires strict identity verification for every person and device trying to access resources, regardless of their location relative to the network perimeter.</p>

<h3>Core Principles of Zero Trust</h3>
<ul>
<li><strong>Never trust, always verify:</strong> Every access request must be authenticated and authorized</li>
<li><strong>Least privilege access:</strong> Users and systems should only have access to what they need</li>
<li><strong>Assume breach:</strong> Design systems as if attackers are already present</li>
</ul>

<h3>Implementation Roadmap</h3>
<p>A successful Zero Trust implementation typically follows these phases:</p>
<ol>
<li><strong>Assessment:</strong> Inventory all assets, users, and data flows</li>
<li><strong>Identity foundation:</strong> Implement strong identity and access management</li>
<li><strong>Device trust:</strong> Ensure only compliant devices can access resources</li>
<li><strong>Network segmentation:</strong> Implement micro-segmentation</li>
<li><strong>Continuous monitoring:</strong> Deploy analytics and threat detection</li>
</ol>

<h3>Common Pitfalls to Avoid</h3>
<p>Many organizations struggle with Zero Trust adoption due to trying to do too much too quickly. Start with critical assets and expand gradually.</p>`,
    category: "Best Practices",
    tags: ["Zero Trust", "Architecture", "Security Strategy"],
    publishedAt: "2025-01-12",
    readTime: 12,
    image: "/images/blog/zero-trust.jpg",
  },
  {
    slug: "owasp-top-10-2025-comprehensive-analysis",
    title: "OWASP Top 10 2025: Comprehensive Analysis and Mitigation",
    excerpt: "Deep dive into the latest OWASP Top 10 vulnerabilities with practical examples, exploitation techniques, and effective mitigation strategies for developers.",
    content: `<h2>The OWASP Top 10 Overview</h2>
<p>The OWASP Top 10 represents the most critical security risks to web applications. Understanding these vulnerabilities is essential for any developer or security professional.</p>

<h3>Key Vulnerabilities</h3>
<p>The 2025 edition includes updated entries reflecting the evolving threat landscape:</p>
<ul>
<li><strong>Broken Access Control:</strong> Still the most prevalent vulnerability</li>
<li><strong>Injection:</strong> Including SQL, NoSQL, and command injection</li>
<li><strong>Cryptographic Failures:</strong> Weak encryption and key management</li>
<li><strong>Security Misconfiguration:</strong> Default credentials and exposed services</li>
</ul>

<h3>Mitigation Strategies</h3>
<p>Each vulnerability requires specific countermeasures:</p>
<ol>
<li>Implement proper access controls at every layer</li>
<li>Use parameterized queries and input validation</li>
<li>Employ strong cryptographic standards</li>
<li>Follow security hardening guidelines</li>
</ol>

<p>Regular security testing and code review are essential for identifying and fixing these issues before deployment.</p>`,
    category: "Penetration Testing",
    tags: ["OWASP", "Web Security", "AppSec"],
    publishedAt: "2025-01-10",
    readTime: 15,
    image: "/images/blog/owasp-top-10.jpg",
  },
  {
    slug: "cloud-security-posture-management-best-practices",
    title: "Cloud Security Posture Management: Best Practices",
    excerpt: "Discover how to maintain a strong security posture across multi-cloud environments with automated monitoring, configuration management, and compliance checks.",
    content: `<h2>What is CSPM?</h2>
<p>Cloud Security Posture Management (CSPM) is a set of tools and practices designed to identify and remediate risks across cloud infrastructure.</p>

<h3>Key CSPM Capabilities</h3>
<ul>
<li>Continuous compliance monitoring</li>
<li>Misconfiguration detection</li>
<li>Risk visualization and prioritization</li>
<li>Automated remediation</li>
</ul>

<h3>Implementation Best Practices</h3>
<ol>
<li>Define security baselines for all cloud resources</li>
<li>Implement continuous scanning and monitoring</li>
<li>Integrate CSPM with CI/CD pipelines</li>
<li>Establish clear ownership and remediation workflows</li>
</ol>`,
    category: "Cloud Security",
    tags: ["Cloud Security", "CSPM", "AWS", "Azure"],
    publishedAt: "2025-01-08",
    readTime: 10,
    image: "/images/blog/cloud-security.jpg",
  },
  {
    slug: "incident-response-playbook-ransomware-attacks",
    title: "Incident Response Playbook: Handling Ransomware Attacks",
    excerpt: "A comprehensive playbook for responding to ransomware incidents, including detection, containment, eradication, and recovery procedures.",
    content: `<h2>Ransomware Response Framework</h2>
<p>Ransomware attacks require swift, coordinated response to minimize damage and restore operations.</p>

<h3>Detection and Initial Response</h3>
<ul>
<li>Identify indicators of compromise</li>
<li>Isolate affected systems immediately</li>
<li>Preserve evidence for forensic analysis</li>
</ul>

<h3>Containment Strategies</h3>
<p>Quick containment is critical:</p>
<ol>
<li>Disconnect affected systems from the network</li>
<li>Disable remote access capabilities</li>
<li>Block known malicious IPs and domains</li>
</ol>

<h3>Recovery and Lessons Learned</h3>
<p>Post-incident activities should include thorough documentation and process improvement.</p>`,
    category: "Incident Response",
    tags: ["Ransomware", "Incident Response", "Crisis Management"],
    publishedAt: "2025-01-05",
    readTime: 11,
    image: "/images/blog/ransomware-response.jpg",
  },
  {
    slug: "gdpr-compliance-checklist-2025",
    title: "GDPR Compliance Checklist for 2025",
    excerpt: "Stay compliant with the latest GDPR requirements using our comprehensive checklist covering data protection, privacy by design, and breach notification.",
    content: `<h2>GDPR Essentials</h2>
<p>The General Data Protection Regulation continues to evolve, requiring organizations to maintain robust data protection practices.</p>

<h3>Key Compliance Areas</h3>
<ul>
<li>Lawful basis for processing personal data</li>
<li>Data subject rights management</li>
<li>Privacy impact assessments</li>
<li>Data breach notification procedures</li>
</ul>

<h3>Compliance Checklist</h3>
<ol>
<li>Document all data processing activities</li>
<li>Implement privacy by design principles</li>
<li>Establish data retention policies</li>
<li>Train staff on data protection requirements</li>
</ol>`,
    category: "Compliance & GRC",
    tags: ["GDPR", "Compliance", "Privacy"],
    publishedAt: "2025-01-01",
    readTime: 9,
    image: "/images/blog/gdpr-compliance.jpg",
  },
];

async function seedBlogData() {
  console.log("Starting blog data migration...\n");

  // Get admin user
  const adminUser = await db.query.users.findFirst({
    where: eq(users.email, "admin@itorigin.com"),
  });

  if (!adminUser) {
    console.error("Admin user not found. Please run db:seed first.");
    process.exit(1);
  }

  console.log("Using admin user:", adminUser.name);

  // Create categories
  console.log("\nCreating categories...");
  const categoryMap = new Map<string, string>();

  for (const cat of BLOG_CATEGORIES) {
    const existingCategory = await db.query.categories.findFirst({
      where: eq(categories.slug, slugify(cat.name, { lower: true, strict: true })),
    });

    if (existingCategory) {
      console.log(`  - Category "${cat.name}" already exists`);
      categoryMap.set(cat.name, existingCategory.id);
    } else {
      const categoryId = nanoid();
      await db.insert(categories).values({
        id: categoryId,
        name: cat.name,
        slug: slugify(cat.name, { lower: true, strict: true }),
        description: cat.description,
      });
      console.log(`  + Created category: ${cat.name}`);
      categoryMap.set(cat.name, categoryId);
    }
  }

  // Create tags
  console.log("\nCreating tags...");
  const tagMap = new Map<string, string>();
  const allTags = [...new Set(BLOG_POSTS.flatMap((post) => post.tags))];

  for (const tagName of allTags) {
    const tagSlug = slugify(tagName, { lower: true, strict: true });
    const existingTag = await db.query.tags.findFirst({
      where: eq(tags.slug, tagSlug),
    });

    if (existingTag) {
      tagMap.set(tagName, existingTag.id);
    } else {
      const tagId = nanoid();
      await db.insert(tags).values({
        id: tagId,
        name: tagName,
        slug: tagSlug,
      });
      console.log(`  + Created tag: ${tagName}`);
      tagMap.set(tagName, tagId);
    }
  }

  // Create posts
  console.log("\nCreating posts...");
  for (const post of BLOG_POSTS) {
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, post.slug),
    });

    if (existingPost) {
      console.log(`  - Post "${post.title}" already exists`);
      continue;
    }

    const postId = nanoid();
    const categoryId = categoryMap.get(post.category);

    await db.insert(posts).values({
      id: postId,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.image,
      status: "published",
      publishedAt: new Date(post.publishedAt),
      authorId: adminUser.id,
      categoryId: categoryId || null,
      readingTime: post.readTime,
      viewCount: Math.floor(Math.random() * 1000) + 100,
    });

    // Add tags
    for (const tagName of post.tags) {
      const tagId = tagMap.get(tagName);
      if (tagId) {
        await db.insert(postTags).values({
          postId,
          tagId,
        });
      }
    }

    console.log(`  + Created post: ${post.title}`);
  }

  console.log("\nBlog data migration completed!");
}

seedBlogData()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });
