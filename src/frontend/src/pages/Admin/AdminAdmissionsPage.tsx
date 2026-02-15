import { useNavigate } from '@tanstack/react-router';
import { useAdmissionRequests, useDeleteAdmissionRequest } from '../../hooks/admissions/useAdmissionRequests';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { ArrowLeft, Mail, Archive } from 'lucide-react';

export default function AdminAdmissionsPage() {
  const navigate = useNavigate();
  const { data: requests, isLoading } = useAdmissionRequests();
  const deleteMutation = useDeleteAdmissionRequest();

  const handleArchive = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Request archived successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to archive request');
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate({ to: '/admin' })} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Admission Requests</h1>
        <p className="text-muted-foreground">
          Review and manage student admission applications.
        </p>
      </div>

      {requests && requests.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No admission requests yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests?.map((request) => (
            <Card key={Number(request.id)}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{request.name}</CardTitle>
                      <Badge>{request.program}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {request.email}
                    </CardDescription>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Archive className="h-4 w-4" />
                        Archive
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Archive Request</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to archive this admission request? This will remove it from the list.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleArchive(request.id)}>
                          Archive
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Motivation:</h4>
                    <p className="text-sm text-muted-foreground">{request.motivation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
