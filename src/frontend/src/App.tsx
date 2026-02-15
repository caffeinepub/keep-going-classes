import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/Home/HomePage';
import ArticlesListPage from './pages/Articles/ArticlesListPage';
import ArticleDetailPage from './pages/Articles/ArticleDetailPage';
import AdmissionsPage from './pages/Admissions/AdmissionsPage';
import ContactPage from './pages/Contact/ContactPage';
import CoursesExamsPage from './pages/CoursesExams/CoursesExamsPage';
import YouTubePage from './pages/YouTube/YouTubePage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import AdminArticlesPage from './pages/Admin/AdminArticlesPage';
import AdminAdmissionsPage from './pages/Admin/AdminAdmissionsPage';
import AdminGuard from './components/auth/AdminGuard';
import ProfileSetupModal from './components/auth/ProfileSetupModal';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
      <ProfileSetupModal />
    </>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const articlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/articles',
  component: ArticlesListPage,
});

const articleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/articles/$articleId',
  component: ArticleDetailPage,
});

const admissionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admissions',
  component: AdmissionsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const coursesExamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/courses-exams',
  component: CoursesExamsPage,
});

const youtubeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/youtube',
  component: YouTubePage,
});

// Admin routes (protected)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminGuard>
      <AdminDashboardPage />
    </AdminGuard>
  ),
});

const adminArticlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/articles',
  component: () => (
    <AdminGuard>
      <AdminArticlesPage />
    </AdminGuard>
  ),
});

const adminAdmissionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/admissions',
  component: () => (
    <AdminGuard>
      <AdminAdmissionsPage />
    </AdminGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  articlesRoute,
  articleDetailRoute,
  admissionsRoute,
  contactRoute,
  coursesExamsRoute,
  youtubeRoute,
  adminRoute,
  adminArticlesRoute,
  adminAdmissionsRoute,
]);

// Get base path from environment, ensuring it works for both root and subpath hosting
const basePath = import.meta.env.BASE_URL || '/';

const router = createRouter({ 
  routeTree,
  basepath: basePath,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
