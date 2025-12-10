import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-light-blue text-white rounded-lg">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-deep-blue">Vesta学金融</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <div className="w-80">
              <SearchBar
                onSearch={(q) => {
                  if (!q.trim()) return;
                  const search = `?q=${encodeURIComponent(q)}`;
                  navigate({ pathname: '/', search });
                }}
                placeholder="搜索文章标题、内容或标签..."
                fireOnMount={false}
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-deep-blue hover:bg-gray-100 transition-colors duration-200"
            aria-label="打开搜索"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 px-3 py-3">
            <SearchBar
              onSearch={(q) => {
                if (!q.trim()) return;
                const search = `?q=${encodeURIComponent(q)}`;
                navigate({ pathname: '/', search });
                setIsMenuOpen(false);
              }}
              placeholder="搜索文章标题、内容或标签..."
              fireOnMount={false}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
