import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  UserPlus, 
  Settings, 
  Code, 
  Play,
  CheckCircle,
  ExternalLink,
  Copy,
  AlertTriangle,
  Clock,
  DollarSign,
  Target,
  Zap,
  FileText,
  Monitor
} from 'lucide-react';

export default function CompleteAdsterraProcess() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    website: '',
    publisherId: '',
    zoneId: ''
  });

  const markStepComplete = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
    setCurrentStep(stepNumber + 1);
  };

  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    const toast = document.createElement('div');
    toast.textContent = `${type} code copied to clipboard!`;
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; z-index: 10000; font-weight: 500;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const completeProcess = [
    {
      step: 1,
      title: 'Adsterra Account बनाएं',
      subtitle: 'Publisher registration और approval',
      time: '10-15 minutes',
      difficulty: 'आसान',
      icon: <UserPlus className="h-6 w-6" />,
      description: 'सबसे पहले Adsterra में publisher account create करना है',
      detailedSteps: [
        {
          action: 'Adsterra.com पर जाएं',
          details: 'Google में "Adsterra publisher" search करें या directly adsterra.com पर जाएं',
          time: '1 minute'
        },
        {
          action: '"Become a Publisher" या "Join as Publisher" पर click करें',
          details: 'Homepage पर top-right corner में यह button मिलेगा',
          time: '30 seconds'
        },
        {
          action: 'Registration form fill करें',
          details: 'Email, Name, Country, Website URL, Payment method select करें',
          time: '3-5 minutes'
        },
        {
          action: 'Email verification करें',
          details: 'Inbox check करें और verification link पर click करें',
          time: '2 minutes'
        },
        {
          action: 'Account approval का wait करें',
          details: '24-48 hours में approval email आएगा (कभी-कभी instant भी हो जाता है)',
          time: '24-48 hours'
        }
      ],
      requirements: [
        'Valid email address',
        'Website URL (अगर है तो, नहीं तो बाद में add कर सकते हैं)',
        'Basic website content (कम से कम 10-15 pages)',
        'No adult or illegal content'
      ],
      tips: [
        'Real email address use करें क्योंकि payment notifications आएंगे',
        'Website description में honest information दें',
        'Complete profile बनाएं - इससे approval chances बढ़ते हैं',
        'Multiple websites हैं तो सबको add कर सकते हैं'
      ]
    },
    {
      step: 2,
      title: 'Dashboard Access और Setup',
      subtitle: 'Account setup और initial configuration',
      time: '5-10 minutes',
      difficulty: 'आसान',
      icon: <Settings className="h-6 w-6" />,
      description: 'Approval के बाद dashboard में login करके basic setup complete करना है',
      detailedSteps: [
        {
          action: 'Adsterra dashboard में login करें',
          details: 'Approved email के साथ login credentials use करें',
          time: '1 minute'
        },
        {
          action: 'Website add करें (अगर registration में नहीं किया)',
          details: 'Websites section में जाकर "Add Website" पर click करें',
          time: '2 minutes'
        },
        {
          action: 'Payment details setup करें',
          details: 'PayPal, Wire Transfer, या Cryptocurrency में से choose करें',
          time: '3-5 minutes'
        },
        {
          action: 'Publisher ID note करें',
          details: 'Account settings में आपका unique Publisher ID मिलेगा',
          time: '1 minute'
        }
      ],
      requirements: [
        'Approved Adsterra account',
        'Website verification complete',
        'Payment method setup',
        'Tax information (if required)'
      ],
      tips: [
        'PayPal सबसे popular और fast payment method है',
        'Website traffic minimum requirement नहीं है Adsterra में',
        'Multiple payment methods add कर सकते हैं backup के लिए',
        'Dashboard की सभी sections को explore करें'
      ]
    },
    {
      step: 3,
      title: 'Ad Units Create करें',
      subtitle: 'Different ad formats setup करना',
      time: '15-20 minutes',
      difficulty: 'मध्यम',
      icon: <Target className="h-6 w-6" />,
      description: 'अलग-अलग ad formats के लिए ad units create करना है',
      detailedSteps: [
        {
          action: 'Websites section में अपनी website select करें',
          details: 'Dashboard में "Websites" tab पर click करें',
          time: '1 minute'
        },
        {
          action: 'Ad zones create करें',
          details: '"Create Ad Zone" पर click करके Banner, Native, Video formats select करें',
          time: '5-8 minutes'
        },
        {
          action: 'Ad sizes choose करें',
          details: 'Banner: 728x90, 300x250, 320x50 | Native: Responsive | Video: 640x480',
          time: '3-5 minutes'
        },
        {
          action: 'Zone IDs save करें',
          details: 'हर ad unit का unique Zone ID मिलेगा - इन्हें note कर लें',
          time: '2 minutes'
        },
        {
          action: 'Ad codes generate करें',
          details: '"Get Code" button से JavaScript codes copy करें',
          time: '3-5 minutes'
        }
      ],
      requirements: [
        'Approved website in dashboard',
        'Clear understanding of website layout',
        'Knowledge of where to place ads',
        'Basic HTML knowledge (helpful)'
      ],
      tips: [
        'पहले सिर्फ 2-3 ad units create करें, बाद में और add करेंगे',
        'Mobile traffic ज्यादा है तो 320x50 banner जरूर add करें',
        'Native ads highest CPM देते हैं but proper placement चाहिए',
        'हर ad unit का clear name रखें (जैसे: Header-Banner, Sidebar-Native)'
      ]
    },
    {
      step: 4,
      title: 'Website पर Ads Implementation',
      subtitle: 'Generated codes को website पर place करना',
      time: '20-30 minutes',
      difficulty: 'मध्यम',
      icon: <Code className="h-6 w-6" />,
      description: 'Ad codes को website के appropriate locations पर implement करना है',
      detailedSteps: [
        {
          action: 'Website access करें',
          details: 'cPanel, FTP, या WordPress admin में login करें',
          time: '2 minutes'
        },
        {
          action: 'Backup create करें',
          details: 'Changes से पहले website का backup जरूर लें',
          time: '3-5 minutes'
        },
        {
          action: 'Header में ad code paste करें',
          details: 'header.php या main template में <head> section के बाद paste करें',
          time: '5-8 minutes'
        },
        {
          action: 'Content area में ads place करें',
          details: 'Articles के between में या sidebar में strategic locations पर paste करें',
          time: '8-10 minutes'
        },
        {
          action: 'Mobile responsive check करें',
          details: 'Mobile devices पर test करके ensure करें कि ads properly display हो रहे हैं',
          time: '5-8 minutes'
        }
      ],
      requirements: [
        'Website access (FTP/cPanel/WordPress admin)',
        'Generated ad codes from Adsterra',
        'Basic HTML/PHP knowledge',
        'Testing environment या live website'
      ],
      tips: [
        'एक-एक करके ads add करें, सभी एक साथ नहीं',
        'User experience को compromise नहीं करें',
        'Page loading speed monitor करें',
        'Different positions try करके best placement find करें'
      ]
    },
    {
      step: 5,
      title: 'Testing और Optimization',
      subtitle: 'Ads performance monitor करना और optimize करना',
      time: '30-60 minutes',
      difficulty: 'मध्यम',
      icon: <Monitor className="h-6 w-6" />,
      description: 'Ads की performance check करना और revenue optimization करना है',
      detailedSteps: [
        {
          action: 'Desktop और mobile पर test करें',
          details: 'Different devices और browsers में website open करके ads visibility check करें',
          time: '10-15 minutes'
        },
        {
          action: 'Loading speed test करें',
          details: 'Google PageSpeed Insights से page speed check करें',
          time: '5 minutes'
        },
        {
          action: 'Adsterra dashboard में earnings check करें',
          details: '24-48 hours बाद dashboard में stats दिखने लगेंगे',
          time: '5 minutes'
        },
        {
          action: 'User behavior monitor करें',
          details: 'Google Analytics से bounce rate और session duration check करें',
          time: '10-15 minutes'
        },
        {
          action: 'A/B test different positions',
          details: 'एक week बाद different ad placements try करके best positions find करें',
          time: '15-20 minutes'
        }
      ],
      requirements: [
        'Live website with implemented ads',
        'Google Analytics setup (recommended)',
        'Adsterra dashboard access',
        'Understanding of basic metrics'
      ],
      tips: [
        'पहले week में daily monitoring करें',
        'User complaints आएं तो immediately action लें',
        'Best performing ad positions को identify करें',
        'Revenue और user experience का balance maintain करें'
      ]
    },
    {
      step: 6,
      title: 'Revenue Tracking और Growth',
      subtitle: 'Earnings monitor करना और scale करना',
      time: 'Ongoing',
      difficulty: 'आसान',
      icon: <DollarSign className="h-6 w-6" />,
      description: 'Regular earnings tracking और revenue growth strategies implement करना है',
      detailedSteps: [
        {
          action: 'Daily earnings monitor करें',
          details: 'Adsterra dashboard में daily login करके stats check करें',
          time: '5 minutes daily'
        },
        {
          action: 'Best performing ads identify करें',
          details: 'CPM, CTR, और overall earnings के base पर top ads find करें',
          time: '10 minutes weekly'
        },
        {
          action: 'Traffic sources analyze करें',
          details: 'कौन से countries से highest CPM मिल रहा है यह check करें',
          time: '15 minutes weekly'
        },
        {
          action: 'More ad formats add करें',
          details: 'Success के बाद gradually more ad units और formats add करें',
          time: '20-30 minutes monthly'
        },
        {
          action: 'Payment schedule track करें',
          details: 'NET-15 payment cycle के according payments track करें',
          time: '5 minutes bi-weekly'
        }
      ],
      requirements: [
        'Consistent website traffic',
        'Understanding of ad metrics',
        'Patience for revenue growth',
        'Regular optimization mindset'
      ],
      tips: [
        'Minimum $5 earn होने पर payment मिलती है',
        'Traffic quality revenue को directly impact करती है',
        'Seasonal trends को understand करें',
        'Other ad networks भी try कर सकते हैं later'
      ]
    }
  ];

  const exampleCodes = {
    header: `<!-- Header Banner Ad (728x90) -->
<div style="text-align: center; margin: 10px 0; padding: 10px;">
  <script type="text/javascript">
    atOptions = {
      'key': '${formData.publisherId || 'YOUR_PUBLISHER_ID'}',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.topcpmnetwork.com/${formData.zoneId || 'YOUR_ZONE_ID'}/invoke.js"></scr' + 'ipt>');
  </script>
</div>`,

    native: `<!-- Native Content Ad -->
<div style="margin: 20px 0; text-align: center;">
  <div style="font-size: 12px; color: #666; margin-bottom: 10px;">Advertisement</div>
  <script type="text/javascript">
    atOptions = {
      'key': '${formData.publisherId || 'YOUR_PUBLISHER_ID'}',
      'format': 'native',
      'height': 300,
      'width': 350,
      'params': {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.nativecontentnetwork.com/${formData.zoneId || 'YOUR_ZONE_ID'}/invoke.js"></scr' + 'ipt>');
  </script>
</div>`,

    mobile: `<!-- Mobile Banner Ad (320x50) -->
<div style="text-align: center; margin: 15px 0;">
  <script type="text/javascript">
    atOptions = {
      'key': '${formData.publisherId || 'YOUR_PUBLISHER_ID'}',
      'format': 'iframe',
      'height': 50,
      'width': 320,
      'params': {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.displaycontentnetwork.com/${formData.zoneId || 'YOUR_ZONE_ID'}/invoke.js"></scr' + 'ipt>');
  </script>
</div>`
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-500" />
            Complete Adsterra Process - Account से Website Revenue तक
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Step-by-step complete guide: Account creation से लेकर website पर ads run करके earning तक
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className="bg-green-100 text-green-800">Beginner Friendly</Badge>
            <Badge className="bg-blue-100 text-blue-800">Complete Process</Badge>
            <Badge className="bg-purple-100 text-purple-800">Hindi Instructions</Badge>
            <Badge className="bg-orange-100 text-orange-800">Real Examples</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progress Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            {completeProcess.map((process, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  completedSteps.includes(process.step) ? 'bg-green-500 text-white' :
                  currentStep === process.step ? 'bg-blue-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {completedSteps.includes(process.step) ? <CheckCircle className="h-5 w-5" /> : process.step}
                </div>
                <span className="text-xs mt-1 text-center max-w-20">{process.title}</span>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Progress: {completedSteps.length}/6 steps completed
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="process" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="process">Step-by-Step Process</TabsTrigger>
          <TabsTrigger value="codes">Implementation Codes</TabsTrigger>
          <TabsTrigger value="tracker">Progress Tracker</TabsTrigger>
        </TabsList>

        {/* Complete Process */}
        <TabsContent value="process" className="space-y-6">
          <div className="grid gap-6">
            {completeProcess.map((process, index) => (
              <Card key={index} className={`${currentStep === process.step ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${
                      completedSteps.includes(process.step) ? 'bg-green-100 text-green-600' :
                      currentStep === process.step ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {process.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">Step {process.step}: {process.title}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {process.time}
                          </Badge>
                          <Badge className="text-xs bg-yellow-100 text-yellow-800">
                            {process.difficulty}
                          </Badge>
                          {completedSteps.includes(process.step) && (
                            <Badge className="text-xs bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">{process.subtitle}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{process.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Detailed Steps */}
                  <div>
                    <h4 className="font-medium mb-3 text-blue-700">📋 Detailed Action Steps:</h4>
                    <div className="space-y-3">
                      {process.detailedSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-blue-800 dark:text-blue-200">{step.action}</h5>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">{step.details}</p>
                            <Badge variant="outline" className="text-xs mt-2">⏱️ {step.time}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements and Tips */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-green-700">✅ Requirements:</h4>
                      <ul className="space-y-2">
                        {process.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3 text-purple-700">💡 Pro Tips:</h4>
                      <ul className="space-y-2">
                        {process.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Zap className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    {process.step === 1 && (
                      <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <a href="https://adsterra.com/publisher/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Start Registration
                        </a>
                      </Button>
                    )}
                    
                    {process.step === 2 && (
                      <Button className="bg-green-600 hover:bg-green-700" asChild>
                        <a href="https://adsterra.com/dashboard" target="_blank" rel="noopener noreferrer">
                          <Settings className="h-4 w-4 mr-2" />
                          Open Dashboard
                        </a>
                      </Button>
                    )}

                    <Button
                      onClick={() => markStepComplete(process.step)}
                      variant={completedSteps.includes(process.step) ? "default" : "outline"}
                      disabled={completedSteps.includes(process.step)}
                    >
                      {completedSteps.includes(process.step) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Target className="h-4 w-4 mr-2" />
                          Mark as Complete
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Implementation Codes */}
        <TabsContent value="codes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Ad Codes Configuration</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your Publisher ID and Zone ID to generate ready-to-use codes
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="publisher-id">Publisher ID</Label>
                  <Input
                    id="publisher-id"
                    placeholder="your-publisher-key-123456"
                    value={formData.publisherId}
                    onChange={(e) => setFormData({...formData, publisherId: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="zone-id">Zone ID</Label>
                  <Input
                    id="zone-id"
                    placeholder="123456"
                    value={formData.zoneId}
                    onChange={(e) => setFormData({...formData, zoneId: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {Object.entries(exampleCodes).map(([key, code]) => (
              <Card key={key}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="capitalize">
                      {key === 'header' && '🔝 Header Banner Ad (High Visibility)'}
                      {key === 'native' && '📰 Native Content Ad (Highest CPM)'}
                      {key === 'mobile' && '📱 Mobile Banner Ad (Mobile Users)'}
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-800">
                      {key === 'header' && '$3-8 CPM'}
                      {key === 'native' && '$5-15 CPM'}
                      {key === 'mobile' && '$2-6 CPM'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={code}
                    readOnly
                    className="font-mono text-xs"
                    rows={12}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyCode(code, key)}
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy {key.charAt(0).toUpperCase() + key.slice(1)} Code
                    </Button>
                  </div>
                  
                  {(!formData.publisherId || !formData.zoneId) && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        ⚠️ Publisher ID और Zone ID enter करने के बाद code automatically update हो जाएगा
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Progress Tracker */}
        <TabsContent value="tracker" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{completedSteps.length}/6</div>
                  <div className="text-sm text-blue-700">Steps Completed</div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round((completedSteps.length / 6) * 100)}%
                  </div>
                  <div className="text-sm text-green-700">Progress</div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {6 - completedSteps.length}
                  </div>
                  <div className="text-sm text-purple-700">Steps Remaining</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Next Actions:</h4>
                {currentStep <= 6 ? (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-200">
                      Current Step: {completeProcess[currentStep - 1]?.title}
                    </h5>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      {completeProcess[currentStep - 1]?.description}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200">
                      🎉 Congratulations! Process Complete
                    </h5>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      आपने successfully Adsterra ads implement कर लिए हैं। अब daily earnings monitor करें!
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                <h5 className="font-medium mb-2">Estimated Timeline:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Account creation & approval: 1-2 days</li>
                  <li>• Ad setup & implementation: 2-3 hours</li>
                  <li>• First earnings visible: 24-48 hours</li>
                  <li>• Optimization & growth: Ongoing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}