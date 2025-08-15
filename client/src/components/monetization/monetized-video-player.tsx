import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VideoAdManager } from './video-ad-manager';
import VideoProtectionSystem from '@/components/video-protection-system';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';

interface MonetizedVideoPlayerProps {
  youtubeVideoId: string;
  title: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  className?: string;
}

interface AdPlatformConfig {
  googleAdSenseClientId: string;
  googleVideoSlot: string;
  adsterraZoneId: string;
  propellerAdsZoneId: string;
}

export const MonetizedVideoPlayer: React.FC<MonetizedVideoPlayerProps> = ({
  youtubeVideoId,
  title,
  onProgress,
  onComplete,
  className = ""
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  // Ad platform configuration - replace with your actual IDs
  const adConfig: AdPlatformConfig = {
    googleAdSenseClientId: "ca-pub-YOUR_ADSENSE_ID", // Replace with your AdSense ID
    googleVideoSlot: "YOUR_VIDEO_SLOT_ID", // Replace with your video slot
    adsterraZoneId: "YOUR_ADSTERRA_ZONE", // Replace with Adsterra zone
    propellerAdsZoneId: "YOUR_PROPELLER_ZONE" // Replace with PropellerAds zone
  };

  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?enablejsapi=1&origin=${window.location.origin}&rel=0&modestbranding=1&controls=0`;

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (iframeRef.current) {
        new window.YT.Player(iframeRef.current, {
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        });
      }
    };

    return () => {
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, []);

  const onPlayerReady = (event: any) => {
    const player = event.target;
    setDuration(player.getDuration());
    
    // Start tracking view for monetization
    setViewCount(prev => prev + 1);
  };

  const onPlayerStateChange = (event: any) => {
    const player = event.target;
    
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      startProgressTracking(player);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
      onComplete?.();
    }
  };

  const startProgressTracking = (player: any) => {
    const interval = setInterval(() => {
      if (player && player.getCurrentTime) {
        const current = player.getCurrentTime();
        setCurrentTime(current);
        onProgress?.(current);
      }
    }, 1000);

    // Clear interval when video stops
    const checkState = () => {
      if (player.getPlayerState() !== window.YT.PlayerState.PLAYING) {
        clearInterval(interval);
      } else {
        setTimeout(checkState, 1000);
      }
    };
    checkState();
  };

  const handlePlayPause = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframe.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
    }
  };

  const handleSeek = (seconds: number) => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      iframe.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":"${newTime}"}`, '*');
    }
  };

  const handleVolumeToggle = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute';
      iframe.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
      setIsMuted(!isMuted);
    }
  };

  const handleAdRevenue = (platform: string, revenue: number) => {
    setTotalEarnings(prev => prev + revenue);
    console.log(`Earned $${revenue.toFixed(4)} from ${platform} ad`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const estimatedViewEarnings = () => {
    // Conservative estimate: $0.01-0.05 per view with multiple ad platforms
    const baseEarnings = viewCount * 0.025; // $0.025 per view average
    return baseEarnings + totalEarnings;
  };

  return (
    <div className={`monetized-video-player relative ${className}`}>
      {/* Revenue Tracking Header */}
      <Card className="mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Views: {viewCount} | Estimated Earnings: ${estimatedViewEarnings().toFixed(4)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">
              ${totalEarnings.toFixed(4)}
            </p>
            <p className="text-sm text-gray-500">Live Earnings</p>
          </div>
        </div>
      </Card>

      {/* Video Player Container */}
      <div className="relative group">
        {/* YouTube Embed with Protection */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Video Protection System */}
          <VideoProtectionSystem />
          
          {/* Custom Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              {/* Seek Controls */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSeek(-10)}
                className="text-white hover:bg-white/20"
              >
                <SkipBack className="h-4 w-4" />
                <span className="text-xs ml-1">10s</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSeek(10)}
                className="text-white hover:bg-white/20"
              >
                <SkipForward className="h-4 w-4" />
                <span className="text-xs ml-1">10s</span>
              </Button>

              {/* Progress Bar */}
              <div className="flex-1 mx-4">
                <div className="flex items-center gap-2 text-white text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <div className="flex-1 bg-white/30 rounded-full h-1">
                    <div 
                      className="bg-red-500 h-full rounded-full transition-all"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume Control */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVolumeToggle}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Ad Manager Integration */}
        <VideoAdManager
          videoElement={null}
          adConfig={adConfig}
          videoDuration={duration}
          onAdRevenue={handleAdRevenue}
        />
      </div>

      {/* Monetization Analytics */}
      <Card className="mt-4 p-4">
        <h4 className="font-semibold mb-2">Revenue Analytics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Views</p>
            <p className="font-bold">{viewCount}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Ads Shown</p>
            <p className="font-bold">{Math.floor(totalEarnings * 1000)}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">CPM Rate</p>
            <p className="font-bold">$25.00</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Completion Rate</p>
            <p className="font-bold">{duration ? Math.round((currentTime / duration) * 100) : 0}%</p>
          </div>
        </div>
      </Card>

      {/* Revenue Optimization Tips */}
      <Card className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20">
        <h4 className="font-semibold mb-2">💡 Earning Optimization Tips</h4>
        <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
          <li>• Videos over 5 minutes earn 2-3x more with mid-roll ads</li>
          <li>• US/UK/Canadian viewers pay 5x higher rates</li>
          <li>• Mobile viewers make up 60% of video traffic</li>
          <li>• Engagement rate affects ad quality and pricing</li>
        </ul>
      </Card>
    </div>
  );
};

// Global type declarations for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}