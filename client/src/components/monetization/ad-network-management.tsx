import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  TrendingUp,
  Users,
  Globe,
  Copy
} from 'lucide-react';
import VideoImplementationGuide from './video-implementation-guide';
import AdsterraManagementGuide from './adsterra-management-guide';

interface NetworkConfiguration {
  id: string;
  name: string;
  cpmRange: string;
  fillRate: string;
  payment: string;
  minPayout: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  signupUrl: string;
  isConfigured: boolean;
  publisherId: string;
  zoneId: string;
  adCode: string;
  apiKey: string;
  benefits: string[];
  requirements: string[];
}

export default function AdNetworkManagement() {
  const [networks, setNetworks] = useState<NetworkConfiguration[]>([
    {
      id: 'adsterra',
      name: 'Adsterra',
      cpmRange: '$15-25',
      fillRate: '99%',
      payment: 'NET-15',
      minPayout: '$25',
      difficulty: 'Easy',
      signupUrl: 'https://publishers.adsterra.com/signup',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Highest CPM rates in industry',
        'Premium demand partners',
        'Real-time analytics',
        'Multiple ad formats',
        'No traffic minimums'
      ],
      requirements: [
        'Quality content required',
        'No adult/violent content',
        'Valid website/app'
      ]
    },
    {
      id: 'adsense',
      name: 'Google AdSense',
      cpmRange: '$8-15',
      fillRate: '95%',
      payment: 'Monthly',
      minPayout: '$100',
      difficulty: 'Medium',
      signupUrl: 'https://www.google.com/adsense/',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Most reliable platform',
        'Global advertiser base',
        'Advanced targeting',
        'Mobile optimization',
        'Brand safety'
      ],
      requirements: [
        'High-quality content',
        'Significant traffic',
        'Policy compliance',
        'Original content only'
      ]
    },
    {
      id: 'propellerads',
      name: 'PropellerAds',
      cpmRange: '$5-12',
      fillRate: '90%',
      payment: 'NET-30',
      minPayout: '$25',
      difficulty: 'Easy',
      signupUrl: 'https://www.propellerads.com/main/join_publisher/',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Quick approval process',
        'Multiple formats',
        'Good for all traffic types',
        'Self-serve platform',
        'Crypto payments available'
      ],
      requirements: [
        'Any traffic volume',
        'Basic website/app',
        'No specific restrictions'
      ]
    },
    {
      id: 'meta',
      name: 'Meta Audience Network',
      cpmRange: '$7-12',
      fillRate: '85%',
      payment: 'NET-30',
      minPayout: '$25',
      difficulty: 'Medium',
      signupUrl: 'https://www.facebook.com/audiencenetwork/',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Facebook/Instagram ads',
        'Advanced targeting',
        'Mobile-first approach',
        'High-quality advertisers',
        'Good for social content'
      ],
      requirements: [
        'Facebook Business Manager',
        'Mobile app or mobile site',
        'Quality content',
        'Policy compliance'
      ]
    },
    {
      id: 'connatix',
      name: 'Connatix',
      cpmRange: '$12-25',
      fillRate: '100%',
      payment: 'NET-30',
      minPayout: '$25',
      difficulty: 'Medium',
      signupUrl: 'https://publishers.connatix.com/',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Premium video platform',
        'AI-powered targeting',
        'Custom video players',
        'Real-time analytics',
        'High fill rates'
      ],
      requirements: [
        '18+ users monthly',
        'Video content focus',
        'Quality content review'
      ]
    },
    {
      id: 'ezoic',
      name: 'Ezoic',
      cpmRange: '$8-18',
      fillRate: '95%',
      payment: 'NET-30',
      minPayout: '$20',
      difficulty: 'Easy',
      signupUrl: 'https://www.ezoic.com/apply/',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'AI optimization',
        'Site speed tools',
        'No traffic requirements',
        'Easy approval',
        'Multiple ad networks'
      ],
      requirements: [
        'Any traffic level',
        'Original content',
        'Basic website setup'
      ]
    },
    {
      id: 'mediavine',
      name: 'Mediavine',
      cpmRange: '$20-35',
      fillRate: '98%',
      payment: 'NET-65',
      minPayout: '$25',
      difficulty: 'Hard',
      signupUrl: 'https://www.mediavine.com/apply/',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Highest premium CPM rates',
        'Excellent customer support',
        'Video ad integration',
        'Mobile optimization',
        'Brand safety guaranteed'
      ],
      requirements: [
        '50K+ monthly sessions',
        'Original, high-quality content',
        'Compliance with policies',
        'US traffic preferred'
      ]
    },
    {
      id: 'vdo',
      name: 'VDO.ai',
      cpmRange: '$18-30',
      fillRate: '95%',
      payment: 'NET-30',
      minPayout: '$25',
      difficulty: 'Medium',
      signupUrl: 'https://vdo.ai/publishers/',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Video-first advertising',
        'High engagement rates',
        'AI-powered optimization',
        'Premium video demand',
        'Real-time analytics'
      ],
      requirements: [
        'Video content focused',
        '5K+ monthly visitors',
        'Quality content review'
      ]
    },
    {
      id: 'exoclick',
      name: 'ExoClick',
      cpmRange: '$3-8',
      fillRate: '100%',
      payment: 'Weekly',
      minPayout: '$20',
      difficulty: 'Easy',
      signupUrl: 'https://www.exoclick.com/signup/publisher',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'No approval required',
        'Adult content accepted',
        'Multiple payment methods',
        'Real-time bidding',
        'Global traffic coverage'
      ],
      requirements: [
        'No minimum traffic',
        'Any content type',
        'Immediate activation'
      ]
    },
    {
      id: 'monumetric',
      name: 'Monumetric',
      cpmRange: '$12-22',
      fillRate: '96%',
      payment: 'NET-30',
      minPayout: '$10',
      difficulty: 'Medium',
      signupUrl: 'https://www.monumetric.com/apply/',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Personal account manager',
        'High-quality advertisers',
        'Custom ad optimization',
        'Detailed reporting',
        'Low minimum traffic'
      ],
      requirements: [
        '10K+ monthly page views',
        'Original content',
        'Good user experience'
      ]
    },
    {
      id: 'adthrive',
      name: 'AdThrive',
      cpmRange: '$25-40',
      fillRate: '97%',
      payment: 'NET-45',
      minPayout: '$25',
      difficulty: 'Hard',
      signupUrl: 'https://www.adthrive.com/apply/',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Highest premium rates',
        'Excellent support',
        'Video monetization',
        'Site speed optimization',
        'Brand partnerships'
      ],
      requirements: [
        '100K+ monthly page views',
        'US-based traffic',
        'High-quality content',
        'Strict application process'
      ]
    },
    {
      id: 'sovrn',
      name: 'Sovrn //Commerce',
      cpmRange: '$6-14',
      fillRate: '92%',
      payment: 'NET-30',
      minPayout: '$25',
      difficulty: 'Easy',
      signupUrl: 'https://www.sovrn.com/publishers/',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Easy integration',
        'Affiliate commerce',
        'Header bidding',
        'Good for blogs',
        'Transparent reporting'
      ],
      requirements: [
        'Any traffic level',
        'Content-focused sites',
        'Basic compliance'
      ]
    },
    {
      id: 'hilltopads',
      name: 'HilltopAds',
      cpmRange: '$3-10',
      fillRate: '95%',
      payment: 'Weekly/NET-7',
      minPayout: '$10',
      difficulty: 'Easy',
      signupUrl: 'https://hilltopads.com',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Weekly payments available',
        'Anti-adblock technology',
        'Multiple ad formats',
        'Global traffic accepted',
        'Referral program'
      ],
      requirements: [
        'No minimum traffic',
        'Quick approval process',
        'Any content type'
      ]
    },
    {
      id: 'medianet',
      name: 'Media.net',
      cpmRange: '$6-15',
      fillRate: '90%',
      payment: 'NET-30',
      minPayout: '$100',
      difficulty: 'Medium',
      signupUrl: 'https://www.media.net',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Yahoo/Bing powered ads',
        'Contextual targeting',
        'Native advertising',
        'Good for English content',
        'Responsive ad formats'
      ],
      requirements: [
        'Quality content required',
        '1-2 weeks review process',
        'English-focused content'
      ]
    },
    {
      id: 'amazon',
      name: 'Amazon Publisher Services',
      cpmRange: '$7-16',
      fillRate: '85%',
      payment: 'NET-60',
      minPayout: '$10',
      difficulty: 'Medium',
      signupUrl: 'https://aps.amazon.com',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Amazon demand network',
        'Header bidding technology',
        'Shopping intent data',
        'Premium advertiser rates',
        'E-commerce focus'
      ],
      requirements: [
        'Quality content review',
        'Header bidding setup',
        'Amazon approval process'
      ]
    },
    {
      id: 'mgid',
      name: 'MGID',
      cpmRange: '$4-12',
      fillRate: '98%',
      payment: 'NET-30',
      minPayout: '$100',
      difficulty: 'Easy',
      signupUrl: 'https://www.mgid.com',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Native content ads',
        'High fill rates',
        'Global traffic coverage',
        'Multiple ad formats',
        'Real-time reporting'
      ],
      requirements: [
        'Website or mobile app',
        'Quality content standards',
        'Basic traffic requirements'
      ]
    },
    {
      id: 'revcontent',
      name: 'RevContent',
      cpmRange: '$5-18',
      fillRate: '92%',
      payment: 'NET-30',
      minPayout: '$50',
      difficulty: 'Medium',
      signupUrl: 'https://www.revcontent.com',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Premium native ads',
        'Brand-safe content',
        'High engagement rates',
        'Custom targeting',
        'Quality demand partners'
      ],
      requirements: [
        '50K+ monthly page views',
        'US/UK/CA/AU traffic',
        'Quality content review'
      ]
    },
    {
      id: 'taboola',
      name: 'Taboola',
      cpmRange: '$8-20',
      fillRate: '95%',
      payment: 'NET-30',
      minPayout: '$50',
      difficulty: 'Hard',
      signupUrl: 'https://www.taboola.com',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Premium content discovery',
        'High-quality advertisers',
        'Advanced targeting',
        'Brand partnerships',
        'Global reach'
      ],
      requirements: [
        '500K+ monthly page views',
        'Premium content quality',
        'Strict approval process'
      ]
    },
    {
      id: 'outbrain',
      name: 'Outbrain',
      cpmRange: '$6-18',
      fillRate: '90%',
      payment: 'NET-30',
      minPayout: '$50',
      difficulty: 'Hard',
      signupUrl: 'https://www.outbrain.com',
      isConfigured: false,
      publisherId: '',
      zoneId: '',
      adCode: '',
      apiKey: '',
      benefits: [
        'Content discovery platform',
        'Premium publisher network',
        'High engagement rates',
        'Brand-safe environment',
        'Native ad integration'
      ],
      requirements: [
        '1M+ monthly page views',
        'Premium content standards',
        'Editorial review process'
      ]
    }
  ]);

  const updateNetworkConfig = (networkId: string, field: keyof NetworkConfiguration, value: string | boolean) => {
    setNetworks(prev => prev.map(network => 
      network.id === networkId 
        ? { ...network, [field]: value }
        : network
    ));
  };

  const generateNetworkCode = (network: NetworkConfiguration) => {
    if (!network.publisherId || !network.zoneId) {
      return '<!-- Please configure Publisher ID and Zone ID first -->';
    }

    switch (network.id) {
      case 'adsterra':
        return `<!-- Adsterra Ad Code -->
<script type="text/javascript">
  atOptions = {
    'key': '${network.zoneId}',
    'format': 'iframe',
    'height': 250,
    'width': 300,
    'params': {}
  };
  document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.profitablecpmrate.com/${network.publisherId}/invoke.js"></scr' + 'ipt>');
</script>`;

      case 'adsense':
        return `<!-- Google AdSense Code -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${network.publisherId}" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-${network.publisherId}"
     data-ad-slot="${network.zoneId}"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

      case 'propellerads':
        return `<!-- PropellerAds Code -->
<script>
(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('${network.publisherId}.propellerclick.com','${network.zoneId}',document.createElement('script'))
</script>`;

      case 'meta':
        return `<!-- Meta Audience Network Code -->
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId: '${network.publisherId}',
      xfbml: true,
      version: 'v18.0'
    });
  };
