import { BlogPost, Category } from '../types/blog';
import { generateSlug, calculateReadingTime, extractExcerpt, formatDate } from '../utils/markdown';
import { loadContentPosts } from './contentLoader';

const mockBlogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-react-typescript',
    title: 'Getting Started with React and TypeScript',
    excerpt: 'Learn how to set up a modern React project with TypeScript for better development experience and type safety.',
    content: `# Getting Started with React and TypeScript

TypeScript has become an essential tool for modern React development. In this post, we'll explore how to set up a React project with TypeScript and understand the benefits it brings to your development workflow.

## Why TypeScript?

TypeScript provides static typing, which helps catch errors at compile time rather than runtime. This leads to more robust applications and better developer experience with enhanced IDE support.

### Key Benefits

- **Type Safety**: Catch errors early in development
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as documentation
- **Improved Team Collaboration**: Clear interfaces and contracts

## Setting Up Your Project

The easiest way to start a React TypeScript project is using Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

This command sets up everything you need, including:

- TypeScript configuration
- React type definitions
- Development server with hot reloading
- Build optimization

## Basic TypeScript Concepts

### Interfaces

Interfaces define the shape of objects:

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
}
\`\`\`

### Type Aliases

Type aliases create custom types:

\`\`\`typescript
type Status = 'loading' | 'success' | 'error';
\`\`\`

### Generics

Generics provide reusable type-safe components:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## React with TypeScript

### Function Components

\`\`\`typescript
interface Props {
  title: string;
  count?: number;
}

const MyComponent: React.FC<Props> = ({ title, count = 0 }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
    </div>
  );
};
\`\`\`

### Hooks with TypeScript

\`\`\`typescript
const [user, setUser] = useState<User | null>(null);
const inputRef = useRef<HTMLInputElement>(null);
\`\`\`

## Best Practices

1. **Use strict mode**: Enable strict TypeScript configuration
2. **Avoid any**: Use specific types instead of 'any'
3. **Leverage inference**: Let TypeScript infer types when possible
4. **Create custom hooks**: Encapsulate logic with proper typing
5. **Use discriminated unions**: For better state management

## Conclusion

TypeScript significantly improves the React development experience by providing type safety and better tooling support. While there's a learning curve, the benefits far outweigh the initial investment.

Start with basic types and gradually adopt more advanced features as you become comfortable with the syntax and concepts.`,
    category: 'React',
    tags: ['React', 'TypeScript', 'Frontend', 'Tutorial'],
    date: '2024-01-15',
    readingTime: 8,
    author: 'John Doe'
  },
  {
    slug: 'modern-css-techniques',
    title: 'Modern CSS Techniques for Better Web Design',
    excerpt: 'Explore modern CSS features like Grid, Flexbox, and custom properties that can enhance your web design workflow.',
    content: `# Modern CSS Techniques for Better Web Design

CSS has evolved significantly over the years, introducing powerful features that make web design more efficient and flexible. Let's explore some of the most impactful modern CSS techniques.

## CSS Grid Layout

CSS Grid provides a two-dimensional layout system that makes complex layouts surprisingly simple.

### Basic Grid Setup

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

### Responsive Grid

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}
\`\`\`

## Flexbox for One-Dimensional Layouts

Flexbox excels at distributing space along a single axis.

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## CSS Custom Properties (Variables)

Custom properties make your CSS more maintainable and dynamic.

\`\`\`css
:root {
  --primary-color: #3498db;
  --spacing-unit: 1rem;
  --border-radius: 4px;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
  border-radius: var(--border-radius);
}
\`\`\`

## Modern Selectors

### :is() and :where()

These pseudo-classes simplify complex selectors:

\`\`\`css
:is(h1, h2, h3) span {
  color: blue;
}

/* Same as: */
h1 span,
h2 span,
h3 span {
  color: blue;
}
\`\`\`

### :has() - The Parent Selector

\`\`\`css
.card:has(.highlight) {
  border-color: gold;
}
\`\`\`

## Container Queries

Container queries allow styling based on container size rather than viewport:

\`\`\`css
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
\`\`\`

## Logical Properties

Logical properties provide better internationalization support:

\`\`\`css
.element {
  margin-inline-start: 1rem; /* instead of margin-left */
  margin-inline-end: 1rem;   /* instead of margin-right */
  padding-block: 2rem;        /* padding-top + padding-bottom */
}
\`\`\`

## Modern Color Functions

### oklch() for Better Color Manipulation

\`\`\`css
.element {
  background: oklch(0.7 0.15 180);
}
\`\`\`

### color-mix()

\`\`\`css
.element {
  background: color-mix(in srgb, #3498db 50%, white);
}
\`\`\`

## Cascade Layers

Control the cascade with @layer:

\`\`\`css
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; }
}

@layer components {
  .button { /* styles */ }
}
\`\`\`

## Conclusion

These modern CSS features significantly improve the developer experience and enable more sophisticated designs with less code. Start incorporating them into your projects gradually, and you'll find your CSS becoming more maintainable and powerful.`,
    category: 'CSS',
    tags: ['CSS', 'Web Design', 'Frontend', 'Layout'],
    date: '2024-01-20',
    readingTime: 10,
    author: 'Jane Smith'
  },
  {
    slug: 'javascript-performance-optimization',
    title: 'JavaScript Performance Optimization Techniques',
    excerpt: 'Learn practical techniques to optimize your JavaScript code for better performance and user experience.',
    content: `# JavaScript Performance Optimization Techniques

Performance optimization is crucial for creating fast, responsive web applications. This guide covers essential techniques to improve your JavaScript code performance.

## Understanding Performance Bottlenecks

Before optimizing, identify where your code is slow:

- Use browser DevTools Performance tab
- Monitor memory usage
- Track CPU utilization
- Measure network requests

## Code-Level Optimizations

### 1. Minimize DOM Manipulations

DOM operations are expensive. Batch them when possible:

\`\`\`javascript
// Bad
for (let i = 0; i < 1000; i++) {
  document.body.innerHTML += '<div>' + i + '</div>';
}

// Good
let html = '';
for (let i = 0; i < 1000; i++) {
  html += '<div>' + i + '</div>';
}
document.body.innerHTML = html;
\`\`\`

### 2. Use Efficient Data Structures

Choose the right data structure for your use case:

\`\`\`javascript
// For frequent lookups
const userMap = new Map();
userMap.set(userId, userData);

// For unique values
const uniqueTags = new Set();
\`\`\`

### 3. Debouncing and Throttling

Control function execution frequency:

\`\`\`javascript
// Debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage
const debouncedSearch = debounce(searchFunction, 300);
input.addEventListener('input', debouncedSearch);
\`\`\`

## Memory Management

### 1. Avoid Memory Leaks

Clean up event listeners and references:

\`\`\`javascript
// Remove event listeners
element.removeEventListener('click', handler);

// Clear intervals/timeouts
clearInterval(intervalId);
clearTimeout(timeoutId);

// Null out references
largeObject = null;
\`\`\`

### 2. Use WeakMap for Metadata

\`\`\`javascript
const metadata = new WeakMap();

function addMetadata(object, data) {
  metadata.set(object, data);
  // Object can still be garbage collected
}
\`\`\`

## Asynchronous Programming

### 1. Use Async/Await

Cleaner than promises for sequential operations:

\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchPostComments(posts[0].id);
    return { user, posts, comments };
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
\`\`\`

### 2. Parallel Requests

Use Promise.all for concurrent operations:

\`\`\`javascript
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);
\`\`\`

## Bundle Optimization

### 1. Code Splitting

Split your code into smaller chunks:

\`\`\`javascript
// Dynamic import
const heavyModule = await import('./heavyModule.js');
heavyModule.doSomething();
\`\`\`

### 2. Tree Shaking

Remove unused code from bundles:

\`\`\`javascript
// Use ES6 modules
export function usedFunction() { }
export function unusedFunction() { }
\`\`\`

## Caching Strategies

### 1. Memoization

Cache function results:

\`\`\`javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveFunction = memoize(heavyCalculation);
\`\`\`

### 2. Service Worker Caching

Implement offline capabilities:

\`\`\`javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
\`\`\`

## Rendering Performance

### 1. Virtual Scrolling

For large lists, render only visible items:

\`\`\`javascript
// Use libraries like react-window or vue-virtual-scroller
import { FixedSizeList } from 'react-window';

const List = ({ items }) => (
  <FixedSizeList
    height={400}
    itemCount={items.length}
    itemSize={35}
    width={300}
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index]}
      </div>
    )}
  </FixedSizeList>
);
\`\`\`

### 2. Web Workers

Offload heavy computations:

\`\`\`javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ data: largeDataset });
worker.onmessage = (e) => {
  console.log('Processed data:', e.data);
};

// worker.js
self.onmessage = function(e) {
  const result = heavyProcessing(e.data);
  self.postMessage(result);
};
\`\`\`

## Conclusion

Performance optimization is an ongoing process. Start with the biggest bottlenecks, measure the impact of your changes, and iterate. Remember that premature optimization can lead to unnecessary complexity, so optimize based on actual performance data.`,
    category: 'JavaScript',
    tags: ['JavaScript', 'Performance', 'Optimization', 'Best Practices'],
    date: '2024-01-25',
    readingTime: 12,
    author: 'Mike Johnson'
  }
];

