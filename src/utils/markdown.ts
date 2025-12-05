import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { TableOfContents } from '../types/blog';

// Markdown parser configuration as defined in technical architecture
export interface MarkdownConfig {
  html: boolean;
  linkify: boolean;
  typographer: boolean;
  highlight: (code: string, lang: string) => string;
}

// Create markdown parser instance
export const createMarkdownParser = (): MarkdownIt => {
  return new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (code: string, lang: string): string => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(code, { language: lang }).value;
        } catch (error) {
          console.warn(`Failed to highlight code for language: ${lang}`, error);
        }
      }
      return hljs.highlightAuto(code).value;
    }
  });
};

// Extract table of contents from markdown content
export const extractTableOfContents = (content: string): TableOfContents[] => {
  const headings: TableOfContents[] = [];
  const lines = content.split('\n');
  
  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      const tocItem: TableOfContents = {
        id,
        text,
        level
      };
      
      // Build hierarchical structure
      if (level === 1) {
        headings.push(tocItem);
      } else {
        const parent = findParentHeadings(headings, level - 1);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(tocItem);
        } else {
          headings.push(tocItem);
        }
      }
    }
  });
  
  return headings;
};

// Helper function to find parent heading
const findParentHeadings = (headings: TableOfContents[], targetLevel: number): TableOfContents | null => {
  for (let i = headings.length - 1; i >= 0; i--) {
    if (headings[i].level === targetLevel) {
      return headings[i];
    }
    if (headings[i].children) {
      const found = findParentHeadings(headings[i].children!, targetLevel);
      if (found) return found;
    }
  }
  return null;
};

// Calculate reading time (in minutes)
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Extract excerpt from content (first 150 characters)
export const extractExcerpt = (content: string, maxLength: number = 150): string => {
  // Remove markdown syntax
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
};

// Parse markdown content and return HTML
export const parseMarkdown = (content: string): string => {
  const parser = createMarkdownParser();
  return parser.render(content);
};

// Generate unique slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Format date to readable format
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};