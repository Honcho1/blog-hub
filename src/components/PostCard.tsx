import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, Edit, Trash2 } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useBlog } from '../contexts/BlogContext';

interface PostCardProps {
  post: BlogPost;
  showActions?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, showActions = false }) => {
  const { deletePost } = useBlog();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 bg-gradient-card border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="mb-2">
            {post.category}
          </Badge>
          {showActions && (
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link to={`/edit/${post.id}`}>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit className="h-3 w-3" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-destructive hover:text-destructive" 
                onClick={handleDelete}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        <Link to={`/post/${post.id}`}>
          <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pb-4">
        <Link to={`/post/${post.id}`}>
          <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        </Link>

        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};