import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, CheckCircle, Clock, DollarSign } from 'lucide-react';

export default function UpdatedVideoMonetization() {
  const [selectedPlatform, setSelectedPlatform] = useState('connatix');

  // Updated list based on 2025 research - Adult-free, high CPM platforms
  const bestPlatforms = [
    {
      id: 'connatix',
      name: 'Connatix (JWP)',
      cpm: '$12-25',
      fillRate: '100%',
      payment: 'Net-30',
      minPayout: 'Custom',
      difficulty: 'Medium',
      badge: 'Premium Video',
      color: 'bg-purple-500',
      signupUrl: 'https://jwpconnatix.com',
      description: 'Premium video platform with 350+ publishers, 1B+ users monthly. Merged with JW Player for enhanced tech.',
      pros: ['Premium demand partners', 'AI-powered targeting', 'Custom video players', 'Real-time analytics'],
      approval: 'Contact for requirements',
      specialFeatures: 'Deep contextual targeting, video creation tools'
    },
    {
      id: 'ezoic',
      name: 'Ezoic',
      cpm: '$8-18',
      fillRate: '95%',
      payment: 'Net-30',
      minPayout: '$20',
      difficulty: 'Easy',
      badge: 'AI Powered',
      color: 'bg-blue-500',
      signupUrl: 'https://www.ezoic.com',
      description: 'AI-powered ad optimization with no minimum traffic requirements. Great for growing sites.',
      pros: ['No traffic minimum', 'AI optimization', 'Site speed tools', 'Easy approval'],
      approval: 'Instant approval available',
      specialFeatures: 'Machine learning ad optimization, site speed accelerator'
    },
    {
      id: 'media-net',
      name: 'Media.net',
      cpm: '$6-15',
      fillRate: '90%',
      payment: 'Net-30',
      minPayout: '$100',
      difficulty: 'Medium',
      badge: 'Yahoo/Bing',
      color: 'bg-orange-500',
      signupUrl: 'https://www.media.net',
      description: 'Yahoo/Bing powered contextual ads. Strong alternative to AdSense with competitive rates.',
      pros: ['Contextual targeting', 'Yahoo/Bing demand', 'Good for English content', 'Responsive ads'],
      approval: '1-2 weeks review process',
      specialFeatures: 'Native advertising, contextual relevance'
    },
    {
      id: 'propellerads',
      name: 'PropellerAds',
      cpm: '$4-12',
      fillRate: '98%',
      payment: 'Net-30',
      minPayout: '$5',
      difficulty: 'Easy',
      badge: 'Fast Approval',
      color: 'bg-green-500',
      signupUrl: 'https://propellerads.com/publishers',
      description: 'Quick approval with multiple ad formats. Good backup option with low minimum payout.',
      pros: ['24h approval', 'Multiple formats', 'Low minimum payout', 'Crypto payments'],
      approval: 'Usually within 24 hours',
      specialFeatures: 'Push notifications, native ads, pop formats'
    },
    {
      id: 'amazon-publisher',
      name: 'Amazon Publisher Services',
      cpm: '$7-16',
      fillRate: '85%',
      payment: 'Net-60',
      minPayout: '$10',
      difficulty: 'Medium',
      badge: 'E-commerce Focus',
      color: 'bg-yellow-500',
      signupUrl: 'https://aps.amazon.com',
      description: 'Amazon\'s advertising platform leveraging their massive e-commerce data for targeting.',
      pros: ['Amazon demand', 'Header bidding', 'Shopping intent data', 'Premium rates'],
      approval: 'Quality content review required',
      specialFeatures: 'Shopping data integration, programmatic buying'
    },
    {
      id: 'hilltopads',
      name: 'HilltopAds',
      cpm: '$3-10',
      fillRate: '95%',
      payment: 'Weekly/Net-7',
      minPayout: '$10',
      difficulty: 'Easy',
      badge: 'Weekly Payments',
      color: 'bg-indigo-500',
      signupUrl: 'https://hilltopads.com',
      description: 'Fast payments with weekly options. Good for international traffic.',
      pros: ['Weekly payments', 'Anti-adblock tech', 'Multiple formats', 'Global traffic'],
      approval: 'Quick approval process',
      specialFeatures: 'Anti-adblock technology, referral program'
    }
  ];

  const implementationSteps = [
    {
      step: 1,
      title: 'Start with Ezoic',
      description: 'Easy approval, no traffic requirements, AI optimization',
      action: 'Sign up at ezoic.com - usually approved within hours'
    },
    {
      step: 2,
      title: 'Apply to Connatix',
      description: 'Premium rates but requires quality content review',
      action: 'Contact jwpconnatix.com for requirements and approval process'
    },
    {
      step: 3,
      title: 'Add Media.net as backup',
      description: 'Yahoo/Bing powered ads for additional fill rate',
      action: 'Apply at media.net - takes 1-2 weeks for review'
    },
    {
      step: 4,
      title: 'Configure multiple networks',
      description: 'Use header bidding or rotation for maximum revenue',
      action: 'Implement multiple ad codes with fallback system'
    }
  ];

  const platformComparison = [
    { metric: 'Highest CPM', winner: 'Connatix', value: 'Up to $25' },
    { metric: 'Easiest Approval', winner: 'Ezoic', value: 'Instant' },
    { metric: 'Fastest Payment', winner: 'HilltopAds', value: 'Weekly' },
    { metric: 'Best Fill Rate', winner: 'Connatix', value: '100%' },
    { metric: 'Lowest Minimum', winner: 'PropellerAds', value: '$5' }
  ];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Updated Video Monetization Networks 2025</h1>
        <p className="text-gray-600 dark:text-gray-400">
          High-earning video monetization solutions with excellent approval rates and reliable payments
        </p>
      </div>



      {/* Platform Comparison */}
      <Card className="mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platformComparison.map((item, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <p className="font-medium text-sm">{item.metric}</p>
              <p className="text-lg font-bold text-blue-600">{item.winner}</p>
              <p className="text-sm text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {bestPlatforms.map((platform) => (
          <Card key={platform.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{platform.name}</h3>
                <Badge className={`${platform.color} text-white mt-1`}>
                  {platform.badge}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">{platform.cpm}</p>
                <p className="text-sm text-gray-500">CPM Range</p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {platform.description}
            </p>

            {/* Pros */}
            <div className="mb-4">
              <p className="font-medium text-sm mb-2">Key Benefits:</p>
              <div className="space-y-1">
                {platform.pros.map((pro, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>{pro}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="font-medium">Fill Rate</p>
                <p className="text-gray-600">{platform.fillRate}</p>
              </div>
              <div>
                <p className="font-medium">Payment</p>
                <p className="text-gray-600">{platform.payment}</p>
              </div>
              <div>
                <p className="font-medium">Min Payout</p>
                <p className="text-gray-600">{platform.minPayout}</p>
              </div>
              <div>
                <p className="font-medium">Approval</p>
                <p className="text-gray-600">{platform.approval}</p>
              </div>
            </div>

            {/* Special Features */}
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-4">
              <p className="text-sm font-medium mb-1">Special Features:</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {platform.specialFeatures}
              </p>
            </div>

            <Button 
              className="w-full" 
              onClick={() => window.open(platform.signupUrl, '_blank')}
            >
              Apply to {platform.name}
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Implementation Steps */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Recommended Implementation Order</h2>
        <div className="space-y-4">
          {implementationSteps.map((step) => (
            <div key={step.step} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{step.description}</p>
                <p className="text-sm font-medium text-blue-600">{step.action}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Revenue Estimate */}
      <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
          Expected Revenue with New Networks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">$15-30</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Per 1,000 Views</p>
            <p className="text-xs text-gray-500">With Connatix + Ezoic</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold text-blue-600">$750-1,500</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Per 50K Views/Month</p>
            <p className="text-xs text-gray-500">Multi-network setup</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold text-purple-600">95%+</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Approval Rate</p>
            <p className="text-xs text-gray-500">With recommended platforms</p>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold mb-3">Your Next Steps</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Start with Ezoic (easiest approval, no traffic minimum)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Apply to Connatix for premium video rates</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Add PropellerAds as backup for 100% fill rate</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Configure multiple networks in your video player</span>
          </div>
        </div>
      </Card>
    </div>
  );
}