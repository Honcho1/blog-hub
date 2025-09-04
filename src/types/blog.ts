export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  readTime: number;
}

export interface BlogContextType {
  posts: BlogPost[];
  searchQuery: string;
  selectedCategory: string;
  selectedTag: string;
  categories: string[];
  allTags: string[];
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedTag: (tag: string) => void;
  getFilteredPosts: () => BlogPost[];
  getPostById: (id: string) => BlogPost | undefined;
}