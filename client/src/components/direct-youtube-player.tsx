import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SkipBack, SkipForward, Play, Pause, Volume2, VolumeX } from "lucide-react";

interface DirectYouTubePlayerProps {
  videoId: string;
  className?: string;
}

export default function DirectYouTubePlayer({ videoId, className = "" }: DirectYouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [localTime, setLocalTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const playerInitialized = useRef(false);

  // YouTube Player API initialization
  useEffect(() => {
    // Load YouTube API script
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
      
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const initializePlayer = () => {
    if (playerInitialized.current || !containerRef.current) return;
    
    playerRef.current = new window.YT.Player(containerRef.current, {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        disablekb: 1,
        enablejsapi: 1,
        origin: window.location.origin
      },
      events: {
        onReady: handlePlayerReady,
        onStateChange: handleStateChange,
        onError: handleError
      }
    });
    
    playerInitialized.current = true;
  };

  const handlePlayerReady = (event: any) => {
    console.log('Player ready');
    const player = event.target;
    
    // Get initial video data
    setDuration(player.getDuration());
    setCurrentTime(player.getCurrentTime());
    
    // Start time tracking
    intervalRef.current = setInterval(() => {
      if (player && typeof player.getCurrentTime === 'function') {
        const time = player.getCurrentTime();
        setCurrentTime(time);
        if (!isDragging) {
          setLocalTime(time);
        }
      }
    }, 100); // Very frequent updates for smooth progress
  };

  const handleStateChange = (event: any) => {
    const state = event.data;
    setIsPlaying(state === window.YT.PlayerState.PLAYING);
    
    if (state === window.YT.PlayerState.PLAYING) {
      console.log('Video playing');
    } else if (state === window.YT.PlayerState.PAUSED) {
      console.log('Video paused');
    }
  };

  const handleError = (event: any) => {
    console.error('YouTube Player Error:', event.data);
  };

  // Direct control functions
  const handleSeek = (time: number) => {
    if (!playerRef.current || typeof playerRef.current.seekTo !== 'function') return;
    
    const seekTime = Math.max(0, time);
    console.log(`Seeking to: ${seekTime}s`);
    
    try {
      playerRef.current.seekTo(seekTime, true);
      setCurrentTime(seekTime);
      setLocalTime(seekTime);
      
      // Force update after seek
      setTimeout(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const actualTime = playerRef.current.getCurrentTime();
          setCurrentTime(actualTime);
          setLocalTime(actualTime);
        }
      }, 200);
    } catch (error) {
      console.error('Seek error:', error);
    }
  };

  const handleSkipForward = () => {
    const newTime = currentTime + 10;
    console.log(`Skip Forward: ${currentTime} -> ${newTime}`);
    handleSeek(newTime);
  };

  const handleSkipBackward = () => {
    const newTime = Math.max(0, currentTime - 10);
    console.log(`Skip Backward: ${currentTime} -> ${newTime}`);
    handleSeek(newTime);
  };

  const handlePlayPause = () => {
    if (!playerRef.current) return;
    
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error('Play/Pause error:', error);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setVolume(75);
      } else {
        playerRef.current.mute();
        setVolume(0);
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Mute/Unmute error:', error);
    }
  };

  // Slider handling
  const handleSeekChange = (value: number[]) => {
    const newTime = value[0];
    setLocalTime(newTime);
    setIsDragging(true);
  };

  const handleSeekCommit = (value: number[]) => {
    const newTime = value[0];
    handleSeek(newTime);
    setIsDragging(false);
  };

  // Time formatting
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Update local time when not dragging
  useEffect(() => {
    if (!isDragging) {
      setLocalTime(currentTime);
    }
  }, [currentTime, isDragging]);

  return (
    <div 
      className={`relative bg-black video-player-container ${className}`}
      style={{ paddingBottom: "56.25%", height: 0 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* YouTube player container */}
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      
      {/* Custom controls overlay */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
          <div className="bg-black/90 backdrop-blur-sm text-white transition-all duration-300 animate-in slide-in-from-bottom-2">
            {/* Progress bar */}
            <div className="px-3 py-1">
              <div className="flex items-center space-x-2 text-xs">
                <span className="min-w-[35px] text-[10px]">{formatTime(localTime)}</span>
                <div className="flex-1">
                  <Slider
                    value={[localTime]}
                    max={Math.max(duration, 100)}
                    step={0.1}
                    onValueChange={handleSeekChange}
                    onValueCommit={handleSeekCommit}
                    className="w-full h-1"
                  />
                </div>
                <span className="min-w-[35px] text-[10px]">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-between px-3 py-1">
              <div className="flex items-center space-x-1">
                {/* Skip backward */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkipBackward}
                  className="text-white hover:bg-white/20 p-1 h-6 w-6"
                  title="Skip backward 10 seconds"
                >
                  <SkipBack className="h-3 w-3" />
                </Button>

                {/* Play/Pause */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white/20 p-1 h-7 w-7"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                {/* Skip forward */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkipForward}
                  className="text-white hover:bg-white/20 p-1 h-6 w-6"
                  title="Skip forward 10 seconds"
                >
                  <SkipForward className="h-3 w-3" />
                </Button>
              </div>

              {/* Volume controls */}
              <div className="flex items-center space-x-1">
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
                
                {/* Time indicator */}
                <div className="text-[9px] text-gray-400 min-w-[30px] text-right">
                  {duration > 0 && (
                    <span>{Math.round((localTime / duration) * 100)}%</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Global YouTube API ready handler
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}