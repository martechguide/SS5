import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, Monitor, Smartphone } from 'lucide-react';

export default function PlatformCompatibility() {
  const supportedPlatforms = [
    {
      name: 'YouTube',
      compatibility: '100%',
      adTypes: ['Pre-Roll', 'Mid-Roll', 'Banner', 'Post-Roll'],
      color: 'bg-red-100 text-red-800',
      notes: 'सभी ad types perfect काम करते हैं'
    },
    {
      name: 'Facebook Video',
      compatibility: '100%',
      adTypes: ['Pre-Roll', 'Banner', 'Post-Roll'],
      color: 'bg-blue-100 text-blue-800',
      notes: 'Facebook embedded videos पर full support'
    },
    {
      name: 'Vimeo',
      compatibility: '100%',
      adTypes: ['Pre-Roll', 'Mid-Roll', 'Banner', 'Post-Roll'],
      color: 'bg-green-100 text-green-800',
      notes: 'Professional videos के लिए excellent'
    },
    {
      name: 'Instagram (IGTV)',
      compatibility: '95%',
      adTypes: ['Pre-Roll', 'Banner', 'Post-Roll'],
      color: 'bg-pink-100 text-pink-800',
      notes: 'Instagram embedded videos पर काम करता है'
    },
    {
      name: 'TikTok',
      compatibility: '90%',
      adTypes: ['Pre-Roll', 'Banner', 'Post-Roll'],
      color: 'bg-purple-100 text-purple-800',
      notes: 'TikTok embedded videos के साथ compatible'
    },
    {
      name: 'Dailymotion',
      compatibility: '100%',
      adTypes: ['Pre-Roll', 'Mid-Roll', 'Banner', 'Post-Roll'],
      color: 'bg-orange-100 text-orange-800',
      notes: 'Full compatibility with all ad types'
    },
    {
      name: 'HTML5 Videos',
      compatibility: '100%',
      adTypes: ['Pre-Roll', 'Mid-Roll', 'Banner', 'Post-Roll'],
      color: 'bg-gray-100 text-gray-800',
      notes: 'Self-hosted videos पर perfect control'
    },
    {
      name: 'WordPress Videos',
      compatibility: '100%',
      adTypes: ['Pre-Roll', 'Mid-Roll', 'Banner', 'Post-Roll'],
      color: 'bg-indigo-100 text-indigo-800',
      notes: 'WordPress sites पर easy integration'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Platform Compatibility (प्लेटफॉर्म सपोर्ट)
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            यह ad system सभी major video platforms पर काम करता है
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportedPlatforms.map((platform, index) => (
              <Card key={index} className="p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={platform.color}>
                      {platform.name}
                    </Badge>
                    <span className="text-sm font-medium text-green-600">
                      {platform.compatibility}
                    </span>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Supported Ad Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {platform.adTypes.map((adType, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {adType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-2">
                    {platform.notes}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Universal Ad Implementation (यूनिवर्सल इंप्लीमेंटेशन)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
              ✓ एक ही Ad Code सभी Platforms पर काम करता है
            </h5>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• YouTube video पर लगाया गया ad code Facebook video पर भी काम करेगा</li>
              <li>• Same ad code को सभी platforms पर reuse कर सकते हैं</li>
              <li>• Platform के according automatic adjustment होता है</li>
              <li>• Mobile और Desktop दोनों पर responsive ads</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              Real Example (असली उदाहरण)
            </h5>
            <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>1. आपने YouTube video के लिए Pre-Roll ad code generate किया</li>
              <li>2. Same code को Facebook video में भी paste कर सकते हैं</li>
              <li>3. Vimeo, Instagram, TikTok सभी में same code काम करेगा</li>
              <li>4. सिर्फ video URL change करना है, ad code same रहेगा</li>
            </ol>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
              Device Compatibility (डिवाइस सपोर्ट)
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="text-center">
                <Monitor className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="font-medium">Desktop</p>
                <p className="text-xs text-gray-600">100% Compatible</p>
              </div>
              <div className="text-center">
                <Smartphone className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="font-medium">Mobile</p>
                <p className="text-xs text-gray-600">100% Compatible</p>
              </div>
              <div className="text-center">
                <Monitor className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="font-medium">Tablet</p>
                <p className="text-xs text-gray-600">100% Compatible</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}