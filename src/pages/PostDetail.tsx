import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Edit, Trash2 } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { ShareButton } from '../components/ShareButton';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, deletePost } = useBlog();
  const { toast } = useToast();

  const post = id ? getPostById(id) : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      deletePost(post.id);
      toast({
        title: "Post Deleted",
        description: "The blog post has been successfully deleted.",
      });
      navigate('/');
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 max-w-4xl">
        <header className="mb-8">
          {/* Category */}
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Published {formatDate(post.createdAt)}</span>
            </div>
            {post.updatedAt !== post.createdAt && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Updated {formatDate(post.updatedAt)}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center space-x-1">
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pb-8 border-b">
            <Link to={`/edit/${post.id}`}>
              <Button variant="outline" className="flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            </Link>
            <ShareButton
              title={post.title}
              text={post.excerpt}
              url={window.location.href}
              variant="outline"
            />
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div 
            className="blog-content text-foreground leading-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Article Footer */}
        <footer className="border-t pt-8 mb-8">
          <div className="bg-gradient-card rounded-lg p-6 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Found this article helpful?
            </h3>
            <p className="text-muted-foreground mb-4">
              Share it with others who might benefit from these SEO insights.
            </p>
            <div className="flex space-x-3">
              <ShareButton
                title={post.title}
                text={post.excerpt}
                url={window.location.href}
                variant="default"
              />
              <Link to="/">
                <Button variant="outline">
                  Read More Articles
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default PostDetail;