import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-4">
        {/* Bottom */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>© {currentYear} 个人博客</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>作者保留所有权利。</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
