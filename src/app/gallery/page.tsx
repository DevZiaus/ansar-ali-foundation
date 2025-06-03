import Image from 'next/image';
import { PageTitle } from '@/components/shared/PageTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Video } from 'lucide-react';

const photos = [
  { id: 1, src: 'https://placehold.co/600x400.png', alt: 'Charity event photo 1', dataAiHint: 'charity event' },
  { id: 2, src: 'https://placehold.co/600x400.png', alt: 'Community support photo 1', dataAiHint: 'community support' },
  { id: 3, src: 'https://placehold.co/600x400.png', alt: 'Educational program photo 1', dataAiHint: 'education program' },
  { id: 4, src: 'https://placehold.co/600x400.png', alt: 'Healthcare initiative photo 1', dataAiHint: 'healthcare initiative' },
  { id: 5, src: 'https://placehold.co/600x400.png', alt: 'Volunteer activity photo 1', dataAiHint: 'volunteer activity' },
  { id: 6, src: 'https://placehold.co/600x400.png', alt: 'Fundraising gala photo 1', dataAiHint: 'fundraising gala' },
];

const videos = [
  { id: 1, thumbnailUrl: 'https://placehold.co/600x400.png', title: 'Our Mission in Action', dataAiHint: 'mission video' },
  { id: 2, thumbnailUrl: 'https://placehold.co/600x400.png', title: 'Community Impact Stories', dataAiHint: 'community stories' },
  { id: 3, thumbnailUrl: 'https://placehold.co/600x400.png', title: 'A Day with Our Volunteers', dataAiHint: 'volunteer documentary' },
];

export default function GalleryPage() {
  return (
    <div className="space-y-16">
      <PageTitle>Our Gallery</PageTitle>

      <section>
        <h2 className="text-2xl font-headline font-semibold text-foreground mb-6 flex items-center">
          <Camera className="w-7 h-7 mr-3 text-primary" /> Photo Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative aspect-video">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={photo.dataAiHint}
                  className="transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-semibold text-foreground mb-6 flex items-center">
          <Video className="w-7 h-7 mr-3 text-primary" /> Video Stories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={video.dataAiHint}
                  className="transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Video className="w-12 h-12 text-white" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-md font-medium text-foreground truncate">{video.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground text-center">
          Note: Videos are represented by thumbnails. Actual video playback functionality from Cloudinary would be implemented with backend integration.
        </p>
      </section>
    </div>
  );
}
