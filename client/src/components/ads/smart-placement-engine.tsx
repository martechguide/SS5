import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Activity, 
  Zap,
  PlayCircle,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface VideoContext {
  id: string;
  title: string;
  category: string;
  currentTime: number;
  duration: number;
  viewerEngagement: number;
  contentBreaks: number[];
  topic: string;
  difficulty: string;
}

interface AdPlacement {
  timestamp: number;
  type: 'social-bar' | 'native' | 'popunder';
  confidence: number;
  reason: string;
  expectedRevenue: number;
  active: boolean;
}

interface PlacementEngine {
  videoContext: VideoContext;
  placements: AdPlacement[];
  totalRevenue: number;
  optimizationScore: number;
}

export default function SmartPlacementEngine() {
  const [engine, setEngine] = useState<PlacementEngine>({
    videoContext: {
      id: 'react-tutorial-01',
      title: 'Advanced React Hooks Tutorial',
      category: 'Programming',
      currentTime: 0,
      duration: 1800, // 30 minutes
      viewerEngagement: 82,
      contentBreaks: [300, 600, 1200, 1500],
      topic: 'React Development',
      difficulty: 'Advanced'
    },
    placements: [],
    totalRevenue: 0,
    optimizationScore: 0
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    viewerRetention: 85,
    avgEngagement: 78,
    clickThroughRate: 4.2,
    revenuePerView: 0.85
  });

  // Smart placement algorithm
  const generateSmartPlacements = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const smartPlacements: AdPlacement[] = [];
      const { videoContext } = engine;
      
      // Analyze content breaks for optimal placement
      videoContext.contentBreaks.forEach((breakTime, index) => {
        const confidence = calculatePlacementConfidence(breakTime, videoContext);
        
        if (confidence > 70) {
          const adType = selectOptimalAdType(breakTime, videoContext, index);
          const expectedRevenue = calculateExpectedRevenue(adType, confidence);
          
          smartPlacements.push({
            timestamp: breakTime,
            type: adType,
            confidence,
            reason: generatePlacementReason(breakTime, videoContext, adType),
            expectedRevenue,
            active: true
          });
        }
      });

      // Add engagement-based placements
      if (videoContext.viewerEngagement > 80) {
        smartPlacements.push({
          timestamp: Math.floor(videoContext.duration * 0.25),
          type: 'social-bar',
          confidence: 88,
          reason: 'High engagement period detected - optimal for social bar',
          expectedRevenue: 0.45,
          active: true
        });
      }

      // Add pre-conclusion placement
      smartPlacements.push({
        timestamp: Math.floor(videoContext.duration * 0.85),
        type: 'popunder',
        confidence: 82,
        reason: 'Pre-conclusion placement - committed viewers',
        expectedRevenue: 1.25,
        active: true
      });

      const totalRevenue = smartPlacements.reduce((sum, p) => sum + p.expectedRevenue, 0);
      const optimizationScore = calculateOptimizationScore(smartPlacements, videoContext);

      setEngine(prev => ({
        ...prev,
        placements: smartPlacements,
        totalRevenue,
        optimizationScore
      }));

      setIsAnalyzing(false);
    }, 2000);
  };

  const calculatePlacementConfidence = (timestamp: number, context: VideoContext): number => {
    const position = timestamp / context.duration;
    let confidence = 60;
    
    // Boost confidence for content breaks
    if (context.contentBreaks.includes(timestamp)) {
      confidence += 20;
    }
    
    // Adjust based on video position
    if (position > 0.1 && position < 0.9) {
      confidence += 15;
    }
    
    // Boost for high engagement content
    if (context.viewerEngagement > 75) {
      confidence += 10;
    }
    
    return Math.min(confidence + Math.random() * 10, 95);
  };

  const selectOptimalAdType = (timestamp: number, context: VideoContext, index: number): 'social-bar' | 'native' | 'popunder' => {
    const position = timestamp / context.duration;
    
    if (position < 0.3) return 'social-bar';
    if (position < 0.7) return 'native';
    return 'popunder';
  };

  const calculateExpectedRevenue = (adType: string, confidence: number): number => {
    const baseCPM = {
      'social-bar': 6.5,
      'native': 12.8,
      'popunder': 18.2
    };
    
    const cpm = baseCPM[adType as keyof typeof baseCPM] || 8;
    return (cpm / 1000) * (confidence / 100);
  };

  const generatePlacementReason = (timestamp: number, context: VideoContext, adType: string): string => {
    const reasons = {
      'social-bar': [
        'Non-intrusive notification during high engagement',
        'Optimal visibility without content disruption',
        'Perfect timing for viewer attention spike'
      ],
      'native': [
        'Natural content break point identified',
        'Seamless integration with video flow',
        'High relevance to current content topic'
      ],
      'popunder': [
        'Viewer commitment established',
        'Low interference with content consumption',
        'Maximum revenue potential window'
      ]
    };
    
    const typeReasons = reasons[adType as keyof typeof reasons] || ['Optimized placement detected'];
    return typeReasons[Math.floor(Math.random() * typeReasons.length)];
  };

  const calculateOptimizationScore = (placements: AdPlacement[], context: VideoContext): number => {
    let score = 0;
    
    // Revenue potential (40%)
    const revenueScore = Math.min(placements.reduce((sum, p) => sum + p.expectedRevenue, 0) * 10, 40);
    score += revenueScore;
    
    // Placement distribution (30%)
    const distributionScore = Math.min(placements.length * 7.5, 30);
    score += distributionScore;
    
    // Confidence average (30%)
    const avgConfidence = placements.reduce((sum, p) => sum + p.confidence, 0) / placements.length;
    const confidenceScore = (avgConfidence / 100) * 30;
    score += confidenceScore;
    
    return Math.round(score);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  useEffect(() => {
    // Auto-generate initial placements
    generateSmartPlacements();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Smart Placement Engine
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time contextual ad optimization for maximum revenue
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isAnalyzing ? (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Activity className="h-3 w-3 mr-1 animate-pulse" />
              Analyzing...
            </Badge>
          ) : (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Optimized
            </Badge>
          )}
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
          <p className="text-2xl font-bold text-blue-600">{engine.optimizationScore}%</p>
          <p className="text-sm text-gray-600">Optimization Score</p>
        </Card>
        <Card className="p-4 text-center">
          <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
          <p className="text-2xl font-bold text-green-600">{formatCurrency(engine.totalRevenue)}</p>
          <p className="text-sm text-gray-600">Expected Revenue</p>
        </Card>
        <Card className="p-4 text-center">
          <PlayCircle className="h-6 w-6 mx-auto mb-2 text-purple-500" />
          <p className="text-2xl font-bold text-purple-600">{engine.placements.length}</p>
          <p className="text-sm text-gray-600">Active Placements</p>
        </Card>
        <Card className="p-4 text-center">
          <Zap className="h-6 w-6 mx-auto mb-2 text-orange-500" />
          <p className="text-2xl font-bold text-orange-600">{analyticsData.clickThroughRate}%</p>
          <p className="text-sm text-gray-600">Click-Through Rate</p>
        </Card>
      </div>

      {/* Video Context */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Current Video Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-2">{engine.videoContext.title}</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Category:</span>
                <Badge className="bg-blue-100 text-blue-800">{engine.videoContext.category}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{formatTime(engine.videoContext.duration)}</span>
              </div>
              <div className="flex justify-between">
                <span>Engagement:</span>
                <span className="font-medium text-green-600">{engine.videoContext.viewerEngagement}%</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <Badge className="bg-purple-100 text-purple-800">{engine.videoContext.difficulty}</Badge>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-2">Content Break Points</h5>
            <div className="h-3 bg-gray-200 rounded-full relative mb-2">
              {engine.videoContext.contentBreaks.map((breakTime, index) => (
                <div
                  key={index}
                  className="absolute h-4 w-1 bg-blue-500 -top-0.5"
                  style={{ left: `${(breakTime / engine.videoContext.duration) * 100}%` }}
                  title={`Break at ${formatTime(breakTime)}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0:00</span>
              <span>{formatTime(engine.videoContext.duration)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Smart Placements */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">AI-Generated Placements</h4>
          <Button onClick={generateSmartPlacements} disabled={isAnalyzing}>
            <Brain className="h-4 w-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Re-optimize'}
          </Button>
        </div>

        <div className="space-y-4">
          {engine.placements.map((placement, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-100 text-blue-800">
                    {formatTime(placement.timestamp)}
                  </Badge>
                  <span className="font-medium capitalize">{placement.type.replace('-', ' ')}</span>
                  <Badge 
                    className={`${
                      placement.confidence >= 85 
                        ? 'bg-green-100 text-green-800'
                        : placement.confidence >= 75
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {placement.confidence}% confidence
                  </Badge>
                  {placement.active && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    {formatCurrency(placement.expectedRevenue)}
                  </div>
                  <div className="text-xs text-gray-500">expected revenue</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {placement.reason}
              </p>
            </div>
          ))}
        </div>

        {engine.placements.length === 0 && !isAnalyzing && (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>No placements generated yet. Click "Re-optimize" to start analysis.</p>
          </div>
        )}
      </Card>

      {/* Analytics Summary */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Performance Analytics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-2">Engagement Metrics</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Viewer Retention:</span>
                <span className="font-medium">{analyticsData.viewerRetention}%</span>
              </div>
              <div className="flex justify-between">
                <span>Average Engagement:</span>
                <span className="font-medium">{analyticsData.avgEngagement}%</span>
              </div>
              <div className="flex justify-between">
                <span>Click-Through Rate:</span>
                <span className="font-medium">{analyticsData.clickThroughRate}%</span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-2">Revenue Optimization</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Revenue per View:</span>
                <span className="font-medium text-green-600">{formatCurrency(analyticsData.revenuePerView)}</span>
              </div>
              <div className="flex justify-between">
                <span>Placement Efficiency:</span>
                <span className="font-medium text-blue-600">{engine.optimizationScore}%</span>
              </div>
              <div className="flex justify-between">
                <span>Total Expected:</span>
                <span className="font-medium text-purple-600">{formatCurrency(engine.totalRevenue)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}