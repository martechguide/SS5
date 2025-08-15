import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Globe, 
  Code, 
  Copy,
  CheckCircle,
  AlertTriangle,
  Monitor,
  Smartphone,
  FileCode,
  Play,
  Settings,
  Zap
} from 'lucide-react';

export default function WebsiteImplementationGuide() {
  const [copiedCode, setCopiedCode] = useState('');

  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(''), 2000);
    
    const toast = document.createElement('div');
    toast.textContent = `${type} code copied! Ready to paste on your website.`;
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; z-index: 10000; font-weight: 500;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const implementationSteps = [
    {
      step: 1,
      title: 'Get Your Ad Codes from Adsterra',
      description: 'First, collect the generated codes from your Adsterra dashboard',
      actions: [
        'Login to your Adsterra dashboard',
        'Go to "Ad Codes" section',
        'Copy the JavaScript code for each ad type',
        'Save codes in a text file for reference'
      ],
      time: '5 minutes',
      difficulty: 'Easy'
    },
    {
      step: 2,
      title: 'Access Your Website Files',
      description: 'Get access to your website\'s HTML files or content management system',
      actions: [
        'FTP/cPanel access for direct HTML editing',
        'WordPress admin for theme editing',
        'CMS dashboard for content editing',
        'Code editor for local development'
      ],
      time: '2 minutes',
      difficulty: 'Easy'
    },
    {
      step: 3,
      title: 'Place Ads in Strategic Locations',
      description: 'Insert ad codes in high-visibility, high-performance locations',
      actions: [
        'Header area for maximum visibility',
        'After first paragraph for content engagement',
        'Sidebar for persistent display',
        'Footer for exit intent capture'
      ],
      time: '15-30 minutes',
      difficulty: 'Medium'
    },
    {
      step: 4,
      title: 'Test and Optimize',
      description: 'Verify ads are displaying correctly and optimize for performance',
      actions: [
        'Test on desktop and mobile devices',
        'Check ad loading speed',
        'Monitor user experience impact',
        'A/B test different positions'
      ],
      time: '30-60 minutes',
      difficulty: 'Medium'
    }
  ];

  const placementExamples = {
    header: {
      name: 'Header Banner Placement',
      location: 'Top of every page - highest visibility',
      code: `<!-- Place this in your header.php or main template header -->
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
    <!-- Your existing head content -->
</head>
<body>
    <!-- HEADER AD PLACEMENT START -->
    <div style="text-align: center; margin: 10px 0; padding: 10px; background: #f8f9fa;">
        <!-- PASTE YOUR ADSTERRA BANNER CODE HERE -->
        <script type="text/javascript">
            atOptions = {
                'key' : 'YOUR_PUBLISHER_KEY_HERE',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="//www.topcpmnetwork.com/YOUR_ZONE_ID/invoke.js"></scr' + 'ipt>');
        </script>
    </div>
    <!-- HEADER AD PLACEMENT END -->
    
    <!-- Your website navigation and content starts here -->
    <nav>Your Navigation</nav>`,
      revenue: 'High - $5-15 CPM',
      performance: 'Excellent visibility, high CTR'
    },
    
    content: {
      name: 'In-Content Ad Placement',
      location: 'Between paragraphs - natural integration',
      code: `<!-- Place this in your blog posts or article content -->
<div class="article-content">
    <p>Your first paragraph of content goes here...</p>
    
    <!-- IN-CONTENT AD PLACEMENT START -->
    <div style="margin: 20px 0; text-align: center; padding: 15px; border: 1px solid #e0e0e0; background: #fafafa;">
        <div style="font-size: 12px; color: #666; margin-bottom: 10px;">Advertisement</div>
        <!-- PASTE YOUR ADSTERRA NATIVE AD CODE HERE -->
        <script type="text/javascript">
            atOptions = {
                'key' : 'YOUR_PUBLISHER_KEY_HERE',
                'format' : 'native',
                'height' : 300,
                'width' : 350,
                'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="//www.nativecontentnetwork.com/YOUR_ZONE_ID/invoke.js"></scr' + 'ipt>');
        </script>
    </div>
    <!-- IN-CONTENT AD PLACEMENT END -->
    
    <p>Your content continues here...</p>
</div>`,
      revenue: 'Very High - $8-20 CPM',
      performance: 'Natural integration, high engagement'
    },

    sidebar: {
      name: 'Sidebar Ad Placement',
      location: 'Side column - persistent display',
      code: `<!-- Place this in your sidebar.php or sidebar template -->
<div class="sidebar">
    <!-- Your existing sidebar content -->
    <div class="widget">
        <h3>Recent Posts</h3>
        <!-- Your recent posts -->
    </div>
    
    <!-- SIDEBAR AD PLACEMENT START -->
    <div class="widget ad-widget" style="margin: 20px 0; padding: 15px; text-align: center; border: 1px solid #ddd; border-radius: 5px;">
        <div style="font-size: 11px; color: #888; margin-bottom: 8px;">Sponsored</div>
        <!-- PASTE YOUR ADSTERRA BANNER CODE HERE -->
        <script type="text/javascript">
            atOptions = {
                'key' : 'YOUR_PUBLISHER_KEY_HERE',
                'format' : 'iframe',
                'height' : 250,
                'width' : 300,
                'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="//www.displaycontentnetwork.com/YOUR_ZONE_ID/invoke.js"></scr' + 'ipt>');
        </script>
    </div>
    <!-- SIDEBAR AD PLACEMENT END -->
    
    <!-- Your other sidebar widgets -->
</div>`,
      revenue: 'Medium - $3-8 CPM',
      performance: 'Consistent display, moderate CTR'
    },

    footer: {
      name: 'Footer Ad Placement',
      location: 'Bottom of page - exit intent',
      code: `<!-- Place this in your footer.php or main template footer -->
    <!-- Your main content ends here -->
    </main>
    
    <!-- FOOTER AD PLACEMENT START -->
    <div style="margin: 30px 0; padding: 20px; text-align: center; background: #f5f5f5; border-top: 2px solid #e0e0e0;">
        <div style="font-size: 12px; color: #666; margin-bottom: 15px;">Advertisement</div>
        <!-- PASTE YOUR ADSTERRA BANNER CODE HERE -->
        <script type="text/javascript">
            atOptions = {
                'key' : 'YOUR_PUBLISHER_KEY_HERE',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="//www.topcpmnetwork.com/YOUR_ZONE_ID/invoke.js"></scr' + 'ipt>');
        </script>
    </div>
    <!-- FOOTER AD PLACEMENT END -->
    
    <footer>
        <!-- Your footer content -->
    </footer>
</body>
</html>`,
      revenue: 'Medium - $2-6 CPM',
      performance: 'Good for exit intent, moderate performance'
    }
  };

  const platformSpecific = {
    wordpress: {
      name: 'WordPress Implementation',
      steps: [
        'Go to Appearance → Theme Editor',
        'Edit header.php, single.php, sidebar.php files',
        'Or use Widgets → Custom HTML widget',
        'Or install Ad Inserter plugin for easy management'
      ],
      code: `<!-- WordPress Widget or Custom HTML -->
<div class="custom-ad-widget">
    <!-- Paste your Adsterra code here -->
    <script type="text/javascript">
        // Your Adsterra code
    </script>
</div>`
    },
    
    html: {
      name: 'Static HTML Website',
      steps: [
        'Open your HTML files in text editor',
        'Find the appropriate location (header, content, footer)',
        'Paste the ad code directly',
        'Save and upload to your server'
      ],
      code: `<!-- Direct HTML Implementation -->
<!DOCTYPE html>
<html>
<head>
    <!-- Your head content -->
</head>
<body>
    <!-- Paste ad codes in appropriate locations -->
</body>
</html>`
    },
    
    react: {
      name: 'React/Next.js Website',
      steps: [
        'Create an AdComponent.jsx file',
        'Use useEffect hook to load ad scripts',
        'Import and place component where needed',
        'Handle script loading and cleanup'
      ],
      code: `// React Ad Component
import { useEffect } from 'react';

const AdsterraAd = ({ publisherKey, zoneId, width = 728, height = 90 }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = \`
      atOptions = {
        'key': '\${publisherKey}',
        'format': 'iframe',
        'height': \${height},
        'width': \${width},
        'params': {}
      };
      document.write('<scr' + 'ipt type="text/javascript" src="//www.topcpmnetwork.com/\${zoneId}/invoke.js"></scr' + 'ipt>');
    \`;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="adsterra-ad" style={{ textAlign: 'center', margin: '20px 0' }} />;
};

export default AdsterraAd;`
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-green-500" />
            Complete Website Implementation Guide
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Step-by-step instructions to place Adsterra ads on your website and start earning
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="steps" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="steps">Implementation Steps</TabsTrigger>
          <TabsTrigger value="placements">Ad Placements</TabsTrigger>
          <TabsTrigger value="platforms">Platform Specific</TabsTrigger>
          <TabsTrigger value="testing">Testing & Launch</TabsTrigger>
        </TabsList>

        {/* Implementation Steps */}
        <TabsContent value="steps" className="space-y-6">
          <div className="grid gap-6">
            {implementationSteps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline">{step.time}</Badge>
                          <Badge className={`${
                            step.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            step.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {step.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{step.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Action Items:</h4>
                      <ul className="space-y-2">
                        {step.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                        Pro Tips:
                      </h5>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        {step.step === 1 && "Keep your ad codes organized in a spreadsheet with zone IDs and descriptions"}
                        {step.step === 2 && "Always backup your website files before making changes"}
                        {step.step === 3 && "Start with one ad placement and gradually add more based on performance"}
                        {step.step === 4 && "Use Google PageSpeed Insights to monitor loading impact"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Ad Placements */}
        <TabsContent value="placements" className="space-y-6">
          <div className="grid gap-6">
            {Object.entries(placementExamples).map(([key, placement]) => (
              <Card key={key}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      {placement.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800">{placement.revenue}</Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{placement.location}</p>
                  <p className="text-sm text-green-600">{placement.performance}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Implementation Code:</h5>
                      <Button
                        onClick={() => copyCode(placement.code, placement.name)}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {copiedCode === placement.name ? 'Copied!' : 'Copy Code'}
                      </Button>
                    </div>
                    <Textarea
                      value={placement.code}
                      readOnly
                      className="font-mono text-xs"
                      rows={12}
                    />
                  </div>
                  
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> Replace "YOUR_PUBLISHER_KEY_HERE" and "YOUR_ZONE_ID" with your actual Adsterra codes from the dashboard.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Platform Specific */}
        <TabsContent value="platforms" className="space-y-6">
          <div className="grid gap-6">
            {Object.entries(platformSpecific).map(([key, platform]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {key === 'wordpress' && <FileCode className="h-5 w-5 text-blue-500" />}
                    {key === 'html' && <Monitor className="h-5 w-5 text-green-500" />}
                    {key === 'react' && <Settings className="h-5 w-5 text-purple-500" />}
                    {platform.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">Implementation Steps:</h5>
                    <ol className="space-y-2">
                      {platform.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Code Example:</h5>
                      <Button
                        onClick={() => copyCode(platform.code, platform.name)}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy {key} Code
                      </Button>
                    </div>
                    <Textarea
                      value={platform.code}
                      readOnly
                      className="font-mono text-xs"
                      rows={8}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Testing & Launch */}
        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Testing and Launch Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-3">✓ Pre-Launch Checklist</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Replace placeholder codes with real Adsterra codes
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Test on desktop and mobile devices
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Verify ads load without breaking page layout
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Check page loading speed impact
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Ensure ads comply with your site's design
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-3">📊 Post-Launch Monitoring</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      Monitor Adsterra dashboard daily for earnings
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      Track website analytics for user behavior changes
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      A/B test different ad positions for optimization
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      Gradually add more ad formats based on performance
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      Optimize based on CPM and user engagement metrics
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">⚠️ Common Issues and Solutions</h5>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h6 className="font-medium mb-2">Problem: Ads not showing</h6>
                    <ul className="space-y-1 text-yellow-700 dark:text-yellow-300">
                      <li>• Check if Publisher ID and Zone ID are correct</li>
                      <li>• Verify ad code syntax is complete</li>
                      <li>• Ensure website is approved by Adsterra</li>
                      <li>• Clear browser cache and test again</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium mb-2">Problem: Page loading slowly</h6>
                    <ul className="space-y-1 text-yellow-700 dark:text-yellow-300">
                      <li>• Load ad scripts asynchronously</li>
                      <li>• Reduce number of ad units initially</li>
                      <li>• Optimize images and other content first</li>
                      <li>• Use lazy loading for below-fold ads</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-3">🎯 Revenue Optimization Tips</h5>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h6 className="font-medium mb-2">High-Performance Positions:</h6>
                    <ul className="space-y-1 text-purple-700 dark:text-purple-300">
                      <li>• Above the fold (header area)</li>
                      <li>• After first paragraph</li>
                      <li>• Before comments section</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium mb-2">Best Ad Formats:</h6>
                    <ul className="space-y-1 text-purple-700 dark:text-purple-300">
                      <li>• Native ads (highest CPM)</li>
                      <li>• Banner 728x90 (good visibility)</li>
                      <li>• Mobile 320x50 (mobile traffic)</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium mb-2">Timing Strategy:</h6>
                    <ul className="space-y-1 text-purple-700 dark:text-purple-300">
                      <li>• Start with 1-2 ad units</li>
                      <li>• Add more after 1 week</li>
                      <li>• Monitor earnings vs. user experience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}