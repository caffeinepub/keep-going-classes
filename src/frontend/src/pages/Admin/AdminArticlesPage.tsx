import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAllArticles, useCreateArticle, useUpdateArticle, useDeleteArticle, useSetArticlePublished } from '../../hooks/admin/useAdminArticleMutations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import type { Article } from '../../backend';

export default function AdminArticlesPage() {
  const navigate = useNavigate();
  const { data: articles, isLoading } = useAllArticles();
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const deleteMutation = useDeleteArticle();
  const publishMutation = useSetArticlePublished();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', author: '' });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createMutation.mutateAsync(formData);
      toast.success('Article created successfully!');
      setIsCreateOpen(false);
      setFormData({ title: '', content: '', author: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create article');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await updateMutation.mutateAsync({ id: editingArticle.id, ...formData });
      toast.success('Article updated successfully!');
      setEditingArticle(null);
      setFormData({ title: '', content: '', author: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update article');
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Article deleted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete article');
    }
  };

  const handleTogglePublish = async (article: Article) => {
    try {
      await publishMutation.mutateAsync({ id: article.id, published: !article.published });
      toast.success(article.published ? 'Article unpublished' : 'Article published');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update article status');
    }
  };

  const openEditDialog = (article: Article) => {
    setEditingArticle(article);
    setFormData({ title: article.title, content: article.content, author: article.author });
  };

  const closeEditDialog = () => {
    setEditingArticle(null);
    setFormData({ title: '', content: '', author: '' });
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button variant="ghost" onClick={() => navigate({ to: '/admin' })} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Manage Articles</h1>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
              <DialogDescription>Add a new article for students.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="create-title">Title *</Label>
                <Input
                  id="create-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Article title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-author">Author *</Label>
                <Input
                  id="create-author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-content">Content *</Label>
                <Textarea
                  id="create-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Article content..."
                  rows={10}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creating...' : 'Create Article'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {articles && articles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No articles yet. Create your first article!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {articles?.map((article) => (
            <Card key={Number(article.id)}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <Badge variant={article.published ? 'default' : 'secondary'}>
                        {article.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <CardDescription>By {article.author}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleTogglePublish(article)}
                      disabled={publishMutation.isPending}
                    >
                      {article.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Dialog open={editingArticle?.id === article.id} onOpenChange={(open) => !open && closeEditDialog()}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => openEditDialog(article)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Article</DialogTitle>
                          <DialogDescription>Update article details.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdate} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-title">Title *</Label>
                            <Input
                              id="edit-title"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-author">Author *</Label>
                            <Input
                              id="edit-author"
                              value={formData.author}
                              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-content">Content *</Label>
                            <Textarea
                              id="edit-content"
                              value={formData.content}
                              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                              rows={10}
                              required
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button type="button" variant="outline" onClick={closeEditDialog}>
                              Cancel
                            </Button>
                            <Button type="submit" disabled={updateMutation.isPending}>
                              {updateMutation.isPending ? 'Updating...' : 'Update Article'}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Article</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this article? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(article.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
