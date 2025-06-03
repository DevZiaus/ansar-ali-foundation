
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PageTitle } from '@/components/shared/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Trash2, Camera, Video } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl?: string; // For videos
  alt: string;
  dataAiHint: string;
}

const initialPhotos: MediaItem[] = [
  { id: 'p1', type: 'photo', url: 'https://placehold.co/600x400.png?text=Photo1', alt: 'Uploaded photo 1', dataAiHint: 'landscape nature' },
  { id: 'p2', type: 'photo', url: 'https://placehold.co/600x400.png?text=Photo2', alt: 'Uploaded photo 2', dataAiHint: 'cityscape urban' },
];
const initialVideos: MediaItem[] = [
  { id: 'v1', type: 'video', url: 'https://example.com/video1.mp4', thumbnailUrl: 'https://placehold.co/600x400.png?text=VideoThumb1', alt: 'Uploaded video 1', dataAiHint: 'short film' },
];

export default function MediaManagementPage() {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<MediaItem[]>(initialPhotos);
  const [videos, setVideos] = useState<MediaItem[]>(initialVideos);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  const handlePhotoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPhotoFile(null);
      setPhotoPreview(null);
    }
  };

  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    } else {
      setVideoFile(null);
    }
  };

  const handleUpload = async (type: 'photo' | 'video') => {
    const file = type === 'photo' ? photoFile : videoFile;
    if (!file) {
      toast({ variant: 'destructive', title: 'No file selected', description: `Please select a ${type} to upload.` });
      return;
    }

    if (type === 'photo') setIsUploadingPhoto(true);
    else setIsUploadingVideo(true);

    // Simulate API call for upload (e.g., to Cloudinary)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newMediaItem: MediaItem = {
      id: `${type.charAt(0)}${Date.now()}`,
      type: type,
      url: URL.createObjectURL(file), // In real app, this would be the Cloudinary URL
      thumbnailUrl: type === 'video' ? 'https://placehold.co/600x400.png?text=NewVideo' : undefined,
      alt: `Uploaded ${type} - ${file.name}`,
      dataAiHint: type === 'photo' ? 'new image' : 'new video'
    };

    if (type === 'photo') {
      setPhotos(prev => [newMediaItem, ...prev]);
      setPhotoFile(null);
      setPhotoPreview(null);
      setIsUploadingPhoto(false);
    } else {
      setVideos(prev => [newMediaItem, ...prev]);
      setVideoFile(null);
      setIsUploadingVideo(false);
    }

    toast({ title: `${type.charAt(0).toUpperCase() + type.slice(1)} Uploaded`, description: `${file.name} has been uploaded successfully (mocked).` });
  };

  const handleDelete = async (id: string, type: 'photo' | 'video') => {
    // Simulate API call for deletion
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (type === 'photo') {
      setPhotos(prev => prev.filter(p => p.id !== id));
    } else {
      setVideos(prev => prev.filter(v => v.id !== id));
    }
    toast({ title: 'Media Deleted', description: `The ${type} has been deleted successfully (mocked).` });
  };
  
  const MediaGrid = ({ items, type, onDelete }: { items: MediaItem[], type: 'photo' | 'video', onDelete: (id: string, type: 'photo' | 'video') => void }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map(item => (
        <Card key={item.id} className="overflow-hidden group">
          <CardContent className="p-0">
            <div className="relative aspect-video">
              <Image 
                src={item.type === 'photo' ? item.url : item.thumbnailUrl || item.url} 
                alt={item.alt} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={item.dataAiHint}
              />
              {item.type === 'video' && (
                 <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Video className="w-12 h-12 text-white" />
                 </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-2 justify-between items-center">
            <p className="text-xs text-muted-foreground truncate w-3/4" title={item.alt}>{item.alt}</p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="h-7 w-7">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the {type}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(item.id, type)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
      {items.length === 0 && <p className="text-muted-foreground col-span-full text-center py-4">No {type}s found.</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <PageTitle>Media Management</PageTitle>
      <Tabs defaultValue="photos">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2">
          <TabsTrigger value="photos"><Camera className="mr-2 h-4 w-4" /> Photos</TabsTrigger>
          <TabsTrigger value="videos"><Video className="mr-2 h-4 w-4" /> Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="photos">
          <Card className="shadow-md mt-4">
            <CardHeader>
              <CardTitle>Upload New Photo</CardTitle>
              <CardDescription>Add a new photo to the gallery.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {photoPreview && (
                <div className="my-2">
                  <img src={photoPreview} alt="Photo preview" className="max-h-48 object-contain border p-1 rounded" data-ai-hint="image preview"/>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Input id="photoFile" type="file" accept="image/*" onChange={handlePhotoFileChange} className="hidden"/>
                <Button type="button" variant="outline" onClick={() => document.getElementById('photoFile')?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Select Photo
                </Button>
                {photoFile && <span className="text-sm text-muted-foreground">{photoFile.name}</span>}
              </div>
              <Button onClick={() => handleUpload('photo')} disabled={!photoFile || isUploadingPhoto}>
                {isUploadingPhoto ? 'Uploading...' : 'Upload Photo'}
              </Button>
            </CardContent>
            <CardHeader>
              <CardTitle>Existing Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <MediaGrid items={photos} type="photo" onDelete={handleDelete} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="videos">
          <Card className="shadow-md mt-4">
            <CardHeader>
              <CardTitle>Upload New Video</CardTitle>
              <CardDescription>Add a new video to the gallery.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-2">
                <Input id="videoFile" type="file" accept="video/*" onChange={handleVideoFileChange} className="hidden"/>
                 <Button type="button" variant="outline" onClick={() => document.getElementById('videoFile')?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Select Video
                </Button>
                {videoFile && <span className="text-sm text-muted-foreground">{videoFile.name}</span>}
              </div>
              <Button onClick={() => handleUpload('video')} disabled={!videoFile || isUploadingVideo}>
                {isUploadingVideo ? 'Uploading...' : 'Upload Video'}
              </Button>
            </CardContent>
            <CardHeader>
              <CardTitle>Existing Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <MediaGrid items={videos} type="video" onDelete={handleDelete} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <p className="text-xs text-muted-foreground text-center pt-4">
        Note: Media uploads and storage would use a service like Cloudinary in a production app. This is a mocked UI.
      </p>
    </div>
  );
}
