import { ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAdminStatus } from '../../hooks/admin/useAdminStatus';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { identity, login, loginStatus, isInitializing } = useInternetIdentity();
  const { isAdmin, isLoading: isAdminLoading } = useAdminStatus();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Show loading state while initializing or checking admin status
  if (isInitializing || (isAuthenticated && isAdminLoading)) {
    return (
      <div className="container max-w-2xl py-16" data-testid="admin-guard-loading">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Verifying permissions...</span>
        </div>
      </div>
    );
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return (
      <div className="container max-w-2xl py-16" data-testid="admin-guard-login-required">
        <Alert>
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription className="mt-2">
            You need to log in to access this area.
          </AlertDescription>
          <Button 
            onClick={() => login()} 
            className="mt-4"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </Alert>
      </div>
    );
  }

  // Authenticated but not admin - show access denied
  if (!isAdmin) {
    return (
      <div className="container max-w-2xl py-16" data-testid="admin-guard-access-denied">
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

  // Authenticated and admin - render protected content
  return <>{children}</>;
}
