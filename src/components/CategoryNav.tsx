import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Category } from '../types/blog';

interface CategoryNavProps {
  categories: Category[];
  className?: string;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, className = "" }) => {
  const location = useLocation();

  return (
    <nav className={`${className}`}>
      <h3 className="text-lg font-semibold text-deep-blue mb-4">Categories</h3>
      <div className="space-y-2">
        <Link
          to="/"
          className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
            location.pathname === '/' 
              ? 'bg-light-blue text-white' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-deep-blue'
          }`}
        >
          All Posts
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
              location.pathname === `/category/${category.slug}`
                ? 'bg-light-blue text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-deep-blue'
            }`}
          >
            <span>{category.name}</span>
            <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
              {category.count}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default CategoryNav;