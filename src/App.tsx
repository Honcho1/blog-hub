import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./contexts/BlogContext";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import About from "./pages/About";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BlogProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/edit/:id" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </BlogProvider>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
