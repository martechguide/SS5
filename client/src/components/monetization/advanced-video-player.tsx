import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Settings, 
  Clock,
  Eye,
  X,
  DollarSign,
  RotateCcw,
  SkipForward
} from 'lucide-react';

interface AdConfig {
  enabled: boolean;
  frequency: number;
  duration: number;
  skipAfter: number;
  allowSkip: boolean;
  forceWatch: number; // minimum seconds user must watch before skip
  skipButtonText: string;
  skipReward?: number; // bonus revenue for completed ads vs skipped
}

interface NetworkConfig {
  enabled: boolean;
  publisherId: string;
  preRoll: AdConfig;
  midRoll: AdConfig;
  postRoll: AdConfig;
  bannerOverlay: AdConfig;
  socialBar?: AdConfig;
  popunder?: AdConfig;
  native?: AdConfig;
}

export default function AdvancedVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [showControls, setShowControls] = useState(false);
  
  // Ad states
  const [currentAd, setCurrentAd] = useState<{
    type: 'pre-roll' | 'mid-roll' | 'post-roll' | 'banner' | 'social' | 'popunder' | 'native' | null;
    network: string;
    timeLeft: number;
    watchedTime: number;
    skippable: boolean;
    canSkipNow: boolean;
    wasSkipped: boolean;
  }>({ type: null, network: '', timeLeft: 0, watchedTime: 0, skippable: false, canSkipNow: false, wasSkipped: false });
  
  const [adRevenue, setAdRevenue] = useState({
    total: 0,
    today: 0,
    impressions: 0,
    completed: 0,
    skipped: 0,
    bonusEarnings: 0
  });
  
  const [showAdSettings, setShowAdSettings] = useState(false);

  // Updated Network configurations - Working alternatives 2024+
  const [networkConfigs, setNetworkConfigs] = useState<Record<string, NetworkConfig>>({
    'propellerads': {
      enabled: true,
      publisherId: '',
      preRoll: { 
        enabled: false, frequency: 0, duration: 0, skipAfter: 0, allowSkip: false, 
        forceWatch: 0, skipButtonText: "Skip", skipReward: 0 
      },
      midRoll: { 
        enabled: false, frequency: 0, duration: 0, skipAfter: 0, allowSkip: false, 
        forceWatch: 0, skipButtonText: "Skip", skipReward: 0 
      },
      postRoll: { 
        enabled: false, frequency: 0, duration: 0, skipAfter: 0, allowSkip: false, 
        forceWatch: 0, skipButtonText: "Skip", skipReward: 0 
      },
      bannerOverlay: { 
        enabled: true, frequency: 2, duration: 30, skipAfter: 0, allowSkip: true, 
        forceWatch: 0, skipButtonText: "✕", skipReward: 0.8 
      },
      socialBar: { 
        enabled: true, frequency: 1, duration: 0, skipAfter: 0, allowSkip: true, 
        forceWatch: 0, skipButtonText: "✕", skipReward: 0.4 
      },
      popunder: { 
        enabled: true, frequency: 1, duration: 0, skipAfter: 0, allowSkip: false, 
        forceWatch: 0, skipButtonText: "Close", skipReward: 1.2 
      },
      native: { 
        enabled: true, frequency: 3, duration: 0, skipAfter: 0, allowSkip: true, 
        forceWatch: 0, skipButtonText: "✕", skipReward: 0.9 
      }
    },
    'ezoic': {
      enabled: true,
      publisherId: '',
      preRoll: { 
        enabled: true, frequency: 1, duration: 15, skipAfter: 5, allowSkip: true, 
        forceWatch: 5, skipButtonText: "Skip Ad", skipReward: 2.5 
      },
      midRoll: { 
        enabled: true, frequency: 1, duration: 20, skipAfter: 5, allowSkip: true, 
        forceWatch: 6, skipButtonText: "Skip Ad", skipReward: 3.8 
      },
      postRoll: { 
        enabled: true, frequency: 1, duration: 12, skipAfter: 3, allowSkip: true, 
        forceWatch: 3, skipButtonText: "Skip Ad", skipReward: 2.0 
      },
      bannerOverlay: { 
        enabled: true, frequency: 2, duration: 25, skipAfter: 0, allowSkip: true, 
        forceWatch: 0, skipButtonText: "Close", skipReward: 0.7 
      }
    },
    'connatix': {
      enabled: true,
      publisherId: '',
      preRoll: { 
        enabled: true, frequency: 1, duration: 12, skipAfter: 5, allowSkip: true, 
        forceWatch: 4, skipButtonText: "Skip >>", skipReward: 2.8 
      },
      midRoll: { 
        enabled: true, frequency: 2, duration: 18, skipAfter: 5, allowSkip: true, 
        forceWatch: 5, skipButtonText: "Skip >>", skipReward: 4.2 
      },
      postRoll: { 
        enabled: true, frequency: 1, duration: 10, skipAfter: 3, allowSkip: true, 
        forceWatch: 2, skipButtonText: "Skip >>", skipReward: 1.9 
      },
      bannerOverlay: { 
        enabled: true, frequency: 3, duration: 20, skipAfter: 0, allowSkip: true, 
        forceWatch: 0, skipButtonText: "Close", skipReward: 0.6 
      }
    },
    'mediavine': {
      enabled: false,
      publisherId: '',
      preRoll: { 
        enabled: true, frequency: 1, duration: 15, skipAfter: 5, allowSkip: true, 
        forceWatch: 5, skipButtonText: "Skip", skipReward: 3.2 
      },
      midRoll: { 
        enabled: true, frequency: 1, duration: 20, skipAfter: 5, allowSkip: true, 
        forceWatch: 6, skipButtonText: "Skip", skipReward: 4.5 
      },
      postRoll: { 
        enabled: true, frequency: 1, duration: 12, skipAfter: 3, allowSkip: true, 
        forceWatch: 3, skipButtonText: "Skip", skipReward: 2.3 
      },
      bannerOverlay: { 
        enabled: true, frequency: 2, duration: 30, skipAfter: 0, allowSkip: true, 
        forceWatch: 0, skipButtonText: "✕", skipReward: 0.8 
      }
    }
  });

  // Updated Sample test ads for working networks 2024+
  const sampleAds = {
    'pre-roll': {
      title: 'Video Pre-Roll Ad (Ezoic/Connatix)',
      content: 'High-quality brand advertisement with VAST compliance',
      duration: 15,
      cpm: 12.50
    },
    'mid-roll': {
      title: 'Video Mid-Roll Ad (Ezoic/Connatix)', 
      content: 'Premium service advertisement during content',
      duration: 20,
      cpm: 18.75
    },
    'post-roll': {
      title: 'Video Post-Roll Ad (Ezoic/Connatix)',
      content: 'Engaging brand promotion after video completion',
      duration: 12,
      cpm: 9.25
    },
    'banner': {
      title: 'Banner Overlay (All Networks)',
      content: 'Visit our website for exclusive deals - Easy approval',
      duration: 30,
      cpm: 6.80
    },
    'social': {
      title: 'Social Bar Ad (PropellerAds)',
      content: 'Join thousands of satisfied customers - No approval needed',
      duration: 0,
      cpm: 4.20
    },
    'popunder': {
      title: 'Popunder Ad (PropellerAds)',
      content: 'Discover amazing offers - Instant approval available',
      duration: 0,
      cpm: 8.50
    },
    'native': {
      title: 'Native Content Ad (PropellerAds/Ezoic)',
      content: 'Recommended content matching your audience',
      duration: 0,
      cpm: 11.30
    }
  };

  // Ad countdown timer with skip logic
  useEffect(() => {
    if (currentAd.type && currentAd.timeLeft > 0) {
      const timer = setTimeout(() => {
        const newWatchedTime = currentAd.watchedTime + 1;
        const config = getCurrentAdConfig();
        const canSkipNow = config?.allowSkip && newWatchedTime >= (config.forceWatch || 0);
        
        setCurrentAd(prev => ({ 
          ...prev, 
          timeLeft: prev.timeLeft - 1,
          watchedTime: newWatchedTime,
          canSkipNow
        }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentAd.type && currentAd.timeLeft === 0) {
      handleAdComplete();
    }
  }, [currentAd.timeLeft]);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // Check for pre-roll ad first
        if (currentTime === 0 && shouldShowAd('pre-roll')) {
          showAd('pre-roll', 'ezoic');
          return;
        }
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const shouldShowAd = (type: string): boolean => {
    const enabledNetworks = Object.entries(networkConfigs).filter(([_, config]) => config.enabled);
    return enabledNetworks.some(([_, config]) => {
      const adConfig = config[type as keyof NetworkConfig] as AdConfig;
      return adConfig?.enabled;
    });
  };

  const showAd = (type: string, network: string) => {
    const config = networkConfigs[network];
    const adConfig = config[type as keyof NetworkConfig] as AdConfig;
    
    if (!adConfig?.enabled) return;

    const duration = adConfig.duration || sampleAds[type as keyof typeof sampleAds].duration;
    
    setCurrentAd({
      type: type as any,
      network,
      timeLeft: duration,
      watchedTime: 0,
      skippable: adConfig.allowSkip,
      canSkipNow: adConfig.forceWatch === 0,
      wasSkipped: false
    });

    // Simulate ad impression
    setAdRevenue(prev => ({
      ...prev,
      impressions: prev.impressions + 1,
      today: prev.today + sampleAds[type as keyof typeof sampleAds].cpm / 1000,
      total: prev.total + sampleAds[type as keyof typeof sampleAds].cpm / 1000
    }));

    // Auto-trigger specific ad types
    if (type === 'popunder') {
      setTimeout(() => handlePopunder(network), 1000);
    }
    if (type === 'social') {
      setTimeout(() => handleSocialBar(network), 500);
    }
  };

  const handleAdComplete = () => {
    const config = getCurrentAdConfig();
    const wasFullyWatched = !currentAd.wasSkipped;
    
    // Calculate revenue based on completion
    const baseRevenue = sampleAds[currentAd.type as keyof typeof sampleAds]?.cpm / 1000 || 0;
    const bonusRevenue = wasFullyWatched ? (config?.skipReward || 0) / 1000 : 0;
    const totalRevenue = baseRevenue + bonusRevenue;
    
    // Update revenue and statistics
    setAdRevenue(prev => ({
      ...prev,
      today: prev.today + (wasFullyWatched ? bonusRevenue : 0),
      total: prev.total + (wasFullyWatched ? bonusRevenue : 0),
      completed: prev.completed + (wasFullyWatched ? 1 : 0),
      skipped: prev.skipped + (wasFullyWatched ? 0 : 1),
      bonusEarnings: prev.bonusEarnings + (wasFullyWatched ? bonusRevenue : 0)
    }));
    
    setCurrentAd({ 
      type: null, 
      network: '', 
      timeLeft: 0, 
      watchedTime: 0,
      skippable: false, 
      canSkipNow: false,
      wasSkipped: false
    });
    
    // Resume video if it was a video ad
    if (currentAd.type === 'pre-roll' && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSkipAd = () => {
    if (currentAd.canSkipNow && currentAd.skippable) {
      setCurrentAd(prev => ({ ...prev, wasSkipped: true }));
      handleAdComplete();
    }
  };

  const getCurrentAdConfig = () => {
    const config = networkConfigs[currentAd.network];
    return config?.[currentAd.type as keyof NetworkConfig] as AdConfig;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      
      // Check for mid-roll ads
      if (Math.floor(time) === 30 && shouldShowAd('mid-roll')) {
        videoRef.current.pause();
        setIsPlaying(false);
        showAd('mid-roll', 'connatix');
      }
      
      // Show banner overlay randomly
      if (Math.floor(time) % 45 === 0 && shouldShowAd('bannerOverlay')) {
        showAd('banner', 'propellerads');
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (shouldShowAd('post-roll')) {
      showAd('post-roll', 'ezoic');
    }
  };

  const handlePopunder = (network: string) => {
    // Simulate popunder (would normally open new window)
    console.log(`Popunder ad triggered from ${network}`);
    setTimeout(() => {
      setCurrentAd({ 
        type: null, 
        network: '', 
        timeLeft: 0, 
        watchedTime: 0,
        skippable: false, 
        canSkipNow: false,
        wasSkipped: false
      });
    }, 2000);
  };

  const handleSocialBar = (network: string) => {
    // Show social bar for longer duration
    setTimeout(() => {
      if (currentAd.type === 'social') {
        setCurrentAd({ 
          type: null, 
          network: '', 
          timeLeft: 0, 
          watchedTime: 0,
          skippable: false, 
          canSkipNow: false,
          wasSkipped: false
        });
      }
    }, 5000);
  };

  const updateNetworkConfig = (network: string, updates: Partial<NetworkConfig>) => {
    setNetworkConfigs(prev => ({
      ...prev,
      [network]: { ...prev[network], ...updates }
    }));
  };

  const updateAdConfig = (network: string, adType: string, updates: Partial<AdConfig>) => {
    setNetworkConfigs(prev => ({
      ...prev,
      [network]: {
        ...prev[network],
        [adType]: { ...(prev[network][adType as keyof NetworkConfig] as AdConfig), ...updates }
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Revenue Dashboard */}
      <Card className="mb-6 p-4 bg-green-50 dark:bg-green-900/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Live Ad Revenue Tracking</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdSettings(!showAdSettings)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Ad Settings
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                ${adRevenue.today.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Today's Earnings</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Eye className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{adRevenue.impressions}</span>
            </div>
            <p className="text-sm text-gray-600">Ad Impressions</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Play className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{adRevenue.completed}</span>
            </div>
            <p className="text-sm text-gray-600">Completed Ads</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <SkipForward className="h-4 w-4 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">{adRevenue.skipped}</span>
            </div>
            <p className="text-sm text-gray-600">Skipped Ads</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">
                ${adRevenue.bonusEarnings.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Bonus Revenue</p>
          </div>
        </div>

        {/* Skip Rate Stats */}
        {adRevenue.impressions > 0 && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="flex justify-between items-center text-sm">
              <span>Completion Rate: <strong>{((adRevenue.completed / adRevenue.impressions) * 100).toFixed(1)}%</strong></span>
              <span>Skip Rate: <strong>{((adRevenue.skipped / adRevenue.impressions) * 100).toFixed(1)}%</strong></span>
              <span>Avg CPM: <strong>${(adRevenue.impressions > 0 ? (adRevenue.today / adRevenue.impressions * 1000) : 0).toFixed(2)}</strong></span>
            </div>
          </div>
        )}
      </Card>

      {/* Video Player Container */}
      <Card className="p-6">
        <div 
          className="relative bg-black rounded-lg overflow-hidden"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Main Video */}
          <video
            ref={videoRef}
            className="w-full aspect-video"
            src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
            onEnded={handleVideoEnd}
          />

          {/* Ad Overlays */}
          {currentAd.type === 'pre-roll' && (
            <div className="absolute inset-0 bg-blue-900 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h3 className="text-2xl font-bold mb-2">{sampleAds['pre-roll'].title}</h3>
                <p className="mb-4">{sampleAds['pre-roll'].content}</p>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <Badge className="bg-blue-600">
                    {currentAd.network.toUpperCase()} - ${sampleAds['pre-roll'].cpm} CPM
                  </Badge>
                  <span className="text-lg">⏱ {currentAd.timeLeft}s</span>
                </div>
                
                {/* Skip Controls */}
                <div className="flex items-center justify-center gap-4">
                  {currentAd.skippable && !currentAd.canSkipNow && (
                    <div className="text-sm bg-black/40 px-3 py-1 rounded">
                      Skip in {Math.max(0, (getCurrentAdConfig()?.forceWatch || 0) - currentAd.watchedTime)}s
                    </div>
                  )}
                  {currentAd.canSkipNow && currentAd.skippable && (
                    <Button onClick={handleSkipAd} size="sm" variant="secondary">
                      <SkipForward className="h-3 w-3 mr-1" />
                      {getCurrentAdConfig()?.skipButtonText || "Skip Ad"}
                    </Button>
                  )}
                  {!currentAd.skippable && (
                    <div className="text-sm bg-red-600/80 px-3 py-1 rounded">
                      Cannot Skip - Watch Full Ad
                    </div>
                  )}
                  <div className="text-xs">
                    Watched: {currentAd.watchedTime}s | 
                    Bonus: ${(getCurrentAdConfig()?.skipReward || 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentAd.type === 'mid-roll' && (
            <div className="absolute inset-0 bg-orange-900 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h3 className="text-2xl font-bold mb-2">{sampleAds['mid-roll'].title}</h3>
                <p className="mb-4">{sampleAds['mid-roll'].content}</p>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <Badge className="bg-orange-600">
                    {currentAd.network.toUpperCase()} - ${sampleAds['mid-roll'].cpm} CPM
                  </Badge>
                  <span className="text-lg">⏱ {currentAd.timeLeft}s</span>
                </div>
                
                {/* Skip Controls */}
                <div className="flex items-center justify-center gap-4">
                  {currentAd.skippable && !currentAd.canSkipNow && (
                    <div className="text-sm bg-black/40 px-3 py-1 rounded">
                      Skip in {Math.max(0, (getCurrentAdConfig()?.forceWatch || 0) - currentAd.watchedTime)}s
                    </div>
                  )}
                  {currentAd.canSkipNow && currentAd.skippable && (
                    <Button onClick={handleSkipAd} size="sm" variant="secondary">
                      <SkipForward className="h-3 w-3 mr-1" />
                      {getCurrentAdConfig()?.skipButtonText || "Skip Ad"}
                    </Button>
                  )}
                  {!currentAd.skippable && (
                    <div className="text-sm bg-red-600/80 px-3 py-1 rounded">
                      Cannot Skip - Watch Full Ad
                    </div>
                  )}
                  <div className="text-xs">
                    Watched: {currentAd.watchedTime}s | 
                    Bonus: ${(getCurrentAdConfig()?.skipReward || 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentAd.type === 'post-roll' && (
            <div className="absolute inset-0 bg-purple-900 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h3 className="text-2xl font-bold mb-2">{sampleAds['post-roll'].title}</h3>
                <p className="mb-4">{sampleAds['post-roll'].content}</p>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <Badge className="bg-purple-600">
                    {currentAd.network.toUpperCase()} - ${sampleAds['post-roll'].cpm} CPM
                  </Badge>
                  <span className="text-lg">⏱ {currentAd.timeLeft}s</span>
                </div>
                
                {/* Skip Controls */}
                <div className="flex items-center justify-center gap-4">
                  {currentAd.skippable && !currentAd.canSkipNow && (
                    <div className="text-sm bg-black/40 px-3 py-1 rounded">
                      Skip in {Math.max(0, (getCurrentAdConfig()?.forceWatch || 0) - currentAd.watchedTime)}s
                    </div>
                  )}
                  {currentAd.canSkipNow && currentAd.skippable && (
                    <Button onClick={handleSkipAd} size="sm" variant="secondary">
                      <SkipForward className="h-3 w-3 mr-1" />
                      {getCurrentAdConfig()?.skipButtonText || "Skip Ad"}
                    </Button>
                  )}
                  {!currentAd.skippable && (
                    <div className="text-sm bg-red-600/80 px-3 py-1 rounded">
                      Cannot Skip - Watch Full Ad
                    </div>
                  )}
                  <div className="text-xs">
                    Watched: {currentAd.watchedTime}s | 
                    Bonus: ${(getCurrentAdConfig()?.skipReward || 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Banner Overlay */}
          {currentAd.type === 'banner' && (
            <div className="absolute bottom-16 left-4 right-4 bg-yellow-600 text-white p-3 rounded flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{sampleAds.banner.title}</h4>
                <p className="text-sm">{sampleAds.banner.content}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-800">${sampleAds.banner.cpm} CPM</Badge>
                <Button size="sm" variant="ghost" onClick={handleAdComplete}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Social Bar */}
          {currentAd.type === 'social' && (
            <div className="absolute top-0 left-0 right-0 bg-indigo-600 text-white p-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{sampleAds.social.title}</span>
                <span className="text-sm">{sampleAds.social.content}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-indigo-800">${sampleAds.social.cpm} CPM</Badge>
                <Button size="sm" variant="ghost" onClick={handleAdComplete}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Popunder Notification */}
          {currentAd.type === 'popunder' && (
            <div className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">{sampleAds.popunder.title}</h4>
                <Button size="sm" variant="ghost" onClick={handleAdComplete}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-sm">{sampleAds.popunder.content}</p>
              <Badge className="bg-red-800 mt-1">${sampleAds.popunder.cpm} CPM</Badge>
            </div>
          )}

          {/* Native Ad */}
          {currentAd.type === 'native' && (
            <div className="absolute bottom-20 right-4 bg-gray-800 text-white p-4 rounded shadow-lg max-w-xs">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">{sampleAds.native.title}</h4>
                <Button size="sm" variant="ghost" onClick={handleAdComplete}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs mb-2">{sampleAds.native.content}</p>
              <Badge className="bg-gray-700 text-xs">${sampleAds.native.cpm} CPM</Badge>
            </div>
          )}

          {/* Video Controls */}
          {showControls && !currentAd.type && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4">
                <Button onClick={handlePlay} size="sm">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <div className="flex-1">
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    onValueChange={([value]) => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = value;
                        setCurrentTime(value);
                      }
                    }}
                  />
                </div>
                
                <span className="text-white text-sm">
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </span>
                
                <Button 
                  onClick={() => setIsMuted(!isMuted)} 
                  size="sm"
                  variant="ghost"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Test Ad Buttons - Updated Networks 2024+ */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => showAd('pre-roll', 'ezoic')} size="sm" variant="outline">
            Test Pre-Roll (Ezoic)
          </Button>
          <Button onClick={() => showAd('mid-roll', 'connatix')} size="sm" variant="outline">
            Test Mid-Roll (Connatix)
          </Button>
          <Button onClick={() => showAd('post-roll', 'ezoic')} size="sm" variant="outline">
            Test Post-Roll (Ezoic)
          </Button>
          <Button onClick={() => showAd('banner', 'propellerads')} size="sm" variant="outline">
            Test Banner (PropellerAds)
          </Button>
          <Button onClick={() => showAd('social', 'propellerads')} size="sm" variant="outline">
            Test Social Bar (PropellerAds)
          </Button>
          <Button onClick={() => showAd('popunder', 'propellerads')} size="sm" variant="outline">
            Test Popunder (PropellerAds)
          </Button>
          <Button onClick={() => showAd('native', 'propellerads')} size="sm" variant="outline">
            Test Native (PropellerAds)
          </Button>
          <Button 
            onClick={() => setAdRevenue({
              total: 0, 
              today: 0, 
              impressions: 0, 
              completed: 0, 
              skipped: 0, 
              bonusEarnings: 0
            })} 
            size="sm" 
            variant="outline"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset Stats
          </Button>
        </div>
      </Card>

      {/* Ad Settings Panel */}
      {showAdSettings && (
        <Card className="mt-6 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Advanced Ad Network Settings</h3>
            <Button onClick={() => setShowAdSettings(false)} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {Object.entries(networkConfigs).map(([network, config]) => (
            <div key={network} className="mb-8 p-4 border rounded">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-semibold capitalize">{network.replace('-', '.')}</h4>
                <Switch
                  checked={config.enabled}
                  onCheckedChange={(enabled) => updateNetworkConfig(network, { enabled })}
                />
              </div>

              {config.enabled && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor={`${network}-publisher-id`}>Publisher ID</Label>
                    <Input
                      id={`${network}-publisher-id`}
                      value={config.publisherId}
                      onChange={(e) => updateNetworkConfig(network, { publisherId: e.target.value })}
                      placeholder="Enter your Publisher ID"
                    />
                  </div>

                  {/* Ad Type Configurations */}
                  {Object.entries(config).map(([adType, adConfig]) => {
                    if (typeof adConfig !== 'object' || adType === 'enabled' || adType === 'publisherId') return null;
                    
                    return (
                      <div key={adType} className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex justify-between items-center mb-3">
                          <Label className="capitalize">{adType.replace(/([A-Z])/g, ' $1')}</Label>
                          <Switch
                            checked={adConfig.enabled}
                            onCheckedChange={(enabled) => updateAdConfig(network, adType, { enabled })}
                          />
                        </div>

                        {adConfig.enabled && (
                          <div className="space-y-4">
                            {/* Basic Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label>Frequency per session</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={adConfig.frequency}
                                  onChange={(e) => updateAdConfig(network, adType, { frequency: parseInt(e.target.value) })}
                                />
                              </div>
                              {adConfig.duration > 0 && (
                                <div>
                                  <Label>Duration (seconds)</Label>
                                  <Input
                                    type="number"
                                    min="5"
                                    max="60"
                                    value={adConfig.duration}
                                    onChange={(e) => updateAdConfig(network, adType, { duration: parseInt(e.target.value) })}
                                  />
                                </div>
                              )}
                              <div>
                                <Label>Skip Reward ($)</Label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="10"
                                  step="0.1"
                                  value={adConfig.skipReward || 0}
                                  onChange={(e) => updateAdConfig(network, adType, { skipReward: parseFloat(e.target.value) })}
                                />
                              </div>
                            </div>

                            {/* Skip Controls */}
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                              <div className="flex items-center justify-between mb-3">
                                <Label>Skip Options</Label>
                                <Switch
                                  checked={adConfig.allowSkip}
                                  onCheckedChange={(allowSkip) => updateAdConfig(network, adType, { allowSkip })}
                                />
                              </div>
                              
                              {adConfig.allowSkip && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label>Force Watch Time (seconds)</Label>
                                    <Input
                                      type="number"
                                      min="0"
                                      max={adConfig.duration || 30}
                                      value={adConfig.forceWatch || 0}
                                      onChange={(e) => updateAdConfig(network, adType, { forceWatch: parseInt(e.target.value) })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                      Minimum time before skip is allowed
                                    </p>
                                  </div>
                                  <div>
                                    <Label>Skip Button Text</Label>
                                    <Input
                                      value={adConfig.skipButtonText || "Skip Ad"}
                                      onChange={(e) => updateAdConfig(network, adType, { skipButtonText: e.target.value })}
                                      placeholder="Skip Ad"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}