import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Calendar, Clock, Tag, ArrowLeft, List, ChevronRight } from 'lucide-react';
import { BlogPost, TableOfContents } from '../types/blog';
import { blogService } from '../services/blog';
import { parseMarkdown, extractTableOfContents, formatDate } from '../utils/markdown';

const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [toc, setToc] = useState<TableOfContents[]>([]);
  const [activeHeading, setActiveHeading] = useState('');
  const [showToc, setShowToc] = useState(false);
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (slug) {
      const foundPost = blogService.getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        const related = blogService.getRelatedPosts(foundPost, 2);
        setRelatedPosts(related);
        const tableOfContents = extractTableOfContents(foundPost.content);
        setToc(tableOfContents);
        const init: Record<string, boolean> = {};
        const collect = (items: TableOfContents[]) => {
          items.forEach((it) => {
            if (it.children && it.children.length > 0) init[it.id] = true;
            if (it.children) collect(it.children);
          });
        };
        collect(tableOfContents);
        setExpandedMap(init);
      }
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    // Handle scroll for active heading
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
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
          <h1 className="text-2xl font-bold text-deep-blue mb-4">文章未找到</h1>
          <p className="text-gray-600 mb-4">你访问的文章不存在。</p>
          <Link to="/" className="btn btn-primary">
            返回首页
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
        url={`/post/${post.slug}`}
        type="article"
        publishedTime={post.date}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Article Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-6 md:px-8 py-6">
            <div className="max-w-5xl mx-auto">
              <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                <Link to="/" className="hover:text-light-blue transition-colors duration-200">首页</Link>
                <span>/</span>
                <Link to={`/category/${encodeURIComponent(post.category)}`} className="hover:text-light-blue transition-colors duration-200">{post.category}</Link>
                <span>/</span>
                <span className="text-gray-700">{post.title}</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <h1 className="text-3xl font-bold text-deep-blue leading-tight md:mb-0">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 md:justify-end md:text-right">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} 分钟阅读</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-light-blue">{post.category}</span>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag, index) => (
                    <Link key={index} to={`/tag/${encodeURIComponent(tag)}`} className="tag">
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
        <div className="container mx-auto px-6 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar TOC left */}
            <aside className="lg:col-span-1 order-first">
              {toc.length > 0 && (
                <div className="toc hidden lg:block mb-6">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4 flex items-center">
                    <List className="h-5 w-5 mr-2" />
                    目录
                  </h3>
                  <nav className="space-y-1">
                    {renderTableOfContents(
                      toc,
                      activeHeading,
                      expandedMap,
                      (id: string) => setExpandedMap((prev) => ({ ...prev, [id]: prev[id] !== false ? false : true })),
                      0
                    )}
                  </nav>
                </div>
              )}

              {showToc && toc.length > 0 && (
                <div className="lg:hidden mb-6 bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">目录</h3>
                  <nav className="space-y-1">
                    {renderTableOfContents(
                      toc,
                      activeHeading,
                      expandedMap,
                      (id: string) => setExpandedMap((prev) => ({ ...prev, [id]: prev[id] !== false ? false : true })),
                      0
                    )}
                  </nav>
                  
                </div>
              )}
            </aside>

            {/* Article Content */}
            <article className="lg:col-span-3 order-last">
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                {/* Mobile TOC Toggle */}
                <div className="lg:hidden mb-6">
                  <button
                    onClick={() => setShowToc(!showToc)}
                    className="flex items-center space-x-2 text-light-blue hover:text-deep-blue transition-colors duration-200"
                  >
                    <List className="h-4 w-4" />
                    <span>目录</span>
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
                    相关文章
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
                  <span>返回首页</span>
                </Link>
              </div>
            </article>

            
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to render table of contents
const renderTableOfContents = (
  items: TableOfContents[],
  activeHeading: string,
  expandedMap: Record<string, boolean>,
  onToggle: (id: string) => void,
  level = 0
) => {
  return items.map((item) => {
    const hasChildren = item.children && item.children.length > 0;
    const expanded = expandedMap[item.id] !== false;
    return (
      <div key={item.id} className={level > 0 ? `ml-${level * 4}` : ''}>
        <div className="flex items-center">
          {hasChildren ? (
            <button
              aria-label="toggle"
              className="mr-1 text-gray-500 hover:text-light-blue transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onToggle(item.id);
              }}
            >
              <ChevronRight className={`h-3 w-3 ${expanded ? 'rotate-90' : ''} transition-transform`} />
            </button>
          ) : (
            <span className="mr-1 w-3 h-3" />
          )}
          <a
            href={`#${item.id}`}
            className={`toc-item ${activeHeading === item.id ? 'active' : ''}`}
            style={{ paddingLeft: `${level * 12}px` }}
          >
            {item.text}
          </a>
        </div>
        {hasChildren && expanded && (
          <div className="mt-1">
            {renderTableOfContents(item.children, activeHeading, expandedMap, onToggle, level + 1)}
          </div>
        )}
      </div>
    );
  });
};

export default Post;
