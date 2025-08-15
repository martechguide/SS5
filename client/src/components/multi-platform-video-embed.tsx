import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
// VideoProtectionSystem not needed as we have custom protection
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, SkipBack, SkipForward } from "lucide-react";
import VideoSeekControls, { useVideoSeekControls } from "./video-seek-controls";

export type VideoPlatform = 'youtube' | 'vimeo' | 'facebook' | 'dailymotion' | 'twitch' | 'peertube' | 'rumble' | 'telegram';

interface MultiPlatformVideoEmbedProps {
  platform: VideoPlatform;
  videoId?: string;
  videoUrl: string;
  title: string;
  className?: string;
}

const getEmbedUrl = (platform: VideoPlatform, videoId?: string, videoUrl?: string): string => {
  switch (platform) {
    case 'youtube':
      return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3`;
    
    case 'vimeo':
      return `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`;
    
    case 'facebook':
      // Facebook embed URL with multiple fallback options
      if (videoUrl) {
        // Try Facebook's embed plugin first
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&width=560&show_text=false&height=315&auto_play=false&allowfullscreen=true`;
      }
      return '';
    
    case 'dailymotion':
      return `https://www.dailymotion.com/embed/video/${videoId}`;
    
    case 'twitch':
      if (videoId) {
        return `https://player.twitch.tv/?video=${videoId}&parent=${window.location.hostname}`;
      }
      return videoUrl || '';
    
    case 'peertube':
      // PeerTube instances vary, so we use the full URL
      return videoUrl?.replace('/watch/', '/embed/') || '';
    
    case 'rumble':
      // Rumble embed URL pattern
      return videoUrl?.replace('rumble.com/', 'rumble.com/embed/') || '';
    
    case 'telegram':
      // Telegram videos cannot be embedded directly
      return '';
    
    default:
      return videoUrl || '';
  }
};

const getIframeProps = (platform: VideoPlatform) => {
  const baseProps = {
    frameBorder: "0",
    allowFullScreen: true,
    className: "w-full h-full"
  };

  switch (platform) {
    case 'youtube':
      return {
        ...baseProps,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      };
    
    case 'vimeo':
      return {
        ...baseProps,
        allow: "autoplay; fullscreen; picture-in-picture"
      };
    
    case 'facebook':
      return {
        ...baseProps,
        allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      };
    
    case 'dailymotion':
      return {
        ...baseProps,
        allow: "autoplay; fullscreen"
      };
    
    case 'twitch':
      return {
        ...baseProps,
        allow: "autoplay; fullscreen"
      };
    
    default:
      return baseProps;
  }
};

// Advanced Facebook Video Embed Component
const FacebookVideoEmbed = ({ videoUrl, title }: { videoUrl: string; title: string }) => {
  const [embedFailed, setEmbedFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Multiple Facebook embed URL strategies
  const getFacebookEmbedUrls = (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    return [
      // Strategy 1: Official Facebook plugin
      `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&width=560&show_text=false&height=315&auto_play=false&allowfullscreen=true`,
      // Strategy 2: Facebook embed with different parameters
      `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&width=100%25&show_text=false&height=315&appId`,
      // Strategy 3: Direct video ID extraction (if possible)
      url.includes('/videos/') ? `https://www.facebook.com/video/embed?video_id=${url.split('/videos/')[1]?.split('/')[0]}` : null
    ].filter(Boolean);
  };

  const embedUrls = getFacebookEmbedUrls(videoUrl);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setEmbedFailed(false);
  }, [videoUrl]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    if (currentUrlIndex < embedUrls.length - 1) {
      // Try next embed URL
      setCurrentUrlIndex(prev => prev + 1);
    } else {
      // All strategies failed
      setEmbedFailed(true);
      setIsLoading(false);
    }
  };

  if (embedFailed) {
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <div className="text-center space-y-4 p-8">
            <div className="text-5xl">📘</div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm mb-4 max-w-md">
              यह Facebook video आपकी website पर directly embed नहीं हो सकता। Facebook पर देखने के लिए नीचे click करें।
            </p>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <span className="mr-2">📘</span>
              Facebook पर देखें
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600">Video लोड हो रहा है...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        key={currentUrlIndex} // Force re-render when URL changes
        src={embedUrls[currentUrlIndex] || ''}
        className="absolute inset-0 w-full h-full rounded-lg"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
        title={title}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
      />

      {/* Facebook Video Protection System - Transparent patches like YouTube */}
      {!isLoading && (
        <>
          {/* Top protection bar - 5cm width full player width as requested */}
          <div 
            className="facebook-top-blocker absolute top-0 left-0 w-full h-12 sm:h-14 md:h-16 lg:h-20 bg-transparent hover:bg-black hover:bg-opacity-80 z-[999] pointer-events-auto transition-all duration-300 cursor-pointer"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
            }}
            onMouseDown={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
            }}
            onMouseUp={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
            }}
            onContextMenu={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
            }}
            title="Facebook branding blocked - Top section"
          />
          
          {/* Bottom-left blocking patch removed */}

          {/* Bottom-right corner Facebook logo blocker - 2cm smaller */}
          <div 
            className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-14 md:w-20 md:h-16 bg-transparent hover:bg-black hover:bg-opacity-80 z-[999] pointer-events-auto cursor-pointer transition-all duration-300"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
            }}
            onContextMenu={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
            }}
            title="Facebook branding blocked"
          />

          {/* Center bottom Facebook ID/text blocker - permanent black patch with no interactions */}
          <div 
            className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-8 sm:w-32 sm:h-10 md:w-40 md:h-12 bg-black rounded z-20 pointer-events-none"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onMouseUp={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDoubleClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
          />

          {/* All feedback notifications and hints removed */}

          {/* Control buttons removed - use native video controls */}

          {/* Video controls removed - use platform's native controls */}
        </>
      )}
    </div>
  );
};

