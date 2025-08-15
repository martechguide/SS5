import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SmartPlacementEngine from './smart-placement-engine';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  Users, 
  PlayCircle,
  Eye,
  MousePointer,
  Activity,
  BarChart3,
  Zap,
  Settings
} from 'lucide-react';

interface VideoAnalytics {
  id: string;
  title: string;
  duration: number;
  category: string;
  avgWatchTime: number;
  dropOffPoints: number[];
  engagementScore: number;
  clickThroughRate: number;
  viewerDemographics: {
    age: string;
    location: string;
    device: string;
  };
}

interface AdPlacementSuggestion {
  timestamp: number;
  adType: string;
  confidence: number;
  reason: string;
  expectedCPM: number;
  estimatedRevenue: number;
}

interface ContextualSettings {
  enableAI: boolean;
  optimizeForRevenue: boolean;
  considerViewerExperience: boolean;
  adaptToContent: boolean;
  realTimeAdjustment: boolean;
  minimumConfidence: number;
}

function ContextualAdIntelligence() {
  const [settings, setSettings] = useState<ContextualSettings>({
    enableAI: true,
    optimizeForRevenue: true,
    considerViewerExperience: true,
    adaptToContent: true,
    realTimeAdjustment: true,
    minimumConfidence: 75
  });

  const [currentVideo, setCurrentVideo] = useState<VideoAnalytics>({
    id: 'demo-video-001',
    title: 'Advanced React Tutorial: Building Interactive Components',
    duration: 1200, // 20 minutes
    category: 'Technology',
    avgWatchTime: 820, // 13:40
    dropOffPoints: [120, 480, 900],
    engagementScore: 85,
    clickThroughRate: 3.2,
    viewerDemographics: {
      age: '25-34',
      location: 'North America',
      device: 'Desktop'
    }
  });

  const [adSuggestions, setAdSuggestions] = useState<AdPlacementSuggestion[]>([
    {
      timestamp: 180,
      adType: 'Social Bar',
      confidence: 89,
      reason: 'High engagement period, viewers likely focused',
      expectedCPM: 8.50,
      estimatedRevenue: 0.42
    },
    {
      timestamp: 600,
      adType: 'Native Banner',
      confidence: 76,
      reason: 'Mid-content natural break point detected',
      expectedCPM: 12.30,
      estimatedRevenue: 0.75
    },
    {
      timestamp: 1080,
      adType: 'Popunder',
      confidence: 82,
      reason: 'Near end, viewers committed to finishing',
      expectedCPM: 15.20,
      estimatedRevenue: 1.12
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalOptimizations: 247,
    revenueIncrease: 34.2,
    engagementMaintained: 91.5,
    averageConfidence: 83.7
  });

  const generateAISuggestions = () => {
    // Simulate AI analysis
    const newSuggestions = [
      {
        timestamp: Math.floor(Math.random() * currentVideo.duration),
        adType: ['Social Bar', 'Native Banner', 'Popunder'][Math.floor(Math.random() * 3)],
        confidence: Math.floor(Math.random() * 30) + 70,
        reason: [
          'Detected viewer engagement spike',
          'Content transition point identified',
          'Optimal attention window detected',
          'Low drop-off probability zone'
        ][Math.floor(Math.random() * 4)],
        expectedCPM: Math.floor(Math.random() * 10) + 5,
        estimatedRevenue: Math.random() * 1.5 + 0.3
      }
    ];
    
    setAdSuggestions(prev => [...prev.slice(-2), ...newSuggestions]);
    setAnalytics(prev => ({
      ...prev,
      totalOptimizations: prev.totalOptimizations + 1
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Contextual Ad Placement Intelligence
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            AI-powered optimization for maximum revenue and viewer experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <Activity className="h-3 w-3 mr-1" />
            AI Active
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            +{analytics.revenueIncrease.toFixed(1)}% Revenue
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="engine" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="engine">Smart Engine</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="analytics">Video Analysis</TabsTrigger>
          <TabsTrigger value="settings">Intelligence Settings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Smart Placement Engine Tab */}
        <TabsContent value="engine" className="space-y-6">
          <SmartPlacementEngine />
        </TabsContent>

        {/* AI Suggestions Tab */}
        <TabsContent value="suggestions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Video Context */}
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-blue-600" />
                Current Video Analysis
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                    {currentVideo.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <span>Duration: {formatTime(currentVideo.duration)}</span>
                    <span>Category: {currentVideo.category}</span>
                    <span>Avg. Watch Time: {formatTime(currentVideo.avgWatchTime)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{currentVideo.engagementScore}</div>
                    <div className="text-xs text-gray-600">Engagement Score</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{currentVideo.clickThroughRate}%</div>
                    <div className="text-xs text-gray-600">Click Through Rate</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{adSuggestions.length}</div>
                    <div className="text-xs text-gray-600">AI Suggestions</div>
                  </div>
                </div>

                {/* Drop-off Points Visualization */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Viewer Drop-off Points</h4>
                  <div className="h-2 bg-gray-200 rounded-full relative">
                    {currentVideo.dropOffPoints.map((point, index) => (
                      <div
                        key={index}
                        className="absolute h-3 w-3 bg-red-500 rounded-full -top-0.5"
                        style={{ left: `${(point / currentVideo.duration) * 100}%` }}
                        title={`Drop-off at ${formatTime(point)}`}
                      />
                    ))}
                    <div 
                      className="absolute h-2 bg-green-500 rounded-full"
                      style={{ width: `${(currentVideo.avgWatchTime / currentVideo.duration) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0:00</span>
                    <span>{formatTime(currentVideo.duration)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Controls */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                AI Controls
              </h3>
              
              <div className="space-y-4">
                <Button 
                  onClick={generateAISuggestions}
                  className="w-full"
                  disabled={!settings.enableAI}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Generate New Suggestions
                </Button>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Real-time Optimization</Label>
                    <Switch
                      checked={settings.realTimeAdjustment}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        realTimeAdjustment: checked
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Revenue Priority</Label>
                    <Switch
                      checked={settings.optimizeForRevenue}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        optimizeForRevenue: checked
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Viewer Experience</Label>
                    <Switch
                      checked={settings.considerViewerExperience}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        considerViewerExperience: checked
                      }))}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Confidence Threshold: {settings.minimumConfidence}%</div>
                    <div>Active Optimizations: {analytics.totalOptimizations}</div>
                    <div>Avg. Confidence: {analytics.averageConfidence}%</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Suggestions List */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              AI-Generated Ad Placement Suggestions
            </h3>
            
            <div className="space-y-4">
              {adSuggestions.map((suggestion, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-100 text-purple-800">
                        {formatTime(suggestion.timestamp)}
                      </Badge>
                      <span className="font-medium">{suggestion.adType}</span>
                      <Badge 
                        className={`${
                          suggestion.confidence >= 85 
                            ? 'bg-green-100 text-green-800'
                            : suggestion.confidence >= 75
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {suggestion.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        ${suggestion.expectedCPM.toFixed(2)} CPM
                      </div>
                      <div className="text-sm text-gray-500">
                        ~${suggestion.estimatedRevenue.toFixed(2)} revenue
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {suggestion.reason}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Video Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Eye className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{currentVideo.engagementScore}%</p>
              <p className="text-sm text-gray-600">Engagement Rate</p>
            </Card>
            <Card className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{formatTime(currentVideo.avgWatchTime)}</p>
              <p className="text-sm text-gray-600">Avg. Watch Time</p>
            </Card>
            <Card className="p-6 text-center">
              <MousePointer className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">{currentVideo.clickThroughRate}%</p>
              <p className="text-sm text-gray-600">Click Through Rate</p>
            </Card>
            <Card className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <p className="text-2xl font-bold">{currentVideo.viewerDemographics.age}</p>
              <p className="text-sm text-gray-600">Primary Age Group</p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Content Analysis Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Optimal Ad Placement Windows</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-green-50 rounded">
                    <span>2:30 - 3:45</span>
                    <Badge className="bg-green-100 text-green-800">High Engagement</Badge>
                  </div>
                  <div className="flex justify-between p-2 bg-blue-50 rounded">
                    <span>8:20 - 9:10</span>
                    <Badge className="bg-blue-100 text-blue-800">Content Break</Badge>
                  </div>
                  <div className="flex justify-between p-2 bg-purple-50 rounded">
                    <span>15:30 - 16:45</span>
                    <Badge className="bg-purple-100 text-purple-800">Pre-conclusion</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Viewer Behavior Patterns</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Peak attention span:</span>
                    <span className="font-medium">3-7 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Typical drop-off:</span>
                    <span className="font-medium">12-15 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best ad response:</span>
                    <span className="font-medium">Mid-content</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Device preference:</span>
                    <span className="font-medium">{currentVideo.viewerDemographics.device}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              AI Intelligence Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Enable AI Optimization</Label>
                    <p className="text-sm text-gray-600">Use machine learning for ad placement</p>
                  </div>
                  <Switch
                    checked={settings.enableAI}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      enableAI: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Revenue Optimization</Label>
                    <p className="text-sm text-gray-600">Prioritize maximum CPM and earnings</p>
                  </div>
                  <Switch
                    checked={settings.optimizeForRevenue}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      optimizeForRevenue: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Viewer Experience Focus</Label>
                    <p className="text-sm text-gray-600">Balance ads with user engagement</p>
                  </div>
                  <Switch
                    checked={settings.considerViewerExperience}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      considerViewerExperience: checked
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Content Adaptation</Label>
                    <p className="text-sm text-gray-600">Adjust ads based on video content</p>
                  </div>
                  <Switch
                    checked={settings.adaptToContent}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      adaptToContent: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Real-time Adjustment</Label>
                    <p className="text-sm text-gray-600">Dynamic optimization during playback</p>
                  </div>
                  <Switch
                    checked={settings.realTimeAdjustment}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      realTimeAdjustment: checked
                    }))}
                  />
                </div>

                <div>
                  <Label className="font-medium">Minimum Confidence Threshold</Label>
                  <p className="text-sm text-gray-600 mb-2">Only show suggestions above this confidence level</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="50"
                      max="95"
                      value={settings.minimumConfidence}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        minimumConfidence: parseInt(e.target.value)
                      }))}
                      className="flex-1"
                    />
                    <span className="font-medium w-12">{settings.minimumConfidence}%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-3xl font-bold text-green-600">+{analytics.revenueIncrease.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Revenue Increase</p>
            </Card>
            <Card className="p-6 text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-3xl font-bold text-blue-600">{analytics.totalOptimizations}</p>
              <p className="text-sm text-gray-600">Total Optimizations</p>
            </Card>
            <Card className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <p className="text-3xl font-bold text-purple-600">{analytics.averageConfidence.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Average Confidence</p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Best Performing Ad Types</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span>Native Banner</span>
                      <Badge className="bg-green-100 text-green-800">$12.30 avg CPM</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span>Popunder</span>
                      <Badge className="bg-blue-100 text-blue-800">$8.75 avg CPM</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                      <span>Social Bar</span>
                      <Badge className="bg-purple-100 text-purple-800">$6.40 avg CPM</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Optimization Impact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Engagement maintained:</span>
                      <span className="font-medium text-green-600">{analytics.engagementMaintained}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Click-through improved:</span>
                      <span className="font-medium text-blue-600">+23.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Viewer satisfaction:</span>
                      <span className="font-medium text-purple-600">4.2/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue per view:</span>
                      <span className="font-medium text-green-600">+${analytics.revenueIncrease.toFixed(1)}%</span>
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

export default ContextualAdIntelligence;