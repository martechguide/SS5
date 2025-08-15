import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SkipBack, SkipForward, Play, Pause, Volume2, VolumeX } from "lucide-react";

interface SimpleYouTubeControlsProps {
  videoId: string;
  iframeRef: React.RefObject<HTMLIFrameElement>;
  className?: string;
}

export default function SimpleYouTubeControls({ videoId, iframeRef, className = "" }: SimpleYouTubeControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [localTime, setLocalTime] = useState(0);
  
  // Tracking refs for real values
  const realCurrentTime = useRef(0);
  const realDuration = useRef(0);
  const lastUpdateTime = useRef(Date.now());

  // Enhanced command sender with better error handling
  const sendYouTubeCommand = (command: string, args: any[] = []) => {
    if (!iframeRef.current?.contentWindow) return;
    
    try {
      const message = JSON.stringify({
        event: 'command',
        func: command,
        args: args
      });
      
      iframeRef.current.contentWindow.postMessage(message, '*');
      console.log(`YouTube Command: ${command}`, args);
    } catch (error) {
      console.error('Failed to send YouTube command:', error);
    }
  };

  // Direct seeking without any restrictions
  const handleSeek = (time: number) => {
    const seekTime = Math.max(0, time);
    realCurrentTime.current = seekTime;
    setCurrentTime(seekTime);
    setLocalTime(seekTime);
    
    // Send multiple seek commands for better reliability
    sendYouTubeCommand('seekTo', [seekTime, true]);
    sendYouTubeCommand('seekTo', [seekTime]);
    
    // Update our local tracking immediately
    setTimeout(() => {
      sendYouTubeCommand('getCurrentTime');
    }, 200);
  };

  // Skip forward function - direct implementation
  const handleSkipForward = () => {
    const newTime = realCurrentTime.current + 10;
    console.log(`Skip Forward: ${realCurrentTime.current} -> ${newTime}`);
    handleSeek(newTime);
  };

  // Skip backward function - direct implementation  
  const handleSkipBackward = () => {
    const newTime = Math.max(0, realCurrentTime.current - 10);
    console.log(`Skip Backward: ${realCurrentTime.current} -> ${newTime}`);
    handleSeek(newTime);
  };

  // Play/Pause toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      sendYouTubeCommand('pauseVideo');
    } else {
      sendYouTubeCommand('playVideo');
    }
    setIsPlaying(!isPlaying);
  };

  // Volume controls
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    sendYouTubeCommand('setVolume', [newVolume]);
  };

  const toggleMute = () => {
    if (isMuted) {
      sendYouTubeCommand('unMute');
      setVolume(75);
    } else {
      sendYouTubeCommand('mute');
      setVolume(0);
    }
    setIsMuted(!isMuted);
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

  // Enhanced message listener with real-time tracking
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube-nocookie.com" && 
          event.origin !== "https://www.youtube.com") return;
      
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        const now = Date.now();
        
        // Handle different YouTube API events
        if (data.event === "onReady") {
          console.log("YouTube Player Ready");
          // Initialize player data
          setTimeout(() => {
            sendYouTubeCommand('getDuration');
            sendYouTubeCommand('getCurrentTime');
          }, 500);
          
        } else if (data.event === "onStateChange") {
          const playing = data.info === 1;
          setIsPlaying(playing);
          console.log("State Change:", playing ? 'Playing' : 'Paused');
          
        } else if (data.event === "infoDelivery") {
          // Handle info responses
          if (typeof data.info === 'number') {
            // Determine if it's duration or current time based on context
            if (data.info > realCurrentTime.current + 100) {
              // Likely duration (much larger than current time)
              realDuration.current = data.info;
              setDuration(data.info);
              console.log("Duration updated:", data.info);
            } else {
              // Likely current time
              realCurrentTime.current = data.info;
              if (!isDragging) {
                setCurrentTime(data.info);
                setLocalTime(data.info);
              }
              lastUpdateTime.current = now;
            }
          }
          
        } else if (data.event === "onError") {
          console.error("YouTube Player Error:", data.info);
        }
        
      } catch (error) {
        console.error("YouTube message handling error:", error);
      }
    };

    // Real-time tracking with more frequent updates
    const trackingInterval = setInterval(() => {
      if (isPlaying && !isDragging) {
        sendYouTubeCommand('getCurrentTime');
        
        // Estimate current time progression for smoother UI
        const timeSinceLastUpdate = (Date.now() - lastUpdateTime.current) / 1000;
        if (timeSinceLastUpdate < 2) {
          const estimatedTime = realCurrentTime.current + timeSinceLastUpdate;
          setCurrentTime(estimatedTime);
          setLocalTime(estimatedTime);
        }
      }
    }, 500); // More frequent updates

    // Duration checking
    const durationInterval = setInterval(() => {
      if (realDuration.current === 0) {
        sendYouTubeCommand('getDuration');
      }
    }, 2000);

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(trackingInterval);
      clearInterval(durationInterval);
    };
  }, [isPlaying, isDragging, videoId]);

  // Update local time when not dragging
  useEffect(() => {
    if (!isDragging) {
      setLocalTime(currentTime);
    }
  }, [currentTime, isDragging]);

  return (
    <div className={`bg-black/90 backdrop-blur-sm text-white transition-all duration-300 ${className}`}>
      {/* Progress bar */}
      <div className="px-3 py-1">
        <div className="flex items-center space-x-2 text-xs">
          <span className="min-w-[35px] text-[10px]">{formatTime(localTime)}</span>
          <div className="flex-1">
            <Slider
              value={[localTime]}
              max={Math.max(duration, 100)}
              step={1}
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
  );
}