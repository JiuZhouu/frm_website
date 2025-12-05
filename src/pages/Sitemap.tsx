import React, { useEffect } from 'react';
import { blogService } from '../services/blog';
import { generateSitemap } from '../utils/sitemap';

const Sitemap: React.FC = () => {
  useEffect(() => {
    const posts = blogService.getAllPosts();
    const sitemapContent = generateSitemap(posts);
    
    // Create a blob and download the sitemap
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-deep-blue mb-4">Sitemap</h1>
        <p className="text-gray-600 mb-4">Your sitemap is being generated and will download automatically.</p>
        <p className="text-sm text-gray-500">
          If the download doesn't start automatically, please refresh the page.
        </p>
      </div>
    </div>
  );
};

export default Sitemap;