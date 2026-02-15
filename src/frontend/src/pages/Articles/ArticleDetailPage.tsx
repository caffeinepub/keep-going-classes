import { useParams, useNavigate } from '@tanstack/react-router';
import { useArticleById } from '../../hooks/articles/useArticleById';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function ArticleDetailPage() {
  const { articleId } = useParams({ from: '/articles/$articleId' });
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleById(BigInt(articleId));

  if (isLoading) {
    return (
      <div className="container py-12 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate({ to: '/articles' })} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate({ to: '/articles' })} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-destructive">Article not found or not published.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate({ to: '/articles' })} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Articles
      </Button>

      {article && (
        <Card>
          <CardHeader className="space-y-4">
            <CardTitle className="text-3xl md:text-4xl">{article.title}</CardTitle>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap">{article.content}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
