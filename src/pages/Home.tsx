import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import ArticleCard from '../components/ArticleCard';
// Search bar moved to global header
import CategoryNav from '../components/CategoryNav';
import { blogService } from '../services/blog';
import { BlogPost } from '../types/blog';
import { formatDate } from '../utils/markdown';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allPosts = blogService.getAllPosts();
    const allCategories = blogService.getCategories();
    setPosts(allPosts);
    setFilteredPosts(allPosts);
    setCategories(allCategories);
    setLoading(false);
  }, []);

  // Search handled via global header: Home listens to query param changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setSearchQuery(q);
    if (q.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const searchResults = blogService.searchPosts(q);
      setFilteredPosts(searchResults);
    }
  }, [posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-8"></div>
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
        title="首页"
        description="一个专注技术文章、教程与见解的个人博客。"
        keywords={["博客", "编程", "前端开发", "教程", "技术文章"]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header removed: hero title & local search moved to global header */}

        {/* Main Content */}
        <main className="container mx-auto px-6 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar (moved to left) */}
            <aside className="lg:col-span-1 order-last lg:order-first">
              <div className="space-y-6">
                {/* Categories */}
                <CategoryNav categories={categories} />

                {/* Recent Posts */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">
                    最新文章
                  </h3>
                  <div className="space-y-3">
                    {posts.slice(0, 5).map((post) => (
                      <div key={post.slug}>
                        <Link 
                          to={`/post/${post.slug}`}
                          className="text-sm text-gray-700 hover:text-light-blue transition-colors duration-200 line-clamp-2"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(post.date)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Cloud */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">热门标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogService.getPopularTags().map((tag) => (
                      <Link key={tag} to={`/tag/${encodeURIComponent(tag)}`} className="tag">
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Article List (moved to right) */}
            <div className="lg:col-span-3">
              {searchQuery && (
                <div className="mb-6">
                  <p className="text-gray-600">
                    共找到 {filteredPosts.length} 篇文章{searchQuery && `，关键字 "${searchQuery}"`}
                  </p>
                </div>
              )}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchQuery 
                      ? `未找到与 "${searchQuery}" 相关的文章`
                      : '暂时还没有文章。'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
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

export default Home;
