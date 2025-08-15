import React, { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';

interface AdsterraBannerProps {
  publisherId?: string;
  width?: number;
  height?: number;
  format?: 'iframe' | 'js';
  className?: string;
}

export default function AdsterraBanner({ 
  publisherId = "demo-publisher-id", 
  width = 728, 
  height = 90,
  format = 'iframe',
  className = ""
}: AdsterraBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!adRef.current || scriptLoaded.current) return;

    const loadAdsterraScript = () => {
      // Create Adsterra ad configuration
      const adOptions = {
        key: publisherId,
        format: format,
        height: height,
        width: width,
        params: {}
      };

      // Add ad options to global scope
      (window as any).atOptions = adOptions;

      // Create and load Adsterra script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//www.topcreativeformat.com/${publisherId}/invoke.js`;
      script.async = true;
      
      script.onload = () => {
        console.log('Adsterra ad script loaded successfully');
      };
      
      script.onerror = () => {
        console.warn('Adsterra ad script failed to load');
        // Show fallback content
        if (adRef.current) {
          adRef.current.innerHTML = `
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg text-center">
              <div class="text-sm font-semibold">Adsterra Ad Space</div>
              <div class="text-xs opacity-90 mt-1">${width}x${height} Banner • Configure Publisher ID</div>
            </div>
          `;
        }
      };

      if (adRef.current) {
        adRef.current.appendChild(script);
      }
      
      scriptLoaded.current = true;
    };

    // Load script after a short delay to ensure DOM is ready
    const timeout = setTimeout(loadAdsterraScript, 100);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [publisherId, width, height, format]);

  // Determine responsive classes based on ad size
  const getResponsiveClasses = () => {
    if (width <= 320) return "block"; // Mobile banner
    if (width <= 728) return "hidden md:block"; // Desktop only
    return "hidden lg:block"; // Large desktop only
  };

  return (
    <div className={`adsterra-banner ${getResponsiveClasses()} ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className="text-xs">
          Adsterra • CPM $2-8
        </Badge>
        <span className="text-xs text-gray-500">{width}x{height}</span>
      </div>
      
      <div 
        ref={adRef}
        className="min-h-[90px] flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg"
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
      >
        {/* Loading placeholder */}
        <div className="text-center text-gray-400">
          <div className="animate-pulse">
            <div className="text-sm font-medium">Loading Adsterra Ad...</div>
            <div className="text-xs mt-1">High CPM Network</div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 mt-1 text-center">
        Powered by Adsterra
      </div>
    </div>
  );
}

// Predefined Adsterra banner configurations
export const AdsterraBannerConfigs = {
  leaderboard: { width: 728, height: 90 },
  mobile: { width: 320, height: 50 },
  medium: { width: 300, height: 250 },
  large: { width: 336, height: 280 },
  skyscraper: { width: 160, height: 600 }
};

// Responsive Adsterra Banner that adapts to screen size
export function ResponsiveAdsterraBanner({ publisherId, className }: { publisherId?: string; className?: string }) {
  return (
    <div className={className}>
      {/* Desktop: Leaderboard */}
      <div className="hidden lg:block">
        <AdsterraBanner 
          publisherId={publisherId}
          width={AdsterraBannerConfigs.leaderboard.width}
          height={AdsterraBannerConfigs.leaderboard.height}
        />
      </div>
      
      {/* Tablet: Medium Rectangle */}
      <div className="hidden md:block lg:hidden">
        <AdsterraBanner 
          publisherId={publisherId}
          width={AdsterraBannerConfigs.medium.width}
          height={AdsterraBannerConfigs.medium.height}
        />
      </div>
      
      {/* Mobile: Mobile Banner */}
      <div className="block md:hidden">
        <AdsterraBanner 
          publisherId={publisherId}
          width={AdsterraBannerConfigs.mobile.width}
          height={AdsterraBannerConfigs.mobile.height}
        />
      </div>
    </div>
  );
}