// Universal Video Protection Component for All Platforms with Controls
const UniversalVideoProtection = ({ platform }: { platform: VideoPlatform }) => {
  // Minimal state for protection system only

  return (
    <>
      {/* Top protection bar - 5cm width full player width for ALL platforms */}
      <div 
        className={`${platform}-top-blocker absolute top-0 left-0 w-full h-12 sm:h-14 md:h-16 lg:h-20 bg-transparent hover:bg-black hover:bg-opacity-80 z-[999] pointer-events-auto transition-all duration-300 cursor-pointer`}
        onClick={(e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
        }}
        onMouseDown={(e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
        }}
        onMouseUp={(e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
        }}
        onContextMenu={(e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
        }}
        title={`${platform} branding blocked - Top section`}
      />
      
      {/* Bottom-left blocking patch removed */}

      {/* Bottom-right corner platform logo blocker - 2cm smaller than YouTube */}
      <div 
        className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-14 md:w-20 md:h-16 bg-transparent hover:bg-black hover:bg-opacity-80 z-[999] pointer-events-auto cursor-pointer transition-all duration-300"
        onClick={(e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
        }}
        onContextMenu={(e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
        }}
        title={`${platform} branding blocked`}
      />

      {/* Center bottom platform ID/text blocker - permanent black patch with no interactions */}
      <div 
        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-8 sm:w-32 sm:h-10 md:w-40 md:h-12 bg-black rounded z-20 pointer-events-none"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onMouseUp={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDoubleClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
      />

      {/* All feedback notifications and hints removed */}

      {/* Control buttons removed - use native video controls */}

      {/* Video controls removed - use platform's native controls */}
    </>
  );
};

const renderCustomPlatform = (platform: VideoPlatform, videoUrl: string, title: string) => {
  const platformNames: Record<string, string> = {
    peertube: 'PeerTube',
    rumble: 'Rumble',
    telegram: 'Telegram',
    youtube: 'YouTube',
    vimeo: 'Vimeo',
    facebook: 'Facebook',
    dailymotion: 'Dailymotion',
    twitch: 'Twitch'
  };

  const platformIcons: Record<string, string> = {
    peertube: '🔗',
    rumble: '🏆',
    telegram: '📱',
    youtube: '📺',
    vimeo: '🎬',
    facebook: '📘',
    dailymotion: '🎭',
    twitch: '🎮'
  };

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center space-y-4 p-8">
          <div className="text-4xl">{platformIcons[platform] || '📹'}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">
            Watch this video on {platformNames[platform] || platform}
          </p>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <span className="mr-2">{platformIcons[platform] || '📹'}</span>
            Watch on {platformNames[platform] || platform}
          </a>
        </div>
      </div>
    </div>
  );
};

export default function MultiPlatformVideoEmbed({ 
  platform, 
  videoId, 
  videoUrl, 
  title, 
  className = "" 
}: MultiPlatformVideoEmbedProps) {
  const embedUrl = getEmbedUrl(platform, videoId, videoUrl);
  const iframeProps = getIframeProps(platform);

  // Enhanced Facebook video embedding with multiple fallback strategies
  if (platform === 'facebook') {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-0">
          <FacebookVideoEmbed videoUrl={videoUrl} title={title} />
        </CardContent>
      </Card>
    );
  }

  if (platform === 'peertube' || platform === 'rumble' || platform === 'telegram') {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-0">
          {renderCustomPlatform(platform, videoUrl, title)}
        </CardContent>
      </Card>
    );
  }

  // For platforms that support iframe embedding
  if (!embedUrl) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-0">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center space-y-2">
                <p className="text-gray-600">Unable to embed video</p>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Open in new tab
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            {...iframeProps}
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
          />
          
          {/* Universal Video Protection System - Applied to ALL platforms */}
          <UniversalVideoProtection platform={platform} />
        </div>
      </CardContent>
    </Card>
  );
}