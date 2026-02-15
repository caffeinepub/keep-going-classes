import { ExternalLink, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useYouTubeChannelFeed } from '../../hooks/youtube/useYouTubeChannelFeed';
import { YOUTUBE_CONFIG } from '../../config/youtube';

export default function YouTubePage() {
  const { data: videos, isLoading, isError } = useYouTubeChannelFeed();

  const handleVideoClick = (videoLink: string) => {
    window.open(videoLink, '_blank', 'noopener,noreferrer');
  };

  const handleChannelClick = () => {
    window.open(YOUTUBE_CONFIG.channelUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Youtube className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">YouTube</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our educational videos, tutorials, and exam preparation content
          </p>
          <Button
            onClick={handleChannelClick}
            variant="outline"
            className="mt-6"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Our Channel
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader className="p-0">
                  <Skeleton className="w-full h-48 rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State / Fallback */}
        {(isError || (!isLoading && (!videos || videos.length === 0))) && (
          <div className="max-w-2xl mx-auto">
            <Alert className="mb-6">
              <Youtube className="h-4 w-4" />
              <AlertDescription>
                Unable to load videos at this time. Please visit our YouTube channel directly to watch our latest content.
              </AlertDescription>
            </Alert>
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Watch Our Videos on YouTube</CardTitle>
                <CardDescription>
                  Click the button below to visit our channel and explore all our educational content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleChannelClick}
                  size="lg"
                  className="gap-2"
                >
                  <Youtube className="h-5 w-5" />
                  Open YouTube Channel
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Videos Grid */}
        {!isLoading && videos && videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card
                key={video.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleVideoClick(video.link)}
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Youtube className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-base line-clamp-2 mb-2">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {new Date(video.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
