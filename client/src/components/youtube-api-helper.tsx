import { useEffect, useRef, useState } from 'react';

export interface YouTubePlayer {
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
}

export function useYouTubeAPI(videoId: string, iframeRef: React.RefObject<HTMLIFrameElement>) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Create YouTube API commands
  const sendCommand = (command: string, args: any[] = []) => {
    if (iframeRef.current?.contentWindow) {
      const message = {
        event: 'command',
        func: command,
        args: args
      };
      iframeRef.current.contentWindow.postMessage(JSON.stringify(message), '*');
    }
  };

  // Enhanced player object with proper API calls
  const createPlayer = (): YouTubePlayer => ({
    getCurrentTime: () => {
      sendCommand('getCurrentTime');
      return currentTime;
    },
    getDuration: () => {
      sendCommand('getDuration');
      return duration;
    },
    seekTo: (seconds: number) => {
      sendCommand('seekTo', [seconds, true]);
      setCurrentTime(seconds);
    },
    playVideo: () => {
      sendCommand('playVideo');
      setIsPlaying(true);
    },
    pauseVideo: () => {
      sendCommand('pauseVideo');
      setIsPlaying(false);
    },
    getPlayerState: () => {
      sendCommand('getPlayerState');
      return isPlaying ? 1 : 2;
    },
    setVolume: (volume: number) => {
      sendCommand('setVolume', [volume]);
    },
    mute: () => {
      sendCommand('mute');
    },
    unMute: () => {
      sendCommand('unMute');
    }
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube-nocookie.com" && 
          event.origin !== "https://www.youtube.com") return;
      
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        if (data.event === "onReady") {
          setIsReady(true);
          const playerInstance = createPlayer();
          setPlayer(playerInstance);
          
          // Start polling for time updates
          intervalRef.current = setInterval(() => {
            sendCommand('getCurrentTime');
            sendCommand('getDuration');
          }, 1000);
          
        } else if (data.event === "onStateChange") {
          setIsPlaying(data.info === 1);
          
        } else if (data.event === "infoDelivery" && data.info) {
          if (typeof data.info === 'number') {
            // Handle simple numeric responses
            if (data.info > 1000) {
              // Likely duration (usually larger values)
              setDuration(data.info);
            } else {
              // Likely current time
              setCurrentTime(data.info);
            }
          } else if (typeof data.info === 'object') {
            if (data.info.currentTime !== undefined) {
              setCurrentTime(data.info.currentTime);
            }
            if (data.info.duration !== undefined) {
              setDuration(data.info.duration);
            }
          }
        }
      } catch (e) {
        console.log('YouTube API message error:', e);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [videoId]);

  // Enhanced control functions
  const controls = {
    seek: (time: number) => {
      const boundedTime = Math.max(0, Math.min(duration || Number.MAX_SAFE_INTEGER, time));
      sendCommand('seekTo', [boundedTime, true]);
      setCurrentTime(boundedTime);
    },
    
    skipForward: () => {
      const newTime = Math.min(duration || Number.MAX_SAFE_INTEGER, currentTime + 10);
      controls.seek(newTime);
    },
    
    skipBackward: () => {
      const newTime = Math.max(0, currentTime - 10);
      controls.seek(newTime);
    },
    
    playPause: () => {
      if (isPlaying) {
        sendCommand('pauseVideo');
      } else {
        sendCommand('playVideo');
      }
      setIsPlaying(!isPlaying);
    },
    
    setVolume: (volume: number) => {
      sendCommand('setVolume', [volume]);
    },
    
    mute: () => {
      sendCommand('mute');
    },
    
    unmute: () => {
      sendCommand('unMute');
    }
  };

  return {
    player,
    isReady,
    currentTime,
    duration,
    isPlaying,
    controls
  };
}