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
  Zap,
  ArrowRight,
  FileText,
  Code,
  Database
} from 'lucide-react';

export default function StandaloneAdsterraManagement() {
  const [websiteId, setWebsiteId] = useState('');
  const [bannerZoneId, setBannerZoneId] = useState('');
  const [nativeZoneId, setNativeZoneId] = useState('');
  const [videoZoneId, setVideoZoneId] = useState('');
  const [socialBarZoneId, setSocialBarZoneId] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [manualCode, setManualCode] = useState('');
  
  // Placement configuration
  const [bannerPlacement, setBannerPlacement] = useState('header');
  const [nativePlacement, setNativePlacement] = useState('content');
  const [socialBarPlacement, setSocialBarPlacement] = useState('bottom');

  const handleMethodSelection = (method: string) => {
    setSelectedMethod(method);
  };

  const getBannerCode = (zoneId: string, websiteId: string, placement: string) => {
    const placementClasses = {
      header: 'adsterra-banner-header',
      sidebar: 'adsterra-banner-sidebar', 
      content: 'adsterra-banner-content',
      footer: 'adsterra-banner-footer'
    };

    return `<!-- Adsterra Banner (${placement}) -->
<div class="${placementClasses[placement as keyof typeof placementClasses]}" style="text-align: center; margin: 20px 0;">
  <script>
    atOptions = {
      'key': '${zoneId}',
      'format': 'iframe',
      'height': 250,
      'width': 300
    };
  </script>
  <script src="//www.displaycontentnetwork.com/${websiteId}/invoke.js"></script>
</div>`;
  };

  const getNativeCode = (zoneId: string, websiteId: string, placement: string) => {
    const placementClasses = {
      content: 'adsterra-native-content',
      sidebar: 'adsterra-native-sidebar',
      'after-post': 'adsterra-native-after-post',
      'before-post': 'adsterra-native-before-post'
    };

    return `<!-- Adsterra Native (${placement}) -->
<div class="${placementClasses[placement as keyof typeof placementClasses]}" style="margin: 20px 0;">
  <script>
    atOptions = {
      'key': '${zoneId}',
      'format': 'native',
      'height': 300,
      'width': 350
    };
  </script>
  <script src="//www.nativecontentnetwork.com/${websiteId}/invoke.js"></script>
</div>`;
  };

  const getSocialBarCode = (zoneId: string, websiteId: string, placement: string) => {
    const positionStyles = {
      bottom: 'position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;',
      top: 'position: fixed; top: 0; left: 0; right: 0; z-index: 9999;',
      left: 'position: fixed; left: 0; top: 50%; transform: translateY(-50%); z-index: 9999;',
      right: 'position: fixed; right: 0; top: 50%; transform: translateY(-50%); z-index: 9999;'
    };

    return `<!-- Adsterra Social Bar (${placement}) -->
<div id="adsterra-social-bar" style="${positionStyles[placement as keyof typeof positionStyles]}">
  <script>
    atOptions = {
      'key': '${zoneId}',
      'format': 'socialbar',
      'height': 50,
      'width': '100%'
    };
  </script>
  <script src="//www.socialcontentnetwork.com/${websiteId}/invoke.js"></script>
</div>

<!-- Optional: Add this CSS for better styling -->
<style>
#adsterra-social-bar {
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(10px);
}
</style>`;
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    const toast = document.createElement('div');
    toast.textContent = 'Code copied successfully!';
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; z-index: 10000; font-weight: 500;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
            <Database className="h-6 w-6" />
            Standalone Adsterra Management System
          </CardTitle>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>सिर्फ Adsterra के लिए</strong> - Video monetization से अलग, independent Adsterra setup
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className="bg-purple-100 text-purple-800">Independent System</Badge>
            <Badge className="bg-blue-100 text-blue-800">Website-Only Ads</Badge>
            <Badge className="bg-green-100 text-green-800">High Revenue</Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="confusion" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="confusion">आपका Confusion</TabsTrigger>
          <TabsTrigger value="methods">दो Methods</TabsTrigger>
          <TabsTrigger value="step-by-step">Step by Step</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="placement-guide">Placement Guide</TabsTrigger>
        </TabsList>

        {/* Confusion Clarification */}
        <TabsContent value="confusion" className="space-y-6">
          <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <AlertCircle className="h-6 w-6" />
                आपका Confusion: IDs paste करना है या Ads Codes?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Two Clear Options */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Method 1 */}
                <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg border-2 border-green-300">
                  <div className="text-center mb-4">
                    <div className="bg-green-600 text-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-2xl font-bold mb-3">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                      Method 1: केवल IDs Paste करें
                    </h3>
                    <Badge className="bg-green-200 text-green-800 mt-2">RECOMMENDED</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">क्या करना है:</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        Adsterra dashboard से <strong>Website ID</strong> copy करें (सभी ads के लिए same)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <strong>हर ad type के लिए अलग Zone ID</strong> copy करें:
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>• Banner Zone ID</li>
                          <li>• Native Zone ID</li>
                          <li>• Video Zone ID</li>
                          <li>• Social Bar Zone ID</li>
                        </ul>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        यहाँ forms में paste करें
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        हमारा system सभी ad codes generate करेगा
                      </li>
                    </ul>
                    
                    <div className="bg-green-200 dark:bg-green-800 p-3 rounded">
                      <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                        <strong>फायदा:</strong> बहुत आसान! कोई technical knowledge नहीं चाहिए।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Method 2 */}
                <div className="bg-orange-100 dark:bg-orange-900 p-6 rounded-lg border-2 border-orange-300">
                  <div className="text-center mb-4">
                    <div className="bg-orange-600 text-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-2xl font-bold mb-3">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200">
                      Method 2: Manual Ads Codes
                    </h3>
                    <Badge className="bg-orange-200 text-orange-800 mt-2">ADVANCED</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200">क्या करना है:</h4>
                    <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        Adsterra में <strong>ads units create</strong> करें
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        HTML/JavaScript <strong>codes generate</strong> करें
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        उन codes को यहाँ paste करें
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        Manual implementation करें
                      </li>
                    </ul>
                    
                    <div className="bg-orange-200 dark:bg-orange-800 p-3 rounded">
                      <p className="text-orange-800 dark:text-orange-200 text-sm font-medium">
                        <strong>नुकसान:</strong> Complex process, technical knowledge चाहिए।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear Recommendation */}
              <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg border-2 border-blue-300 text-center">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-3">
                  हमारी सलाह: Method 1 चुनें!
                </h3>
                <p className="text-blue-700 dark:text-blue-300 mb-4">
                  सिर्फ Website ID और Zone ID paste करें। बाकी सब हमारा system handle करेगा।
                </p>
                <Button 
                  onClick={() => setSelectedMethod('method1')}
                  className="bg-blue-600 hover:bg-blue-700 mr-4"
                >
                  Method 1 Select करें
                </Button>
                <Button 
                  onClick={() => setSelectedMethod('method2')}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Method 2 Select करें (Advanced)
                </Button>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* Methods Comparison */}
        <TabsContent value="methods" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Method 1 Detailed */}
            <Card className={`border-2 ${selectedMethod === 'method1' ? 'border-green-400 bg-green-50 dark:bg-green-950' : 'border-gray-200'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                  <Database className="h-5 w-5" />
                  Method 1: IDs Only (Recommended)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">आपको सिर्फ यह चाहिए:</h4>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                    <p className="text-sm font-mono">Website ID: XXXXXXX (same for all)</p>
                    <p className="text-sm font-mono">Banner Zone ID: XXXXXXX</p>
                    <p className="text-sm font-mono">Native Zone ID: XXXXXXX</p>
                    <p className="text-sm font-mono">Video Zone ID: XXXXXXX</p>
                    <p className="text-sm font-mono">Social Bar Zone ID: XXXXXXX</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Process:</h4>
                  <ol className="text-sm space-y-1">
                    <li>1. Adsterra dashboard open करें</li>
                    <li>2. Website section से Website ID copy करें</li>
                    <li>3. Zone ID (Ad Unit ID) copy करें</li>
                    <li>4. यहाँ paste करें</li>
                    <li>5. System ads codes generate करेगा</li>
                  </ol>
                </div>

                <div className="bg-green-100 dark:bg-green-900 p-3 rounded">
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    <strong>Time:</strong> 5-10 minutes<br/>
                    <strong>Difficulty:</strong> Very Easy<br/>
                    <strong>Technical Skills:</strong> None required
                  </p>
                </div>

                <Button 
                  onClick={() => setSelectedMethod('method1')}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={selectedMethod === 'method1'}
                >
                  {selectedMethod === 'method1' ? 'Selected ✓' : 'Choose This Method'}
                </Button>
              </CardContent>
            </Card>

            {/* Method 2 Detailed */}
            <Card className={`border-2 ${selectedMethod === 'method2' ? 'border-orange-400 bg-orange-50 dark:bg-orange-950' : 'border-gray-200'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                  <Code className="h-5 w-5" />
                  Method 2: Manual Codes (Advanced)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">आपको यह करना होगा:</h4>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                    <p className="text-sm">1. Ads units create करें</p>
                    <p className="text-sm">2. Each ad type के लिए अलग code</p>
                    <p className="text-sm">3. Banner, Native, Video codes</p>
                    <p className="text-sm">4. Manual placement</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Process:</h4>
                  <ol className="text-sm space-y-1">
                    <li>1. Adsterra में ad units create करें</li>
                    <li>2. Banner ad unit बनाएं</li>
                    <li>3. Native ad unit बनाएं</li>
                    <li>4. Video ad unit बनाएं</li>
                    <li>5. सभी codes copy करें</li>
                    <li>6. यहाँ paste करें</li>
                  </ol>
                </div>

                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded">
                  <p className="text-orange-800 dark:text-orange-200 text-sm">
                    <strong>Time:</strong> 30-45 minutes<br/>
                    <strong>Difficulty:</strong> Medium-Hard<br/>
                    <strong>Technical Skills:</strong> HTML/JS knowledge
                  </p>
                </div>

                <Button 
                  onClick={() => setSelectedMethod('method2')}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={selectedMethod === 'method2'}
                >
                  {selectedMethod === 'method2' ? 'Selected ✓' : 'Choose This Method'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Step by Step */}
        <TabsContent value="step-by-step" className="space-y-6">
          {selectedMethod === 'method1' ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200">
                  Method 1: Step-by-Step Guide (IDs Only)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Adsterra Account Setup</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      अगर account नहीं है तो बनाएं, अगर है तो login करें
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                      <ul className="text-sm space-y-1">
                        <li>• Adsterra.com पर जाएं</li>
                        <li>• "Join as Publisher" click करें</li>
                        <li>• Email और website URL डालें</li>
                        <li>• Account verify करें</li>
                      </ul>
                    </div>
                    <Button className="mt-3 bg-green-600 hover:bg-green-700" asChild>
                      <a href="https://adsterra.com/publisher" target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Adsterra Account बनाएं
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="border-l-2 border-gray-200 dark:border-gray-700 ml-6 pl-6">
                  <ArrowRight className="h-6 w-6 text-gray-400 mb-4" />
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Website ID Find करें</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Dashboard से आपकी website का unique ID copy करें
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                      <ul className="text-sm space-y-1">
                        <li>• Adsterra dashboard में login करें</li>
                        <li>• "Websites" section में जाएं</li>
                        <li>• अपनी website select करें</li>
                        <li>• Website ID दिखेगा: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">XXXXXXX</code></li>
                        <li>• Copy करें</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-gray-200 dark:border-gray-700 ml-6 pl-6">
                  <ArrowRight className="h-6 w-6 text-gray-400 mb-4" />
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Zone ID (Ad Unit ID) Find करें</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Ad zones से Zone ID copy करें (यह Ad Unit ID भी कहलाता है)
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                      <ul className="text-sm space-y-1">
                        <li>• Dashboard में "Ad Zones" या "Zones" section में जाएं</li>
                        <li>• अपना ad zone select करें (Banner, Native, etc.)</li>
                        <li>• Zone ID दिखेगा: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">XXXXXXX</code></li>
                        <li>• Copy करें</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-gray-200 dark:border-gray-700 ml-6 pl-6">
                  <ArrowRight className="h-6 w-6 text-gray-400 mb-4" />
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">यहाँ IDs Paste करें</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Implementation tab में जाकर दोनों IDs paste करें
                    </p>
                    <div className="bg-green-50 dark:bg-green-900 p-4 rounded border border-green-200">
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        ✓ IDs paste करने के बाद हमारा system automatically ads codes generate करेगा
                      </p>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          ) : selectedMethod === 'method2' ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-800 dark:text-orange-200">
                  Method 2: Advanced Manual Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded border border-orange-200">
                  <p className="text-orange-800 dark:text-orange-200">
                    This method requires creating individual ad units in Adsterra dashboard and copying their HTML/JavaScript codes manually.
                  </p>
                </div>
                {/* Add detailed method 2 steps here */}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  पहले Method Select करें
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  "दो Methods" tab में जाकर कोई एक method choose करें
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Implementation */}
        <TabsContent value="implementation" className="space-y-6">
          {selectedMethod === 'method1' ? (
            <Card>
              <CardHeader>
                <CardTitle>Method 1: IDs Implementation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                    ⚠️ Important: हर ad type की अलग Zone ID होती है!
                  </h4>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    Website ID सभी ads के लिए same होती है, लेकिन Banner, Native, Video - हर type की अपनी Zone ID होती है।
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="web-id">Website ID (सभी ads के लिए same)</Label>
                    <Input
                      id="web-id"
                      placeholder="XXXXXXX"
                      value={websiteId}
                      onChange={(e) => setWebsiteId(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="banner-zone-id">Banner Zone ID</Label>
                      <Input
                        id="banner-zone-id"
                        placeholder="Banner Zone ID"
                        value={bannerZoneId}
                        onChange={(e) => setBannerZoneId(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="native-zone-id">Native Zone ID</Label>
                      <Input
                        id="native-zone-id"
                        placeholder="Native Zone ID"
                        value={nativeZoneId}
                        onChange={(e) => setNativeZoneId(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="video-zone-id">Video Zone ID</Label>
                      <Input
                        id="video-zone-id"
                        placeholder="Video Zone ID"
                        value={videoZoneId}
                        onChange={(e) => setVideoZoneId(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="social-bar-zone-id">Social Bar Zone ID</Label>
                      <Input
                        id="social-bar-zone-id"
                        placeholder="Social Bar Zone ID"
                        value={socialBarZoneId}
                        onChange={(e) => setSocialBarZoneId(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Ad Placement Configuration */}
                <div className="space-y-4 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border">
                  <h4 className="font-bold text-blue-800 dark:text-blue-200">
                    📍 Ad Placement Settings (कहाँ show करना है)
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {bannerZoneId && (
                      <div>
                        <Label>Banner Ad Placement</Label>
                        <select 
                          value={bannerPlacement} 
                          onChange={(e) => setBannerPlacement(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="header">Header (Top)</option>
                          <option value="sidebar">Sidebar</option>
                          <option value="content">Content Area</option>
                          <option value="footer">Footer</option>
                        </select>
                      </div>
                    )}
                    {nativeZoneId && (
                      <div>
                        <Label>Native Ad Placement</Label>
                        <select 
                          value={nativePlacement} 
                          onChange={(e) => setNativePlacement(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="content">Between Content</option>
                          <option value="sidebar">Sidebar</option>
                          <option value="after-post">After Post</option>
                          <option value="before-post">Before Post</option>
                        </select>
                      </div>
                    )}
                    {socialBarZoneId && (
                      <div>
                        <Label>Social Bar Placement</Label>
                        <select 
                          value={socialBarPlacement} 
                          onChange={(e) => setSocialBarPlacement(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="bottom">Bottom Fixed</option>
                          <option value="top">Top Fixed</option>
                          <option value="left">Left Side</option>
                          <option value="right">Right Side</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  disabled={!websiteId || (!bannerZoneId && !nativeZoneId && !videoZoneId && !socialBarZoneId)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Generate Ad Codes with Placement (based on provided Zone IDs)
                </Button>

                {websiteId && (bannerZoneId || nativeZoneId || videoZoneId || socialBarZoneId) && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Generated Ad Codes:</h3>
                    
                    {bannerZoneId && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Banner Ad Code (Position: {bannerPlacement})</h4>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyCode(getBannerCode(bannerZoneId, websiteId, bannerPlacement))}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded border overflow-x-auto">
{getBannerCode(bannerZoneId, websiteId, bannerPlacement)}
                        </pre>
                        <div className="mt-2 p-2 bg-green-100 dark:bg-green-900 rounded text-sm">
                          <p className="text-green-800 dark:text-green-200">
                            <strong>Placement:</strong> {bannerPlacement === 'header' ? 'Website के header में show होगा' : 
                                                         bannerPlacement === 'sidebar' ? 'Sidebar में show होगा' :
                                                         bannerPlacement === 'content' ? 'Content area में show होगा' :
                                                         'Footer में show होगा'}
                          </p>
                        </div>
                      </div>
                    )}

                    {nativeZoneId && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Native Ad Code (Position: {nativePlacement})</h4>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyCode(getNativeCode(nativeZoneId, websiteId, nativePlacement))}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded border overflow-x-auto">
{getNativeCode(nativeZoneId, websiteId, nativePlacement)}
                        </pre>
                        <div className="mt-2 p-2 bg-orange-100 dark:bg-orange-900 rounded text-sm">
                          <p className="text-orange-800 dark:text-orange-200">
                            <strong>Placement:</strong> {nativePlacement === 'content' ? 'Content के बीच में show होगा' : 
                                                         nativePlacement === 'sidebar' ? 'Sidebar में show होगा' :
                                                         nativePlacement === 'after-post' ? 'Post के बाद show होगा' :
                                                         'Post से पहले show होगा'}
                          </p>
                        </div>
                      </div>
                    )}

                    {videoZoneId && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Video Ad Code</h4>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyCode(`<!-- Adsterra Video -->\n<script>\n  atOptions = {\n    'key': '${videoZoneId}',\n    'format': 'video',\n    'height': 250,\n    'width': 400\n  };\n</script>\n<script src="//www.videocontentnetwork.com/${websiteId}/invoke.js"></script>`)}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded border overflow-x-auto">
{`<!-- Adsterra Video -->
<script>
  atOptions = {
    'key': '${videoZoneId}',
    'format': 'video',
    'height': 250,
    'width': 400
  };
</script>
<script src="//www.videocontentnetwork.com/${websiteId}/invoke.js"></script>`}
                        </pre>
                      </div>
                    )}

                    {socialBarZoneId && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Social Bar Ad Code (Position: {socialBarPlacement})</h4>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyCode(getSocialBarCode(socialBarZoneId, websiteId, socialBarPlacement))}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded border overflow-x-auto">
{getSocialBarCode(socialBarZoneId, websiteId, socialBarPlacement)}
                        </pre>
                        <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900 rounded text-sm">
                          <p className="text-blue-800 dark:text-blue-200">
                            <strong>Placement:</strong> {socialBarPlacement === 'bottom' ? 'Screen के bottom में fixed रहेगा' : 
                                                         socialBarPlacement === 'top' ? 'Screen के top में fixed रहेगा' :
                                                         socialBarPlacement === 'left' ? 'Screen के left side में fixed रहेगा' :
                                                         'Screen के right side में fixed रहेगा'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : selectedMethod === 'method2' ? (
            <Card>
              <CardHeader>
                <CardTitle>Method 2: Manual Codes Implementation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="manual-code">Paste Your Adsterra Ad Code</Label>
                  <Textarea
                    id="manual-code"
                    placeholder="Paste your complete Adsterra ad code here..."
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    rows={10}
                    className="mt-1 font-mono text-sm"
                  />
                </div>

                <Button 
                  disabled={!manualCode}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Implement Manual Code
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Method Select करें
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Implementation के लिए पहले कोई method choose करें
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <Button 
                    onClick={() => setSelectedMethod('method1')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Method 1 (IDs Only)
                  </Button>
                  <Button 
                    onClick={() => setSelectedMethod('method2')}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Method 2 (Manual)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Placement Guide */}
        <TabsContent value="placement-guide" className="space-y-6">
          <Card className="border-2 border-purple-200 bg-purple-50 dark:bg-purple-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                <Globe className="h-6 w-6" />
                📍 Ad Placement Decision Guide
              </CardTitle>
              <p className="text-purple-700 dark:text-purple-300">
                कैसे decide करें कि ads कहाँ place करें और कैसे website में implement करें
              </p>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Revenue vs User Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200">
                  💰 Best Revenue Positions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded">
                    <h4 className="font-bold text-green-800 dark:text-green-200">🥇 Highest CPM (सबसे ज्यादा पैसा)</h4>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• <strong>Header Banner:</strong> सबसे पहले दिखता है</li>
                      <li>• <strong>Content के बीच Native:</strong> Users engage करते हैं</li>
                      <li>• <strong>Bottom Social Bar:</strong> हमेशा visible रहता है</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded">
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-200">🥈 Medium CPM</h4>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• <strong>Sidebar Banner:</strong> देर तक visible</li>
                      <li>• <strong>After Post Native:</strong> content complete करने के बाद</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded">
                    <h4 className="font-bold text-orange-800 dark:text-orange-200">🥉 Lower CPM</h4>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• <strong>Footer Banner:</strong> कम visible</li>
                      <li>• <strong>Side Social Bar:</strong> कम engagement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200">
                  👥 User Experience Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded">
                    <h4 className="font-bold text-blue-800 dark:text-blue-200">✅ Non-Intrusive (Recommended)</h4>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• <strong>Content के बाद Native:</strong> Natural लगता है</li>
                      <li>• <strong>Sidebar Banner:</strong> Content disturb नहीं करता</li>
                      <li>• <strong>Bottom Social Bar:</strong> Closable option दें</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded">
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-200">⚠️ Moderate Impact</h4>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• <strong>Header Banner:</strong> First impression affect करता है</li>
                      <li>• <strong>Content के बीच Native:</strong> Reading flow break करता है</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                    <h4 className="font-bold text-red-800 dark:text-red-200">❌ High Impact (Avoid)</h4>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• <strong>Top Social Bar:</strong> Content को cover करता है</li>
                      <li>• <strong>Multiple Fixed Bars:</strong> Screen clutter</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Website Type Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-purple-200">
                🎯 Website Type के अनुसार Best Placement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg">
                  <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">📖 Blog/News Site</h4>
                  <ul className="text-sm space-y-2">
                    <li>✅ <strong>Header Banner:</strong> High visibility</li>
                    <li>✅ <strong>After Post Native:</strong> Natural flow</li>
                    <li>✅ <strong>Bottom Social Bar:</strong> Persistent revenue</li>
                    <li>❌ Content के बीच ads avoid करें</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg">
                  <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">🛒 E-commerce Site</h4>
                  <ul className="text-sm space-y-2">
                    <li>✅ <strong>Sidebar Banner:</strong> Product focus maintain</li>
                    <li>✅ <strong>After Category Native:</strong> Browsing के बाद</li>
                    <li>❌ Checkout pages में ads avoid करें</li>
                    <li>❌ Header ads conversion reduce करते हैं</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg">
                  <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3">🎮 Entertainment Site</h4>
                  <ul className="text-sm space-y-2">
                    <li>✅ <strong>All positions work:</strong> Users expect ads</li>
                    <li>✅ <strong>Video के पास Native:</strong> High engagement</li>
                    <li>✅ <strong>Multiple Social Bars:</strong> Gaming audience tolerates</li>
                    <li>⚠️ Gaming content के दौरान popup avoid करें</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-200">
                🔧 Implementation में कैसे Add करें
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">1️⃣ WordPress Sites:</h4>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border">
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Header Banner:</strong> header.php में add करें</li>
                        <li>• <strong>Content Native:</strong> single.php में after content</li>
                        <li>• <strong>Sidebar Banner:</strong> Widgets में Custom HTML</li>
                        <li>• <strong>Social Bar:</strong> footer.php में before closing body</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">2️⃣ Custom HTML Sites:</h4>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border">
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Header Banner:</strong> &lt;header&gt; section में</li>
                        <li>• <strong>Content Native:</strong> &lt;article&gt; के बाद</li>
                        <li>• <strong>Sidebar Banner:</strong> &lt;aside&gt; में</li>
                        <li>• <strong>Social Bar:</strong> body close से पहले</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">⚡ Pro Tips:</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• <strong>A/B Test करें:</strong> 1 week different positions try करें</li>
                    <li>• <strong>Analytics check करें:</strong> कौन सा position ज्यादा revenue देता है</li>
                    <li>• <strong>Mobile responsive रखें:</strong> 60% traffic mobile से आता है</li>
                    <li>• <strong>Loading speed check करें:</strong> Ads site slow नहीं करना चाहिए</li>
                    <li>• <strong>User feedback monitor करें:</strong> Too many ads users को irritate करते हैं</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}