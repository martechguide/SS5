import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  BarChart3, 
  Settings, 
  Code, 
  MapPin,
  Eye,
  Edit,
  Copy,
  Monitor,
  Smartphone,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AdsterraDashboardGuide() {
  const [activeTab, setActiveTab] = useState('overview');

  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    const toast = document.createElement('div');
    toast.textContent = `${type} code copied to clipboard!`;
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; z-index: 10000; font-weight: 500;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const dashboardSections = [
    {
      id: 'overview',
      name: 'Ad Overview',
      icon: <BarChart3 className="h-5 w-5" />,
      purpose: 'सभी ads की performance और earnings देखने के लिए',
      description: 'यहाँ आप अपने सभी active ads की summary देख सकते हैं',
      features: [
        'Total earnings और revenue stats',
        'Ad performance metrics (clicks, impressions)',
        'Best performing ad units की list',
        'Daily, weekly, monthly earnings graph',
        'Country-wise earnings breakdown',
        'Device-wise performance (mobile vs desktop)'
      ],
      usage: [
        'Daily earnings check करने के लिए',
        'Best performing ads identify करने के लिए',
        'Revenue trends analyze करने के लिए',
        'Optimization decisions लेने के लिए'
      ],
      importance: 'HIGH - Daily monitoring के लिए जरूरी'
    },
    {
      id: 'manage',
      name: 'Manage Ads',
      icon: <Settings className="h-5 w-5" />,
      purpose: 'नए ads create करना और existing ads को edit करना',
      description: 'Ad units को create, edit, pause, या delete करने का main section',
      features: [
        'Create new ad units (Banner, Native, Video)',
        'Edit existing ad settings',
        'Enable/disable ads with toggle switch',
        'Ad unit naming और categorization',
        'Size और format selection',
        'Targeting options set करना'
      ],
      usage: [
        'नए ad formats add करने के लिए',
        'Poor performing ads को pause करने के लिए',
        'Ad settings optimize करने के लिए',
        'Multiple ad variants create करने के लिए'
      ],
      importance: 'HIGH - Ad management के लिए essential'
    },
    {
      id: 'codes',
      name: 'Ad Codes',
      icon: <Code className="h-5 w-5" />,
      purpose: 'Generated ad codes को copy करके website पर paste करना',
      description: 'Ready-to-use ad codes जो आपको website पर implement करने हैं',
      features: [
        'HTML/JavaScript ad codes',
        'Copy button for easy copying',
        'Multiple format codes (Banner, Native, Video)',
        'Responsive और mobile-optimized codes',
        'Integration instructions',
        'Code preview और testing'
      ],
      usage: [
        'Website पर ads implement करने के लिए',
        'Different pages पर different ads lagaane के लिए',
        'A/B testing के लिए multiple codes',
        'Developer को codes provide करने के लिए'
      ],
      importance: 'CRITICAL - Revenue generation के लिए must-have'
    },
    {
      id: 'placement',
      name: 'Placement',
      icon: <MapPin className="h-5 w-5" />,
      purpose: 'Website के specific locations पर ads का placement optimize करना',
      description: 'Ad placement strategies और integration codes',
      features: [
        'Header placement codes',
        'Footer placement codes',
        'Sidebar placement options',
        'Content में between paragraphs',
        'Mobile-specific placements',
        'Auto-placement suggestions'
      ],
      usage: [
        'Best ad positions identify करने के लिए',
        'User experience maintain करते हुए revenue maximize करना',
        'Different page layouts के लिए optimization',
        'Mobile और desktop के लिए अलग placements'
      ],
      importance: 'MEDIUM - Revenue optimization के लिए helpful'
    }
  ];

  const stepByStepProcess = [
    {
      step: 1,
      section: 'Ad Overview',
      action: 'Monitor Performance',
      details: [
        'Daily login करके earnings check करें',
        'Best performing ad units identify करें',
        'Traffic sources और countries analyze करें',
        'Mobile vs Desktop performance compare करें'
      ],
      frequency: 'Daily'
    },
    {
      step: 2,
      section: 'Manage Ads',
      action: 'Create & Configure',
      details: [
        'नए ad units create करें (Banner, Native, Video)',
        'Ad sizes और formats select करें',
        'Targeting options set करें',
        'Poor performing ads को pause करें'
      ],
      frequency: 'Weekly'
    },
    {
      step: 3,
      section: 'Ad Codes',
      action: 'Copy & Implement',
      details: [
        'Generated codes copy करें',
        'Website पर appropriate locations पर paste करें',
        'Mobile responsive testing करें',
        'Multiple ad formats implement करें'
      ],
      frequency: 'Once/When needed'
    },
    {
      step: 4,
      section: 'Placement',
      action: 'Optimize Positions',
      details: [
        'Different placement codes try करें',
        'User engagement impact monitor करें',
        'Revenue per placement track करें',
        'Best positions को final करें'
      ],
      frequency: 'Monthly'
    }
  ];

  const exampleCodes = {
    banner: `<!-- Banner Ad Code Example -->
<script type="text/javascript">
    atOptions = {
        'key' : 'your-zone-123456',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.topcpmnetwork.com/your-zone-id/invoke.js"></scr' + 'ipt>');
</script>`,
    
    headerPlacement: `<!-- Header Placement Code -->
<AdPlacementSystem
  placement="header"
  showBanner={true}
  allowClose={false}
/>`,
    
    footerPlacement: `<!-- Footer Placement Code -->
<AdPlacementSystem
  placement="footer"
  showBanner={true}
  allowClose={true}
/>`
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-500" />
            Adsterra Dashboard के 4 Main Options - Complete Guide
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Ad Overview, Manage Ads, Ad Codes, और Placement का detailed explanation
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Ad Overview</TabsTrigger>
          <TabsTrigger value="manage">Manage Ads</TabsTrigger>
          <TabsTrigger value="codes">Ad Codes</TabsTrigger>
          <TabsTrigger value="placement">Placement</TabsTrigger>
        </TabsList>

        {dashboardSections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {section.icon}
                    {section.name}
                  </div>
                  <Badge 
                    className={`${
                      section.importance === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                      section.importance === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {section.importance}
                  </Badge>
                </CardTitle>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                  {section.purpose}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {section.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-green-700">✓ Main Features:</h4>
                    <ul className="space-y-2">
                      {section.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-blue-700">📋 Usage Cases:</h4>
                    <ul className="space-y-2">
                      {section.usage.map((use, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Section-specific content */}
                {section.id === 'overview' && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                      📊 Ad Overview में क्या देखें:
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <ul className="space-y-1">
                        <li>• <strong>Today's Earnings:</strong> आज की कमाई</li>
                        <li>• <strong>Impressions:</strong> Ads कितनी बार दिखे</li>
                        <li>• <strong>Clicks:</strong> कितनी clicks आईं</li>
                        <li>• <strong>CTR:</strong> Click-through rate</li>
                      </ul>
                      <ul className="space-y-1">
                        <li>• <strong>eCPM:</strong> Effective cost per mille</li>
                        <li>• <strong>Countries:</strong> Traffic sources</li>
                        <li>• <strong>Devices:</strong> Mobile vs Desktop</li>
                        <li>• <strong>Ad Formats:</strong> Best performers</li>
                      </ul>
                    </div>
                  </div>
                )}

                {section.id === 'manage' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
                      ⚙️ Manage Ads में Available Actions:
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h6 className="font-medium mb-1">Create New Ads:</h6>
                        <ul className="space-y-1">
                          <li>• Footer Banner (728x90)</li>
                          <li>• Mobile Banner (320x50)</li>
                          <li>• Native Content Ad</li>
                          <li>• Social Bar Notification</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium mb-1">Edit Existing Ads:</h6>
                        <ul className="space-y-1">
                          <li>• Enable/Disable toggle</li>
                          <li>• Change ad settings</li>
                          <li>• Update targeting</li>
                          <li>• Rename ad units</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {section.id === 'codes' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                        💻 Example Ad Code (जैसा आपकी screenshot में है):
                      </h5>
                      <Textarea
                        value={exampleCodes.banner}
                        readOnly
                        className="font-mono text-xs"
                        rows={8}
                      />
                      <Button 
                        onClick={() => copyCode(exampleCodes.banner, 'Banner')}
                        className="mt-2 w-full"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Banner Code
                      </Button>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                        🎯 Code Implementation Steps:
                      </h5>
                      <ol className="text-sm space-y-1">
                        <li>1. <strong>Copy Code:</strong> "Copy Code" button दबाएं</li>
                        <li>2. <strong>Website Open करें:</strong> जहाँ ads लगाना है</li>
                        <li>3. <strong>HTML Editor में जाएं:</strong> Page source या template</li>
                        <li>4. <strong>Paste Code:</strong> Appropriate location पर paste करें</li>
                        <li>5. <strong>Save & Test:</strong> Changes save करके test करें</li>
                      </ol>
                    </div>
                  </div>
                )}

                {section.id === 'placement' && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                          🎯 Header Placement:
                        </h5>
                        <Textarea
                          value={exampleCodes.headerPlacement}
                          readOnly
                          className="font-mono text-xs mb-2"
                          rows={5}
                        />
                        <Button 
                          onClick={() => copyCode(exampleCodes.headerPlacement, 'Header')}
                          size="sm" 
                          className="w-full"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Header Code
                        </Button>
                      </div>

                      <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                        <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                          🎯 Footer Placement:
                        </h5>
                        <Textarea
                          value={exampleCodes.footerPlacement}
                          readOnly
                          className="font-mono text-xs mb-2"
                          rows={5}
                        />
                        <Button 
                          onClick={() => copyCode(exampleCodes.footerPlacement, 'Footer')}
                          size="sm" 
                          className="w-full"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Footer Code
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                        📍 Best Placement Positions:
                      </h5>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h6 className="font-medium">High Performance:</h6>
                          <ul className="space-y-1">
                            <li>• Above the fold</li>
                            <li>• Header area</li>
                            <li>• After first paragraph</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium">Medium Performance:</h6>
                          <ul className="space-y-1">
                            <li>• Sidebar</li>
                            <li>• Between content</li>
                            <li>• Footer area</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium">Mobile Optimized:</h6>
                          <ul className="space-y-1">
                            <li>• Top banner</li>
                            <li>• Bottom sticky</li>
                            <li>• Between paragraphs</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Step-by-Step Process */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Complete Step-by-Step Process (सभी 4 sections का इस्तेमाल)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {stepByStepProcess.map((process, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {process.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{process.section} - {process.action}</h4>
                    <Badge variant="outline">{process.frequency}</Badge>
                  </div>
                  <ul className="text-sm space-y-1">
                    {process.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertCircle className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}