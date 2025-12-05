import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: '#' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-deep-blue mb-4">About This Blog</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A personal blog dedicated to sharing technical knowledge, programming insights, 
              and development experiences. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-deep-blue mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-light-blue transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-light-blue transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="/rss" className="text-gray-600 hover:text-light-blue transition-colors duration-200">
                  RSS Feed
                </a>
              </li>
              <li>
                <a href="/sitemap" className="text-gray-600 hover:text-light-blue transition-colors duration-200">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-deep-blue mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-light-blue transition-colors duration-200"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>© {currentYear} Personal Blog</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by the author.</span>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Powered by React, TypeScript, and Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;