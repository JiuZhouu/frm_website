import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  url?: string;
  image?: string;
  type?: 'article' | 'website';
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEO({
  title,
  description,
  keywords = [],
  author = 'John Doe',
  url,
  image = '/icon-192.png',
  type = 'website',
  publishedTime,
  modifiedTime
}: SEOProps) {
  const siteName = 'Personal Blog';
  const fullTitle = title === 'Home' ? siteName : `${title} | ${siteName}`;
  const siteUrl = 'https://yourblog.com'; // Replace with your actual domain
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content={`@${author.toLowerCase().replace(/\s+/g, '')}`} />

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* PWA meta tags */}
      <meta name="theme-color" content="#2c3e50" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <link rel="apple-touch-icon" href="/icon-192.png" />
    </Helmet>
  );
}