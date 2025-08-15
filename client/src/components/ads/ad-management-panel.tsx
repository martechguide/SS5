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
import { Plus, Edit2, Trash2, Eye, EyeOff, TrendingUp, Settings, Code, Copy, Check } from 'lucide-react';
import { sampleAds, type AdConfig, type AdType, type AdNetwork, type AdPosition } from './ad-placement-system';

export default function AdManagementPanel() {
  const [ads, setAds] = useState<AdConfig[]>(sampleAds);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdConfig | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const [newAd, setNewAd] = useState<Partial<AdConfig>>({
    type: 'banner',
    network: 'propellerads',
    position: 'top',
    isActive: true,
    showCloseButton: true,
    cpm: 0
  });

  const handleCreateAd = () => {
    if (!newAd.title) return;
    
    const ad: AdConfig = {
      id: `custom-${Date.now()}`,
      type: newAd.type as AdType,
      network: newAd.network as AdNetwork,
      position: newAd.position as AdPosition,
      title: newAd.title,
      content: newAd.content || '',
      imageUrl: newAd.imageUrl || '',
      clickUrl: newAd.clickUrl || '#',
      isActive: newAd.isActive ?? true,
      showCloseButton: newAd.showCloseButton ?? true,
      autoHide: newAd.autoHide,
      cpm: newAd.cpm || 0
    };
    
    setAds([...ads, ad]);
    setNewAd({
      type: 'banner',
      network: 'propellerads',
      position: 'top',
      isActive: true,
      showCloseButton: true,
      cpm: 0
    });
    setIsCreateDialogOpen(false);
  };

  const handleToggleAd = (id: string) => {
    setAds(ads.map(ad => 
      ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
    ));
  };

  const handleDeleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
  };

  const getNetworkColor = (network: AdNetwork) => {
    switch (network) {
      case 'propellerads': return 'bg-blue-100 text-blue-800';
      case 'ezoic': return 'bg-red-100 text-red-800';
      case 'connatix': return 'bg-purple-100 text-purple-800';
      case 'mediavine': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateAdCode = (placement: string) => {
    return `<AdPlacementSystem 
  placement="${placement}" 
  maxAds={3} 
  showRevenue={false}
  allowUserClose={true} 
/>`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const totalActiveAds = ads.filter(ad => ad.isActive).length;
  const totalRevenue = ads.reduce((sum, ad) => sum + (ad.isActive ? (ad.cpm || 0) : 0), 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalActiveAds}</div>
            <div className="text-sm text-gray-600">Active Ads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total CPM</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{ads.length}</div>
            <div className="text-sm text-gray-600">Total Ads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">4</div>
            <div className="text-sm text-gray-600">Networks</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="management" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="management">Ad Management</TabsTrigger>
          <TabsTrigger value="placement">Placement Codes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Ad Management Tab */}
        <TabsContent value="management" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Ad Placements</h3>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Ad
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Ad Placement</DialogTitle>
                  <DialogDescription>
                    Configure a new ad to display across your platform
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ad-type">Ad Type</Label>
                      <Select value={newAd.type} onValueChange={(value) => setNewAd({ ...newAd, type: value as AdType })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="banner">Banner Ad</SelectItem>
                          <SelectItem value="native">Native Ad</SelectItem>
                          <SelectItem value="social">Social Ad</SelectItem>
                          <SelectItem value="video-overlay">Video Overlay</SelectItem>
                          <SelectItem value="sidebar">Sidebar Ad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ad-network">Ad Network</Label>
                      <Select value={newAd.network} onValueChange={(value) => setNewAd({ ...newAd, network: value as AdNetwork })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="propellerads">PropellerAds</SelectItem>
                          <SelectItem value="ezoic">Ezoic</SelectItem>
                          <SelectItem value="connatix">Connatix</SelectItem>
                          <SelectItem value="mediavine">Mediavine</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ad-position">Position</Label>
                      <Select value={newAd.position} onValueChange={(value) => setNewAd({ ...newAd, position: value as AdPosition })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="floating">Floating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ad-cpm">CPM Rate ($)</Label>
                      <Input
                        id="ad-cpm"
                        type="number"
                        step="0.01"
                        value={newAd.cpm || ''}
                        onChange={(e) => setNewAd({ ...newAd, cpm: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="ad-title">Title</Label>
                    <Input
                      id="ad-title"
                      value={newAd.title || ''}
                      onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                      placeholder="Ad title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ad-content">Content</Label>
                    <Textarea
                      id="ad-content"
                      value={newAd.content || ''}
                      onChange={(e) => setNewAd({ ...newAd, content: e.target.value })}
                      placeholder="Ad description or content"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ad-image">Image URL</Label>
                    <Input
                      id="ad-image"
                      value={newAd.imageUrl || ''}
                      onChange={(e) => setNewAd({ ...newAd, imageUrl: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ad-click">Click URL</Label>
                    <Input
                      id="ad-click"
                      value={newAd.clickUrl || ''}
                      onChange={(e) => setNewAd({ ...newAd, clickUrl: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="ad-close-button"
                      checked={newAd.showCloseButton ?? true}
                      onCheckedChange={(checked) => setNewAd({ ...newAd, showCloseButton: checked })}
                    />
                    <Label htmlFor="ad-close-button">Show close button</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateAd} disabled={!newAd.title}>
                    Create Ad
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {ads.map((ad) => (
              <Card key={ad.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {ad.imageUrl && (
                        <img 
                          src={ad.imageUrl} 
                          alt={ad.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{ad.title}</h4>
                          <Badge className={getNetworkColor(ad.network)}>
                            {ad.network}
                          </Badge>
                          <Badge variant={ad.isActive ? "default" : "secondary"}>
                            {ad.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{ad.content}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Type: {ad.type}</span>
                          <span>Position: {ad.position}</span>
                          <span>CPM: ${(ad.cpm || 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleAd(ad.id)}
                      >
                        {ad.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingAd(ad)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteAd(ad.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Placement Codes Tab */}
        <TabsContent value="placement" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Ad Placement Integration Codes</h3>
            <p className="text-sm text-gray-600 mb-6">
              Copy these code snippets to integrate ad placements throughout your application.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              { name: 'Header Banner', placement: 'header', description: 'Top banner ads in the header section' },
              { name: 'Sidebar Ads', placement: 'sidebar', description: 'Sidebar native and banner ads' },
              { name: 'Content Native', placement: 'content', description: 'Native ads within content areas' },
              { name: 'Video Player', placement: 'video-player', description: 'Overlay ads on video players' },
              { name: 'Footer Banner', placement: 'footer', description: 'Bottom banner ads in footer' },
              { name: 'Floating Social', placement: 'floating', description: 'Floating social and notification ads' }
            ].map((item) => (
              <Card key={item.placement}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base">{item.name}</h4>
                      <p className="text-sm text-gray-600 font-normal">{item.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateAdCode(item.placement), item.placement)}
                    >
                      {copiedCode === item.placement ? (
                        <Check className="h-4 w-4 mr-1" />
                      ) : (
                        <Copy className="h-4 w-4 mr-1" />
                      )}
                      {copiedCode === item.placement ? 'Copied' : 'Copy'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <code className="text-sm font-mono">
                      {generateAdCode(item.placement)}
                    </code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Import Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <code className="text-sm font-mono">
                  import AdPlacementSystem from '@/components/ads/ad-placement-system';
                </code>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Ad Performance Analytics</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Network Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['propellerads', 'ezoic', 'connatix', 'mediavine'].map((network) => {
                    const networkAds = ads.filter(ad => ad.network === network && ad.isActive);
                    const networkRevenue = networkAds.reduce((sum, ad) => sum + (ad.cpm || 0), 0);
                    return (
                      <div key={network} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Badge className={getNetworkColor(network as AdNetwork)}>
                            {network}
                          </Badge>
                          <span className="text-sm">{networkAds.length} ads</span>
                        </div>
                        <span className="font-semibold">${networkRevenue.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ad Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['banner', 'native', 'social', 'video-overlay', 'sidebar'].map((type) => {
                    const typeAds = ads.filter(ad => ad.type === type && ad.isActive);
                    const percentage = totalActiveAds > 0 ? (typeAds.length / totalActiveAds * 100) : 0;
                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{type.replace('-', ' ')}</span>
                          <span>{typeAds.length} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}