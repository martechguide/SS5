import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ExternalLink, Star, TrendingUp, Users, Play } from 'lucide-react';
import { ResponsiveAdsterraBanner } from './adsterra-banner';

export type AdType = 'banner' | 'native' | 'social' | 'video-overlay' | 'sidebar' | 'footer';
export type AdNetwork = 'propellerads' | 'ezoic' | 'connatix' | 'mediavine' | 'adsterra' | 'custom';
export type AdPosition = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'floating';

export interface AdConfig {
  id: string;
  type: AdType;
  network: AdNetwork;
  position: AdPosition;
  title?: string;
  content?: string;
  imageUrl?: string;
  clickUrl?: string;
  isActive: boolean;
  showCloseButton?: boolean;
  autoHide?: number; // seconds
  cpm?: number;
}

interface AdPlacementSystemProps {
  placement: 'header' | 'sidebar' | 'content' | 'video-player' | 'footer' | 'floating';
  maxAds?: number;
  showRevenue?: boolean;
  allowUserClose?: boolean;
}

// Sample ad configurations for different networks
const sampleAds: AdConfig[] = [
  // PropellerAds
  {
    id: 'prop-banner-1',
    type: 'banner',
    network: 'propellerads',
    position: 'top',
    title: 'Discover Amazing Products',
    content: 'Shop the latest deals and save up to 70% on trending items. Limited time offer!',
    imageUrl: 'https://via.placeholder.com/728x90/4F46E5/white?text=PropellerAds+Banner',
    clickUrl: '#',
    isActive: true,
    showCloseButton: true,
    cpm: 8.50
  },
  {
    id: 'prop-native-1',
    type: 'native',
    network: 'propellerads',
    position: 'center',
    title: 'Recommended for You',
    content: 'Based on your interests, check out these carefully selected recommendations.',
    imageUrl: 'https://via.placeholder.com/300x200/059669/white?text=Native+Ad',
    clickUrl: '#',
    isActive: true,
    cpm: 12.30
  },
  {
    id: 'prop-social-1',
    type: 'social',
    network: 'propellerads',
    position: 'floating',
    title: 'Join 50K+ Users',
    content: 'Get instant notifications about new content and exclusive offers!',
    isActive: true,
    showCloseButton: true,
    autoHide: 10,
    cpm: 6.75
  },
  // Ezoic
  {
    id: 'ezoic-banner-1',
    type: 'banner',
    network: 'ezoic',
    position: 'bottom',
    title: 'Premium Content Access',
    content: 'Unlock exclusive features and ad-free experience with Premium membership.',
    imageUrl: 'https://via.placeholder.com/970x250/DC2626/white?text=Ezoic+Premium+Banner',
    clickUrl: '#',
    isActive: true,
    cpm: 15.75
  },
  {
    id: 'ezoic-sidebar-1',
    type: 'sidebar',
    network: 'ezoic',
    position: 'right',
    title: 'Related Courses',
    content: 'Expand your knowledge with these handpicked courses from top instructors.',
    imageUrl: 'https://via.placeholder.com/300x600/7C3AED/white?text=Ezoic+Sidebar',
    clickUrl: '#',
    isActive: true,
    cpm: 18.25
  },
  // Connatix (Video specialists)
  {
    id: 'connatix-video-1',
    type: 'video-overlay',
    network: 'connatix',
    position: 'bottom',
    title: 'Related Videos',
    content: 'Continue watching similar content that matches your interests.',
    isActive: true,
    cpm: 22.50
  },
  // Mediavine
  {
    id: 'mediavine-native-1',
    type: 'native',
    network: 'mediavine',
    position: 'center',
    title: 'Editor\'s Choice',
    content: 'Discover premium tools and resources recommended by our editorial team.',
    imageUrl: 'https://via.placeholder.com/400x250/F59E0B/white?text=Mediavine+Native',
    clickUrl: '#',
    isActive: true,
    cpm: 19.80
  },
  // Adsterra - High CPM Network
  {
    id: 'adsterra-banner-1',
    type: 'banner',
    network: 'adsterra',
    position: 'bottom',
    title: 'Premium Educational Tools',
    content: 'Boost your learning with professional-grade tools. Special discount for students!',
    imageUrl: 'https://via.placeholder.com/728x90/16A34A/white?text=Adsterra+Banner+728x90',
    clickUrl: '#',
    isActive: true,
    showCloseButton: true,
    cpm: 6.50
  },
  {
    id: 'adsterra-mobile-1',
    type: 'banner',
    network: 'adsterra',
    position: 'bottom',
    title: 'Learning Apps',
    content: 'Download the most popular learning apps of 2025.',
    imageUrl: 'https://via.placeholder.com/320x50/16A34A/white?text=Adsterra+Mobile+320x50',
    clickUrl: '#',
    isActive: true,
    showCloseButton: true,
    cpm: 4.25
  },
  {
    id: 'adsterra-native-1',
    type: 'native',
    network: 'adsterra',
    position: 'center',
    title: 'Recommended Learning Resources',
    content: 'Enhance your skills with these expert-recommended courses and tools.',
    imageUrl: 'https://via.placeholder.com/300x250/16A34A/white?text=Adsterra+Native',
    clickUrl: '#',
    isActive: false,
    cpm: 12.80
  }
];

