import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AdConfig {
  googleAdSenseClientId: string;
  googleVideoSlot: string;
  adsterraZoneId: string;
  propellerAdsZoneId: string;
}

interface VideoAdManagerProps {
  videoElement: HTMLVideoElement | null;
  adConfig: AdConfig;
  videoDuration: number;
  onAdRevenue?: (platform: string, revenue: number) => void;
}

export const VideoAdManager: React.FC<VideoAdManagerProps> = ({
  videoElement,
  adConfig,
  videoDuration,
  onAdRevenue
}) => {
  const [adsLoaded, setAdsLoaded] = useState(false);
  const [currentAdPlatform, setCurrentAdPlatform] = useState<string>('');
  const [totalEarnings, setTotalEarnings] = useState(0);
  const preRollRef = useRef<HTMLDivElement>(null);
  const midRollRef = useRef<HTMLDivElement>(null);
  const postRollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoElement) {
      setupVideoAdBreaks();
      loadAdPlatforms();
    }
  }, [videoElement]);

  const loadAdPlatforms = async () => {
    try {
      // Load Google AdSense
      await loadGoogleAdSense();
      
      // Load Adsterra (highest paying)
      await loadAdsterra();
      
      // Load PropellerAds
      await loadPropellerAds();
      
      setAdsLoaded(true);
    } catch (error) {
      console.error('Error loading ad platforms:', error);
    }
  };

  const loadGoogleAdSense = () => {
    return new Promise((resolve) => {
      if (window.adsbygoogle) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adConfig.googleAdSenseClientId}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => resolve(true);
      document.head.appendChild(script);
    });
  };

  const loadAdsterra = () => {
    return new Promise((resolve) => {
      // Adsterra video ads - highest CPM
      const script = document.createElement('script');
      script.src = 'https://www.adsterranet.com/js/adsterra.js';
      script.async = true;
      script.onload = () => resolve(true);
      document.head.appendChild(script);
    });
  };

  const loadPropellerAds = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://www.propellerads.com/tags/video.js';
      script.async = true;
      script.onload = () => resolve(true);
      document.head.appendChild(script);
    });
  };

  const setupVideoAdBreaks = () => {
    if (!videoElement) return;

    // Pre-roll ad (before video starts)
    videoElement.addEventListener('play', handlePreRollAd);
    
    // Mid-roll ads (every 3 minutes for longer videos)
    videoElement.addEventListener('timeupdate', handleMidRollAd);
    
    // Post-roll ad (after video ends)
    videoElement.addEventListener('ended', handlePostRollAd);
  };

  const handlePreRollAd = async () => {
    if (!adsLoaded) return;

    setCurrentAdPlatform('pre-roll');
    videoElement?.pause();

    // Try Adsterra first (highest paying)
    const adsterraSuccess = await showAdsterraVideoAd();
    
    if (!adsterraSuccess) {
      // Fallback to Google AdSense
      await showGoogleVideoAd('pre-roll');
    }

    // Resume video after ad
    setTimeout(() => {
      videoElement?.play();
    }, 30000); // 30 second ad
  };

  const handleMidRollAd = () => {
    if (!videoElement || videoDuration < 300) return; // Only for videos > 5 minutes

    const currentTime = videoElement.currentTime;
    const midPoint = videoDuration / 2;

    // Show mid-roll ad at video midpoint
    if (Math.abs(currentTime - midPoint) < 1) {
      showMidRollAd();
    }
  };

  const handlePostRollAd = async () => {
    if (!adsLoaded) return;

    setCurrentAdPlatform('post-roll');
    
    // Show banner ads after video completion
    await showPostRollBannerAds();
  };

  const showAdsterraVideoAd = async (): Promise<boolean> => {
    try {
      if (window.adsterra) {
        // Adsterra video ad implementation
        window.adsterra.show({
          zone: adConfig.adsterraZoneId,
          type: 'video',
          onComplete: () => {
            const earnings = calculateEarnings('adsterra', 'video');
            updateEarnings('adsterra', earnings);
          }
        });
        return true;
      }
    } catch (error) {
      console.error('Adsterra ad failed:', error);
    }
    return false;
  };

  const showGoogleVideoAd = async (position: string) => {
    try {
      if (window.adsbygoogle) {
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.setAttribute('data-ad-client', adConfig.googleAdSenseClientId);
        adElement.setAttribute('data-ad-slot', adConfig.googleVideoSlot);
        adElement.setAttribute('data-ad-format', 'video');

        const container = position === 'pre-roll' ? preRollRef.current : 
                         position === 'mid-roll' ? midRollRef.current : postRollRef.current;
        
        if (container) {
          container.appendChild(adElement);
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          
          const earnings = calculateEarnings('google', 'video');
          updateEarnings('google', earnings);
        }
      }
    } catch (error) {
      console.error('Google ad failed:', error);
    }
  };

  const showMidRollAd = async () => {
    setCurrentAdPlatform('mid-roll');
    videoElement?.pause();

    // Try PropellerAds for mid-roll
    const propellerSuccess = await showPropellerVideoAd();
    
    if (!propellerSuccess) {
      await showGoogleVideoAd('mid-roll');
    }

    // Resume after 15 seconds
    setTimeout(() => {
      videoElement?.play();
    }, 15000);
  };

  const showPropellerVideoAd = async (): Promise<boolean> => {
    try {
      if (window.propellerAds) {
        window.propellerAds.show({
          zone: adConfig.propellerAdsZoneId,
          type: 'interstitial',
          onComplete: () => {
            const earnings = calculateEarnings('propeller', 'video');
            updateEarnings('propeller', earnings);
          }
        });
        return true;
      }
    } catch (error) {
      console.error('PropellerAds failed:', error);
    }
    return false;
  };

  const showPostRollBannerAds = async () => {
    // Show multiple banner ads after video for maximum earnings
    await Promise.all([
      showGoogleBannerAd(),
      showAdsterraBannerAd(),
      showPropellerBannerAd()
    ]);
  };

  const showGoogleBannerAd = async () => {
    try {
      const adElement = document.createElement('ins');
      adElement.className = 'adsbygoogle';
      adElement.style.display = 'block';
      adElement.style.width = '100%';
      adElement.style.height = '90px';
      adElement.setAttribute('data-ad-client', adConfig.googleAdSenseClientId);
      adElement.setAttribute('data-ad-slot', adConfig.googleVideoSlot);
      adElement.setAttribute('data-ad-format', 'horizontal');

      if (postRollRef.current) {
        postRollRef.current.appendChild(adElement);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        
        const earnings = calculateEarnings('google', 'banner');
        updateEarnings('google', earnings);
      }
    } catch (error) {
      console.error('Google banner ad failed:', error);
    }
  };

  const showAdsterraBannerAd = async () => {
    // Adsterra banner implementation
    const earnings = calculateEarnings('adsterra', 'banner');
    updateEarnings('adsterra', earnings);
  };

  const showPropellerBannerAd = async () => {
    // PropellerAds banner implementation
    const earnings = calculateEarnings('propeller', 'banner');
    updateEarnings('propeller', earnings);
  };

  const calculateEarnings = (platform: string, adType: string): number => {
    // CPM rates by platform and ad type (per 1000 views)
    const rates: Record<string, Record<string, number>> = {
      adsterra: { video: 25, banner: 8 },
      google: { video: 15, banner: 5 },
      propeller: { video: 12, banner: 4 }
    };

    const platformRates = rates[platform];
    const rate = platformRates?.[adType] || 0;
    return rate / 1000; // Convert to per-view rate
  };

  const updateEarnings = (platform: string, earnings: number) => {
    setTotalEarnings(prev => prev + earnings);
    onAdRevenue?.(platform, earnings);
  };

  return (
    <div className="video-ad-manager">
      {/* Pre-roll Ad Container */}
      <div ref={preRollRef} className="ad-container pre-roll" style={{ 
        display: currentAdPlatform === 'pre-roll' ? 'block' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 1000
      }} />

      {/* Mid-roll Ad Container */}
      <div ref={midRollRef} className="ad-container mid-roll" style={{ 
        display: currentAdPlatform === 'mid-roll' ? 'block' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 1000
      }} />

      {/* Post-roll Ad Container */}
      <div ref={postRollRef} className="ad-container post-roll" style={{ 
        marginTop: '10px'
      }} />

      {/* Earnings Display */}
      <Card className="earnings-display mt-4 p-4">
        <h4 className="font-semibold">Video Earnings</h4>
        <p className="text-lg font-bold text-green-600">
          ${totalEarnings.toFixed(4)} per view
        </p>
        <p className="text-sm text-gray-600">
          Current Ad: {currentAdPlatform || 'None'}
        </p>
      </Card>
    </div>
  );
};

// Global type declarations
declare global {
  interface Window {
    adsbygoogle: any[];
    adsterra: any;
    propellerAds: any;
  }
}