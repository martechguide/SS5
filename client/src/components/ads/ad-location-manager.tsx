import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, MapPin, Eye, EyeOff, TrendingUp } from 'lucide-react';

interface AdLocationSettings {
  location: string;
  displayName: string;
  description: string;
  isActive: boolean;
  adCount: number;
  estimatedRevenue: number;
}

const defaultLocations: AdLocationSettings[] = [
  {
    location: 'home-footer',
    displayName: 'Home Page Bottom',
    description: 'Banner ad at the bottom of the main homepage',
    isActive: true,
    adCount: 1,
    estimatedRevenue: 8.50
  },
  {
    location: 'video-footer',
    displayName: 'Video Player Bottom',
    description: 'Banner ad below video player content',
    isActive: true,
    adCount: 1,
    estimatedRevenue: 15.75
  },
  {
    location: 'batch-footer',
    displayName: 'Course Pages Bottom',
    description: 'Banner ad at bottom of batch and subject pages',
    isActive: true,
    adCount: 1,
    estimatedRevenue: 6.25
  },
  {
    location: 'admin-footer',
    displayName: 'Admin Dashboard Bottom',
    description: 'Banner ad in admin area (for testing)',
    isActive: false,
    adCount: 1,
    estimatedRevenue: 2.10
  }
];

export default function AdLocationManager() {
  const [locations, setLocations] = useState<AdLocationSettings[]>(defaultLocations);
  const [activeTab, setActiveTab] = useState('settings');

  const handleToggleLocation = (locationKey: string) => {
    setLocations(locations.map(loc => 
      loc.location === locationKey 
        ? { ...loc, isActive: !loc.isActive }
        : loc
    ));
  };

  const activeLocations = locations.filter(loc => loc.isActive);
  const totalRevenue = activeLocations.reduce((sum, loc) => sum + loc.estimatedRevenue, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{activeLocations.length}</div>
            <div className="text-sm text-gray-600">Active Locations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{locations.length}</div>
            <div className="text-sm text-gray-600">Total Locations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">${totalRevenue.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Est. Daily Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">Non-Intrusive</div>
            <div className="text-sm text-gray-600">Ad Strategy</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings">Location Settings</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Ad Location Management</h3>
              <p className="text-sm text-gray-600">Control where bottom banner ads appear across your platform</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Settings className="h-3 w-3 mr-1" />
              Bottom-Only Strategy
            </Badge>
          </div>

          <div className="grid gap-4">
            {locations.map((location) => (
              <Card key={location.location} className={`border ${location.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${location.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <MapPin className={`h-4 w-4 ${location.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{location.displayName}</h4>
                          <Badge variant={location.isActive ? "default" : "secondary"}>
                            {location.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Ads: {location.adCount}</span>
                          <span>Revenue: ${location.estimatedRevenue.toFixed(2)}/day</span>
                          <span>Position: Bottom Banner</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {location.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`location-${location.location}`}
                          checked={location.isActive}
                          onCheckedChange={() => handleToggleLocation(location.location)}
                        />
                        <Label htmlFor={`location-${location.location}`} className="text-sm">
                          {location.isActive ? 'On' : 'Off'}
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Non-Intrusive Ad Strategy</h4>
                  <p className="text-sm text-blue-700">
                    All ads are placed only at the bottom of pages to ensure a smooth user experience. 
                    No overlay, popup, or mid-content ads that could interrupt learning.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Live Ad Preview</h3>
            <p className="text-sm text-gray-600 mb-6">
              Preview how bottom banner ads appear across different pages
            </p>
          </div>

          <div className="grid gap-6">
            {activeLocations.map((location) => (
              <Card key={location.location}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MapPin className="h-4 w-4" />
                    {location.displayName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg max-w-md mx-auto">
                      <h4 className="font-semibold mb-1">Sample Ad Content</h4>
                      <p className="text-sm opacity-90">This is how your bottom banner ad will appear</p>
                      <div className="text-xs mt-2 opacity-75">
                        Location: {location.location} • Revenue: ${location.estimatedRevenue.toFixed(2)}/day
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      Non-intrusive • Bottom placement
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {activeLocations.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <EyeOff className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Locations</h3>
                <p className="text-gray-600">Enable ad locations in the Settings tab to see previews here.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { type AdLocationSettings };