export default function AdPlacementSystem({ 
  placement, 
  maxAds = 3, 
  showRevenue = false,
  allowUserClose = true 
}: AdPlacementSystemProps) {
  const [activeAds, setActiveAds] = useState<AdConfig[]>([]);
  const [closedAds, setClosedAds] = useState<Set<string>>(new Set());
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Only show bottom banner ads for footer placement - non-intrusive strategy
    const relevantAds = sampleAds.filter(ad => {
      if (!ad.isActive || closedAds.has(ad.id)) return false;
      
      // Only allow footer placement with bottom banner ads
      if (placement === 'footer') {
        return ad.type === 'banner' && ad.position === 'bottom';
      }
      
      // Block all other placements for non-intrusive experience
      return false;
    }).slice(0, maxAds);

    setActiveAds(relevantAds);

    // Calculate revenue from impressions
    const revenue = relevantAds.reduce((sum, ad) => sum + (ad.cpm || 0) / 1000, 0);
    setTotalRevenue(prev => prev + revenue);

    // Auto-hide ads with timer
    relevantAds.forEach(ad => {
      if (ad.autoHide) {
        setTimeout(() => {
          handleCloseAd(ad.id);
        }, ad.autoHide * 1000);
      }
    });
  }, [placement, maxAds, closedAds]);

  const handleCloseAd = (adId: string) => {
    setClosedAds(prev => new Set(prev).add(adId));
  };

  const handleAdClick = (ad: AdConfig) => {
    // Track click and revenue
    const clickRevenue = (ad.cpm || 0) / 100; // Assume 1% CTR
    setTotalRevenue(prev => prev + clickRevenue);
    
    // Open link
    if (ad.clickUrl && ad.clickUrl !== '#') {
      window.open(ad.clickUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getNetworkBadgeColor = (network: AdNetwork) => {
    switch (network) {
      case 'propellerads': return 'bg-blue-100 text-blue-800';
      case 'ezoic': return 'bg-red-100 text-red-800';
      case 'connatix': return 'bg-purple-100 text-purple-800';
      case 'mediavine': return 'bg-yellow-100 text-yellow-800';
      case 'adsterra': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderBannerAd = (ad: AdConfig) => (
    <div key={ad.id} className="relative group">
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-lg">
            {ad.imageUrl ? (
              <img 
                src={ad.imageUrl} 
                alt={ad.title}
                className="w-full h-auto cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleAdClick(ad)}
              />
            ) : (
              <div 
                className="w-full h-24 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white cursor-pointer"
                onClick={() => handleAdClick(ad)}
              >
                <div className="text-center">
                  <h3 className="font-semibold">{ad.title}</h3>
                  <p className="text-sm opacity-90">{ad.content}</p>
                </div>
              </div>
            )}
            
            {/* Network Badge */}
            <Badge className={`absolute top-2 left-2 text-xs ${getNetworkBadgeColor(ad.network)}`}>
              {ad.network}
            </Badge>
            
            {/* Close Button */}
            {allowUserClose && ad.showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0 bg-black/20 hover:bg-black/40 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseAd(ad.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}

            {/* Revenue Display */}
            {showRevenue && (
              <div className="absolute bottom-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                ${(ad.cpm || 0).toFixed(2)} CPM
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNativeAd = (ad: AdConfig) => (
    <Card key={ad.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleAdClick(ad)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {ad.imageUrl && (
            <img 
              src={ad.imageUrl} 
              alt={ad.title}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm leading-tight">{ad.title}</h3>
              <Badge className={`text-xs ml-2 ${getNetworkBadgeColor(ad.network)}`}>
                {ad.network}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{ad.content}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>Sponsored</span>
              </div>
              {showRevenue && (
                <span className="text-xs text-green-600 font-medium">
                  ${(ad.cpm || 0).toFixed(2)} CPM
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSocialAd = (ad: AdConfig) => (
    <div key={ad.id} className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm font-semibold">{ad.title}</span>
            </div>
            {allowUserClose && ad.showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
                onClick={() => handleCloseAd(ad.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <p className="text-sm opacity-90 mb-3">{ad.content}</p>
          <Button 
            size="sm" 
            className="w-full bg-white text-indigo-600 hover:bg-gray-100"
            onClick={() => handleAdClick(ad)}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Join Now
          </Button>
          {showRevenue && (
            <div className="text-xs opacity-75 mt-2 text-center">
              Revenue: ${(ad.cpm || 0).toFixed(2)} CPM
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderVideoOverlayAd = (ad: AdConfig) => (
    <div key={ad.id} className="absolute bottom-4 left-4 right-4 z-10">
      <Card className="bg-black/80 text-white border-0">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <div>
                <h4 className="text-sm font-semibold">{ad.title}</h4>
                <p className="text-xs opacity-80">{ad.content}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showRevenue && (
                <Badge className="bg-green-100 text-green-800 text-xs">
                  ${(ad.cpm || 0).toFixed(2)}
                </Badge>
              )}
              {allowUserClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  onClick={() => handleCloseAd(ad.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSidebarAd = (ad: AdConfig) => (
    <Card key={ad.id} className="mb-4">
      <CardContent className="p-4">
        <div className="text-center">
          {ad.imageUrl && (
            <img 
              src={ad.imageUrl} 
              alt={ad.title}
              className="w-full h-auto rounded-lg mb-3 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleAdClick(ad)}
            />
          )}
          <Badge className={`mb-2 ${getNetworkBadgeColor(ad.network)}`}>
            {ad.network}
          </Badge>
          <h3 className="font-semibold text-sm mb-2">{ad.title}</h3>
          <p className="text-xs text-gray-600 mb-3">{ad.content}</p>
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => handleAdClick(ad)}
          >
            Learn More
          </Button>
          {showRevenue && (
            <div className="text-xs text-green-600 mt-2">
              ${(ad.cpm || 0).toFixed(2)} CPM
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (activeAds.length === 0) return null;

  return (
    <div className={`ad-placement-${placement}`}>
      {showRevenue && totalRevenue > 0 && (
        <div className="mb-2 text-right">
          <Badge className="bg-green-100 text-green-800">
            <TrendingUp className="h-3 w-3 mr-1" />
            Revenue: ${totalRevenue.toFixed(4)}
          </Badge>
        </div>
      )}
      
      {activeAds.map(ad => {
        switch (ad.type) {
          case 'banner':
            return renderBannerAd(ad);
          case 'native':
            return renderNativeAd(ad);
          case 'social':
            return renderSocialAd(ad);
          case 'video-overlay':
            return renderVideoOverlayAd(ad);
          case 'sidebar':
            return renderSidebarAd(ad);
          default:
            return renderNativeAd(ad);
        }
      })}
    </div>
  );
}

export { sampleAds };