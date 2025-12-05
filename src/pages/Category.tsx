import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import ArticleCard from '../components/ArticleCard';
import CategoryNav from '../components/CategoryNav';
import { blogService } from '../services/blog';
import { BlogPost, Category } from '../types/blog';

const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (name) {
      const decodedName = decodeURIComponent(name);
      setCategoryName(decodedName);
      
      const categoryPosts = blogService.getPostsByCategory(decodedName);
      const allCategories = blogService.getCategories();
      
      setPosts(categoryPosts);
      setCategories(allCategories);
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
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-deep-blue mb-2">
                {categoryName}
              </h1>
              <p className="text-gray-600 text-lg">
                {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Article List */}
            <div className="lg:col-span-3">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-light-blue transition-colors duration-200">
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-700">{categoryName}</span>
              </nav>

              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">
                    No articles found in the "{categoryName}" category.
                  </p>
                  <Link to="/" className="btn btn-primary">
                    Browse All Articles
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
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

                {/* Back to All Posts */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <Link
                    to="/"
                    className="flex items-center space-x-2 text-light-blue hover:text-deep-blue transition-colors duration-200"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to All Posts</span>
                  </Link>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'CSS', 'JavaScript', 'Tutorial', 'Frontend'].map((tag) => (
                      <Link
                        key={tag}
                        to={`/tag/${tag.toLowerCase()}`}
                        className="tag"
                      >
                        {tag}
                      </Link>
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

export default CategoryPage;