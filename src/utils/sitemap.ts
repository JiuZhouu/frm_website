import { BlogPost } from '../types/blog';

export function generateSitemap(posts: BlogPost[]): string {
  const siteUrl = 'https://yourblog.com'; // Replace with your actual domain
  const now = new Date().toISOString();
  
  const staticUrls = [
    { url: '/', lastmod: now, changefreq: 'daily', priority: '1.0' },
    { url: '/about', lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { url: '/rss', lastmod: now, changefreq: 'daily', priority: '0.6' },
  ];

  const categoryUrls = Array.from(new Set(posts.map(post => post.category))).map(category => ({
    url: `/category/${encodeURIComponent(category)}`,
    lastmod: now,
    changefreq: 'weekly' as const,
    priority: '0.7'
  }));

  const postUrls = posts.map(post => ({
    url: `/post/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: 'monthly' as const,
    priority: '0.9'
  }));

  const allUrls = [...staticUrls, ...categoryUrls, ...postUrls];

  const urlset = allUrls.map(({ url, lastmod, changefreq, priority }) => `
  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlset}
</urlset>`;
}

export function generateSitemapFile(): void {
  // This function would typically write to a file during build time
  // For now, we'll just return the sitemap content
  // In a real implementation, you might use a build tool or server-side generation
}