export class BlogService {
  private posts: BlogPost[] = [];
  private popularTags: string[] = [
    'FRM一级',
    'FRM',
    '风险管理',
    '量化',
    '投资',
    '工具',
    '笔记',
  ];

  constructor() {
    const loaded = loadContentPosts();
    this.posts = loaded.length ? loaded : mockBlogPosts;
  }

  getAllPosts(): BlogPost[] {
    return this.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts.find(post => post.slug === slug);
  }

  getPostsByCategory(category: string): BlogPost[] {
    return this.posts
      .filter(post => post.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getCategories(): Category[] {
    const categoryMap = new Map<string, number>();
    
    this.posts.forEach(post => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
      slug: encodeURIComponent(name)
    }));
  }

  searchPosts(query: string): BlogPost[] {
    const lowercaseQuery = query.toLowerCase();
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
    return this.posts
      .filter(post => 
        post.slug !== currentPost.slug && 
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, limit);
  }

  getRecentPosts(limit: number = 5): BlogPost[] {
    return this.posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  getPostsByTag(tag: string): BlogPost[] {
    const norm = (s: string) => s
      .normalize('NFKC')
      .toLowerCase()
      .trim();
    const target = norm(tag);
    return this.posts
      .filter(post => post.tags.some(t => norm(t) === target))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getAllTags(): string[] {
    const tags = new Set<string>();
    this.posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  getPopularTags(): string[] {
    return this.popularTags;
  }
}

// Create singleton instance
export const blogService = new BlogService();
