import React, { useEffect } from 'react';
import { blogService } from '../services/blog';
import { generateRSSFeed } from '../utils/rss';

const RSS: React.FC = () => {
  useEffect(() => {
    const posts = blogService.getAllPosts();
    const rssContent = generateRSSFeed(posts);
    
    // Create a blob and download the RSS feed
    const blob = new Blob([rssContent], { type: 'application/rss+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rss.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-deep-blue mb-4">RSS Feed</h1>
        <p className="text-gray-600 mb-4">Your RSS feed is being generated and will download automatically.</p>
        <p className="text-sm text-gray-500">
          If the download doesn't start automatically, please refresh the page.
        </p>
      </div>
    </div>
  );
};

export default RSS;