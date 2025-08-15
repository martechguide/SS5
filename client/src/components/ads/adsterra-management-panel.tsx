import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Eye, EyeOff, TrendingUp, Settings, Code, Copy, Check, Globe, DollarSign, Monitor, Smartphone, Tablet } from 'lucide-react';

interface AdsterraAdConfig {
  id: string;
  name: string;
  type: 'banner' | 'native' | 'popunder' | 'social-bar' | 'interstitial';
  size: string;
  placement: 'header' | 'footer' | 'sidebar' | 'content' | 'floating';
  publisherId: string;
  zoneId: string;
  isActive: boolean;
  cpm: number;
  impressions: number;
  revenue: number;
  code: string;
  description?: string;
  targetDevices: ('desktop' | 'mobile' | 'tablet')[];
  // Timer settings for time-based ads
  displayDuration?: number; // in seconds
  autoHide?: boolean;
  showCloseButton?: boolean;
}

const adsterraAdSizes = {
  banner: [
    { value: '728x90', label: 'Leaderboard (728×90)' },
    { value: '970x250', label: 'Billboard (970×250)' },
    { value: '320x50', label: 'Mobile Banner (320×50)' },
    { value: '300x250', label: 'Medium Rectangle (300×250)' },
    { value: '336x280', label: 'Large Rectangle (336×280)' },
    { value: '160x600', label: 'Skyscraper (160×600)' }
  ],
  native: [
    { value: 'responsive', label: 'Responsive Native' },
    { value: '300x250', label: 'Native 300×250' },
    { value: '320x240', label: 'Mobile Native 320×240' }
  ],
  popunder: [
    { value: 'fullscreen', label: 'Full Screen Popunder' }
  ],
  'social-bar': [
    { value: 'responsive', label: 'Responsive Social Bar' }
  ],
  interstitial: [
    { value: 'fullscreen', label: 'Full Screen Interstitial' }
  ]
};

const defaultAds: AdsterraAdConfig[] = [
  {
    id: 'adsterra-footer-banner',
    name: 'Footer Banner 728×90',
    type: 'banner',
    size: '728x90',
    placement: 'footer',
    publisherId: 'your-publisher-id',
    zoneId: 'zone-123456',
    isActive: true,
    cpm: 6.50,
    impressions: 25430,
    revenue: 165.30,
    targetDevices: ['desktop', 'tablet'],
    description: 'High-performing leaderboard banner for desktop users',
    code: '',
    displayDuration: undefined,
    autoHide: false,
    showCloseButton: true
  },
  {
    id: 'adsterra-mobile-banner',
    name: 'Mobile Banner 320×50',
    type: 'banner',
    size: '320x50',
    placement: 'footer',
    publisherId: 'your-publisher-id',
    zoneId: 'zone-789012',
    isActive: true,
    cpm: 4.25,
    impressions: 18920,
    revenue: 80.41,
    targetDevices: ['mobile'],
    description: 'Optimized mobile banner for smartphone users',
    code: '',
    displayDuration: undefined,
    autoHide: false,
    showCloseButton: true
  },
  {
    id: 'adsterra-native-content',
    name: 'Native Content Ad',
    type: 'native',
    size: 'responsive',
    placement: 'content',
    publisherId: 'your-publisher-id',
    zoneId: 'zone-345678',
    isActive: false,
    cpm: 12.80,
    impressions: 0,
    revenue: 0,
    targetDevices: ['desktop', 'mobile', 'tablet'],
    description: 'Content-matched native advertising for all devices',
    code: '',
    displayDuration: 30,
    autoHide: true,
    showCloseButton: true
  },
  {
    id: 'adsterra-social-bar',
    name: 'Social Bar Notification',
    type: 'social-bar',
    size: 'responsive',
    placement: 'floating',
    publisherId: 'your-publisher-id',
    zoneId: 'zone-456789',
    isActive: false,
    cpm: 8.75,
    impressions: 0,
    revenue: 0,
    targetDevices: ['desktop', 'mobile', 'tablet'],
    description: 'Social bar notification that appears for set duration',
    code: '',
    displayDuration: 15,
    autoHide: true,
    showCloseButton: true
  }
];

