import { ReactNode } from 'react';
import PrimaryNav from '../navigation/PrimaryNav';
import { SiX, SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'keep-going-classes';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/assets/generated/keep-going-classes-logo.dim_512x512.png" 
              alt="Keep Going Classes" 
              className="h-10 w-10"
            />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground leading-tight">Keep Going Classes</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Academic Excellence & Competitive Exam Preparation</p>
            </div>
          </div>
          <PrimaryNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 mt-auto">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Keep Going Classes</h3>
              <p className="text-sm text-muted-foreground">
                Empowering students with quality education for academics and competitive exams.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
                <li><a href="/articles" className="text-muted-foreground hover:text-foreground transition-colors">Articles</a></li>
                <li><a href="/admissions" className="text-muted-foreground hover:text-foreground transition-colors">Admissions</a></li>
                <li><a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Connect With Us</h3>
              <div className="flex gap-3">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiYoutube className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiFacebook className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiInstagram className="h-5 w-5" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiX className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Keep Going Classes. All rights reserved.</p>
            <p>
              Built with <span className="text-red-500">♥</span> using{' '}
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
