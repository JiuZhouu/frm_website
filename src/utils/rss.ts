import { BlogPost } from '../types/blog';

export function generateRSSFeed(posts: BlogPost[]): string {
  const siteUrl = 'https://yourblog.com'; // Replace with your actual domain
  const siteName = 'Personal Blog';
  const siteDescription = 'A personal blog featuring technical articles, tutorials, and insights on web development, programming, and software engineering.';
  
  const now = new Date().toUTCString();
  
  const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${siteUrl}/post/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/post/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author || 'John Doe'}</author>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>
  `).join('\n  ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteName}]]></title>
    <description><![CDATA[${siteDescription}]]></description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${now}</lastBuildDate>
    <language>en-US</language>
    <generator>Personal Blog RSS Generator</generator>
    <managingEditor>john@yourblog.com</managingEditor>
    <webMaster>john@yourblog.com</webMaster>
    ${items}
  </channel>
</rss>`;
}

export function generateRSSFile(): void {
  // This function would typically write to a file during build time
  // For now, we'll just return the feed content
  // In a real implementation, you might use a build tool or server-side generation
}