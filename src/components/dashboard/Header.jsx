import Logo from '@/assets/netflix-logo.png';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <img src={Logo} alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Content Explorer</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Performance Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
          </div>
        </div>
      </div>
    </header>
  );
}