</script>
<div class="fb-ad" data-placementid="${network.zoneId}" data-format="320x50" data-testmode="false"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>`;

      case 'connatix':
        return `<!-- Connatix Video Player -->
<div id="connatix_${network.zoneId}"></div>
<script type="text/javascript">
  (function() {
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.async = true;
    c.src = 'https://cdn.connatix.com/min/connatix.playspace.js';
    c.onload = function() {
      cnx({
        playerId: "${network.zoneId}",
        mediaId: "${network.publisherId}"
      }).render();
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(c, s);
  })();
</script>`;

      case 'ezoic':
        return `<!-- Ezoic Ad Code -->
<div id="ezoic-pub-ad-placeholder-${network.zoneId}"></div>
<script>
  if (typeof ezstandalone !== 'undefined') {
    ezstandalone.cmd.push(function() {
      ezstandalone.define(${network.zoneId});
      ezstandalone.enable();
      ezstandalone.display();
    });
  }
</script>`;

      case 'mediavine':
        return `<!-- Mediavine Ad Code -->
<div id="mv-${network.zoneId}" class="mv-ad" data-mv-id="${network.zoneId}"></div>
<script>
  (function() {
    window.mediavine = window.mediavine || {};
    window.mediavine.que = window.mediavine.que || [];
    window.mediavine.settings = {
      publisherId: "${network.publisherId}",
      enableLazyLoading: true
    };
    var script = document.createElement('script');
    script.src = 'https://scripts.mediavine.com/tags/${network.publisherId}.js';
    document.head.appendChild(script);
  })();
</script>`;

      case 'vdo':
        return `<!-- VDO.ai Video Ad Code -->
<div id="vdo-${network.zoneId}"></div>
<script>
  (function() {
    var vdo = document.createElement('script');
    vdo.type = 'text/javascript';
    vdo.async = true;
    vdo.src = 'https://delivery.vidible.tv/jsonp/pid=${network.publisherId}/vid=${network.zoneId}.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(vdo, s);
  })();
</script>`;

      case 'exoclick':
        return `<!-- ExoClick Ad Code -->
<script type="text/javascript">
  var idzer_config = {
    z: ${network.zoneId},
    w: 300,
    h: 250
  };
</script>
<script type="text/javascript" src="https://a.exdynsrv.com/ad-provider.js"></script>`;

      case 'monumetric':
        return `<!-- Monumetric Ad Code -->
<div id="monumetric_${network.zoneId}"></div>
<script>
  window.MonumetricAds = window.MonumetricAds || [];
  MonumetricAds.push({
    element: 'monumetric_${network.zoneId}',
    publisherId: '${network.publisherId}',
    zoneId: '${network.zoneId}'
  });
  (function() {
    var script = document.createElement('script');
    script.src = 'https://d2j1bgkwypbqxy.cloudfront.net/${network.publisherId}.js';
    document.head.appendChild(script);
  })();
</script>`;

      case 'adthrive':
        return `<!-- AdThrive Ad Code -->
<div id="adthrive-${network.zoneId}" class="adthrive-ad" data-google-query-id="">
  <script>
    (function() {
      window.adthrive = window.adthrive || {};
      window.adthrive.cmd = window.adthrive.cmd || [];
      window.adthrive.plugin = 'adthrive-ads-${network.publisherId}';
      window.adthrive.host = 'ads.adthrive.com';
      var script = document.createElement('script');
      script.async = true;
      script.referrerPolicy = 'no-referrer-when-downgrade';
      script.src = 'https://www.googletagservices.com/tag/js/gpt.js';
      document.head.appendChild(script);
    })();
  </script>
</div>`;

      case 'sovrn':
        return `<!-- Sovrn //Commerce Ad Code -->
<div id="sovrn_${network.zoneId}"></div>
<script>
  (function() {
    var sovrn = document.createElement('script');
    sovrn.type = 'text/javascript';
    sovrn.async = true;
    sovrn.src = 'https://ap.lijit.com/www/delivery/fpi.js?z=${network.zoneId}&width=300&height=250';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(sovrn, s);
  })();
</script>`;

      case 'hilltopads':
        return `<!-- HilltopAds Code -->
<script type="text/javascript">
  var ht_config = {
    publisher: '${network.publisherId}',
    zone: '${network.zoneId}',
    width: 300,
    height: 250,
    anti_adblock: true
  };
</script>
<script type="text/javascript" src="https://hilltopads.com/js/ht.js"></script>`;

      case 'medianet':
        return `<!-- Media.net Ad Code -->
<div id="medianet-${network.zoneId}"></div>
<script type="text/javascript">
  window._mNHandle = window._mNHandle || {};
  window._mNHandle.queue = window._mNHandle.queue || [];
  medianet_width = '300';
  medianet_height = '250';
  medianet_crid = '${network.zoneId}';
  medianet_versionId = '${network.publisherId}';
</script>
<script type="text/javascript" src="https://contextual.media.net/networkjs/dmedianet.js?crid=${network.zoneId}&dmnid=${network.publisherId}"></script>`;

      case 'amazon':
        return `<!-- Amazon Publisher Services -->
<script>
  !function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q("f",arguments)},setDisplayBids:function(){q("b",arguments)},targetingKeys:function(){return[]},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");
  apstag.init({
    pubID: '${network.publisherId}',
    adServer: 'googletag'
  });
