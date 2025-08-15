import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MonetizedVideoPlayer } from '@/components/monetization/monetized-video-player';
import VideoAdPlacementSystem from '@/components/monetization/video-ad-placement-system';
import AdNetworkManagement from '@/components/monetization/ad-network-management';
import ContextualAdIntelligence from '@/components/ads/contextual-ad-intelligence';
import AdvancedVideoPlayer from '@/components/monetization/advanced-video-player';
import MonetizationGuide from '@/components/monetization/monetization-guide';
import PlatformCompatibility from '@/components/monetization/platform-compatibility';
import { DollarSign, TrendingUp, Users, PlayCircle, Settings, ExternalLink, AlertTriangle } from 'lucide-react';

export default function MonetizationSetup() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Video Monetization Setup
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transform your video content into revenue streams with multiple advertising platforms
          </p>
        </div>

        {/* Revenue Potential Calculator */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-bold text-green-800 dark:text-green-200">Revenue Potential Calculator</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-green-600">$25-50</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Per 1,000 Views</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">$750-1,500</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Per 30,000 Views/Month</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">$3,000-6,000</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Per 120,000 Views/Month</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">$10,000+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Per 400,000+ Views/Month</p>
            </div>
          </div>
        </Card>

      <Tabs defaultValue="video-ads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
          <TabsTrigger value="video-ads">Video Ad Setup</TabsTrigger>
          <TabsTrigger value="networks">Network Management</TabsTrigger>
          <TabsTrigger value="intelligence">AI Intelligence</TabsTrigger>
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
          <TabsTrigger value="guide">Implementation</TabsTrigger>
          <TabsTrigger value="help">Help Guide</TabsTrigger>
          <TabsTrigger value="platforms">Platform Support</TabsTrigger>
        </TabsList>

        {/* Video Ad Setup Tab */}
        <TabsContent value="video-ads" className="space-y-6">
          <VideoAdPlacementSystem />
        </TabsContent>

        {/* Network Management Tab */}
        <TabsContent value="networks" className="space-y-6">
          <AdNetworkManagement />
        </TabsContent>

        {/* AI Intelligence Tab */}
        <TabsContent value="intelligence" className="space-y-6">
          <ContextualAdIntelligence />
        </TabsContent>

        {/* Live Demo Tab */}
        <TabsContent value="demo" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Live Video Monetization Demo</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Experience how Pre-Roll, Mid-Roll, Banner Overlay, and Post-Roll ads work in real videos
            </p>
            <AdvancedVideoPlayer />
          </Card>
        </TabsContent>

        {/* Implementation Guide Tab */}
        <TabsContent value="guide" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Complete Implementation Guide</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h3 className="font-semibold">Configure Video Ad Placement</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Use the "Video Ad Setup" tab to configure Pre-Roll, Mid-Roll, Banner Overlay, and Post-Roll ads with editable placement codes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h3 className="font-semibold">Manage Ad Networks</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Apply to multiple networks through "Network Management" tab for maximum revenue diversification
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h3 className="font-semibold">Enable AI Intelligence</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Use contextual ad placement intelligence to optimize revenue and viewer experience automatically
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h3 className="font-semibold">Test with Live Demo</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Experience all ad types in action through the Live Demo to understand the full monetization potential
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">Expected Monthly Earnings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Conservative Estimate</h4>
                <div className="text-sm space-y-1">
                  <div>10,000 views/month = $250-500/month</div>
                  <div>50,000 views/month = $1,250-2,500/month</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Optimistic Estimate</h4>
                <div className="text-sm space-y-1">
                  <div>30,000 views/month = $1,250-2,500/month</div>
                  <div>100,000+ views/month = $5,000+/month</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Help Guide Tab */}
        <TabsContent value="help" className="space-y-6">
          <MonetizationGuide />
        </TabsContent>

        {/* Platform Support Tab */}
        <TabsContent value="platforms" className="space-y-6">
          <PlatformCompatibility />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}