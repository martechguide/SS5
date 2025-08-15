import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MousePointer, 
  Navigation, 
  LayoutGrid, 
  Play, 
  Settings, 
  DollarSign,
  ExternalLink,
  Copy,
  CheckCircle,
  Eye
} from 'lucide-react';

export default function AdsterraAdTypes() {
  const [activeAdTypes, setActiveAdTypes] = useState({
    popunder: false,
    socialBar: false,
    nativeBanner: false
  });

  const [adConfig, setAdConfig] = useState({
    popunder: {
      publisherId: '',
      frequency: 1,
      delayTime: 3000
    },
    socialBar: {
      publisherId: '',
      position: 'bottom',
      theme: 'dark',
      displayDuration: 15,
      autoHide: true,
      showCloseButton: true
    },
    nativeBanner: {
      publisherId: '',
      position: 'inline',
      responsive: true,
      displayDuration: 30,
      autoHide: true,
      showCloseButton: true
    }
  });

  const [previewMode, setPreviewMode] = useState(false);

  const adTypes = [
    {
      id: 'popunder',
      name: 'Popunder Ads',
      icon: MousePointer,
      cpm: '$5-15',
      description: 'Opens new window/tab behind current page when user clicks anywhere on video',
      features: [
        'High engagement rates',
        'Works on all devices',
        'Non-intrusive user experience',
        'Triggers on any click interaction'
      ],
      bestFor: 'Video streaming sites with engaged users',
      implementation: 'JavaScript snippet in video player wrapper'
    },
    {
      id: 'socialBar',
      name: 'Social Bar',
      icon: Navigation,
      cpm: '$3-8',
      description: 'Sticky notification bar that appears at top/bottom of video player',
      features: [
        'Always visible during video playback',
        'Customizable themes and positions',
        'High visibility without blocking content',
        'Mobile optimized'
      ],
      bestFor: 'Continuous revenue during video watching',
      implementation: 'CSS + JavaScript overlay on video container'
    },
    {
      id: 'nativeBanner',
      name: 'Native Banner',
      icon: LayoutGrid,
      cpm: '$4-12',
      description: 'Seamlessly integrated banner ads that match your video player design',
      features: [
        'Matches site design automatically',
        'High CTR due to native appearance',
        'Responsive across all screen sizes',
        'Multiple placement options'
      ],
      bestFor: 'Professional video platforms with quality content',
      implementation: 'Div container with responsive ad unit'
    }
  ];

  const handleAdToggle = (adType: string) => {
    setActiveAdTypes(prev => ({
      ...prev,
      [adType]: !prev[adType as keyof typeof prev]
    }));
  };

  const generateAdCode = (adType: string) => {
    switch (adType) {
      case 'popunder':
        const popunderConfig = adConfig.popunder;
        return `<!-- Adsterra Popunder Ad -->
<script type="text/javascript">
  atOptions = {
    'key' : '${popunderConfig.publisherId || 'YOUR_PUBLISHER_ID'}',
    'format' : 'popunder',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
  document.write('<scr' + 'ipt type="text/javascript" src="//www.profitablegatetocontent.com/${popunderConfig.publisherId || 'YOUR_PUBLISHER_ID'}/invoke.js"></scr' + 'ipt>');
</script>`;

      case 'socialBar':
        const socialBarConfig = adConfig.socialBar;
        const socialBarTimer = socialBarConfig.autoHide && socialBarConfig.displayDuration ? `
    // Timer functionality for social bar
    setTimeout(function() {
        const socialBar = document.querySelector('[data-adsterra-social]');
        if (socialBar) {
            socialBar.style.transition = 'transform 0.5s';
            socialBar.style.transform = 'translateY(100%)';
            setTimeout(() => socialBar.remove(), 500);
        }
    }, ${socialBarConfig.displayDuration * 1000});` : '';

        const socialBarCloseBtn = socialBarConfig.showCloseButton ? `
    // Add close button to social bar
    setTimeout(function() {
        const socialBar = document.querySelector('[data-adsterra-social]');
        if (socialBar) {
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = 'position:absolute;top:5px;right:10px;background:rgba(0,0,0,0.7);color:#fff;border:none;width:25px;height:25px;border-radius:50%;cursor:pointer;font-size:16px;z-index:1001;';
            closeBtn.onclick = () => socialBar.remove();
            socialBar.appendChild(closeBtn);
        }
    }, 1000);` : '';

        return `<!-- Adsterra Social Bar with Timer (${socialBarConfig.displayDuration}s) -->
<div data-adsterra-social style="position:fixed;${socialBarConfig.position}:0;left:0;right:0;z-index:1000;">
<script type="text/javascript">
  atOptions = {
    'key' : '${socialBarConfig.publisherId || 'YOUR_PUBLISHER_ID'}',
    'format' : 'socialbar',
    'height' : 50,
    'width' : 320,
    'params' : {
      'position': '${socialBarConfig.position}',
      'theme': '${socialBarConfig.theme}'
    }
  };
  document.write('<scr' + 'ipt type="text/javascript" src="//www.profitablegatetocontent.com/${socialBarConfig.publisherId || 'YOUR_PUBLISHER_ID'}/invoke.js"></scr' + 'ipt>');${socialBarTimer}${socialBarCloseBtn}
</script>
</div>`;

      case 'nativeBanner':
        const nativeBannerConfig = adConfig.nativeBanner;
        const nativeBannerTimer = nativeBannerConfig.autoHide && nativeBannerConfig.displayDuration ? `
    // Timer functionality for native banner
    setTimeout(function() {
        const nativeBanner = document.querySelector('[data-adsterra-native]');
        if (nativeBanner) {
            nativeBanner.style.transition = 'opacity 0.5s';
            nativeBanner.style.opacity = '0';
            setTimeout(() => nativeBanner.remove(), 500);
        }
    }, ${nativeBannerConfig.displayDuration * 1000});` : '';

        const nativeBannerCloseBtn = nativeBannerConfig.showCloseButton ? `
    // Add close button to native banner
    setTimeout(function() {
        const nativeBanner = document.querySelector('[data-adsterra-native]');
        if (nativeBanner) {
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = 'position:absolute;top:5px;right:5px;background:rgba(0,0,0,0.7);color:#fff;border:none;width:20px;height:20px;border-radius:50%;cursor:pointer;font-size:14px;z-index:1000;';
            closeBtn.onclick = () => nativeBanner.remove();
            nativeBanner.style.position = 'relative';
            nativeBanner.appendChild(closeBtn);
        }
    }, 1000);` : '';

        return `<!-- Adsterra Native Banner with Timer (${nativeBannerConfig.displayDuration}s) -->
<div data-adsterra-native>
<script type="text/javascript">
  atOptions = {
    'key' : '${nativeBannerConfig.publisherId || 'YOUR_PUBLISHER_ID'}',
    'format' : 'native',
    'height' : 300,
    'width' : 400,
    'params' : {
      'responsive': ${nativeBannerConfig.responsive},
      'position': '${nativeBannerConfig.position}'
    }
  };
  document.write('<scr' + 'ipt type="text/javascript" src="//www.profitablegatetocontent.com/${nativeBannerConfig.publisherId || 'YOUR_PUBLISHER_ID'}/invoke.js"></scr' + 'ipt>');${nativeBannerTimer}${nativeBannerCloseBtn}
</script>
</div>`;

      default:
        return '';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Adsterra Ad Types for Streaming Videos</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Implement Popunder, Social Bar, and Native Banner ads specifically designed for video streaming
        </p>
      </div>

      {/* Quick Setup Alert */}
      <Card className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">Setup Required</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              You'll need your Adsterra Publisher IDs for each ad type. Get them from your Adsterra dashboard after approval.
            </p>
          </div>
        </div>
      </Card>

      {/* Ad Types Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {adTypes.map((adType) => {
          const Icon = adType.icon;
          const isActive = activeAdTypes[adType.id as keyof typeof activeAdTypes];
          
          return (
            <Card key={adType.id} className={`p-6 transition-all ${isActive ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold">{adType.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{adType.cpm}</p>
                  <p className="text-xs text-gray-500">CPM</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {adType.description}
              </p>

              <div className="space-y-2 mb-4">
                {adType.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-4">
                <p className="text-sm font-medium">Best For:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{adType.bestFor}</p>
              </div>

              {/* Timer Status for Social Bar and Native Banner */}
              {(adType.id === 'socialBar' || adType.id === 'nativeBanner') && isActive && (
                <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-blue-700">⏱️ Timer Settings:</span>
                    <div className="flex items-center gap-2">
                      {adConfig[adType.id].autoHide ? (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Auto-hide: {adConfig[adType.id].displayDuration}s
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-600 text-xs">
                          Manual close only
                        </Badge>
                      )}
                      {adConfig[adType.id].showCloseButton && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">✕ Close button</Badge>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Switch
                  checked={isActive}
                  onCheckedChange={() => handleAdToggle(adType.id)}
                />
                <Badge variant={isActive ? "default" : "secondary"}>
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Configuration Tabs */}
      <Tabs defaultValue="popunder" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="popunder">Popunder Setup</TabsTrigger>
          <TabsTrigger value="socialBar">Social Bar Setup</TabsTrigger>
          <TabsTrigger value="nativeBanner">Native Banner Setup</TabsTrigger>
          <TabsTrigger value="implementation">Video Implementation</TabsTrigger>
        </TabsList>

        {/* Popunder Configuration */}
        <TabsContent value="popunder" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Popunder Ad Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="popunder-id">Publisher ID</Label>
                  <Input
                    id="popunder-id"
                    placeholder="Enter your Adsterra Publisher ID"
                    value={adConfig.popunder.publisherId}
                    onChange={(e) => setAdConfig(prev => ({
                      ...prev,
                      popunder: { ...prev.popunder, publisherId: e.target.value }
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="popunder-frequency">Frequency (per session)</Label>
                  <Input
                    id="popunder-frequency"
                    type="number"
                    min="1"
                    max="5"
                    value={adConfig.popunder.frequency}
                    onChange={(e) => setAdConfig(prev => ({
                      ...prev,
                      popunder: { ...prev.popunder, frequency: parseInt(e.target.value) }
                    }))}
                  />
                </div>

                <div>
                  <Label htmlFor="popunder-delay">Delay (milliseconds)</Label>
                  <Input
                    id="popunder-delay"
                    type="number"
                    min="1000"
                    value={adConfig.popunder.delayTime}
                    onChange={(e) => setAdConfig(prev => ({
                      ...prev,
                      popunder: { ...prev.popunder, delayTime: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Generated Code:</h4>
                <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
                  {generateAdCode('popunder')}
                </pre>
                <Button 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(generateAdCode('popunder'))}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Code
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Social Bar Configuration */}
        <TabsContent value="socialBar" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Social Bar Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="socialbar-id">Publisher ID</Label>
                  <Input
                    id="socialbar-id"
                    placeholder="Enter your Adsterra Publisher ID"
                    value={adConfig.socialBar.publisherId}
                    onChange={(e) => setAdConfig(prev => ({
                      ...prev,
                      socialBar: { ...prev.socialBar, publisherId: e.target.value }
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="socialbar-position">Position</Label>
                  <select 
                    id="socialbar-position"
                    className="w-full p-2 border rounded"
                    value={adConfig.socialBar.position}
                    onChange={(e) => setAdConfig(prev => ({
                      ...prev,
                      socialBar: { ...prev.socialBar, position: e.target.value }
                    }))}
                  >
                    <option value="top">Top of Video</option>
                    <option value="bottom">Bottom of Video</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="socialbar-theme">Theme</Label>
                  <select 
                    id="socialbar-theme"
                    className="w-full p-2 border rounded"
                    value={adConfig.socialBar.theme}
                    onChange={(e) => setAdConfig(prev => ({
                      ...prev,
                      socialBar: { ...prev.socialBar, theme: e.target.value }
                    }))}
                  >
                    <option value="dark">Dark Theme</option>
                    <option value="light">Light Theme</option>
                  </select>
                </div>

                {/* Timer Settings */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-semibold mb-3 text-blue-600">⏱️ Timer & Auto-Hide Settings</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="socialbar-autohide">Auto-hide after timer</Label>
                      <Switch
                        id="socialbar-autohide"
                        checked={adConfig.socialBar.autoHide}
                        onCheckedChange={(checked) => setAdConfig(prev => ({
                          ...prev,
                          socialBar: { ...prev.socialBar, autoHide: checked }
                        }))}
                      />
                    </div>
                    
                    {adConfig.socialBar.autoHide && (
                      <div>
                        <Label htmlFor="socialbar-duration">Display Duration (seconds)</Label>
                        <Input
                          id="socialbar-duration"
                          type="number"
                          min="5"
                          max="300"
                          value={adConfig.socialBar.displayDuration}
                          onChange={(e) => setAdConfig(prev => ({
                            ...prev,
                            socialBar: { ...prev.socialBar, displayDuration: parseInt(e.target.value) || 15 }
                          }))}
                          placeholder="15"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 5-30 seconds for social bar notifications
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Label htmlFor="socialbar-closebutton">Show close button (×)</Label>
                      <Switch
                        id="socialbar-closebutton"
                        checked={adConfig.socialBar.showCloseButton}
                        onCheckedChange={(checked) => setAdConfig(prev => ({
                          ...prev,
                          socialBar: { ...prev.socialBar, showCloseButton: checked }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Generated Code:</h4>
                <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
                  {generateAdCode('socialBar')}
                </pre>
                <Button 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(generateAdCode('socialBar'))}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Code
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Native Banner Configuration */}
        <TabsContent value="nativeBanner" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Native Banner Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="native-id">Publisher ID</Label>
                  <Input
                    id="native-id"
                    placeholder="Enter your Adsterra Publisher ID"
                    value={adConfig.nativeBanner.publisherId}
                    onChange={(e) => setAdConfig(prev => ({
                      ...prev,
                      nativeBanner: { ...prev.nativeBanner, publisherId: e.target.value }
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="native-position">Placement</Label>
                  <select 
                    id="native-position"
                    className="w-full p-2 border rounded"
                    value={adConfig.nativeBanner.position}
                    onChange={(e) => setAdConfig(prev => ({
                      ...prev,
                      nativeBanner: { ...prev.nativeBanner, position: e.target.value }
                    }))}
                  >
                    <option value="before">Before Video</option>
                    <option value="after">After Video</option>
                    <option value="sidebar">Video Sidebar</option>
                    <option value="inline">Inline with Content</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={adConfig.nativeBanner.responsive}
                    onCheckedChange={(checked) => setAdConfig(prev => ({
                      ...prev,
                      nativeBanner: { ...prev.nativeBanner, responsive: checked }
                    }))}
                  />
                  <Label>Responsive Design</Label>
                </div>

                {/* Timer Settings */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-semibold mb-3 text-blue-600">⏱️ Timer & Auto-Hide Settings</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="native-autohide">Auto-hide after timer</Label>
                      <Switch
                        id="native-autohide"
                        checked={adConfig.nativeBanner.autoHide}
                        onCheckedChange={(checked) => setAdConfig(prev => ({
                          ...prev,
                          nativeBanner: { ...prev.nativeBanner, autoHide: checked }
                        }))}
                      />
                    </div>
                    
                    {adConfig.nativeBanner.autoHide && (
                      <div>
                        <Label htmlFor="native-duration">Display Duration (seconds)</Label>
                        <Input
                          id="native-duration"
                          type="number"
                          min="5"
                          max="300"
                          value={adConfig.nativeBanner.displayDuration}
                          onChange={(e) => setAdConfig(prev => ({
                            ...prev,
                            nativeBanner: { ...prev.nativeBanner, displayDuration: parseInt(e.target.value) || 30 }
                          }))}
                          placeholder="30"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 20-120 seconds for native ads (content engagement)
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Label htmlFor="native-closebutton">Show close button (×)</Label>
                      <Switch
                        id="native-closebutton"
                        checked={adConfig.nativeBanner.showCloseButton}
                        onCheckedChange={(checked) => setAdConfig(prev => ({
                          ...prev,
                          nativeBanner: { ...prev.nativeBanner, showCloseButton: checked }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Generated Code:</h4>
                <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
                  {generateAdCode('nativeBanner')}
                </pre>
                <Button 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(generateAdCode('nativeBanner'))}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Code
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Implementation Guide */}
        <TabsContent value="implementation" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Video Player Implementation</h3>
            
            <div className="space-y-6">
              {/* Step-by-step guide */}
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Get Adsterra Publisher IDs</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Sign up at Adsterra.com and create separate ad zones for Popunder, Social Bar, and Native Banner
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Configure Each Ad Type</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Enter your Publisher IDs in the configuration tabs above and customize settings
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Implement in Video Player</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Copy the generated codes and add them to your video player component or HTML
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold">Test and Optimize</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Monitor performance in Adsterra dashboard and adjust frequency/placement for maximum revenue
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Implementation */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Sample Video Player with Adsterra Ads:</h4>
                <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
{`<!-- Video Player Container with Adsterra Ads -->
<div class="video-container" style="position: relative;">
  
  <!-- Social Bar (Top) -->
  <div id="adsterra-social-top"></div>
  
  <!-- Your Video Player -->
  <video controls width="100%">
    <source src="your-video.mp4" type="video/mp4">
  </video>
  
  <!-- Native Banner (After Video) -->
  <div id="adsterra-native-banner"></div>
  
  <!-- Social Bar (Bottom) -->
  <div id="adsterra-social-bottom"></div>
  
</div>

<!-- Popunder Script (triggers on any click) -->
<script>
  // Popunder triggers automatically on user interaction
  // No additional setup needed, just include the script
</script>`}
                </pre>
              </div>
            </div>
          </Card>

          {/* Revenue Expectations */}
          <Card className="p-6 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
              Expected Revenue with All Ad Types
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">$12-35</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Per 1,000 Views</p>
                <p className="text-xs text-gray-500">Combined ad types</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Play className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">$600-1,750</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Per 50K Views/Month</p>
                <p className="text-xs text-gray-500">Streaming revenue</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-600">95%+</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fill Rate</p>
                <p className="text-xs text-gray-500">All ad types combined</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        <Button onClick={() => window.open('https://adsterra.com', '_blank')}>
          Sign Up to Adsterra
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
        <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? 'Exit Preview' : 'Preview Mode'}
          <Eye className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}