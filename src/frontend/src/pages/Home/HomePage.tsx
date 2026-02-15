import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Mail, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/40">
        <div className="container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Path to Academic Excellence
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Keep Going Classes provides comprehensive education for school academics and competitive exam preparation. 
                Join thousands of students achieving their dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => navigate({ to: '/admissions' })} className="gap-2">
                  Apply for Admission <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate({ to: '/articles' })}>
                  Browse Articles
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/assets/generated/keep-going-classes-hero.dim_1600x600.png" 
                alt="Students learning" 
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What We Offer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive learning resources designed to help you succeed in academics and competitive exams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Quality Articles</CardTitle>
              <CardDescription>
                Access a rich library of educational articles covering various subjects and exam topics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" onClick={() => navigate({ to: '/articles' })} className="gap-2">
                Read Articles <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Expert Guidance</CardTitle>
              <CardDescription>
                Learn from experienced educators dedicated to your academic success and exam preparation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" onClick={() => navigate({ to: '/admissions' })} className="gap-2">
                Join Now <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Stay Connected</CardTitle>
              <CardDescription>
                Get in touch with us for any queries, support, or information about our programs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" onClick={() => navigate({ to: '/contact' })} className="gap-2">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-lg opacity-90">
              Join Keep Going Classes today and take the first step towards achieving your academic goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate({ to: '/admissions' })}
                className="gap-2"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate({ to: '/contact' })}
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
