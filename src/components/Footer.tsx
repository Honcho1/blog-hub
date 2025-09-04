import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Search className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Blog Hub
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your ultimate destination for knowledge, strategies, and insights across all topics. Share your expertise and discover new perspectives.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Navigation</h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/create" className="block text-muted-foreground hover:text-primary transition-colors">
                Create Post
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Popular Topics</h3>
            <div className="space-y-2 text-sm">
              <div className="text-muted-foreground">Technology</div>
              <div className="text-muted-foreground">Business</div>
              <div className="text-muted-foreground">Lifestyle</div>
              <div className="text-muted-foreground">Education</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Contact us"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Blog Hub. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;