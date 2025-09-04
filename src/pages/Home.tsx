import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import { PostCard } from '../components/PostCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const Home: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTag,
    setSelectedTag,
    categories,
    allTags,
    getFilteredPosts
  } = useBlog();

  const [showFilters, setShowFilters] = useState(false);
  const filteredPosts = getFilteredPosts();

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTag('');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            SEO Blog Hub
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the latest SEO strategies, tips, and insights to boost your online presence and dominate search rankings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        {showFilters && (
          <div className="mb-8 p-6 bg-card border rounded-lg shadow-card">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Tag</label>
                <Select value={selectedTag} onValueChange={setSelectedTag}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Tags</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Clear</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Search: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedTag && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Tag: {selectedTag}</span>
                <button onClick={() => setSelectedTag('')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {hasActiveFilters ? `Search Results (${filteredPosts.length})` : `Latest Blog Posts (${filteredPosts.length})`}
          </h2>
          <p className="text-muted-foreground mt-1">
            {hasActiveFilters 
              ? 'Posts matching your filters'
              : 'Stay updated with the latest SEO strategies and insights'
            }
          </p>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} showActions />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                {hasActiveFilters 
                  ? 'Try adjusting your search terms or filters.'
                  : 'No blog posts available yet.'}
              </p>
            </div>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;