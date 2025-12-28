/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://itorigin.in",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/admin/*",
    "/api/*",
    "/sign-in",
    "/sign-up",
    "/newsletter/*",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/sign-in", "/sign-up"],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://itorigin.in"}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority for different pages
    const priorityMap = {
      "/": 1.0,
      "/services": 0.9,
      "/about": 0.8,
      "/contact": 0.8,
      "/blogs": 0.8,
    };

    const changefreqMap = {
      "/blogs": "daily",
      "/": "weekly",
    };

    // Check if path starts with any of the priority keys
    let priority = config.priority;
    let changefreq = config.changefreq;

    for (const [key, value] of Object.entries(priorityMap)) {
      if (path === key || path.startsWith(key + "/")) {
        priority = value;
        break;
      }
    }

    for (const [key, value] of Object.entries(changefreqMap)) {
      if (path === key || path.startsWith(key + "/")) {
        changefreq = value;
        break;
      }
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