</script>
<div id="amazon-${network.zoneId}"></div>`;

      case 'mgid':
        return `<!-- MGID Native Ad Code -->
<div id="mgid-${network.zoneId}"></div>
<script type="text/javascript">
  (function() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://jsc.mgid.com/widget/${network.publisherId}/${network.zoneId}.js';
    document.head.appendChild(script);
  })();
</script>`;

      case 'revcontent':
        return `<!-- RevContent Native Ad Code -->
<div id="rc-${network.zoneId}"></div>
<script type="text/javascript">
  var rcds = {};
  rcds['${network.zoneId}'] = {
    'id': '${network.zoneId}',
    'placement': 'content',
    'target': 'rc-${network.zoneId}',
    'callback': function(api) {
      api.render(document.getElementById('rc-${network.zoneId}'));
    }
  };
  (function() {
    var script = document.createElement('script');
    script.src = 'https://trends.revcontent.com/serve.js.php?w=${network.publisherId}';
    document.head.appendChild(script);
  })();
</script>`;

      case 'taboola':
        return `<!-- Taboola Content Discovery -->
<div id="taboola-${network.zoneId}"></div>
<script type="text/javascript">
  window._taboola = window._taboola || [];
  _taboola.push({
    mode: 'thumbnails-a',
    container: 'taboola-${network.zoneId}',
    placement: '${network.zoneId}',
    target_type: 'mix'
  });
  (function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.taboola.com/libtrc/${network.publisherId}/loader.js';
    document.head.appendChild(script);
  })();
