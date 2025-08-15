import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Copy, 
  PlayCircle, 
  Code, 
  Monitor,
  Smartphone,
  Globe,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export default function VideoImplementationGuide() {
  const [activeExample, setActiveExample] = useState('youtube');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    const toast = document.createElement('div');
    toast.textContent = `${type} copied to clipboard!`;
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; z-index: 10000; font-weight: 500;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const implementationExamples = {
    youtube: {
      name: 'All Video Platforms (YouTube/Vimeo/Facebook/Instagram/TikTok)',
      description: 'सभी video platforms के लिए - YouTube, Vimeo, Facebook, Instagram, TikTok, Dailymotion सभी पर काम करेगा',
      code: `<!-- सभी Video Platforms के लिए Universal Code -->
<div id="video-container" style="position: relative; width: 100%; max-width: 800px;">
  
  <!-- YouTube Video -->
  <iframe id="main-video" src="https://www.youtube.com/embed/VIDEO_ID" width="100%" height="450" frameborder="0" allowfullscreen></iframe>
  
  <!-- Facebook Video -->
  <iframe id="main-video" src="https://www.facebook.com/plugins/video.php?href=VIDEO_URL" width="100%" height="450" frameborder="0" allowfullscreen></iframe>
  
  <!-- Vimeo Video -->
  <iframe id="main-video" src="https://player.vimeo.com/video/VIDEO_ID" width="100%" height="450" frameborder="0" allowfullscreen></iframe>
  
  <!-- Instagram Video (IGTV) -->
  <iframe id="main-video" src="https://www.instagram.com/p/POST_ID/embed" width="100%" height="450" frameborder="0" allowfullscreen></iframe>
  
  <!-- TikTok Video -->
  <iframe id="main-video" src="https://www.tiktok.com/embed/VIDEO_ID" width="100%" height="450" frameborder="0" allowfullscreen></iframe>
  
  <!-- Dailymotion Video -->
  <iframe id="main-video" src="https://www.dailymotion.com/embed/video/VIDEO_ID" width="100%" height="450" frameborder="0" allowfullscreen></iframe>
  
  <!-- ❌ DELETE करें: PRE-ROLL AD CODE यहाँ paste करें - सभी platforms पर काम करेगा ❌ -->
  
  <!-- ❌ DELETE करें: BANNER OVERLAY AD CODE यहाँ paste करें - सभी platforms पर काम करेगा ❌ -->
</div>

<!-- ❌ DELETE करें: MID-ROLL/POST-ROLL SCRIPTS यहाँ paste करें - सभी platforms पर काम करेगा ❌ -->`
    },
    html5: {
      name: 'HTML5 Video Player',
      description: 'यहाँ आपको comments की जगह ad codes paste करने हैं',
      code: `<!-- आपका मौजूदा HTML5 video player -->
<div id="video-container" style="position: relative; width: 100%; max-width: 800px;">
  <!-- यह आपका मौजूदा video element है - इसे change नहीं करना है -->
  <video id="main-video" controls width="100%" height="450">
    <source src="your-video.mp4" type="video/mp4">
  </video>
  
  <!-- ❌ DELETE करें: PRE-ROLL AD CODE यहाँ paste करें ❌ -->
  
  <!-- ❌ DELETE करें: BANNER OVERLAY AD CODE यहाँ paste करें ❌ -->
</div>

<!-- ❌ DELETE करें: MID-ROLL AD SCRIPT यहाँ paste करें ❌ -->

<!-- ❌ DELETE करें: POST-ROLL AD SCRIPT यहाँ paste करें ❌ -->

<script>
// आपके ad codes यहाँ automatically काम करेंगे
console.log('Video player with ads ready!');
</script>`
    },
    react: {
      name: 'React Video Component',
      description: 'React में comments की जगह ad codes paste करें',
      code: `import React, { useRef, useEffect } from 'react';

function VideoPlayerWithAds({ videoSrc }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // ❌ DELETE करें: MID-ROLL AD SCRIPT यहाँ paste करें (useEffect के अंदर) ❌
    
    // ❌ DELETE करें: POST-ROLL AD SCRIPT यहाँ paste करें (useEffect के अंदर) ❌
  }, []);

  return (
    <div id="video-container" style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
      {/* यह आपका मौजूदा video element है - इसे change नहीं करना है */}
      <video 
        ref={videoRef}
        id="main-video"
        controls 
        width="100%" 
        height="450"
        src={videoSrc}
      />
      
      {/* ❌ DELETE करें: PRE-ROLL AD JSX यहाँ paste करें ❌ */}
      
      {/* ❌ DELETE करें: BANNER OVERLAY AD JSX यहाँ paste करें ❌ */}
    </div>
  );
}

export default VideoPlayerWithAds;`
    },
    wordpress: {
      name: 'WordPress Video',
      description: 'WordPress में आपको दो जगह ad codes paste करने हैं',
      code: `<!-- WordPress post/page editor में (HTML mode में) -->
<div id="video-container" style="position: relative; width: 100%; max-width: 800px;">
  <!-- यह आपका मौजूदा WordPress video है - इसे change नहीं करना है -->
  [video src="your-video.mp4" width="800" height="450"]
  
  <!-- OR YouTube के लिए - यह भी change नहीं करना है -->
  [embed]https://www.youtube.com/watch?v=VIDEO_ID[/embed]
  
  <!-- ❌ DELETE करें: PRE-ROLL AD CODE यहाँ paste करें ❌ -->
  
  <!-- ❌ DELETE करें: BANNER OVERLAY AD CODE यहाँ paste करें ❌ -->
</div>

<!-- आपके theme के functions.php में या Code Snippet plugin में add करें -->
<script>
// ❌ DELETE करें: MID-ROLL AD SCRIPT यहाँ paste करें ❌

// ❌ DELETE करें: POST-ROLL AD SCRIPT यहाँ paste करें ❌
</script>`
    }
  };

  const stepByStepProcess = [
    {
      step: 1,
      title: 'Apply to Ad Networks',
      description: 'Go to "Network Management" → Click "Apply Now" for networks like Google AdSense, ExoClick, PropellerAds',
      action: 'Get approved and obtain Publisher ID + Zone ID',
      time: '1-7 days'
    },
    {
      step: 2,
      title: 'Configure Networks',
      description: 'Go to "Network Management" → "Configuration" tab',
      action: 'Enter your Publisher ID and Zone ID, click "Save Configuration"',
      time: '5 minutes'
    },
    {
      step: 3,
      title: 'Generate Ad Codes',
      description: 'Go to "Video Ad Setup" → Choose ad type (Pre-Roll, Mid-Roll, etc.)',
      action: 'Select network, configure timing, click "Copy Code"',
      time: '10 minutes'
    },
    {
      step: 4,
      title: 'Implement in Video Player',
      description: 'Paste the copied ad codes in your video player HTML/JavaScript',
      action: 'Follow the implementation examples below',
      time: '30 minutes'
    },
    {
      step: 5,
      title: 'Test Your Setup',
      description: 'Go to "Live Demo" to preview how ads will appear',
      action: 'Verify timing and placement work correctly',
      time: '15 minutes'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            How to Place Ad Codes in Your Video Player
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Complete guide to implementing generated ad codes in different video players
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {stepByStepProcess.map((step, index) => (
              <div key={step.step} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full mx-auto mb-2 flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">{step.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeExample} onValueChange={setActiveExample} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="youtube">All Platforms</TabsTrigger>
          <TabsTrigger value="html5">HTML5 Video</TabsTrigger>
          <TabsTrigger value="react">React Component</TabsTrigger>
          <TabsTrigger value="wordpress">WordPress</TabsTrigger>
        </TabsList>

        {Object.entries(implementationExamples).map(([key, example]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  {example.name}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">{example.description}</p>
                {key === 'youtube' && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-red-100 text-red-800">YouTube</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Facebook</Badge>
                    <Badge className="bg-green-100 text-green-800">Vimeo</Badge>
                    <Badge className="bg-pink-100 text-pink-800">Instagram</Badge>
                    <Badge className="bg-purple-100 text-purple-800">TikTok</Badge>
                    <Badge className="bg-orange-100 text-orange-800">Dailymotion</Badge>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Implementation Code</h4>
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(example.code, 'Implementation code')}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Code
                      </Button>
                    </div>
                    <Textarea
                      value={example.code}
                      className="font-mono text-sm h-96"
                      readOnly
                    />
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                      कैसे इस्तेमाल करें:
                    </h5>
                    <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                      <li><strong>1. ऊपर का code copy करें</strong></li>
                      <li><strong>2. ❌ DELETE comments को हटाएं</strong> और उनकी जगह "Video Ad Setup" से copy किए गए ad codes paste करें</li>
                      <li><strong>3. Video URLs को अपने actual videos से replace करें</strong></li>
                      <li><strong>4. "Live Demo" में test करें</strong></li>
                    </ol>
                    <div className="mt-3 p-2 bg-yellow-100 rounded text-xs">
                      <strong>Important:</strong> आपको पूरा code replace नहीं करना है, सिर्फ comments वाली जगह पर ad codes paste करने हैं
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">✓ Do This</h5>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Test ads in "Live Demo" first</li>
                <li>• Configure networks before copying codes</li>
                <li>• Use multiple networks for better fill rates</li>
                <li>• Check ad placement timing carefully</li>
              </ul>
            </div>
            
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">✗ Avoid This</h5>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Don't use codes without Publisher ID</li>
                <li>• Don't place too many ads (annoys viewers)</li>
                <li>• Don't skip testing phase</li>
                <li>• Don't forget mobile responsiveness</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Step-by-Step Process (हिंदी में)</h5>
            <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
              <li><strong>1. Ad Networks में apply करें</strong> (ExoClick = instant approval)</li>
              <li><strong>2. Approval के बाद Publisher ID और Zone ID collect करें</strong></li>
              <li><strong>3. "Network Management" → "Configuration" में IDs enter करें</strong></li>
              <li><strong>4. "Video Ad Setup" से ad codes generate करें</strong></li>
              <li><strong>5. Comments को delete करके ad codes paste करें</strong></li>
              <li><strong>6. "Live Demo" में test करें</strong></li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}