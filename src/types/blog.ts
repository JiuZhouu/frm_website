// Article data structure as defined in technical architecture
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readingTime: number;
  coverImage?: string;
  author?: string;
}

// Table of contents structure
export interface TableOfContents {
  id: string;
  text: string;
  level: number;
  children?: TableOfContents[];
}

// Category structure
export interface Category {
  name: string;
  count: number;
  slug: string;
}

// Search result structure
export interface SearchResult {
  posts: BlogPost[];
  query: string;
  totalCount: number;
}

// Blog metadata
export interface BlogMetadata {
  title: string;
  description: string;
  author: string;
  url: string;
  language: string;
}