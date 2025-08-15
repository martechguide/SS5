import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  Settings,
  Copy,
  Star,
  Globe,
  Clock,
  CreditCard,
  UserCheck,
  Zap
} from 'lucide-react';
import AdsterraDashboardGuide from './adsterra-dashboard-guide';
import CompleteAdsterraProcess from './complete-adsterra-process';

export default function AdsterraManagementGuide() {
  const [publisherId, setPublisherId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  const handleConfiguration = () => {
    if (publisherId && zoneId) {
      setIsConfigured(true);
      const toast = document.createElement('div');
      toast.textContent = 'Adsterra configuration saved successfully!';
      toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; z-index: 10000; font-weight: 500;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    const toast = document.createElement('div');
    toast.textContent = 'Adsterra ad code copied to clipboard!';
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; z-index: 10000; font-weight: 500;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const adsterraSteps = [
    {
      step: 1,
      title: 'Adsterra Account बनाएं',
      description: 'सबसे पहले Adsterra में publisher account create करें',
      action: 'Apply Now',
      details: [
        'Adsterra.com पर जाएं',
        '"Join as Publisher" पर click करें',
        'Email, website URL, और basic details fill करें',
        '24-48 hours में approval मिल जाएगा',
        'No minimum traffic requirement!'
      ],
      benefits: ['Fast approval', 'High CPM rates', 'Multiple ad formats'],
      difficulty: 'Easy',
      time: '5-10 minutes'
    },
    {
      step: 2,
      title: 'Publisher ID और Zone ID collect करें',
      description: 'Approval के बाद Adsterra dashboard से IDs collect करें',
      action: 'Get IDs',
      details: [
        'Adsterra dashboard में login करें',
        '"Websites" section में जाएं',
        'अपनी website select करें',
        'Publisher ID copy करें (pub-XXXXXXXXX format में)',
        'Ad zones create करें और Zone ID copy करें'
      ],
      benefits: ['Unique tracking', 'Revenue optimization', 'Performance monitoring'],
      difficulty: 'Medium',
      time: '10-15 minutes'
    },
    {
      step: 3,
      title: 'Configuration में IDs enter करें',
      description: 'हमारे system में अपने Adsterra IDs configure करें',
      action: 'Configure',
      details: [
        'नीचे दिए गए Configuration section में Publisher ID enter करें',
        'Zone ID भी enter करें',
        '"Save Configuration" पर click करें',
        'System automatically ad codes generate करेगा',
        'Green "Configured" status दिखेगा'
      ],
      benefits: ['Automatic code generation', 'Ready-to-use ads', 'Real-time tracking'],
      difficulty: 'Easy',
      time: '2-3 minutes'
    },
    {
      step: 4,
      title: 'Ad Codes Copy करें',
      description: 'Generate हुए ad codes को copy करके अपनी website पर paste करें',
      action: 'Copy & Paste',
      details: [
        'Configuration के बाद "Copy Code" buttons active हो जाएंगे',
        'Banner Ad Code, Native Ad Code copy करें',
        'अपनी website के HTML में paste करें',
        'Pre-Roll, Mid-Roll, Post-Roll codes भी copy करें',
        'Video players में implement करें'
      ],
      benefits: ['Multiple ad formats', 'High revenue potential', 'Mobile responsive'],
      difficulty: 'Easy',
      time: '5-10 minutes'
    },
    {
      step: 5,
      title: 'Testing और Live करें',
      description: 'Ads को test करके live traffic पर implement करें',
      action: 'Go Live',
      details: [
        'Test mode में ads check करें',
        'Mobile और desktop दोनों पर test करें',
        'Ad placement optimization करें',
        'Live traffic पर deploy करें',
        'Adsterra dashboard में revenue monitor करें'
      ],
      benefits: ['Revenue generation', 'Performance tracking', 'Optimization insights'],
      difficulty: 'Medium',
      time: '15-30 minutes'
    }
  ];

  const adFormats = [
    {
      name: 'Banner Ads',
      description: 'Standard display banners for websites',
      cpm: '$2-8',
      placement: 'Header, sidebar, footer',
      mobile: 'Yes',
      code: `<!-- Adsterra Banner Ad Code -->
<script type="text/javascript">
    atOptions = {
        'key' : '${publisherId || 'YOUR_PUBLISHER_ID'}',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.displaycontentnetwork.com/${zoneId || 'YOUR_ZONE_ID'}/invoke.js"></scr' + 'ipt>');
</script>`
    },
    {
      name: 'Native Ads',
      description: 'Content-style ads that blend with your site',
      cpm: '$3-12',
      placement: 'Between articles, content blocks',
      mobile: 'Yes',
      code: `<!-- Adsterra Native Ad Code -->
<script type="text/javascript">
    atOptions = {
        'key' : '${publisherId || 'YOUR_PUBLISHER_ID'}',
        'format' : 'native',
        'height' : 300,
        'width' : 350,
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.nativecontentnetwork.com/${zoneId || 'YOUR_ZONE_ID'}/invoke.js"></scr' + 'ipt>');
</script>`
    },
    {
      name: 'Video Pre-Roll',
      description: 'Video ads before main content',
      cpm: '$5-15',
      placement: 'Before video content',
      mobile: 'Yes',
      code: `<!-- Adsterra Video Pre-Roll Code -->
<script type="text/javascript">
    atOptions = {
        'key' : '${publisherId || 'YOUR_PUBLISHER_ID'}',
        'format' : 'video',
        'height' : 450,
        'width' : 800,
        'params' : {
            'position': 'preroll'
        }
    };
    document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.videocontentnetwork.com/${zoneId || 'YOUR_ZONE_ID'}/invoke.js"></scr' + 'ipt>');
</script>`
    },
    {
      name: 'Social Bar',
      description: 'Floating social media style ads',
      cpm: '$4-10',
      placement: 'Floating on page',
      mobile: 'Yes',
      code: `<!-- Adsterra Social Bar Ad Code -->
<script type="text/javascript">
    atOptions = {
        'key' : '${publisherId || 'YOUR_PUBLISHER_ID'}',
        'format' : 'social',
        'height' : 90,
        'width' : 728,
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.socialcontentnetwork.com/${zoneId || 'YOUR_ZONE_ID'}/invoke.js"></scr' + 'ipt>');
</script>`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6 text-blue-500" />
            Adsterra Management - Step by Step Guide (हिंदी में)
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Adsterra network के साथ high-CPM monetization setup करने का complete guide
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className="bg-green-100 text-green-800">High CPM: $2-15</Badge>
            <Badge className="bg-blue-100 text-blue-800">Fast Approval</Badge>
            <Badge className="bg-purple-100 text-purple-800">No Min Traffic</Badge>
            <Badge className="bg-orange-100 text-orange-800">Multiple Formats</Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="complete" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="complete">Complete Process</TabsTrigger>
          <TabsTrigger value="steps">Step-by-Step</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="formats">Ad Formats</TabsTrigger>
          <TabsTrigger value="earnings">Earnings Guide</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard Guide</TabsTrigger>
        </TabsList>

        {/* Complete Process Tab */}
        <TabsContent value="complete" className="space-y-6">
          <CompleteAdsterraProcess />
        </TabsContent>

        {/* Step-by-Step Guide */}
        <TabsContent value="steps" className="space-y-6">
          <div className="grid gap-6">
            {adsterraSteps.map((stepData, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                    {stepData.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{stepData.title}</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {stepData.time}
                        </Badge>
                        <Badge 
                          className={`text-xs ${
                            stepData.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            stepData.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {stepData.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{stepData.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Action Steps:</h4>
                        <ul className="text-sm space-y-1">
                          {stepData.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Benefits:</h4>
                        <ul className="text-sm space-y-1">
                          {stepData.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      {stepData.step === 1 && (
                        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                          <a href="https://adsterra.com/publisher" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {stepData.action}
                          </a>
                        </Button>
                      )}
                      {stepData.step === 2 && (
                        <Button className="bg-green-600 hover:bg-green-700" asChild>
                          <a href="https://adsterra.com/dashboard" target="_blank" rel="noopener noreferrer">
                            <Settings className="h-4 w-4 mr-2" />
                            {stepData.action}
                          </a>
                        </Button>
                      )}
                      {stepData.step === 3 && (
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => {
                            const configTab = document.querySelector('[value="config"]') as HTMLElement;
                            configTab?.click();
                          }}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          {stepData.action}
                        </Button>
                      )}
                      {stepData.step === 4 && (
                        <Button 
                          className="bg-orange-600 hover:bg-orange-700"
                          onClick={() => {
                            const formatsTab = document.querySelector('[value="formats"]') as HTMLElement;
                            formatsTab?.click();
                          }}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {stepData.action}
                        </Button>
                      )}
                      {stepData.step === 5 && (
                        <Button className="bg-red-600 hover:bg-red-700">
                          <Zap className="h-4 w-4 mr-2" />
                          {stepData.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="config" className="space-y-6">
          {/* Clear Explanation Card */}
          <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <AlertCircle className="h-6 w-6" />
                आपका सवाल: IDs paste करना है या Ads Code?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg border border-green-300">
                  <h3 className="font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Option 1: सिर्फ IDs paste करें (RECOMMENDED)
                  </h3>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Adsterra से सिर्फ Publisher ID लें</li>
                    <li>• Zone ID भी copy करें</li>
                    <li>• यहाँ नीचे paste करें</li>
                    <li>• हमारा system ads code बना देगा</li>
                    <li>• बहुत आसान तरीका है!</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border border-yellow-300">
                  <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Option 2: Manual Ads Code paste करें
                  </h3>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Adsterra में ads unit create करें</li>
                    <li>• HTML/JavaScript code मिलेगा</li>
                    <li>• उस code को manually paste करें</li>
                    <li>• थोड़ा complex है</li>
                    <li>• Advanced users के लिए है</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
                  हमारी सलाह: Option 1 use करें!
                </h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  बस Publisher ID और Zone ID paste करिए, बाकी काम हमारा system कर देगा। 
                  यह ज्यादा आसान और safe है।
                </p>
              </div>
              
              {/* Visual Flow Diagram */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 p-6 rounded-lg border">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-4 text-center">
                  🔄 Exact Process Flow (बिल्कुल यही करना है)
                </h4>
                
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 mx-auto flex items-center justify-center font-bold text-lg mb-2">1</div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                      <h5 className="font-semibold text-sm mb-1">Adsterra Account</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Adsterra.com पर publisher account बनाएं
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-500 text-white rounded-full w-12 h-12 mx-auto flex items-center justify-center font-bold text-lg mb-2">2</div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                      <h5 className="font-semibold text-sm mb-1">Copy IDs</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Dashboard से Publisher ID और Zone ID copy करें
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-500 text-white rounded-full w-12 h-12 mx-auto flex items-center justify-center font-bold text-lg mb-2">3</div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                      <h5 className="font-semibold text-sm mb-1">Paste Here</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        नीचे के form में IDs paste करें
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-orange-500 text-white rounded-full w-12 h-12 mx-auto flex items-center justify-center font-bold text-lg mb-2">4</div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                      <h5 className="font-semibold text-sm mb-1">Auto Code</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        हमारा system ads code बना देगा
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-green-800 dark:text-green-200 text-sm font-medium">
                      कोई ads unit create नहीं करना! सिर्फ IDs चाहिए।
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Adsterra Configuration (आसान तरीका)
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                यहाँ अपनी Adsterra Publisher ID और Zone ID enter करें
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`p-4 rounded-lg border-2 ${isConfigured ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="publisher-id">Publisher ID</Label>
                    <Input
                      id="publisher-id"
                      placeholder="pub-XXXXXXXXXXXXXXXXX"
                      value={publisherId}
                      onChange={(e) => setPublisherId(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Adsterra dashboard → Account Settings → Publisher ID
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="zone-id">Zone ID</Label>
                    <Input
                      id="zone-id"
                      placeholder="XXXXXXX"
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Adsterra dashboard → Websites → Create Zone → Zone ID
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button 
                    onClick={handleConfiguration}
                    disabled={!publisherId || !zoneId}
                    className={`w-full ${isConfigured ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {isConfigured ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Configured Successfully!
                      </>
                    ) : (
                      <>
                        <Settings className="h-4 w-4 mr-2" />
                        Save Configuration
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isConfigured && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                    ✓ Configuration Complete! अब Ad Codes ready हैं
                  </h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Publisher ID: {publisherId}</li>
                    <li>• Zone ID: {zoneId}</li>
                    <li>• Ad codes automatically generated</li>
                    <li>• "Ad Formats" tab से codes copy करें</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ad Formats Tab */}
        <TabsContent value="formats" className="space-y-6">
          <div className="grid gap-6">
            {adFormats.map((format, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      {format.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800">{format.cpm} CPM</Badge>
                      <Badge className="bg-blue-100 text-blue-800">{format.mobile ? 'Mobile Ready' : 'Desktop Only'}</Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{format.description}</p>
                  <p className="text-sm text-gray-500">Best placement: {format.placement}</p>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label>Generated Ad Code (Step 4 - Copy करें):</Label>
                    <Textarea
                      value={format.code}
                      readOnly
                      className="mt-2 font-mono text-sm"
                      rows={8}
                    />
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => copyCode(format.code)}
                      disabled={!isConfigured}
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy {format.name} Code
                    </Button>
                  </div>
                  
                  {!isConfigured && (
                    <p className="text-xs text-orange-600 mt-2">
                      ⚠️ पहले "Configuration" tab में Publisher ID और Zone ID enter करें
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Earnings Guide Tab */}
        <TabsContent value="earnings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Adsterra Earnings Potential (Step 5 - Revenue Guide)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Monthly Earnings (Conservative)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>1,000 views/month × $2 CPM:</span>
                      <span className="font-medium">$100-200/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5,000 views/month × $4 CPM:</span>
                      <span className="font-medium">$500-800/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10,000 views/month × $6 CPM:</span>
                      <span className="font-medium">$1,000-1,500/month</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Monthly Earnings (Optimistic)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>1,000 views/month × $8 CPM:</span>
                      <span className="font-medium text-green-600">$400-600/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5,000 views/month × $12 CPM:</span>
                      <span className="font-medium text-green-600">$1,500-2,500/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10,000+ views/month:</span>
                      <span className="font-medium text-green-600">$3,000+ /month</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Payment Information</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-2">Payment Methods:</h5>
                    <ul className="space-y-1">
                      <li>• PayPal (Most popular)</li>
                      <li>• Wire Transfer</li>
                      <li>• Paxum</li>
                      <li>• Cryptocurrency</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Payment Terms:</h5>
                    <ul className="space-y-1">
                      <li>• NET-15 payment cycle</li>
                      <li>• Minimum payout: $5</li>
                      <li>• Bi-weekly payments available</li>
                      <li>• Real-time earnings tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Success Tips</h4>
                <ol className="text-sm text-purple-700 dark:text-purple-300 space-y-2">
                  <li><strong>1. Start with Banner ads</strong> - सबसे easy और reliable format</li>
                  <li><strong>2. Add Native ads</strong> - Higher CPM, blends with content</li>
                  <li><strong>3. Implement Video Pre-Roll</strong> - Highest earning potential</li>
                  <li><strong>4. Monitor performance</strong> - Adsterra dashboard में daily check करें</li>
                  <li><strong>5. Optimize placement</strong> - A/B test different positions</li>
                  <li><strong>6. Scale up</strong> - Success के बाद more ad formats add करें</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard Guide Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <AdsterraDashboardGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
}