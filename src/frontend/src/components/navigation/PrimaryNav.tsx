import { useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAdminStatus } from '../../hooks/admin/useAdminStatus';

export default function PrimaryNav() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { identity } = useInternetIdentity();
  const { isAdmin } = useAdminStatus();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Articles', path: '/articles' },
    { label: 'Courses & Exams', path: '/courses-exams' },
    { label: 'YouTube', path: '/youtube' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Contact', path: '/contact' },
  ];

  // Only add Admin link if user is authenticated and is an admin
  if (identity && isAdmin) {
    navItems.push({ label: 'Admin', path: '/admin' });
  }

  const handleNavigate = (path: string) => {
    navigate({ to: path });
    setOpen(false);
  };

  return (
    <nav className="flex items-center gap-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={currentPath === item.path ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleNavigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <LoginButton />

      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex flex-col gap-4 mt-8">
            {navItems.map((item) => (
              <SheetClose asChild key={item.path}>
                <Button
                  variant={currentPath === item.path ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </Button>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
