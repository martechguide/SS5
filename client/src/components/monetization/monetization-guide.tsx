import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlayCircle, 
  Settings, 
  Network, 
  Brain, 
  Rocket, 
  DollarSign,
  Monitor,
  Users,
  Target,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  SkipForward
} from 'lucide-react';

export default function MonetizationGuide() {
  const [activeDemo, setActiveDemo] = useState('pre-roll');

  const sections = [
    {
      id: 'video-ad-setup',
      title: 'Video Ad Placement System',
      icon: <PlayCircle className="h-6 w-6" />,
      description: 'Configure where and when ads appear in your videos',
      details: [
        'Pre-Roll Ads: Play before video starts (highest revenue)',
        'Mid-Roll Ads: Play during video breaks (good engagement)',
        'Banner Overlay: Show over video content (non-intrusive)',
        'Post-Roll Display: Show after video ends (completion bonus)'
      ],
      howToUse: [
        'Go to "Video Ad Setup" tab',
        'Choose ad type (Pre-Roll, Mid-Roll, etc.)',
        'Select ad network (AdThrive, Google AdSense, etc.)',
        'Set timing (when ad should appear)',
        'Copy the generated ad code',
        'Paste code into your video player'
      ]
    },
    {
      id: 'network-management',
      title: 'Network Management',
      icon: <Network className="h-6 w-6" />,
      description: 'Manage multiple ad networks for maximum revenue',
      details: [
        '20 different ad networks available',
        'Compare CPM rates ($3-40 per 1000 views)',
        'Track approval difficulty and requirements',
        'Generate custom ad codes for each network',
        'Monitor performance and earnings'
      ],
      howToUse: [
        'Go to "Network Management" tab',
        'See all 20 available networks',
        'Click "Apply Now" for desired networks',
        'Complete their approval process',
        'Return and click "Configure"',
        'Enter your Publisher ID and Zone ID',
        'System generates ad codes automatically'
      ]
    },
    {
      id: 'ai-intelligence',
      title: 'AI Intelligence',
      icon: <Brain className="h-6 w-6" />,
      description: 'Smart optimization for maximum revenue',
      details: [
        'Analyzes video content automatically',
        'Suggests best ad placement timing',
        'Optimizes for viewer experience',
        'Increases click-through rates',
        'Real-time performance tracking'
      ],
      howToUse: [
        'Go to "AI Intelligence" tab',
        'System analyzes your video content',
        'View suggested ad placements',
        'See performance predictions',
        'Click "Re-optimize" to update',
        'AI learns from viewer behavior'
      ]
    },
    {
      id: 'live-demo',
      title: 'Live Demo & Implementation',
      icon: <Monitor className="h-6 w-6" />,
      description: 'Test and preview your ad setup',
      details: [
        'Preview how ads will look on videos',
        'Test different ad networks',
        'See revenue calculations',
        'Experience viewer perspective',
        'Validate ad placement timing'
      ],
      howToUse: [
        'Go to "Live Demo" tab',
        'Select a sample video',
        'Choose ad networks to test',
        'Watch how ads appear',
        'See estimated earnings',
        'Adjust settings if needed'
      ]
    }
  ];

  const stepByStepGuide = [
    {
      step: 1,
      title: 'Choose Your Ad Networks',
      description: 'Start with easy approval networks',
      action: 'Apply to Google AdSense, ExoClick, and PropellerAds first',
      time: '1-7 days'
    },
    {
      step: 2,
      title: 'Configure Networks',
      description: 'Enter your publisher credentials',
      action: 'Add Publisher ID and Zone ID in Network Management',
      time: '10 minutes'
    },
    {
      step: 3,
      title: 'Set Up Ad Placements',
      description: 'Configure when ads appear',
      action: 'Use Video Ad Setup to create placement codes',
      time: '15 minutes'
    },
    {
      step: 4,
      title: 'Enable AI Optimization',
      description: 'Let AI optimize for best performance',
      action: 'Activate AI Intelligence for smart placements',
      time: '2 minutes'
    },
    {
      step: 5,
      title: 'Test with Live Demo',
      description: 'Preview your setup',
      action: 'Use Live Demo to test viewer experience',
      time: '5 minutes'
    },
    {
      step: 6,
      title: 'Implement on Videos',
      description: 'Add codes to your video player',
      action: 'Copy generated codes to your video platform',
      time: '30 minutes'
    }
  ];

  const revenueExamples = [
    {
      views: '1,000',
      networks: '3 networks',
      revenue: '$25-50',
      description: 'Starting level with basic networks'
    },
    {
      views: '10,000',
      networks: '5 networks',
      revenue: '$250-500',
      description: 'Growing channel with optimized setup'
    },
    {
      views: '100,000',
      networks: '10 networks',
      revenue: '$2,500-5,000',
      description: 'Established channel with premium networks'
    },
    {
      views: '1,000,000',
      networks: '15+ networks',
      revenue: '$25,000-50,000',
      description: 'Major channel with full optimization'
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Video Monetization System Guide</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete guide to understand and implement video ads for maximum revenue
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                What is Video Monetization System?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                The Video Monetization System helps you earn money from your videos by showing ads. 
                It connects your videos to 20 different advertising companies and automatically 
                optimizes when and where ads appear to maximize your earnings.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">How You Earn Money</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Viewers watch ads before/during your videos</li>
                    <li>• You get paid for every 1,000 ad views</li>
                    <li>• More ad networks = higher earnings</li>
                    <li>• AI optimizes for best performance</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">System Benefits</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• 20 ad networks for maximum coverage</li>
                    <li>• Automatic ad code generation</li>
                    <li>• AI-powered optimization</li>
                    <li>• Real-time revenue tracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Revenue Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {revenueExamples.map((example, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{example.revenue}</div>
                    <div className="text-sm font-medium">{example.views} views</div>
                    <div className="text-xs text-gray-600 mt-1">{example.networks}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          {sections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">What it does:</h4>
                  <ul className="space-y-1">
                    {section.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">How to use it:</h4>
                  <ol className="space-y-1">
                    {section.howToUse.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complete Setup Process</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Follow these steps to start earning from your videos
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stepByStepGuide.map((step, index) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{step.description}</p>
                      <p className="text-sm font-medium text-blue-600">{step.action}</p>
                      <Badge variant="outline" className="text-xs mt-1">{step.time}</Badge>
                    </div>
                    {index < stepByStepGuide.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-400 mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h5 className="font-medium text-yellow-800 dark:text-yellow-200">Start Small</h5>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Begin with 2-3 easy approval networks, then add premium networks as your traffic grows.
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-200">Test Everything</h5>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Use Live Demo to see how ads look before implementing on your actual videos.
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h5 className="font-medium text-blue-800 dark:text-blue-200">Monitor Performance</h5>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Check AI Intelligence regularly to optimize ad placements for better earnings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Revenue Calculation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Network Tiers & Earnings</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                      <span className="text-sm font-medium">Premium (AdThrive, Taboola)</span>
                      <span className="text-sm font-bold text-purple-600">$25-40 CPM</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <span className="text-sm font-medium">High-Performance</span>
                      <span className="text-sm font-bold text-blue-600">$12-25 CPM</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                      <span className="text-sm font-medium">Reliable Networks</span>
                      <span className="text-sm font-bold text-green-600">$8-18 CPM</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm font-medium">Universal Access</span>
                      <span className="text-sm font-bold text-gray-600">$3-12 CPM</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Monthly Earnings Examples</h4>
                  <div className="space-y-3">
                    {revenueExamples.map((example, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{example.views} views/month</span>
                          <span className="font-bold text-green-600">{example.revenue}</span>
                        </div>
                        <div className="text-xs text-gray-600">{example.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
                  Formula: (Views ÷ 1,000) × Average CPM = Earnings
                </h5>
                <p className="text-sm text-green-700 dark:text-green-300">
                  With 20 networks optimized, your average CPM can reach $30-60 per 1,000 views
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}