import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Star, Zap } from 'lucide-react';
import StandaloneAdsterraManagement from '@/components/monetization/standalone-adsterra-management';

export default function AdsterraManagementPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-indigo-800 dark:text-indigo-200">
            <Database className="h-8 w-8" />
            <div>
              <div className="text-2xl">Adsterra Management Center</div>
              <div className="text-sm font-normal text-indigo-600 dark:text-indigo-300 mt-1">
                Independent Adsterra setup - Video monetization से अलग
              </div>
            </div>
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="bg-indigo-100 text-indigo-800 flex items-center gap-1">
              <Star className="h-3 w-3" />
              High CPM Network
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Fast Implementation
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              Website-Only Ads
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              Independent System
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                क्या है यह?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                यह video monetization से बिल्कुल अलग है। यह सिर्फ आपकी website पर Adsterra ads लगाने के लिए है।
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                कैसे काम करता है?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                दो methods हैं: (1) सिर्फ IDs paste करें, (2) Manual ads codes paste करें। पहला आसान है।
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                Revenue Potential
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Banner ads: $2-8 CPM, Native ads: $3-12 CPM, Video ads: $5-15 CPM के साथ high earning potential।
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Component */}
      <StandaloneAdsterraManagement />
    </div>
  );
}