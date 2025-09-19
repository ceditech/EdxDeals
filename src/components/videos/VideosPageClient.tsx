'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Package, Search, Filter, TrendingUp } from 'lucide-react';
import VideoCard from '@/components/videos/VideoCard';
import FeaturedVideoCarousel from '@/components/videos/FeaturedVideoCarousel';
import FeaturedProductsCarousel from '@/components/videos/FeaturedProductsCarousel';
import UploadVideoModal from '@/components/videos/UploadVideoModal';
import VideoPlayerModal from '@/components/videos/VideoPlayerModal';

// Video interface
interface Video {
  id: string;
  title: string;
  description: string;
  uploader: string;
  uploaderId: string;
  uploadDate: string;
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
  category: 'demo' | 'review' | 'unboxing' | 'tutorial' | 'testimonial';
  linkedProductId?: string;
  linkedProductName?: string;
  linkedProductPrice?: string;
  viewCount: number;
  likeCount: number;
  duration: string;
  status: 'pending' | 'approved';
  isAiGenerated?: boolean;
}

// Mock data for videos
const mockVideos: Video[] = [
  {
    id: 'video-1',
    title: 'Wireless Headphones Pro - Complete Review & Sound Test',
    description: 'In-depth review of the Wireless Headphones Pro featuring sound quality tests, noise cancellation demo, and battery life analysis.',
    uploader: 'TechReviewer',
    uploaderId: 'user-1',
    uploadDate: '2024-01-15',
    videoUrl: 'https://example.com/video1',
    thumbnailUrl: '/images/videos/headphones-review-thumb.jpg',
    tags: ['headphones', 'audio', 'wireless', 'review'],
    category: 'review',
    linkedProductId: 'elec-001',
    linkedProductName: 'Wireless Bluetooth Headphones Pro',
    linkedProductPrice: '$129.99',
    viewCount: 15600,
    likeCount: 1240,
    duration: '8:45',
    status: 'approved',
    isAiGenerated: false
  },
  {
    id: 'video-2',
    title: 'Smart Fitness Tracker - AI Health Analysis Demo',
    description: 'Comprehensive demonstration of the Smart Fitness Tracker\'s AI-powered health monitoring features.',
    uploader: 'FitnessGuru',
    uploaderId: 'user-2',
    uploadDate: '2024-01-12',
    videoUrl: 'https://example.com/video2',
    thumbnailUrl: '/images/videos/fitness-tracker-demo-thumb.jpg',
    tags: ['fitness', 'health', 'smartwatch', 'AI'],
    category: 'demo',
    linkedProductId: 'elec-002',
    linkedProductName: 'Smart Fitness Tracker Watch',
    linkedProductPrice: '$89.99',
    viewCount: 12400,
    likeCount: 980,
    duration: '6:32',
    status: 'approved',
    isAiGenerated: true
  },
  {
    id: 'video-3',
    title: 'Smart LED Bulbs Setup & Features Walkthrough',
    description: 'Step-by-step tutorial on setting up Smart LED Bulbs and exploring all available features.',
    uploader: 'SmartHomePro',
    uploaderId: 'user-3',
    uploadDate: '2024-01-10',
    videoUrl: 'https://example.com/video3',
    thumbnailUrl: '/images/videos/led-bulbs-tutorial-thumb.jpg',
    tags: ['smart home', 'LED', 'lighting', 'setup'],
    category: 'tutorial',
    linkedProductId: 'home-001',
    linkedProductName: 'Smart LED Light Bulbs Set',
    linkedProductPrice: '$39.99',
    viewCount: 8900,
    likeCount: 720,
    duration: '5:18',
    status: 'approved',
    isAiGenerated: false
  },
  {
    id: 'video-4',
    title: 'Gaming Mouse Unboxing & First Impressions',
    description: 'Unboxing the new Wireless Gaming Mouse and sharing first impressions of build quality and features.',
    uploader: 'GamerUnboxer',
    uploaderId: 'user-4',
    uploadDate: '2024-01-08',
    videoUrl: 'https://example.com/video4',
    thumbnailUrl: '/images/videos/gaming-mouse-unbox-thumb.jpg',
    tags: ['gaming', 'mouse', 'unboxing', 'peripherals'],
    category: 'unboxing',
    linkedProductId: '4',
    linkedProductName: 'Wireless Gaming Mouse',
    linkedProductPrice: '$59.99',
    viewCount: 11200,
    likeCount: 890,
    duration: '7:22',
    status: 'approved',
    isAiGenerated: false
  },
  {
    id: 'video-5',
    title: 'Customer Testimonial - Portable Speaker Experience',
    description: 'Real customer sharing their experience with the Portable Bluetooth Speaker after 6 months of use.',
    uploader: 'HappyCustomer',
    uploaderId: 'user-5',
    uploadDate: '2024-01-05',
    videoUrl: 'https://example.com/video5',
    thumbnailUrl: '/images/videos/speaker-testimonial-thumb.jpg',
    tags: ['testimonial', 'speaker', 'bluetooth', 'customer'],
    category: 'testimonial',
    linkedProductId: '5',
    linkedProductName: 'Portable Bluetooth Speaker',
    linkedProductPrice: '$89.99',
    viewCount: 6800,
    likeCount: 540,
    duration: '4:15',
    status: 'approved',
    isAiGenerated: false
  },
  {
    id: 'video-6',
    title: 'Laptop Stand - Ergonomic Benefits Demo',
    description: 'Demonstrating the ergonomic benefits and setup process of the Adjustable Laptop Stand.',
    uploader: 'OfficeSetupPro',
    uploaderId: 'user-6',
    uploadDate: '2024-01-03',
    videoUrl: 'https://example.com/video6',
    thumbnailUrl: '/images/videos/laptop-stand-demo-thumb.jpg',
    tags: ['office', 'ergonomic', 'laptop', 'productivity'],
    category: 'demo',
    linkedProductId: '6',
    linkedProductName: 'Laptop Stand Adjustable',
    linkedProductPrice: '$39.99',
    viewCount: 9500,
    likeCount: 760,
    duration: '4:56',
    status: 'approved',
    isAiGenerated: true
  }
];

