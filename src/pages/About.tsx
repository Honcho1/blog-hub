import React from 'react';
import { Search, Target, Users, TrendingUp, BookOpen, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About Blog Hub
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your ultimate destination for knowledge, strategies, and insights across all topics.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're dedicated to democratizing knowledge sharing and empowering individuals and businesses of all sizes 
              to achieve success through effective content creation and knowledge exchange.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Expert Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cutting-edge strategies and tactics backed by real-world experience and data-driven results across various industries.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Practical Guides</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Step-by-step tutorials and actionable guides that you can implement immediately to see results.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <CardTitle>Latest Trends</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay ahead of the curve with insights on algorithm updates, industry trends, and emerging strategies.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We Cover Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">What We Cover</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From fundamentals to advanced strategies, we cover every aspect of knowledge sharing and content creation across multiple domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Technical SEO</h3>
                  <p className="text-muted-foreground">
                    Site speed optimization, crawlability, indexing, schema markup, and core web vitals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Content Strategy</h3>
                  <p className="text-muted-foreground">
                    Keyword research, content planning, optimization techniques, and content marketing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-success/10 rounded-lg flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Link Building</h3>
                  <p className="text-muted-foreground">
                    Authority building, backlink strategies, relationship building, and link earning tactics.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-warning/10 rounded-lg flex-shrink-0">
                  <Award className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Local SEO</h3>
                  <p className="text-muted-foreground">
                    Google My Business optimization, local citations, reviews, and location-based strategies.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Analytics & Tracking</h3>
                  <p className="text-muted-foreground">
                    Performance measurement, conversion tracking, ROI analysis, and reporting strategies.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">SEO Tools</h3>
                  <p className="text-muted-foreground">
                    Tool reviews, tutorials, automation strategies, and cost-effective alternatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="text-center bg-gradient-card rounded-lg p-12 shadow-card">
          <h2 className="text-4xl font-bold text-foreground mb-4">Join Our Community</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Blog Hub is more than just a blog—it's a community of creators, entrepreneurs, 
            and knowledge enthusiasts sharing insights and growing together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Articles Published</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">50K+</div>
              <div className="text-muted-foreground">Monthly Readers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;