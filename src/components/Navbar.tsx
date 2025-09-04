import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool, Home, Info, Search } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Search className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SEO Blog Hub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            
            <Link to="/create">
              <Button
                variant={isActive('/create') ? 'default' : 'ghost'}
                size="sm"
                className="flex items-center space-x-2"
              >
                <PenTool className="h-4 w-4" />
                <span>Create Post</span>
              </Button>
            </Link>
            
            <Link to="/about">
              <Button
                variant={isActive('/about') ? 'ghost' : 'ghost'}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Info className="h-4 w-4" />
                <span>About</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link to="/create">
              <Button
                variant="default"
                size="sm"
                className="flex items-center space-x-2"
              >
                <PenTool className="h-4 w-4" />
                <span className="hidden sm:inline">Create</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex items-center justify-center space-x-1">
            <Link to="/" className="flex-1">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                className="w-full flex items-center justify-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            
            <Link to="/about" className="flex-1">
              <Button
                variant={isActive('/about') ? 'default' : 'ghost'}
                size="sm"
                className="w-full flex items-center justify-center space-x-2"
              >
                <Info className="h-4 w-4" />
                <span>About</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};