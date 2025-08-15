import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export default function AppLayout({ children, showSidebar = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Main Content */}
        <main className={`flex-1 ${showSidebar ? 'pr-4' : ''}`}>
          {children}
        </main>

        {/* Sidebar - Clean layout without ads */}
        {showSidebar && (
          <aside className="w-80 flex-shrink-0 p-4 border-l border-border">
            {/* Clean sidebar content */}
          </aside>
        )}
      </div>
    </div>
  );
}