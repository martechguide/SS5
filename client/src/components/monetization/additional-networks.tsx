import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  DollarSign, 
  ExternalLink, 
  Copy, 
  CheckCircle, 
  AlertTriangle,
  Globe,
  Target,
  Video,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';

export default function AdditionalNetworks() {
  const [selectedNetwork, setSelectedNetwork] = useState('vdo-ai');
  const [publisherConfig, setPublisherConfig] = useState({
    'vdo-ai': { publisherId: '', zoneName: '' },
    'exoclick': { publisherId: '', zoneId: '' },
    'clickadilla': { publisherId: '', adFormat: 'in-stream' }
  });

  const networks = [
    {
      id: 'vdo-ai',
      name: 'VDO.ai',
      logo: '🎬',
      cpm: '$4-8 (US)',
      fillRate: '95%',
      payment: 'NET-60',
      minPayout: '$100',
      badge: 'AI-Powered',
      color: 'bg-purple-500',
      description: 'Global video advertising platform with AI-driven optimization serving 2.1B users monthly',
      pros: [
        '2.1B monthly reach',
        'AI-powered optimization',
        '80% revenue share',
        'VAST compatibility',
        'Header bidding support'
      ],
      cons: [
        'NET-60 payment terms',
        '500K minimum traffic',
        'Lower Asian traffic rates',
        'Account suspensions reported'
      ],
      requirements: '500K monthly pageviews OR 150K Tier 1 pageviews',
      bestFor: 'Premium publishers with Tier 1 traffic',
      signupUrl: 'https://www.vdo.ai/',
      implementation: `<!-- VDO.ai Video Player -->
<div id="vdo-ai-player"></div>
<script src="https://delivery.vdo.ai/vdo.js"></script>
<script>
  VDO.AI.Player({
    container: 'vdo-ai-player',
    publisherId: 'YOUR_PUBLISHER_ID',
    zoneName: 'YOUR_ZONE_NAME',
    width: 640,
    height: 360,
    autoplay: false,
    muted: true
  });
</script>`
    },
    {
      id: 'exoclick',
      name: 'ExoClick',
      logo: '🔥',
      cpm: '$0.01-0.10',
      fillRate: '98%',
      payment: 'NET-30',
      minPayout: '$20',
      badge: 'High Volume',
      color: 'bg-red-500',
      description: 'Massive ad network with 8.5B+ daily impressions, strong in entertainment and lifestyle',
      pros: [
        '8.5B+ daily impressions',
        'Multiple video formats',
        'Established since 2006',
        'Quick approval process'
      ],
      cons: [
        'Lower CPM rates',
        'Only 20% revenue share',
        'Adult content focus',
        'Complex optimization needed'
      ],
      requirements: 'No minimum traffic requirements',
      bestFor: 'Entertainment, lifestyle, and adult content sites',
      signupUrl: 'https://www.exoclick.com/',
      implementation: `<!-- ExoClick Video Banner -->
<script type="text/javascript">
  var _pop = _pop || [];
  _pop.push(['siteId', YOUR_SITE_ID]);
  _pop.push(['minBid', 0]);
  _pop.push(['popundersPerIP', 1]);
  _pop.push(['delayBetween', 0]);
  _pop.push(['default', false]);
  _pop.push(['defaultPerDay', 0]);
  _pop.push(['topmostLayer', false]);
  (function() {
    var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.async = true;
    var s = 'https://c1.exoclick.com/'.concat('pa-', YOUR_ZONE_ID ,'.js');
    pa.src = s;
    var insertAt = document.getElementsByTagName('script')[0];
    insertAt.parentNode.insertBefore(pa, insertAt);
  })();
</script>`
    },
    {
      id: 'clickadilla',
      name: 'ClickAdilla',
      logo: '💎',
      cpm: '$0.05',
      fillRate: '100%',
      payment: 'NET-30',
      minPayout: '$50',
      badge: 'Guaranteed Fill',
      color: 'bg-blue-500',
      description: '28.88M+ daily video views with 100% viewability guarantee and consistent global rates',
      pros: [
        '100% viewability guarantee',
        'Consistent global rates',
        'Lower minimum bid ($0.001)',
        'Modern targeting options'
      ],
      cons: [
        'Lower overall CPM',
        'Smaller network size',
        'Limited to certain verticals',
        'Newer platform'
      ],
      requirements: 'No minimum traffic requirements',
      bestFor: 'Global traffic, Tier 2/3 countries',
      signupUrl: 'https://clickadilla.com/',
      implementation: `<!-- ClickAdilla In-Stream Video -->
<div id="clickadilla-video-${Date.now()}"></div>
<script type="text/javascript">
  (function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://a.clickadilla.com/your-zone-id.js';
    var entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(script, entry);
  })();
</script>`
    }
  ];

  const comparisonData = [
    { metric: 'Best CPM', network: 'VDO.ai', value: '$4-8 USD', description: 'Tier 1 traffic' },
    { metric: 'Highest Volume', network: 'ExoClick', value: '8.5B+ daily', description: 'Impressions' },
    { metric: 'Best Fill Rate', network: 'ClickAdilla', value: '100%', description: 'Guaranteed' },
    { metric: 'Fastest Payment', network: 'ExoClick', value: 'NET-30', description: 'Standard' },
    { metric: 'Easiest Approval', network: 'ClickAdilla', value: 'No minimum', description: 'Traffic req.' }
  ];

  const generateImplementationCode = (networkId: string) => {
    const network = networks.find(n => n.id === networkId);
    const config = publisherConfig[networkId as keyof typeof publisherConfig];
    
    if (!network) return '';
    
    let code = network.implementation;
    
    switch (networkId) {
      case 'vdo-ai':
        const vdoConfig = config as { publisherId: string; zoneName: string; };
        code = code.replace('YOUR_PUBLISHER_ID', vdoConfig.publisherId || 'YOUR_PUBLISHER_ID');
        code = code.replace('YOUR_ZONE_NAME', vdoConfig.zoneName || 'YOUR_ZONE_NAME');
        break;
      case 'exoclick':
        const exoConfig = config as { publisherId: string; zoneId: string; };
        code = code.replace('YOUR_SITE_ID', exoConfig.publisherId || 'YOUR_SITE_ID');
        code = code.replace('YOUR_ZONE_ID', exoConfig.zoneId || 'YOUR_ZONE_ID');
        break;
      case 'clickadilla':
        code = code.replace('your-zone-id', config.publisherId || 'your-zone-id');
        break;
    }
    
    return code;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const updateConfig = (networkId: string, field: string, value: string) => {
    setPublisherConfig(prev => ({
      ...prev,
      [networkId]: { ...prev[networkId as keyof typeof prev], [field]: value }
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Additional Video Monetization Networks</h1>
        <p className="text-gray-600 dark:text-gray-400">
          VDO.ai, ExoClick, and ClickAdilla - specialized networks for different traffic types and requirements
        </p>
      </div>

      {/* Network Comparison */}
      <Card className="mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Network Comparison at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comparisonData.map((item, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded">
              <p className="font-medium text-sm">{item.metric}</p>
              <p className="text-lg font-bold text-blue-600">{item.network}</p>
              <p className="text-sm text-gray-600">{item.value}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Network Details */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
        {networks.map((network) => (
          <Card key={network.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{network.logo}</span>
                <div>
                  <h3 className="text-lg font-semibold">{network.name}</h3>
                  <Badge className={`${network.color} text-white mt-1`}>
                    {network.badge}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">{network.cpm}</p>
                <p className="text-sm text-gray-500">CPM Range</p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {network.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
              <div>
                <p className="font-medium">Fill Rate</p>
                <p className="text-gray-600">{network.fillRate}</p>
              </div>
              <div>
                <p className="font-medium">Payment</p>
                <p className="text-gray-600">{network.payment}</p>
              </div>
              <div>
                <p className="font-medium">Min Payout</p>
                <p className="text-gray-600">{network.minPayout}</p>
              </div>
              <div>
                <p className="font-medium">Best For</p>
                <p className="text-gray-600">{network.bestFor}</p>
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-medium text-green-600 mb-2">✓ Pros:</p>
                <div className="space-y-1">
                  {network.pros.map((pro, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-orange-600 mb-2">⚠ Considerations:</p>
                <div className="space-y-1">
                  {network.cons.map((con, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-3 w-3 text-orange-500" />
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded mb-4">
              <p className="text-sm font-medium mb-1">Requirements:</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {network.requirements}
              </p>
            </div>

            <Button 
              className="w-full" 
              onClick={() => window.open(network.signupUrl, '_blank')}
            >
              Apply to {network.name}
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Implementation Tabs */}
      <Tabs defaultValue="vdo-ai" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vdo-ai">VDO.ai Setup</TabsTrigger>
          <TabsTrigger value="exoclick">ExoClick Setup</TabsTrigger>
          <TabsTrigger value="clickadilla">ClickAdilla Setup</TabsTrigger>
          <TabsTrigger value="comparison">Revenue Guide</TabsTrigger>
        </TabsList>

        {/* VDO.ai Setup */}
        <TabsContent value="vdo-ai" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">VDO.ai Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vdo-publisher-id">Publisher ID</Label>
                  <Input
                    id="vdo-publisher-id"
                    placeholder="Enter your VDO.ai Publisher ID"
                    value={publisherConfig['vdo-ai'].publisherId}
                    onChange={(e) => updateConfig('vdo-ai', 'publisherId', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="vdo-zone-name">Zone Name</Label>
                  <Input
                    id="vdo-zone-name"
                    placeholder="Enter your zone name"
                    value={publisherConfig['vdo-ai'].zoneName}
                    onChange={(e) => updateConfig('vdo-ai', 'zoneName', e.target.value)}
                  />
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Note:</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    VDO.ai requires 500K+ monthly pageviews for approval. Focus on Tier 1 traffic for best CPM rates.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Generated Code:</h4>
                <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
                  {generateImplementationCode('vdo-ai')}
                </pre>
                <Button 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(generateImplementationCode('vdo-ai'))}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Code
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ExoClick Setup */}
        <TabsContent value="exoclick" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">ExoClick Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="exo-publisher-id">Site ID</Label>
                  <Input
                    id="exo-publisher-id"
                    placeholder="Enter your ExoClick Site ID"
                    value={publisherConfig.exoclick.publisherId}
                    onChange={(e) => updateConfig('exoclick', 'publisherId', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="exo-zone-id">Zone ID</Label>
                  <Input
                    id="exo-zone-id"
                    placeholder="Enter your Zone ID"
                    value={publisherConfig.exoclick.zoneId}
                    onChange={(e) => updateConfig('exoclick', 'zoneId', e.target.value)}
                  />
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Note:</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    ExoClick has lower CPM rates but massive volume. Best for entertainment and lifestyle content.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Generated Code:</h4>
                <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
                  {generateImplementationCode('exoclick')}
                </pre>
                <Button 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(generateImplementationCode('exoclick'))}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Code
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ClickAdilla Setup */}
        <TabsContent value="clickadilla" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">ClickAdilla Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="click-publisher-id">Zone ID</Label>
                  <Input
                    id="click-publisher-id"
                    placeholder="Enter your ClickAdilla Zone ID"
                    value={publisherConfig.clickadilla.publisherId}
                    onChange={(e) => updateConfig('clickadilla', 'publisherId', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="click-ad-format">Ad Format</Label>
                  <select 
                    id="click-ad-format"
                    className="w-full p-2 border rounded"
                    value={publisherConfig.clickadilla.adFormat}
                    onChange={(e) => updateConfig('clickadilla', 'adFormat', e.target.value)}
                  >
                    <option value="in-stream">In-Stream Video</option>
                    <option value="out-stream">Out-Stream Video</option>
                    <option value="video-slider">Video Slider</option>
                  </select>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">Note:</p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    ClickAdilla offers consistent $0.05 CPM globally with 100% viewability guarantee.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Generated Code:</h4>
                <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
                  {generateImplementationCode('clickadilla')}
                </pre>
                <Button 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(generateImplementationCode('clickadilla'))}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Code
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Revenue Comparison Guide */}
        <TabsContent value="comparison" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Revenue Strategy Guide</h3>
            
            {/* Traffic Type Recommendations */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    <Globe className="h-4 w-4 inline mr-2" />
                    Tier 1 Traffic (US/UK/CA)
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">Best Choice: VDO.ai</p>
                  <p className="text-sm">$4-8 CPM with AI optimization</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    <Target className="h-4 w-4 inline mr-2" />
                    Global/Mixed Traffic
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">Best Choice: ClickAdilla</p>
                  <p className="text-sm">Consistent $0.05 CPM globally</p>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    <TrendingUp className="h-4 w-4 inline mr-2" />
                    High Volume Sites
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">Best Choice: ExoClick</p>
                  <p className="text-sm">8.5B+ daily impressions</p>
                </div>
              </div>

              {/* Revenue Estimates */}
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded">
                <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
                  Expected Monthly Revenue (50K Views)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">$200-400</span>
                    </div>
                    <p className="text-sm">VDO.ai (Tier 1)</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <span className="text-2xl font-bold text-blue-600">$125</span>
                    </div>
                    <p className="text-sm">ClickAdilla (Global)</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-red-600" />
                      <span className="text-2xl font-bold text-red-600">$25-250</span>
                    </div>
                    <p className="text-sm">ExoClick (Volume)</p>
                  </div>
                </div>
              </div>

              {/* Implementation Strategy */}
              <div className="space-y-4">
                <h4 className="font-semibold">Recommended Implementation Strategy:</h4>
                <div className="space-y-3">
                  <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h5 className="font-semibold">Start with ClickAdilla</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No traffic requirements, consistent global rates, easy approval
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h5 className="font-semibold">Apply to VDO.ai (if eligible)</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        If you have 500K+ pageviews with Tier 1 traffic
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h5 className="font-semibold">Add ExoClick for volume</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Supplement with high-volume, lower-CPM traffic
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}