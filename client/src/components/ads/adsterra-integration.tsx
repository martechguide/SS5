import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { AlertTriangle, DollarSign, Globe, TrendingUp, Settings, Eye, Code, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

interface AdsterraConfig {
  publisherId: string;
  apiKey: string;
  isActive: boolean;
  placements: AdsterraPlacement[];
  stats: AdsterraStats;
}

interface AdsterraPlacement {
  id: string;
  name: string;
  type: 'banner' | 'popunder' | 'native' | 'social-bar' | 'interstitial';
  size: string;
  code: string;
  isActive: boolean;
  cpm: number;
  impressions: number;
  revenue: number;
}

interface AdsterraStats {
  totalRevenue: number;
  totalImpressions: number;
  averageCPM: number;
  activePlacements: number;
  lastUpdated: string;
}

const defaultConfig: AdsterraConfig = {
  publisherId: '',
  apiKey: '',
  isActive: false,
  placements: [
    {
      id: 'banner-footer',
      name: 'Footer Banner 728x90',
      type: 'banner',
      size: '728x90',
      code: '',
      isActive: true,
      cpm: 4.25,
      impressions: 15420,
      revenue: 65.54
    },
    {
      id: 'banner-mobile',
      name: 'Mobile Banner 320x50',
      type: 'banner',
      size: '320x50',
      code: '',
      isActive: true,
      cpm: 2.80,
      impressions: 8930,
      revenue: 25.00
    },
    {
      id: 'native-content',
      name: 'Native Content Ad',
      type: 'native',
      size: 'responsive',
      code: '',
      isActive: false,
      cpm: 12.50,
      impressions: 0,
      revenue: 0
    }
  ],
  stats: {
    totalRevenue: 90.54,
    totalImpressions: 24350,
    averageCPM: 3.72,
    activePlacements: 2,
    lastUpdated: new Date().toISOString()
  }
};

export default function AdsterraIntegration() {
  const [config, setConfig] = useState<AdsterraConfig>(defaultConfig);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');

  const handleConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.publisherId || !config.apiKey) return;

    setConnectionStatus('connecting');
    
    // Simulate API connection (in real implementation, this would call Adsterra API)
    setTimeout(() => {
      setConnectionStatus('connected');
      setConfig(prev => ({ ...prev, isActive: true }));
      setIsConfiguring(false);
    }, 2000);
  };

  const togglePlacement = (placementId: string) => {
    setConfig(prev => ({
      ...prev,
      placements: prev.placements.map(p => 
        p.id === placementId ? { ...p, isActive: !p.isActive } : p
      )
    }));
  };

  const generateAdCode = (placement: AdsterraPlacement) => {
    return `<!-- Adsterra ${placement.name} -->
<script type="text/javascript">
    atOptions = {
        'key' : '${config.publisherId}',
        'format' : 'iframe',
        'height' : ${placement.size.split('x')[1] || '90'},
        'width' : ${placement.size.split('x')[0] || '728'},
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');
</script>`;
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className={`border-l-4 ${connectionStatus === 'connected' ? 'border-l-green-500 bg-green-50' : 
                                      connectionStatus === 'error' ? 'border-l-red-500 bg-red-50' : 
                                      'border-l-yellow-500 bg-yellow-50'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-100' : 
                                                 connectionStatus === 'error' ? 'bg-red-100' : 
                                                 'bg-yellow-100'}`}>
                {connectionStatus === 'connected' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : connectionStatus === 'error' ? (
                  <XCircle className="h-5 w-5 text-red-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">
                  Adsterra Network {connectionStatus === 'connected' ? 'Connected' : 'Status'}
                </h3>
                <p className="text-sm text-gray-600">
                  {connectionStatus === 'connected' ? 'Publisher ID verified and active' :
                   connectionStatus === 'connecting' ? 'Connecting to Adsterra API...' :
                   connectionStatus === 'error' ? 'Connection failed - check credentials' :
                   'Configure your Adsterra publisher account'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={connectionStatus === 'connected' ? "default" : "secondary"}>
                CPM: $2-8
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsConfiguring(!isConfiguring)}
              >
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Panel */}
      {isConfiguring && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Adsterra Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConfigSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="publisherId">Publisher ID</Label>
                  <Input
                    id="publisherId"
                    placeholder="Enter your Adsterra Publisher ID"
                    value={config.publisherId}
                    onChange={(e) => setConfig(prev => ({ ...prev, publisherId: e.target.value }))}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Found in your Adsterra dashboard under "Publishers"
                  </p>
                </div>
                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter your API key"
                    value={config.apiKey}
                    onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Generate in Settings &gt; API Access
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <a 
                  href="https://adsterra.com/publishers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Register as Adsterra Publisher
                </a>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsConfiguring(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={connectionStatus === 'connecting'}
                  >
                    {connectionStatus === 'connecting' ? 'Connecting...' : 'Connect'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      {connectionStatus === 'connected' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">${config.stats.totalRevenue.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{config.stats.totalImpressions.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Impressions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">${config.stats.averageCPM.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Average CPM</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{config.stats.activePlacements}</div>
              <div className="text-sm text-gray-600">Active Placements</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Placement Management */}
      {connectionStatus === 'connected' && (
        <Tabs defaultValue="placements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="placements">Ad Placements</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="codes">Ad Codes</TabsTrigger>
          </TabsList>

          <TabsContent value="placements" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Adsterra Ad Placements</h3>
                <p className="text-sm text-gray-600">Manage your bottom banner ad placements</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <TrendingUp className="h-3 w-3 mr-1" />
                High CPM Network
              </Badge>
            </div>

            <div className="grid gap-4">
              {config.placements.map((placement) => (
                <Card key={placement.id} className={`border ${placement.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{placement.name}</h4>
                          <Badge variant={placement.isActive ? "default" : "secondary"}>
                            {placement.type}
                          </Badge>
                          <Badge variant="outline">{placement.size}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">CPM:</span>
                            <span className="ml-1 font-medium">${placement.cpm.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Impressions:</span>
                            <span className="ml-1 font-medium">{placement.impressions.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Revenue:</span>
                            <span className="ml-1 font-medium text-green-600">${placement.revenue.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={placement.isActive}
                            onCheckedChange={() => togglePlacement(placement.id)}
                          />
                          <Label className="text-sm">
                            {placement.isActive ? 'Active' : 'Inactive'}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Adsterra Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">CPM by Geography</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>United States</span>
                          <span className="font-medium">$6.50</span>
                        </div>
                        <div className="flex justify-between">
                          <span>United Kingdom</span>
                          <span className="font-medium">$4.80</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Canada</span>
                          <span className="font-medium">$4.20</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other Tier 1</span>
                          <span className="font-medium">$3.10</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Ad Format Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Banner 728x90</span>
                          <span className="font-medium">$4.25</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Banner 320x50</span>
                          <span className="font-medium">$2.80</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Native Content</span>
                          <span className="font-medium">$12.50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="codes" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Generated Ad Codes</h3>
              <p className="text-sm text-gray-600 mb-6">
                Copy and paste these codes into your website where you want ads to appear
              </p>
            </div>

            <div className="space-y-4">
              {config.placements.filter(p => p.isActive).map((placement) => (
                <Card key={placement.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Code className="h-4 w-4" />
                      {placement.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{generateAdCode(placement)}</pre>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Expected CPM: ${placement.cpm.toFixed(2)} | Size: {placement.size}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(generateAdCode(placement))}
                      >
                        Copy Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Getting Started Guide */}
      {connectionStatus === 'disconnected' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Getting Started with Adsterra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <span className="font-semibold">1.</span>
                <span>Register as an Adsterra publisher (free, no traffic minimums)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">2.</span>
                <span>Add your website for approval (fast approval process)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">3.</span>
                <span>Generate your Publisher ID and API key from the dashboard</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">4.</span>
                <span>Configure the integration above to start earning</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>High CPM Rates:</strong> Adsterra offers $2-8 CPM for quality traffic with NET-15 payments via PayPal, wire transfer, or crypto.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export { type AdsterraConfig, type AdsterraPlacement, type AdsterraStats };