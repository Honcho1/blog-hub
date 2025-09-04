import React, { useState } from 'react';
import { Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useToast } from '../hooks/use-toast';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url,
  variant = 'outline',
  size = 'default'
}) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        setOpen(false);
        return true;
      } catch (error) {
        // User cancelled or error occurred
        return false;
      }
    }
    return false;
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "The post link has been copied to your clipboard.",
      });
      
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy the link. Please copy it manually from the address bar.",
        variant: "destructive",
      });
    }
  };

  const handleClick = async () => {
    // Try native share first
    const nativeShareWorked = await handleNativeShare();
    
    // If native share didn't work, open the popover
    if (!nativeShareWorked) {
      setOpen(true);
    }
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size={size}
          onClick={handleClick}
          className="flex items-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Share this article</h4>
            <p className="text-sm text-muted-foreground">
              Choose how you'd like to share this post
            </p>
          </div>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleCopyLink}
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={shareOnTwitter}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Share on Twitter
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={shareOnLinkedIn}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Share on LinkedIn
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={shareOnFacebook}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Share on Facebook
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};