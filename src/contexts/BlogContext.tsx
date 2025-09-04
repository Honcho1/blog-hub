import React, { createContext, useContext, useEffect, useState } from 'react';
import { BlogPost, BlogContextType } from '../types/blog';
import { processedDemoPosts } from '../data/demoContent';

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Initialize with demo content from localStorage or default
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with demo posts
      const initialPosts: BlogPost[] = processedDemoPosts.map(post => ({
        ...post,
        id: generateId(),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      }));
      setPosts(initialPosts);
      localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
    }
  }, []);

  // Save to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
  }, [posts]);

  // Get unique categories
  const categories = Array.from(new Set(posts.map(post => post.category))).filter(Boolean);
  
  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).filter(Boolean);

  const addPost = (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getFilteredPosts = () => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || 
        post.category === selectedCategory;
      
      const matchesTag = selectedTag === '' || 
        post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  };

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const value: BlogContextType = {
    posts,
    searchQuery,
    selectedCategory,
    selectedTag,
    categories,
    allTags,
    addPost,
    updatePost,
    deletePost,
    setSearchQuery,
    setSelectedCategory,
    setSelectedTag,
    getFilteredPosts,
    getPostById
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};