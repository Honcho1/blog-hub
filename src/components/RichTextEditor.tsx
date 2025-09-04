import React, { useState, useRef } from 'react';
import { Bold, Italic, Underline, Heading1, Heading2, Heading3, Link, List, ListOrdered } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = "Start writing your blog post..."
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditorFocused, setIsEditorFocused] = useState(false);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertHeading = (level: number) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const headingTag = `h${level}`;
      
      // If we're in a heading, just change it
      let currentHeading = range.commonAncestorContainer;
      while (currentHeading && currentHeading.nodeType !== Node.ELEMENT_NODE) {
        currentHeading = currentHeading.parentNode;
      }
      
      if (currentHeading && (currentHeading as Element).tagName?.toLowerCase().match(/^h[1-6]$/)) {
        const newHeading = document.createElement(headingTag);
        newHeading.innerHTML = (currentHeading as Element).innerHTML;
        (currentHeading as Element).parentNode?.replaceChild(newHeading, currentHeading as Element);
      } else {
        // Create new heading
        executeCommand('formatBlock', headingTag);
      }
      
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border rounded-lg bg-background">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('italic')}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('underline')}
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertHeading(1)}
            className="h-8 w-8 p-0"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertHeading(2)}
            className="h-8 w-8 p-0"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertHeading(3)}
            className="h-8 w-8 p-0"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('insertUnorderedList')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('insertOrderedList')}
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={insertLink}
            className="h-8 w-8 p-0"
          >
            <Link className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className={`min-h-[400px] p-4 outline-none blog-content ${
          isEditorFocused ? 'ring-2 ring-ring ring-offset-2' : ''
        }`}
        onInput={handleInput}
        onFocus={() => setIsEditorFocused(true)}
        onBlur={() => setIsEditorFocused(false)}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: content }}
        data-placeholder={placeholder}
        style={{
          minHeight: '400px'
        }}
      />
      
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          cursor: text;
        }
      `}</style>
    </div>
  );
};