</script>`;

      case 'outbrain':
        return `<!-- Outbrain Content Discovery -->
<div class="OUTBRAIN" data-src="${network.publisherId}" data-widget-id="${network.zoneId}"></div>
<script type="text/javascript" async="async" src="https://widgets.outbrain.com/outbrain.js"></script>`;

      default:
        return '<!-- Ad code will be generated when network is properly configured -->';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-600" />
            Ad Network Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure and manage multiple advertising networks for maximum revenue
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-100 text-blue-800">
            <Globe className="h-3 w-3 mr-1" />
            {networks.length} Networks
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            {networks.filter(n => n.isConfigured).length} Configured
          </Badge>
        </div>
      </div>

      {/* Quick Comparison */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Network Comparison Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800">Highest CPM</h4>
            <p className="text-2xl font-bold text-green-600">AdThrive</p>
            <p className="text-sm text-gray-600">Up to $40</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800">Easiest Approval</h4>
            <p className="text-2xl font-bold text-blue-600">ExoClick</p>
            <p className="text-sm text-gray-600">Instant approval</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800">Best Fill Rate</h4>
            <p className="text-2xl font-bold text-purple-600">ExoClick</p>
            <p className="text-sm text-gray-600">100% guaranteed</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <h4 className="font-medium text-orange-800">Most Networks</h4>
            <p className="text-2xl font-bold text-orange-600">20 Options</p>
            <p className="text-sm text-gray-600">Complete selection</p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Network Overview</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="implementation">Implementation Guide</TabsTrigger>
          <TabsTrigger value="adsterra">Adsterra Management</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {networks.map((network) => (
              <Card key={network.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {network.name}
                      {network.isConfigured ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getDifficultyColor(network.difficulty)}>
                        {network.difficulty}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        {network.fillRate} Fill
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">{network.cpmRange}</p>
                    <p className="text-sm text-gray-500">CPM Range</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Payment Terms</p>
                    <p className="font-medium">{network.payment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Min Payout</p>
                    <p className="font-medium">{network.minPayout}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-green-700 mb-1">Key Benefits:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {network.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-orange-700 mb-1">Requirements:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {network.requirements.slice(0, 2).map((req, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 text-orange-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(network.signupUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button 
                    size="sm" 
                    variant={network.isConfigured ? "default" : "secondary"}
                    onClick={() => {
                      // Switch to configuration tab
                      const tabTrigger = document.querySelector('[data-state="inactive"][value="configuration"]') as HTMLButtonElement;
                      if (tabTrigger) {
                        tabTrigger.click();
                        // Scroll to the specific network configuration
                        setTimeout(() => {
                          const networkCard = document.getElementById(`config-${network.id}`);
                          if (networkCard) {
                            networkCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            networkCard.style.border = '2px solid #3b82f6';
                            setTimeout(() => {
                              networkCard.style.border = '';
                            }, 3000);
                          }
                        }, 100);
                      }
                    }}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {network.isConfigured ? 'Configured' : 'Configure'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="configuration" className="space-y-6">
          {networks.map((network) => (
            <Card key={network.id} id={`config-${network.id}`} className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {network.name} Configuration
                {network.isConfigured ? (
                  <Badge className="bg-green-100 text-green-800">Configured</Badge>
                ) : (
                  <Badge className="bg-orange-100 text-orange-800">Needs Setup</Badge>
                )}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Publisher ID</Label>
                    <Input
                      value={network.publisherId}
                      onChange={(e) => updateNetworkConfig(network.id, 'publisherId', e.target.value)}
                      placeholder={`Enter your ${network.name} Publisher ID`}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Zone/Slot ID</Label>
                    <Input
                      value={network.zoneId}
                      onChange={(e) => updateNetworkConfig(network.id, 'zoneId', e.target.value)}
                      placeholder={`Enter your ${network.name} Zone/Slot ID`}
                    />
                  </div>

                  {network.id === 'adsterra' && (
                    <div>
                      <Label className="text-sm font-medium">API Key (Optional)</Label>
                      <Input
                        value={network.apiKey}
                        onChange={(e) => updateNetworkConfig(network.id, 'apiKey', e.target.value)}
                        placeholder="Enter API key for analytics"
                        type="password"
                      />
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      if (network.publisherId && network.zoneId) {
                        updateNetworkConfig(network.id, 'isConfigured', true);
                        // Show success message
                        const toast = document.createElement('div');
                        toast.textContent = `${network.name} configured successfully!`;
                        toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; z-index: 10000; font-weight: 500;';
                        document.body.appendChild(toast);
                        setTimeout(() => toast.remove(), 3000);
                      }
                    }}
                    disabled={!network.publisherId || !network.zoneId}
                    className="w-full"
                  >
                    Save Configuration
                  </Button>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Generated Ad Code</Label>
                  <Textarea
                    value={generateNetworkCode(network)}
                    className="font-mono text-sm h-48"
                    readOnly
                  />
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => {
                      navigator.clipboard.writeText(generateNetworkCode(network));
                      // Show success toast
                      const toast = document.createElement('div');
                      toast.textContent = 'Ad code copied to clipboard!';
                      toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; z-index: 10000; font-weight: 500;';
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 3000);
                    }}
                    disabled={!network.publisherId || !network.zoneId}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Implementation Guide Tab */}
        <TabsContent value="implementation" className="space-y-6">
          <VideoImplementationGuide />
        </TabsContent>

        {/* Adsterra Management Tab */}
        <TabsContent value="adsterra" className="space-y-6">
          <AdsterraManagementGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
}