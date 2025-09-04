import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import { RichTextEditor } from '../components/RichTextEditor';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addPost, updatePost, getPostById, categories: existingCategories } = useBlog();
  const { toast } = useToast();

  const isEditing = Boolean(id);
  const existingPost = isEditing ? getPostById(id!) : null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing post data for editing
  useEffect(() => {
    if (isEditing && existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setCategory(existingPost.category);
      setTags(existingPost.tags);
    }
  }, [isEditing, existingPost]);

  const generateExcerpt = (htmlContent: string): string => {
    const plainText = htmlContent.replace(/<[^>]*>/g, '').replace(/\*/g, '');
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  };

  const calculateReadTime = (htmlContent: string): number => {
    const plainText = htmlContent.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(' ').filter(word => word.length > 0).length;
    return Math.ceil(wordCount / 200); // 200 words per minute average
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !category.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (title, content, and category).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        title: title.trim(),
        content,
        excerpt: generateExcerpt(content),
        category: category.trim(),
        tags,
        readTime: calculateReadTime(content)
      };

      if (isEditing && id) {
        updatePost(id, postData);
        toast({
          title: "Post Updated",
          description: "Your blog post has been successfully updated.",
        });
      } else {
        addPost(postData);
        toast({
          title: "Post Created",
          description: "Your blog post has been successfully created.",
        });
      }

      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Update your blog post' : 'Share your knowledge with the community across any topic or industry'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Card>
            <CardHeader>
              <CardTitle>Post Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Enter your blog post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
                required
              />
            </CardContent>
          </Card>

          {/* Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="e.g. Technology, Business, Lifestyle..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  list="categories"
                  required
                />
                <datalist id="categories">
                  {existingCategories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button type="button" onClick={addTag} variant="outline" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your blog post content..."
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 shadow-button"
            >
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;