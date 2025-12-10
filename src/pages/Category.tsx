import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import ArticleCard from '../components/ArticleCard';
import { blogService } from '../services/blog';
import { BlogPost } from '../types/blog';

const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (name) {
      const decodedName = decodeURIComponent(name);
      setCategoryName(decodedName);
      
      const categoryPosts = blogService.getPostsByCategory(decodedName);
      setPosts(categoryPosts);
      // 不再展示其他分类，移除 categories 数据收集
      setLoading(false);
    }
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-8 w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="article-card mb-6">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-1">
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={categoryName}
        description={`Articles and tutorials in the ${categoryName} category`}
        keywords={[categoryName.toLowerCase(), 'programming', 'tutorials']}
        url={`/category/${encodeURIComponent(categoryName)}`}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-6 md:px-8 py-6">
            <div className="max-w-5xl mx-auto">
              <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                <Link to="/" className="hover:text-light-blue transition-colors duration-200">首页</Link>
                <span>/</span>
                <span className="text-gray-700">{categoryName}</span>
              </nav>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">{categoryName}</h1>
              <p className="text-gray-600 text-sm">{posts.length} 篇文章</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar left: show all documents in current category */}
            <aside className="lg:col-span-1 order-first">
              <div className="space-y-6">
                <div className="toc mb-6">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">全部文章</h3>
                  <nav className="space-y-1">
                    {posts.map((p) => (
                      <Link key={p.slug} to={`/post/${p.slug}`} className="toc-item">
                        {p.title}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <Link to="/" className="flex items-center space-x-2 text-light-blue hover:text-deep-blue transition-colors duration-200">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>返回首页</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Article List right */}
            <div className="lg:col-span-3 order-last">
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">当前分类暂无文章</p>
                  <Link to="/" className="btn btn-primary">浏览全部文章</Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
