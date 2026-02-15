import { useNavigate } from '@tanstack/react-router';
import { usePublishedArticles } from '../../hooks/articles/usePublishedArticles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Calendar } from 'lucide-react';

export default function ArticlesListPage() {
  const navigate = useNavigate();
  const { data: articles, isLoading, error } = usePublishedArticles();

  if (isLoading) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Articles</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="text-center text-destructive">
          Failed to load articles. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Articles</h1>
        <p className="text-lg text-muted-foreground">
          Explore our collection of educational articles and study materials.
        </p>
      </div>

      {articles && articles.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">No articles published yet. Check back soon!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article) => (
            <Card key={Number(article.id)} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate({ to: `/articles/${article.id}` })}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-xs">
                  <Calendar className="h-3 w-3" />
                  By {article.author}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {article.content.substring(0, 150)}...
                </p>
                <Button variant="ghost" size="sm" className="w-full">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
