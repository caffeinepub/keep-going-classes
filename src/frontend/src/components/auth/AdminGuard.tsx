import { ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAdminStatus } from '../../hooks/admin/useAdminStatus';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { isAdmin, isLoading } = useAdminStatus();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container max-w-2xl py-16">
        <Alert>
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription className="mt-2">
            You need to log in to access this area.
          </AlertDescription>
          <Button 
            onClick={() => login()} 
            className="mt-4"
            disabled={loginStatus === 'logging-in'}
          >
            {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
          </Button>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container max-w-2xl py-16">
        <div className="text-center text-muted-foreground">Verifying permissions...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container max-w-2xl py-16">
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription className="mt-2">
            You do not have permission to access this area. Only administrators can view this content.
          </AlertDescription>
          <Button 
            onClick={() => navigate({ to: '/' })} 
            variant="outline"
            className="mt-4"
          >
            Return to Home
          </Button>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