const categories = [
  { value: 'all', label: 'All Videos', count: mockVideos.length },
  { value: 'demo', label: 'Demos', count: mockVideos.filter(v => v.category === 'demo').length },
  { value: 'review', label: 'Reviews', count: mockVideos.filter(v => v.category === 'review').length },
  { value: 'unboxing', label: 'Unboxings', count: mockVideos.filter(v => v.category === 'unboxing').length },
  { value: 'tutorial', label: 'Tutorials', count: mockVideos.filter(v => v.category === 'tutorial').length },
  { value: 'testimonial', label: 'Testimonials', count: mockVideos.filter(v => v.category === 'testimonial').length },
  { value: 'trending', label: 'Trending', count: mockVideos.filter(v => v.viewCount > 10000).length },
];

export default function VideosPageClient() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(mockVideos);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Filter and sort videos
  useEffect(() => {
    let filtered = videos;

    // Filter by category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'trending') {
        filtered = filtered.filter(video => video.viewCount > 10000);
      } else {
        filtered = filtered.filter(video => video.category === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort videos
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
        break;
      case 'views':
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'trending':
        filtered.sort((a, b) => (b.viewCount + b.likeCount * 10) - (a.viewCount + a.likeCount * 10));
        break;
    }

    setFilteredVideos(filtered);
  }, [videos, selectedCategory, searchQuery, sortBy]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setPlayerModalOpen(true);
  };

  const featuredVideos = videos.filter(video => video.viewCount > 10000).slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-indigo-500 p-3 rounded-full">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Watch. Discover. Shop.
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Product demos, reviews, unboxings, and more. See EdxDeals in action.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 text-lg"
                onClick={() => setUploadModalOpen(true)}
              >
                <Package className="w-5 h-5 mr-2" />
                Submit a Video
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-3 text-lg"
                onClick={() => document.getElementById('video-gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-5 h-5 mr-2" />
                Explore All Videos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Carousel */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Videos</h2>
            <p className="text-muted-foreground">Discover our most popular and trending video content</p>
          </div>
          <FeaturedVideoCarousel videos={featuredVideos} onVideoClick={handleVideoClick} />
        </div>
      </section>

      {/* Video Categories */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={selectedCategory === category.value ? 'bg-indigo-500 hover:bg-indigo-600' : ''}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Find a video..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Grid */}
      <section id="video-gallery" className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {selectedCategory === 'all' ? 'All Videos' : categories.find(c => c.value === selectedCategory)?.label}
            </h2>
            <Badge variant="outline" className="text-sm">
              {filteredVideos.length} videos
            </Badge>
          </div>
          
          {filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
                <Play className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No videos found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleVideoClick(video)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products from Videos</h2>
            <p className="text-muted-foreground">Discover the products showcased in our video content</p>
          </div>
          
          <FeaturedProductsCarousel videoCount={videos.length} />
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="px-8">
              View All Featured Products
            </Button>
          </div>
        </div>
      </section>

      {/* Third Party Ads Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Partners & Sponsors</h2>
            <p className="text-muted-foreground">Discover amazing deals from our trusted partners</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Partner/Affiliate Ads */}
            {[
              {
                id: 'partner-1',
                title: 'Amazon Prime Day Deals',
                description: 'Exclusive discounts on electronics, home goods, and more. Limited time offers!',
                image: '/images/ads/amazon-prime.jpg',
                badge: 'PARTNER',
                badgeColor: 'bg-orange-500',
                cta: 'Shop Amazon',
                url: 'https://amazon.com'
              },
              {
                id: 'partner-2',
                title: 'Best Buy Tech Savings',
                description: 'Latest gadgets and electronics at unbeatable prices. Free shipping available.',
                image: '/images/ads/bestbuy.jpg',
                badge: 'AFFILIATE',
                badgeColor: 'bg-blue-500',
                cta: 'Visit Best Buy',
                url: 'https://bestbuy.com'
              },
              {
                id: 'partner-3',
                title: 'Target Home Essentials',
                description: 'Transform your home with stylish and affordable home essentials.',
                image: '/images/ads/target.jpg',
                badge: 'SPONSOR',
                badgeColor: 'bg-red-500',
                cta: 'Shop Target',
                url: 'https://target.com'
              }
            ].map((ad) => (
              <div key={ad.id} className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Partner Advertisement</p>
                    </div>
                  </div>
                  <Badge className={`absolute top-3 left-3 text-white ${ad.badgeColor}`}>
                    {ad.badge}
                  </Badge>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                    {ad.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {ad.description}
                  </p>
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    {ad.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* AdSense Placeholder */}
          <div className="bg-muted/20 border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
            <div className="max-w-md mx-auto">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Google AdSense</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This space is reserved for Google AdSense advertisements. Ads will be displayed here once AdSense is configured.
              </p>
              <div className="bg-muted/30 rounded p-4">
                <p className="text-xs text-muted-foreground">
                  Ad Placeholder - 728x90 Leaderboard
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              Advertisement • These are promotional content from our partners
            </p>
          </div>
        </div>
      </section>

      {/* Floating Upload Button */}
      <Button
        className="fixed bottom-6 right-6 z-50 shadow-lg bg-indigo-500 hover:bg-indigo-600 text-white rounded-full w-14 h-14 md:w-auto md:h-auto md:rounded-lg md:px-4 md:py-2"
        onClick={() => setUploadModalOpen(true)}
      >
        <Package className="w-6 h-6 md:w-4 md:h-4 md:mr-2" />
        <span className="hidden md:inline">Submit Video</span>
      </Button>

      {/* Modals */}
      <UploadVideoModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
      <VideoPlayerModal 
        open={playerModalOpen} 
        onOpenChange={setPlayerModalOpen}
        video={selectedVideo}
      />
    </div>
  );
}