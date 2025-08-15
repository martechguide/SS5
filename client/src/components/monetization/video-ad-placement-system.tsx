import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  PlayCircle, 
  Pause, 
  SkipForward, 
  SkipBack,
  Settings,
  Code,
  Timer,
  Eye,
  Target,
  Zap
} from 'lucide-react';

interface AdSettings {
  preRoll: {
    enabled: boolean;
    duration: number;
    code: string;
    network: string;
  };
  midRoll: {
    enabled: boolean;
    intervals: number[];
    code: string;
    network: string;
  };
  bannerOverlay: {
    enabled: boolean;
    position: string;
    code: string;
    network: string;
  };
  postRoll: {
    enabled: boolean;
    code: string;
    network: string;
  };
}

interface NetworkConfig {
  id: string;
  name: string;
  adCode: string;
  publisherId: string;
  zoneId: string;
}

export default function VideoAdPlacementSystem() {
  const [adSettings, setAdSettings] = useState<AdSettings>({
    preRoll: {
      enabled: true,
      duration: 15,
      code: '',
      network: 'adsterra'
    },
    midRoll: {
      enabled: true,
      intervals: [300, 600, 900], // 5min, 10min, 15min
      code: '',
      network: 'adsterra'
    },
    bannerOverlay: {
      enabled: true,
      position: 'bottom-right',
      code: '',
      network: 'adsterra'
    },
    postRoll: {
      enabled: true,
      code: '',
      network: 'adsterra'
    }
  });

  const [networks, setNetworks] = useState<NetworkConfig[]>([
    {
      id: 'adsterra',
      name: 'Adsterra',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'adsense',
      name: 'Google AdSense',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'propellerads',
      name: 'PropellerAds',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'meta',
      name: 'Meta Audience Network',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'connatix',
      name: 'Connatix',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'ezoic',
      name: 'Ezoic',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'mediavine',
      name: 'Mediavine',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'vdo',
      name: 'VDO.ai',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'exoclick',
      name: 'ExoClick',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'monumetric',
      name: 'Monumetric',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'adthrive',
      name: 'AdThrive',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'sovrn',
      name: 'Sovrn //Commerce',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'hilltopads',
      name: 'HilltopAds',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'medianet',
      name: 'Media.net',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'amazon',
      name: 'Amazon Publisher Services',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'mgid',
      name: 'MGID',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'revcontent',
      name: 'RevContent',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'taboola',
      name: 'Taboola',
      adCode: '',
      publisherId: '',
      zoneId: ''
    },
    {
      id: 'outbrain',
      name: 'Outbrain',
      adCode: '',
      publisherId: '',
      zoneId: ''
    }
  ]);

  const [currentVideo, setCurrentVideo] = useState({
    title: 'Sample Educational Video',
    duration: 1200, // 20 minutes
    currentTime: 0,
    isPlaying: false
  });

  const networkOptions = [
    { id: 'adsterra', name: 'Adsterra', cpm: '$15-25' },
    { id: 'adsense', name: 'Google AdSense', cpm: '$8-15' },
    { id: 'propellerads', name: 'PropellerAds', cpm: '$5-12' },
    { id: 'meta', name: 'Meta Audience Network', cpm: '$7-12' },
    { id: 'connatix', name: 'Connatix', cpm: '$12-25' },
    { id: 'ezoic', name: 'Ezoic', cpm: '$8-18' },
    { id: 'mediavine', name: 'Mediavine', cpm: '$20-35' },
    { id: 'vdo', name: 'VDO.ai', cpm: '$18-30' },
    { id: 'exoclick', name: 'ExoClick', cpm: '$3-8' },
    { id: 'monumetric', name: 'Monumetric', cpm: '$12-22' },
    { id: 'adthrive', name: 'AdThrive', cpm: '$25-40' },
    { id: 'sovrn', name: 'Sovrn //Commerce', cpm: '$6-14' },
    { id: 'hilltopads', name: 'HilltopAds', cpm: '$3-10' },
    { id: 'medianet', name: 'Media.net', cpm: '$6-15' },
    { id: 'amazon', name: 'Amazon Publisher Services', cpm: '$7-16' },
    { id: 'mgid', name: 'MGID', cpm: '$4-12' },
    { id: 'revcontent', name: 'RevContent', cpm: '$5-18' },
    { id: 'taboola', name: 'Taboola', cpm: '$8-20' },
    { id: 'outbrain', name: 'Outbrain', cpm: '$6-18' }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateAdCode = (adType: string, network: string, settings: any) => {
    const networkConfig = networks.find(n => n.id === network);
    
    switch (adType) {
      case 'preRoll':
        return `<!-- Pre-Roll Ad Code for ${networkConfig?.name} -->
<div id="preroll-ad-container" style="position: relative; width: 100%; height: 100%; background: #000;">
  <div id="preroll-ad" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000;">
    <!-- ${networkConfig?.name} Pre-Roll Ad -->
    <script>
      // Publisher ID: ${networkConfig?.publisherId}
      // Zone ID: ${networkConfig?.zoneId}
      ${networkConfig?.adCode}
      
      // Auto-close after ${settings.duration} seconds
      setTimeout(() => {
        document.getElementById('preroll-ad-container').style.display = 'none';
        // Start main video
        document.getElementById('main-video').play();
      }, ${settings.duration * 1000});
    </script>
  </div>
  <div id="ad-countdown" style="position: absolute; top: 10px; right: 10px; color: white; background: rgba(0,0,0,0.7); padding: 5px 10px; border-radius: 3px; z-index: 1001;">
    Skip in <span id="countdown">${settings.duration}</span>s
  </div>
</div>`;

      case 'midRoll':
        return `<!-- Mid-Roll Ad Code for ${networkConfig?.name} -->
<script>
  // Mid-Roll Ad Intervals: ${settings.intervals.map((t: number) => formatTime(t)).join(', ')}
  const midRollTimes = [${settings.intervals.join(', ')}];
  let midRollShown = [];
  
  function checkMidRollAds(currentTime) {
    midRollTimes.forEach((adTime, index) => {
      if (currentTime >= adTime && !midRollShown[index]) {
        showMidRollAd(index);
        midRollShown[index] = true;
      }
    });
  }
  
  function showMidRollAd(index) {
    // Pause main video
    document.getElementById('main-video').pause();
    
    // Show ad overlay
    const adOverlay = document.createElement('div');
    adOverlay.id = 'midroll-overlay-' + index;
    adOverlay.innerHTML = \`
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 20px; border-radius: 8px; max-width: 600px; text-align: center;">
          <!-- ${networkConfig?.name} Mid-Roll Ad -->
          ${networkConfig?.adCode}
          <button onclick="closeMidRollAd(\${index})" style="margin-top: 15px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Continue Video</button>
        </div>
      </div>
    \`;
    document.body.appendChild(adOverlay);
  }
  
  function closeMidRollAd(index) {
    document.getElementById('midroll-overlay-' + index).remove();
    document.getElementById('main-video').play();
  }
  
  // Attach to video timeupdate event
  document.getElementById('main-video').addEventListener('timeupdate', function() {
    checkMidRollAds(this.currentTime);
  });
</script>`;

      case 'bannerOverlay':
        return `<!-- Banner Overlay Ad Code for ${networkConfig?.name} -->
<div id="banner-overlay" style="position: absolute; ${settings.position === 'bottom-right' ? 'bottom: 10px; right: 10px;' : settings.position === 'bottom-left' ? 'bottom: 10px; left: 10px;' : settings.position === 'top-right' ? 'top: 10px; right: 10px;' : 'top: 10px; left: 10px;'} z-index: 1000; background: rgba(255,255,255,0.95); padding: 10px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.3); max-width: 300px;">
  <!-- ${networkConfig?.name} Banner Ad -->
  ${networkConfig?.adCode}
  <button onclick="document.getElementById('banner-overlay').style.display='none'" style="position: absolute; top: 5px; right: 5px; background: #000; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; font-size: 12px;">×</button>
</div>`;

      case 'postRoll':
        return `<!-- Post-Roll Ad Code for ${networkConfig?.name} -->
<script>
  document.getElementById('main-video').addEventListener('ended', function() {
    // Show post-roll ad
    const postRollOverlay = document.createElement('div');
    postRollOverlay.id = 'postroll-overlay';
    postRollOverlay.innerHTML = \`
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10000; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 30px; border-radius: 12px; max-width: 700px; text-align: center;">
          <h3 style="margin-bottom: 20px; color: #333;">Thanks for watching!</h3>
          <!-- ${networkConfig?.name} Post-Roll Ad -->
          ${networkConfig?.adCode}
          <div style="margin-top: 20px;">
            <button onclick="closePostRollAd()" style="margin-right: 10px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            <button onclick="replayVideo()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Replay Video</button>
          </div>
        </div>
      </div>
    \`;
    document.body.appendChild(postRollOverlay);
  });
  
  function closePostRollAd() {
    document.getElementById('postroll-overlay').remove();
  }
  
  function replayVideo() {
    closePostRollAd();
    document.getElementById('main-video').currentTime = 0;
    document.getElementById('main-video').play();
  }
</script>`;

      default:
        return '<!-- Ad code will be generated here -->';
    }
  };

  const updateAdSetting = (adType: keyof AdSettings, field: string, value: any) => {
    setAdSettings(prev => ({
      ...prev,
      [adType]: {
        ...prev[adType],
        [field]: value
      }
    }));
  };

  const updateNetworkConfig = (networkId: string, field: string, value: string) => {
    setNetworks(prev => prev.map(network => 
      network.id === networkId 
        ? { ...network, [field]: value }
        : network
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-purple-600" />
            Video Ad Placement System
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure Pre-Roll, Mid-Roll, Banner Overlay, and Post-Roll ads for streaming videos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <Eye className="h-3 w-3 mr-1" />
            4 Ad Types
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <Zap className="h-3 w-3 mr-1" />
            Multi-Network
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="preview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="preview">Video Preview</TabsTrigger>
          <TabsTrigger value="preroll">Pre-Roll Setup</TabsTrigger>
          <TabsTrigger value="midroll">Mid-Roll Setup</TabsTrigger>
          <TabsTrigger value="overlay">Banner Overlay</TabsTrigger>
          <TabsTrigger value="postroll">Post-Roll Setup</TabsTrigger>
        </TabsList>

        {/* Video Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Video Player with Ad Placements</h3>
            
            {/* Mock Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
              {/* Video Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <h4 className="text-xl font-semibold">{currentVideo.title}</h4>
                  <p className="text-gray-300">{formatTime(currentVideo.currentTime)} / {formatTime(currentVideo.duration)}</p>
                </div>
              </div>

              {/* Pre-Roll Ad Overlay (if enabled) */}
              {adSettings.preRoll.enabled && currentVideo.currentTime === 0 && (
                <div className="absolute inset-0 bg-blue-600 bg-opacity-90 flex items-center justify-center z-10">
                  <div className="text-center text-white">
                    <div className="text-sm mb-2">Pre-Roll Advertisement</div>
                    <div className="text-xs opacity-75">Skip in {adSettings.preRoll.duration}s</div>
                  </div>
                  <div className="absolute top-4 right-4 text-white text-sm">
                    {adSettings.preRoll.network.toUpperCase()}
                  </div>
                </div>
              )}

              {/* Banner Overlay (if enabled) */}
              {adSettings.bannerOverlay.enabled && (
                <div className={`absolute z-20 bg-white bg-opacity-95 p-2 rounded shadow-lg max-w-xs ${
                  adSettings.bannerOverlay.position === 'bottom-right' ? 'bottom-4 right-4' :
                  adSettings.bannerOverlay.position === 'bottom-left' ? 'bottom-4 left-4' :
                  adSettings.bannerOverlay.position === 'top-right' ? 'top-4 right-4' : 'top-4 left-4'
                }`}>
                  <div className="text-xs text-gray-600 mb-1">Banner Ad ({adSettings.bannerOverlay.network})</div>
                  <div className="bg-gray-200 h-16 rounded flex items-center justify-center text-xs text-gray-500">
                    Ad Content
                  </div>
                  <button className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 text-xs">×</button>
                </div>
              )}

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center gap-4 text-white">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:text-gray-300 p-2"
                    onClick={() => setCurrentVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
                  >
                    {currentVideo.isPlaying ? <Pause className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                  </Button>
                  <SkipBack className="h-4 w-4 cursor-pointer hover:text-gray-300" />
                  <SkipForward className="h-4 w-4 cursor-pointer hover:text-gray-300" />
                  
                  {/* Progress Bar */}
                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-gray-600 rounded-full relative">
                      <div 
                        className="h-1 bg-red-500 rounded-full"
                        style={{ width: `${(currentVideo.currentTime / currentVideo.duration) * 100}%` }}
                      />
                      {/* Mid-roll markers */}
                      {adSettings.midRoll.enabled && adSettings.midRoll.intervals.map((time, index) => (
                        <div
                          key={index}
                          className="absolute top-0 h-1 w-1 bg-yellow-400"
                          style={{ left: `${(time / currentVideo.duration) * 100}%` }}
                          title={`Mid-roll ad at ${formatTime(time)}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <span className="text-sm">{formatTime(currentVideo.currentTime)} / {formatTime(currentVideo.duration)}</span>
                </div>
              </div>
            </div>

            {/* Ad Placement Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <Card className={`p-4 text-center ${adSettings.preRoll.enabled ? 'bg-green-50' : 'bg-gray-50'}`}>
                <div className="text-sm font-medium">Pre-Roll</div>
                <div className="text-xs text-gray-600 mt-1">
                  {adSettings.preRoll.enabled ? `${adSettings.preRoll.duration}s duration` : 'Disabled'}
                </div>
                <Badge className={`mt-2 ${adSettings.preRoll.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  {adSettings.preRoll.enabled ? adSettings.preRoll.network : 'Off'}
                </Badge>
              </Card>

              <Card className={`p-4 text-center ${adSettings.midRoll.enabled ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <div className="text-sm font-medium">Mid-Roll</div>
                <div className="text-xs text-gray-600 mt-1">
                  {adSettings.midRoll.enabled ? `${adSettings.midRoll.intervals.length} intervals` : 'Disabled'}
                </div>
                <Badge className={`mt-2 ${adSettings.midRoll.enabled ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                  {adSettings.midRoll.enabled ? adSettings.midRoll.network : 'Off'}
                </Badge>
              </Card>

              <Card className={`p-4 text-center ${adSettings.bannerOverlay.enabled ? 'bg-purple-50' : 'bg-gray-50'}`}>
                <div className="text-sm font-medium">Banner Overlay</div>
                <div className="text-xs text-gray-600 mt-1">
                  {adSettings.bannerOverlay.enabled ? adSettings.bannerOverlay.position : 'Disabled'}
                </div>
                <Badge className={`mt-2 ${adSettings.bannerOverlay.enabled ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
                  {adSettings.bannerOverlay.enabled ? adSettings.bannerOverlay.network : 'Off'}
                </Badge>
              </Card>

              <Card className={`p-4 text-center ${adSettings.postRoll.enabled ? 'bg-orange-50' : 'bg-gray-50'}`}>
                <div className="text-sm font-medium">Post-Roll</div>
                <div className="text-xs text-gray-600 mt-1">
                  {adSettings.postRoll.enabled ? 'After video ends' : 'Disabled'}
                </div>
                <Badge className={`mt-2 ${adSettings.postRoll.enabled ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'}`}>
                  {adSettings.postRoll.enabled ? adSettings.postRoll.network : 'Off'}
                </Badge>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* Pre-Roll Setup Tab */}
        <TabsContent value="preroll" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pre-Roll Ad Configuration</h3>
              <Switch
                checked={adSettings.preRoll.enabled}
                onCheckedChange={(checked) => updateAdSetting('preRoll', 'enabled', checked)}
              />
            </div>

            {adSettings.preRoll.enabled && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Ad Duration (seconds)</Label>
                    <Input
                      type="number"
                      value={adSettings.preRoll.duration}
                      onChange={(e) => updateAdSetting('preRoll', 'duration', parseInt(e.target.value))}
                      min="5"
                      max="30"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 10-15 seconds</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Ad Network</Label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={adSettings.preRoll.network}
                      onChange={(e) => updateAdSetting('preRoll', 'network', e.target.value)}
                    >
                      {networkOptions.map(network => (
                        <option key={network.id} value={network.id}>
                          {network.name} ({network.cpm})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Generated Ad Code</Label>
                  <Textarea
                    value={generateAdCode('preRoll', adSettings.preRoll.network, adSettings.preRoll)}
                    className="font-mono text-sm h-48"
                    readOnly
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Button 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText(generateAdCode('preRoll', adSettings.preRoll.network, adSettings.preRoll))}
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Copy Code
                    </Button>
                    <p className="text-xs text-gray-500">Copy this code and paste it into your video player</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Mid-Roll Setup Tab */}
        <TabsContent value="midroll" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Mid-Roll Ad Configuration</h3>
              <Switch
                checked={adSettings.midRoll.enabled}
                onCheckedChange={(checked) => updateAdSetting('midRoll', 'enabled', checked)}
              />
            </div>

            {adSettings.midRoll.enabled && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Ad Network</Label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md max-w-xs"
                    value={adSettings.midRoll.network}
                    onChange={(e) => updateAdSetting('midRoll', 'network', e.target.value)}
                  >
                    {networkOptions.map(network => (
                      <option key={network.id} value={network.id}>
                        {network.name} ({network.cpm})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Ad Break Times (in seconds)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {adSettings.midRoll.intervals.map((time, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={time}
                          onChange={(e) => {
                            const newIntervals = [...adSettings.midRoll.intervals];
                            newIntervals[index] = parseInt(e.target.value);
                            updateAdSetting('midRoll', 'intervals', newIntervals);
                          }}
                          placeholder="Time in seconds"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newIntervals = adSettings.midRoll.intervals.filter((_, i) => i !== index);
                            updateAdSetting('midRoll', 'intervals', newIntervals);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newIntervals = [...adSettings.midRoll.intervals, 600];
                        updateAdSetting('midRoll', 'intervals', newIntervals);
                      }}
                    >
                      + Add Break
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Current breaks: {adSettings.midRoll.intervals.map(t => formatTime(t)).join(', ')}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Generated Ad Code</Label>
                  <Textarea
                    value={generateAdCode('midRoll', adSettings.midRoll.network, adSettings.midRoll)}
                    className="font-mono text-sm h-48"
                    readOnly
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Button 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText(generateAdCode('midRoll', adSettings.midRoll.network, adSettings.midRoll))}
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Copy Code
                    </Button>
                    <p className="text-xs text-gray-500">Copy this code and paste it into your video player</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Banner Overlay Tab */}
        <TabsContent value="overlay" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Banner Overlay Configuration</h3>
              <Switch
                checked={adSettings.bannerOverlay.enabled}
                onCheckedChange={(checked) => updateAdSetting('bannerOverlay', 'enabled', checked)}
              />
            </div>

            {adSettings.bannerOverlay.enabled && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Banner Position</Label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={adSettings.bannerOverlay.position}
                      onChange={(e) => updateAdSetting('bannerOverlay', 'position', e.target.value)}
                    >
                      <option value="bottom-right">Bottom Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="top-right">Top Right</option>
                      <option value="top-left">Top Left</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Ad Network</Label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={adSettings.bannerOverlay.network}
                      onChange={(e) => updateAdSetting('bannerOverlay', 'network', e.target.value)}
                    >
                      {networkOptions.map(network => (
                        <option key={network.id} value={network.id}>
                          {network.name} ({network.cpm})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Generated Ad Code</Label>
                  <Textarea
                    value={generateAdCode('bannerOverlay', adSettings.bannerOverlay.network, adSettings.bannerOverlay)}
                    className="font-mono text-sm h-32"
                    readOnly
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Button 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText(generateAdCode('bannerOverlay', adSettings.bannerOverlay.network, adSettings.bannerOverlay))}
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Copy Code
                    </Button>
                    <p className="text-xs text-gray-500">Copy this code and paste it into your video player</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Post-Roll Setup Tab */}
        <TabsContent value="postroll" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Post-Roll Ad Configuration</h3>
              <Switch
                checked={adSettings.postRoll.enabled}
                onCheckedChange={(checked) => updateAdSetting('postRoll', 'enabled', checked)}
              />
            </div>

            {adSettings.postRoll.enabled && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Ad Network</Label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md max-w-xs"
                    value={adSettings.postRoll.network}
                    onChange={(e) => updateAdSetting('postRoll', 'network', e.target.value)}
                  >
                    {networkOptions.map(network => (
                      <option key={network.id} value={network.id}>
                        {network.name} ({network.cpm})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Generated Ad Code</Label>
                  <Textarea
                    value={generateAdCode('postRoll', adSettings.postRoll.network, adSettings.postRoll)}
                    className="font-mono text-sm h-48"
                    readOnly
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Button 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText(generateAdCode('postRoll', adSettings.postRoll.network, adSettings.postRoll))}
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Copy Code
                    </Button>
                    <p className="text-xs text-gray-500">Copy this code and paste it into your video player</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}