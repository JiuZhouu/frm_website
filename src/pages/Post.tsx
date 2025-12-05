import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Calendar, Clock, User, Tag, ArrowLeft, ArrowRight, List } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { blogService } from '../services/blog';
import { parseMarkdown, extractTableOfContents, formatDate } from '../utils/markdown';

const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [toc, setToc] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');
  const [showToc, setShowToc] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundPost = blogService.getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        const related = blogService.getRelatedPosts(foundPost, 2);
        setRelatedPosts(related);
        const tableOfContents = extractTableOfContents(foundPost.content);
        setToc(tableOfContents);
      }
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    // Handle scroll for active heading
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1, h2, h3');
      let current = '';
      
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = heading.id;
        }
      });
      
      setActiveHeading(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-8 w-1/2"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="h-64 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-deep-blue mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-4">The article you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const contentHtml = parseMarkdown(post.content);

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags}
        author={post.author}
        url={`/post/${post.slug}`}
        type="article"
        publishedTime={post.date}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Article Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-light-blue transition-colors duration-200">
                  Home
                </Link>
                <span>/</span>
                <Link 
                  to={`/category/${post.category.toLowerCase()}`} 
                  className="hover:text-light-blue transition-colors duration-200"
                >
                  {post.category}
                </Link>
                <span>/</span>
                <span className="text-gray-700">{post.title}</span>
              </nav>

              {/* Article Meta */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-light-blue text-white">
                  {post.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-deep-blue mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
                {post.author && (
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/tag/${tag.toLowerCase()}`}
                      className="tag"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Article Content */}
            <article className="lg:col-span-3">
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                {/* Mobile TOC Toggle */}
                <div className="lg:hidden mb-6">
                  <button
                    onClick={() => setShowToc(!showToc)}
                    className="flex items-center space-x-2 text-light-blue hover:text-deep-blue transition-colors duration-200"
                  >
                    <List className="h-4 w-4" />
                    <span>Table of Contents</span>
                  </button>
                </div>

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-deep-blue mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.slug} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                        <Link
                          to={`/post/${relatedPost.slug}`}
                          className="block group"
                        >
                          <h4 className="text-lg font-medium text-deep-blue group-hover:text-light-blue transition-colors duration-200 mb-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {formatDate(relatedPost.date)}
                            </span>
                            <span className="text-xs text-light-blue group-hover:text-deep-blue transition-colors duration-200">
                              Read more →
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-light-blue hover:text-deep-blue transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Articles</span>
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Table of Contents - Desktop */}
              {(showToc || true) && toc.length > 0 && (
                <div className="toc hidden lg:block mb-6">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4 flex items-center">
                    <List className="h-5 w-5 mr-2" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {renderTableOfContents(toc, activeHeading)}
                  </nav>
                </div>
              )}

              {/* Mobile TOC */}
              {showToc && toc.length > 0 && (
                <div className="lg:hidden mb-6 bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {renderTableOfContents(toc, activeHeading)}
                  </nav>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to render table of contents
const renderTableOfContents = (items: any[], activeHeading: string, level = 0) => {
  return items.map((item) => (
    <div key={item.id} className={level > 0 ? `ml-${level * 4}` : ''}>
      <a
        href={`#${item.id}`}
        className={`toc-item block ${
          activeHeading === item.id ? 'toc-item active' : ''
        }`}
        style={{ paddingLeft: `${level * 12}px` }}
      >
        {item.text}
      </a>
      {item.children && renderTableOfContents(item.children, activeHeading, level + 1)}
    </div>
  ));
};

export default Post;