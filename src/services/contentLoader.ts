import { BlogPost } from '../types/blog'
import { calculateReadingTime, extractExcerpt, generateSlug } from '../utils/markdown'

const files = import.meta.glob('/content/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const parseFrontmatter = (raw: string) => {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!fmMatch) return { data: {}, body: raw }
  const block = fmMatch[1]
  const body = raw.slice(fmMatch[0].length)
  const data: Record<string, string | string[]> = {}
  block.split('\n').forEach(line => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value.slice(1, -1).split(',').map(v => v.trim()).filter(Boolean)
    } else {
      data[key] = value
    }
  })
  return { data, body }
}

const titleFromContent = (body: string) => {
  const m = body.match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : '未命名文章'
}

export const loadContentPosts = (): BlogPost[] => {
  const entries = Object.entries(files)
  return entries.map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    const title = (data.title as string) || titleFromContent(body)
    const slugFromPath = path.replace(/^.*\//, '').replace(/\.md$/, '')
    const base = slugFromPath || title
    let slug = generateSlug(base)
    if (!slug) {
      slug = base.trim()
    }
    const content = body
    const category = (data.category as string) || 'General'
    const tags = (data.tags as string[]) || []
    const date = (data.date as string) || new Date().toISOString().slice(0, 10)
    const author = (data.author as string) || undefined
    const coverImage = (data.coverImage as string) || undefined
    const readingTime = calculateReadingTime(content)
    const excerpt = extractExcerpt(content)
    return { slug, title, excerpt, content, category, tags, date, readingTime, coverImage, author }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
