import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { formatDate } from '../utils/markdown';

interface ArticleCardProps {
  post: BlogPost;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  return (
    <article className="article-card group">
      <div className="flex flex-col space-y-4">
        {/* Header with meta info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
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
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-light-blue text-white">
            {post.category}
          </span>
        </div>

        {/* Title and excerpt */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-deep-blue group-hover:text-light-blue transition-colors duration-200">
            <Link to={`/post/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
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

        {/* Read more link */}
        <div className="pt-2">
          <Link
            to={`/post/${post.slug}`}
            className="inline-flex items-center text-light-blue hover:text-deep-blue font-medium transition-colors duration-200"
          >
            Read more
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;