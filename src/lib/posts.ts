import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  heroImage?: string;
  imageAlt?: string;
  video?: string;
  content: string;
  seoTitle?: string;
  keywords?: string[];
  category?: string;
  subtitle?: string;
  ctaLabel?: string;
  bookingUrl?: string;
};

// Simple frontmatter parser
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\r?\n([\s\S]*?)\r?\n---/;
  const match = frontmatterRegex.exec(fileContent);
  
  if (!match) return { data: {}, content: fileContent };

  const frontmatterRaw = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  
  const data: Record<string, string> = {};
  frontmatterRaw.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    // Remove surrounding quotes if they exist
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    data[key] = value;
  });

  return { data, content };
}

export function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export function sanitizeTitle(title: string): string {
  if (!title) return '';
  let clean = title.replace(/\s*-\s*Provisor\s*$/i, '').trim();
  clean = clean.replace(/[:\-]+$/, '').trim();
  clean = clean.replace(/\s*\|\s*ProVisor\s*\|\s*Rob\s*Miller\s*$/i, '').trim();
  clean = clean.replace(/\s*\|\s*Rob\s*Miller\s*\|\s*ProVisor\s*$/i, '').trim();
  clean = clean.replace(/\s*\|\s*Rob\s*Miller\s*$/i, '').trim();
  clean = clean.replace(/\s*\|\s*ProVisor\s*$/i, '').trim();
  return clean;
}

export function getSortedPostsData(): Omit<BlogPost, 'content'>[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = parseFrontmatter(fileContents);

    return {
      slug,
      title: sanitizeTitle(data.title || 'Untitled'),
      description: decodeHtmlEntities(data.description || ''),
      date: data.date || '2026-01-01',
      image: data.image || '',
      heroImage: data.heroImage || '',
      video: data.video || '',
      seoTitle: data.seoTitle || '',
      keywords: data.keywords ? data.keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [],
      category: data.category || '',
      subtitle: data.subtitle || '',
      ctaLabel: data.ctaLabel || '',
      bookingUrl: data.bookingUrl || '',
    };
  });

  // Filter out future-dated posts — they are scheduled and will auto-publish on their date
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Include posts dated today
  const publishedPosts = allPostsData.filter(post => {
    const postDate = new Date(post.date);
    return postDate <= today;
  });

  return publishedPosts.sort((a, b) => {
    // Primary: newest first
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    // Secondary: alphabetical by slug for a fully stable, deterministic order
    return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
  });
}

export function getPostData(slug: string): BlogPost | null {
  if (!fs.existsSync(postsDirectory)) return null;
  
  const fileNames = fs.readdirSync(postsDirectory);
  
  const targetFileName = fileNames.find(fileName => {
    const fileNameSlug = fileName.replace(/\.mdx$/, '');
    try {
      return decodeURIComponent(fileNameSlug) === decodeURIComponent(slug);
    } catch {
      return fileNameSlug === slug;
    }
  });

  if (!targetFileName) return null;

  const fullPath = path.join(postsDirectory, targetFileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = parseFrontmatter(fileContents);

  return {
    slug,
    title: sanitizeTitle(data.title || 'Untitled'),
    description: decodeHtmlEntities(data.description || ''),
    date: data.date || '2026-01-01',
    image: data.image || '',
    heroImage: data.heroImage || undefined,
    imageAlt: data.imageAlt || undefined,
    video: data.video || undefined,
    content,
    seoTitle: data.seoTitle || '',
    keywords: data.keywords ? data.keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [],
    category: data.category || '',
    subtitle: data.subtitle || '',
    ctaLabel: data.ctaLabel || '',
    bookingUrl: data.bookingUrl || '',
  };
}