export default function AdsterraManagementPanel() {
  const [ads, setAds] = useState<AdsterraAdConfig[]>(defaultAds);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdsterraAdConfig | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [globalPublisherId, setGlobalPublisherId] = useState('your-publisher-id');

  const [newAd, setNewAd] = useState<Partial<AdsterraAdConfig>>({
    type: 'banner',
    size: '728x90',
    placement: 'footer',
    isActive: true,
    cpm: 0,
    impressions: 0,
    revenue: 0,
    targetDevices: ['desktop'],
    publisherId: globalPublisherId,
    displayDuration: undefined,
    autoHide: false,
    showCloseButton: true
  });

  const handleCreateAd = () => {
    if (!newAd.name || !newAd.zoneId) return;
    
    const ad: AdsterraAdConfig = {
      id: `adsterra-${Date.now()}`,
      name: newAd.name,
      type: newAd.type as any,
      size: newAd.size || '728x90',
      placement: newAd.placement as any,
      publisherId: newAd.publisherId || globalPublisherId,
      zoneId: newAd.zoneId,
      isActive: newAd.isActive ?? true,
      cpm: newAd.cpm || 0,
      impressions: 0,
      revenue: 0,
      description: newAd.description || '',
      targetDevices: newAd.targetDevices || ['desktop'],
      displayDuration: newAd.displayDuration,
      autoHide: newAd.autoHide ?? false,
      showCloseButton: newAd.showCloseButton ?? true,
      code: generateAdCode(newAd as AdsterraAdConfig)
    };
    
    setAds([...ads, ad]);
    setNewAd({
      type: 'banner',
      size: '728x90',
      placement: 'footer',
      isActive: true,
      cpm: 0,
      impressions: 0,
      revenue: 0,
      targetDevices: ['desktop'],
      publisherId: globalPublisherId,
      displayDuration: undefined,
      autoHide: false,
      showCloseButton: true
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditAd = (ad: AdsterraAdConfig) => {
    setEditingAd(ad);
    setNewAd({ ...ad });
  };

  const handleUpdateAd = () => {
    if (!editingAd) return;
    
    setAds(ads.map(ad => 
      ad.id === editingAd.id 
        ? { 
            ...ad, 
            ...newAd,
            displayDuration: newAd.displayDuration,
            autoHide: newAd.autoHide ?? false,
            showCloseButton: newAd.showCloseButton ?? true,
            code: generateAdCode({ ...ad, ...newAd } as AdsterraAdConfig)
          } 
        : ad
    ));
    setEditingAd(null);
    setNewAd({
      type: 'banner',
      size: '728x90',
      placement: 'footer',
      isActive: true,
      cpm: 0,
      impressions: 0,
      revenue: 0,
      targetDevices: ['desktop'],
      publisherId: globalPublisherId,
      displayDuration: undefined,
      autoHide: false,
      showCloseButton: true
    });
  };

  const handleToggleAd = (id: string) => {
    setAds(ads.map(ad => 
      ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
    ));
  };

  const handleDeleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
  };

  const generateAdCode = (ad: AdsterraAdConfig) => {
    const { type, size, publisherId, zoneId, displayDuration, autoHide, showCloseButton } = ad;
    
    if (type === 'banner') {
      const [width, height] = size.split('x');
      return `<!-- Adsterra ${ad.name} -->
<script type="text/javascript">
    atOptions = {
        'key' : '${zoneId}',
        'format' : 'iframe',
        'height' : ${height || '90'},
        'width' : ${width || '728'},
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');
</script>`;
    } else if (type === 'native') {
      const timerScript = autoHide && displayDuration ? `
    // Timer functionality for native ad
    setTimeout(function() {
        const nativeAd = document.querySelector('[data-adsterra-native="${zoneId}"]');
        if (nativeAd) {
            nativeAd.style.transition = 'opacity 0.5s';
            nativeAd.style.opacity = '0';
            setTimeout(() => nativeAd.remove(), 500);
        }
    }, ${displayDuration * 1000});` : '';

      const closeButtonScript = showCloseButton ? `
    // Add close button
    setTimeout(function() {
        const nativeAd = document.querySelector('[data-adsterra-native="${zoneId}"]');
        if (nativeAd) {
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = 'position:absolute;top:5px;right:5px;background:#000;color:#fff;border:none;width:20px;height:20px;border-radius:50%;cursor:pointer;font-size:14px;z-index:1000;';
            closeBtn.onclick = () => nativeAd.remove();
            nativeAd.style.position = 'relative';
            nativeAd.appendChild(closeBtn);
        }
    }, 1000);` : '';

      return `<!-- Adsterra ${ad.name} Native with Timer -->
<div data-adsterra-native="${zoneId}">
<script type="text/javascript">
    atOptions = {
        'key' : '${zoneId}',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');${timerScript}${closeButtonScript}
</script>
</div>`;
    } else if (type === 'social-bar') {
      const timerScript = autoHide && displayDuration ? `
    // Timer functionality for social bar
    setTimeout(function() {
        const socialBar = document.querySelector('[data-adsterra-social="${zoneId}"]');
        if (socialBar) {
            socialBar.style.transition = 'transform 0.5s';
            socialBar.style.transform = 'translateY(100%)';
            setTimeout(() => socialBar.remove(), 500);
        }
    }, ${displayDuration * 1000});` : '';

      const closeButtonScript = showCloseButton ? `
    // Add close button to social bar
    setTimeout(function() {
        const socialBar = document.querySelector('[data-adsterra-social="${zoneId}"]');
        if (socialBar) {
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = 'position:absolute;top:5px;right:10px;background:rgba(0,0,0,0.7);color:#fff;border:none;width:25px;height:25px;border-radius:50%;cursor:pointer;font-size:16px;z-index:1001;';
            closeBtn.onclick = () => socialBar.remove();
            socialBar.appendChild(closeBtn);
        }
    }, 1000);` : '';

      return `<!-- Adsterra ${ad.name} Social Bar with Timer -->
<div data-adsterra-social="${zoneId}" style="position:fixed;bottom:0;left:0;right:0;z-index:1000;">
<script type="text/javascript">
    atOptions = {
        'key' : '${zoneId}',
        'format' : 'iframe',
        'height' : 60,
        'width' : '100%',
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');${timerScript}${closeButtonScript}
</script>
</div>`;
    } else if (type === 'popunder') {
      return `<!-- Adsterra ${ad.name} Popunder -->
<script type="text/javascript">
    var atOptions = {
        'key' : '${zoneId}',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');
</script>`;
    }
    
    return `<!-- Adsterra ${ad.name} -->
<script type="text/javascript" src="//www.topcreativeformat.com/${zoneId}/invoke.js"></script>`;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getPlacementCode = (placement: string) => {
    return `<!-- Place this where you want ${placement} ads -->
<AdPlacementSystem 
  placement="${placement}" 
  maxAds={1} 
  showRevenue={false}
  allowUserClose={true} 
/>`;
  };

  const activeAds = ads.filter(ad => ad.isActive);
  const totalRevenue = activeAds.reduce((sum, ad) => sum + ad.revenue, 0);
  const totalImpressions = activeAds.reduce((sum, ad) => sum + ad.impressions, 0);
  const averageCPM = totalImpressions > 0 ? (totalRevenue / totalImpressions) * 1000 : 0;

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return <Monitor className="h-3 w-3" />;
      case 'mobile': return <Smartphone className="h-3 w-3" />;
      case 'tablet': return <Tablet className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{activeAds.length}</div>
            <div className="text-sm text-gray-600">Active Ads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">${totalRevenue.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{totalImpressions.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Impressions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">${averageCPM.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Avg CPM</div>
          </CardContent>
        </Card>
      </div>

      {/* Global Settings */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <Globe className="h-5 w-5" />
            Adsterra Publisher Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="global-publisher-id">Publisher ID</Label>
              <Input
                id="global-publisher-id"
                value={globalPublisherId}
                onChange={(e) => setGlobalPublisherId(e.target.value)}
                placeholder="Enter your Adsterra Publisher ID"
              />
              <p className="text-xs text-green-700 mt-1">
                Found in your Adsterra dashboard under "Publishers"
              </p>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => setAds(ads.map(ad => ({ ...ad, publisherId: globalPublisherId })))}
                className="bg-green-600 hover:bg-green-700"
              >
                Update All Ads
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Ad Overview</TabsTrigger>
          <TabsTrigger value="manage">Manage Ads</TabsTrigger>
          <TabsTrigger value="codes">Ad Codes</TabsTrigger>
          <TabsTrigger value="placement">Placement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Adsterra Ad Overview</h3>
              <p className="text-sm text-gray-600">Monitor performance of your Adsterra advertising units</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              High CPM Network
            </Badge>
          </div>

          <div className="grid gap-4">
            {ads.map((ad) => (
              <Card key={ad.id} className={`border ${ad.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{ad.name}</h4>
                        <Badge variant={ad.isActive ? "default" : "secondary"}>
                          {ad.type}
                        </Badge>
                        <Badge variant="outline">{ad.size}</Badge>
                        <div className="flex gap-1">
                          {ad.targetDevices.map(device => (
                            <span key={device} className="inline-flex items-center">
                              {getDeviceIcon(device)}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">CPM:</span>
                          <span className="ml-1 font-medium">${ad.cpm.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Impressions:</span>
                          <span className="ml-1 font-medium">{ad.impressions.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Revenue:</span>
                          <span className="ml-1 font-medium text-green-600">${ad.revenue.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Zone ID:</span>
                          <span className="ml-1 font-medium">{ad.zoneId}</span>
                        </div>
                      </div>
                      
                      {/* Timer Information */}
                      {(ad.type === 'social-bar' || ad.type === 'native') && (
                        <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                              <span>⏱️ Timer Settings:</span>
                              {ad.autoHide && ad.displayDuration ? (
                                <span className="bg-blue-100 px-2 py-1 rounded-full text-xs">
                                  Auto-hide after {ad.displayDuration}s
                                </span>
                              ) : (
                                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                                  Manual close only
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-blue-600">
                              {ad.showCloseButton && <span className="bg-blue-100 px-2 py-1 rounded-full">✕ Close button</span>}
                              {ad.type === 'social-bar' && <span className="bg-purple-100 px-2 py-1 rounded-full">Social Bar</span>}
                              {ad.type === 'native' && <span className="bg-green-100 px-2 py-1 rounded-full">Native Ad</span>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditAd(ad)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Switch
                        checked={ad.isActive}
                        onCheckedChange={() => handleToggleAd(ad.id)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Manage Adsterra Ads</h3>
              <p className="text-sm text-gray-600">Create, edit, and configure your Adsterra advertising units</p>
            </div>
            <Dialog open={isCreateDialogOpen || !!editingAd} onOpenChange={(open) => {
              setIsCreateDialogOpen(open);
              if (!open) setEditingAd(null);
            }}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Ad Unit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editingAd ? 'Edit' : 'Create'} Adsterra Ad Unit</DialogTitle>
                  <DialogDescription>
                    Configure your Adsterra advertising unit with the appropriate settings.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ad-name">Ad Name</Label>
                      <Input
                        id="ad-name"
                        value={newAd.name || ''}
                        onChange={(e) => setNewAd({ ...newAd, name: e.target.value })}
                        placeholder="e.g., Footer Banner 728x90"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zone-id">Zone ID</Label>
                      <Input
                        id="zone-id"
                        value={newAd.zoneId || ''}
                        onChange={(e) => setNewAd({ ...newAd, zoneId: e.target.value })}
                        placeholder="Enter Adsterra Zone ID"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="ad-type">Ad Type</Label>
                      <Select value={newAd.type} onValueChange={(value) => setNewAd({ ...newAd, type: value as any, size: '' })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="banner">Banner</SelectItem>
                          <SelectItem value="native">Native</SelectItem>
                          <SelectItem value="popunder">Popunder</SelectItem>
                          <SelectItem value="social-bar">Social Bar</SelectItem>
                          <SelectItem value="interstitial">Interstitial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ad-size">Ad Size</Label>
                      <Select value={newAd.size} onValueChange={(value) => setNewAd({ ...newAd, size: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {newAd.type && adsterraAdSizes[newAd.type]?.map(size => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="placement">Placement</Label>
                      <Select value={newAd.placement} onValueChange={(value) => setNewAd({ ...newAd, placement: value as any })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="header">Header</SelectItem>
                          <SelectItem value="footer">Footer</SelectItem>
                          <SelectItem value="sidebar">Sidebar</SelectItem>
                          <SelectItem value="content">Content</SelectItem>
                          <SelectItem value="floating">Floating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={newAd.description || ''}
                      onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                      placeholder="Brief description of this ad unit"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Target Devices</Label>
                    <div className="flex gap-4 mt-2">
                      {['desktop', 'mobile', 'tablet'].map(device => (
                        <label key={device} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={newAd.targetDevices?.includes(device as any) || false}
                            onChange={(e) => {
                              const devices = newAd.targetDevices || [];
                              if (e.target.checked) {
                                setNewAd({ ...newAd, targetDevices: [...devices, device as any] });
                              } else {
                                setNewAd({ ...newAd, targetDevices: devices.filter(d => d !== device) });
                              }
                            }}
                          />
                          <span className="capitalize">{device}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpm">Expected CPM ($)</Label>
                      <Input
                        id="cpm"
                        type="number"
                        step="0.01"
                        value={newAd.cpm || ''}
                        onChange={(e) => setNewAd({ ...newAd, cpm: parseFloat(e.target.value) || 0 })}
                        placeholder="e.g., 6.50"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <Switch
                        id="active"
                        checked={newAd.isActive ?? true}
                        onCheckedChange={(checked) => setNewAd({ ...newAd, isActive: checked })}
                      />
                      <Label htmlFor="active">Active</Label>
                    </div>
                  </div>

                  {/* Timer Settings for Social Bar and Native Ads */}
                  {(newAd.type === 'social-bar' || newAd.type === 'native') && (
                    <div className="border-t pt-4 mt-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold mb-3 text-blue-600 flex items-center gap-2">
                        ⏱️ Timer & Auto-Hide Settings
                        <Badge variant="outline" className="text-xs">
                          {newAd.type === 'social-bar' ? 'Social Bar' : 'Native Ad'}
                        </Badge>
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <Label htmlFor="auto-hide" className="font-medium">Auto-hide after timer</Label>
                            <p className="text-xs text-gray-500 mt-1">
                              Automatically hide the ad after specified time
                            </p>
                          </div>
                          <Switch
                            id="auto-hide"
                            checked={newAd.autoHide ?? false}
                            onCheckedChange={(checked) => setNewAd({ ...newAd, autoHide: checked })}
                          />
                        </div>
                        
                        {newAd.autoHide && (
                          <div className="p-3 bg-white rounded-lg border">
                            <Label htmlFor="display-duration" className="font-medium">Display Duration (seconds)</Label>
                            <Input
                              id="display-duration"
                              type="number"
                              min="5"
                              max="300"
                              value={newAd.displayDuration || ''}
                              onChange={(e) => setNewAd({ ...newAd, displayDuration: parseInt(e.target.value) || undefined })}
                              placeholder={newAd.type === 'social-bar' ? '15' : '30'}
                              className="mt-2"
                            />
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                                <strong>Social Bar:</strong> 5-30 seconds<br/>
                                <span className="text-gray-600">Quick notification style</span>
                              </div>
                              <div className="p-2 bg-green-50 rounded border border-green-200">
                                <strong>Native Ad:</strong> 20-120 seconds<br/>
                                <span className="text-gray-600">Content engagement style</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <Label htmlFor="show-close" className="font-medium">Show close button (×)</Label>
                            <p className="text-xs text-gray-500 mt-1">
                              Allow users to manually close the ad
                            </p>
                          </div>
                          <Switch
                            id="show-close"
                            checked={newAd.showCloseButton ?? true}
                            onCheckedChange={(checked) => setNewAd({ ...newAd, showCloseButton: checked })}
                          />
                        </div>
                        
                        {/* Timer Preview */}
                        {newAd.autoHide && newAd.displayDuration && (
                          <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                            <div className="flex items-center gap-2 text-sm font-medium text-orange-800">
                              <span>📋 Timer Preview:</span>
                            </div>
                            <p className="text-sm text-orange-700 mt-1">
                              {newAd.type === 'social-bar' ? 'Social bar' : 'Native ad'} will show for {newAd.displayDuration} seconds, 
                              then fade out automatically{newAd.showCloseButton ? ' (with manual close option)' : ''}.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setIsCreateDialogOpen(false);
                    setEditingAd(null);
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={editingAd ? handleUpdateAd : handleCreateAd} className="bg-green-600 hover:bg-green-700">
                    {editingAd ? 'Update' : 'Create'} Ad Unit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {ads.map((ad) => (
              <Card key={ad.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{ad.name}</h4>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Adsterra
                        </Badge>
                        <Badge variant={ad.isActive ? "default" : "secondary"}>
                          {ad.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Type: {ad.type}</span>
                        <span>Size: {ad.size}</span>
                        <span>Placement: {ad.placement}</span>
                        <span>Zone: {ad.zoneId}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditAd(ad)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteAd(ad.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Switch
                        checked={ad.isActive}
                        onCheckedChange={() => handleToggleAd(ad.id)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="codes" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Generated Adsterra Ad Codes</h3>
            <p className="text-sm text-gray-600 mb-6">
              Copy and paste these codes into your website where you want ads to appear
            </p>
          </div>

          <div className="space-y-4">
            {activeAds.map((ad) => (
              <Card key={ad.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      {ad.name}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(generateAdCode(ad), ad.id)}
                    >
                      {copiedCode === ad.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedCode === ad.id ? 'Copied!' : 'Copy Code'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{generateAdCode(ad)}</pre>
                  </div>
                  <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                    <span>Expected CPM: ${ad.cpm.toFixed(2)} | Size: {ad.size} | Zone: {ad.zoneId}</span>
                    <div className="flex gap-1">
                      {ad.targetDevices.map(device => (
                        <span key={device} className="inline-flex items-center gap-1">
                          {getDeviceIcon(device)}
                          <span className="capitalize">{device}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="placement" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Ad Placement Integration</h3>
            <p className="text-sm text-gray-600 mb-6">
              Use these placement codes to integrate ads into your React components
            </p>
          </div>

          <div className="grid gap-4">
            {['header', 'footer', 'sidebar', 'content', 'floating'].map((placement) => (
              <Card key={placement}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      {placement.charAt(0).toUpperCase() + placement.slice(1)} Placement
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(getPlacementCode(placement), `placement-${placement}`)}
                    >
                      {copiedCode === `placement-${placement}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedCode === `placement-${placement}` ? 'Copied!' : 'Copy Code'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{getPlacementCode(placement)}</pre>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      Active {placement} ads: {ads.filter(ad => ad.placement === placement && ad.isActive).length}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}