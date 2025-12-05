import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
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
    // Simulate loading data
    setTimeout(() => {
      const allPosts = blogService.getAllPosts();
      const allCategories = blogService.getCategories();
      
      setPosts(allPosts);
      setFilteredPosts(allPosts);
      setCategories(allCategories);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const searchResults = blogService.searchPosts(query);
      setFilteredPosts(searchResults);
    }
  };

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
        title="Home"
        description="A personal blog featuring technical articles, tutorials, and insights on web development, programming, and software engineering."
        keywords={["blog", "programming", "web development", "tutorials", "technical articles"]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-deep-blue mb-2">
                Personal Blog
              </h1>
              <p className="text-gray-600 text-lg">
                Technical articles, tutorials, and insights
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search articles by title, content, or tags..."
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Article List */}
            <div className="lg:col-span-3">
              {searchQuery && (
                <div className="mb-6">
                  <p className="text-gray-600">
                    Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} 
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
              )}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchQuery 
                      ? `No articles found for "${searchQuery}"`
                      : 'No articles available yet.'
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

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="space-y-6">
                {/* Categories */}
                <CategoryNav categories={categories} />

                {/* Recent Posts */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">
                    Recent Posts
                  </h3>
                  <div className="space-y-3">
                    {posts.slice(0, 5).map((post) => (
                      <div key={post.slug}>
                        <a 
                          href={`/post/${post.slug}`}
                          className="text-sm text-gray-700 hover:text-light-blue transition-colors duration-200 line-clamp-2"
                        >
                          {post.title}
                        </a>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(post.date)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Cloud */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'CSS', 'JavaScript', 'Tutorial', 'Frontend'].map((tag) => (
                      <a
                        key={tag}
                        href={`/tag/${tag.toLowerCase()}`}
                        className="tag"
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;