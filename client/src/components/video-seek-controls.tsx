import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkipBack, SkipForward, Play, Pause, Volume2, VolumeX, Settings } from "lucide-react";

interface VideoSeekControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  onPlayPause: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onQualityChange?: (quality: string) => void;
  onVolumeChange?: (volume: number) => void;
  onMute?: () => void;
  onUnmute?: () => void;
  className?: string;
}

export default function VideoSeekControls({
  isPlaying,
  currentTime,
  duration,
  onSeek,
  onPlayPause,
  onSkipBackward,
  onSkipForward,
  onQualityChange,
  onVolumeChange,
  onMute,
  onUnmute,
  className = ""
}: VideoSeekControlsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localTime, setLocalTime] = useState(currentTime);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState("auto");
  const [showSettings, setShowSettings] = useState(false);

  // Update local time when not dragging
  useEffect(() => {
    if (!isDragging) {
      setLocalTime(currentTime);
    }
  }, [currentTime, isDragging]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeekChange = (value: number[]) => {
    const newTime = value[0];
    setLocalTime(newTime);
    setIsDragging(true);
  };

  const handleSeekCommit = (value: number[]) => {
    const newTime = value[0];
    onSeek(newTime);
    setIsDragging(false);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    
    // Send volume command to YouTube player
    if (typeof onVolumeChange === 'function') {
      onVolumeChange(newVolume);
    }
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    
    if (newMuteState) {
      setVolume(0);
      if (typeof onMute === 'function') {
        onMute();
      }
    } else {
      setVolume(75);
      if (typeof onUnmute === 'function') {
        onUnmute();
      }
    }
  };

  const handleQualityChange = (newQuality: string) => {
    setQuality(newQuality);
    onQualityChange?.(newQuality);
  };

  return (
    <div className={`bg-black/90 backdrop-blur-sm text-white transition-all duration-300 ${className}`}>
      {/* Main seek bar - thinner design */}
      <div className="px-3 py-1">
        <div className="flex items-center space-x-2 text-xs">
          <span className="min-w-[35px] text-[10px]">{formatTime(localTime)}</span>
          <div className="flex-1">
            <Slider
              value={[localTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeekChange}
              onValueCommit={handleSeekCommit}
              className="w-full h-1"
            />
          </div>
          <span className="min-w-[35px] text-[10px]">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control buttons - compact layout */}
      <div className="flex items-center justify-between px-3 py-1">
        <div className="flex items-center space-x-1">
          {/* Skip backward 10s */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkipBackward}
            className="text-white hover:bg-white/20 p-1 h-6 w-6"
            title="Skip backward 10 seconds"
          >
            <SkipBack className="h-3 w-3" />
          </Button>

          {/* Play/Pause */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onPlayPause}
            className="text-white hover:bg-white/20 p-1 h-7 w-7"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          {/* Skip forward 10s */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkipForward}
            className="text-white hover:bg-white/20 p-1 h-6 w-6"
            title="Skip forward 10 seconds"
          >
            <SkipForward className="h-3 w-3" />
          </Button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-1">
          {/* Volume control - compact */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="text-white hover:bg-white/20 p-1 h-6 w-6"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
          </Button>
          <div className="w-12">
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-full h-1"
            />
          </div>

          {/* Quality settings */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:bg-white/20 p-1 h-6 w-6"
              title="Quality Settings"
            >
              <Settings className="h-3 w-3" />
            </Button>
            
            {showSettings && (
              <div className="absolute bottom-8 right-0 bg-black/95 rounded-md p-2 min-w-[120px] z-50">
                <div className="text-[10px] text-gray-400 mb-1">Quality</div>
                <Select value={quality} onValueChange={handleQualityChange}>
                  <SelectTrigger className="h-6 text-xs bg-transparent border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-gray-600">
                    <SelectItem value="auto" className="text-xs">Auto</SelectItem>
                    <SelectItem value="2160p" className="text-xs">2160p (4K)</SelectItem>
                    <SelectItem value="1440p" className="text-xs">1440p (2K)</SelectItem>
                    <SelectItem value="1080p" className="text-xs">1080p (HD)</SelectItem>
                    <SelectItem value="720p" className="text-xs">720p</SelectItem>
                    <SelectItem value="480p" className="text-xs">480p</SelectItem>
                    <SelectItem value="360p" className="text-xs">360p</SelectItem>
                    <SelectItem value="240p" className="text-xs">240p</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Progress indicator - compact */}
          <div className="text-[9px] text-gray-400 min-w-[30px] text-right">
            {duration > 0 && (
              <span>{Math.round((localTime / duration) * 100)}%</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook for video seeking functionality
 * Provides state management and YouTube API integration
 */
export function useVideoSeekControls(iframeRef: React.RefObject<HTMLIFrameElement>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const sendCommand = (command: string, args?: any[]) => {
    if (iframeRef.current) {
      const message = {
        event: 'command',
        func: command,
        args: args || []
      };
      iframeRef.current.contentWindow?.postMessage(JSON.stringify(message), '*');
    }
  };

  const handleSeek = (time: number) => {
    // Ensure time is within valid bounds
    const boundedTime = Math.max(0, Math.min(duration || Number.MAX_SAFE_INTEGER, time));
    sendCommand('seekTo', [boundedTime, true]);
    setCurrentTime(boundedTime);
    
    // Request updated time after seeking
    setTimeout(() => {
      sendCommand('getCurrentTime');
    }, 500);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      sendCommand('pauseVideo');
    } else {
      sendCommand('playVideo');
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipBackward = () => {
    // Get current time before calculating new position
    sendCommand('getCurrentTime');
    setTimeout(() => {
      const newTime = Math.max(0, currentTime - 10);
      handleSeek(newTime);
    }, 100);
  };

  const handleSkipForward = () => {
    // Get current time and duration before calculating new position
    sendCommand('getCurrentTime');
    sendCommand('getDuration');
    setTimeout(() => {
      const safeDuration = duration > 0 ? duration : Number.MAX_SAFE_INTEGER;
      const newTime = Math.min(safeDuration, currentTime + 10);
      handleSeek(newTime);
    }, 100);
  };

  const handleQualityChange = (quality: string) => {
    // YouTube API quality change
    const qualityMap: { [key: string]: string } = {
      'auto': 'default',
      '2160p': 'hd2160',
      '1440p': 'hd1440', 
      '1080p': 'hd1080',
      '720p': 'hd720',
      '480p': 'large',
      '360p': 'medium',
      '240p': 'small'
    };
    
    const youtubeQuality = qualityMap[quality] || 'default';
    sendCommand('setPlaybackQuality', [youtubeQuality]);
  };

  // Volume control integration
  const handleVolumeChange = (volume: number) => {
    sendCommand('setVolume', [volume]);
  };

  const handleMute = () => {
    sendCommand('mute');
  };

  const handleUnmute = () => {
    sendCommand('unMute');
  };

  // Enhanced message handling for proper YouTube API integration
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube-nocookie.com" && event.origin !== "https://www.youtube.com") return;
      
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        if (data.event === "onStateChange") {
          setIsPlaying(data.info === 1); // 1 = playing, 2 = paused
        } else if (data.event === "onReady") {
          // Request duration and current time when player is ready
          sendCommand('getDuration');
          sendCommand('getCurrentTime');
        } else if (data.event === "infoDelivery") {
          // Handle info delivery from YouTube API
          if (data.info && typeof data.info === 'object') {
            if (data.info.duration !== undefined) {
              setDuration(data.info.duration);
            }
            if (data.info.currentTime !== undefined) {
              setCurrentTime(data.info.currentTime);
            }
          }
        }
      } catch (e) {
        // Ignore parsing errors
      }
    };

    // Continuous time update polling for better accuracy
    const timeUpdateInterval = setInterval(() => {
      if (isPlaying) {
        sendCommand('getCurrentTime');
      }
    }, 1000);

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(timeUpdateInterval);
    };
  }, [isPlaying]);

  return {
    isPlaying,
    currentTime,
    duration,
    handleSeek,
    handlePlayPause,
    handleSkipBackward,
    handleSkipForward,
    handleQualityChange,
    handleVolumeChange,
    handleMute,
    handleUnmute
  };
}