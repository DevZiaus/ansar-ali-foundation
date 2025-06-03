
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PageTitle } from '@/components/shared/PageTitle';
import { Upload } from 'lucide-react';

// Helper function to convert HSL string to object and vice-versa
const parseHslString = (hslString: string): { h: number; s: number; l: number } => {
  const match = hslString.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (match) {
    return { h: parseInt(match[1]), s: parseInt(match[2]), l: parseInt(match[3]) };
  }
  return { h: 0, s: 0, l: 0 }; // Default if parsing fails
};

const formatHslToString = (hslObj: { h: number; s: number; l: number }): string => {
  return `${hslObj.h} ${hslObj.s}% ${hslObj.l}%`;
};


export default function SiteSettingsPage() {
  const { toast } = useToast();
  const [siteTitle, setSiteTitle] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const [backgroundColor, setBackgroundColor] = useState({ h: 210, s: 100, l: 97 });
  const [foregroundColor, setForegroundColor] = useState({ h: 180, s: 25, l: 37 });
  const [primaryColor, setPrimaryColor] = useState({ h: 210, s: 98, l: 73 });
  const [accentColor, setAccentColor] = useState({ h: 120, s: 25, l: 65 });
  
  const [isLoading, setIsLoading] = useState(false);

  // Load existing settings from localStorage (or API in real app)
  useEffect(() => {
    setSiteTitle(localStorage.getItem('siteTitle') || 'AnsarConnect - Ansar Ali Foundation');
    const storedBg = localStorage.getItem('backgroundColor');
    if (storedBg) setBackgroundColor(parseHslString(storedBg));
    const storedFg = localStorage.getItem('foregroundColor');
    if (storedFg) setForegroundColor(parseHslString(storedFg));
    const storedPrimary = localStorage.getItem('primaryColor');
    if (storedPrimary) setPrimaryColor(parseHslString(storedPrimary));
    const storedAccent = localStorage.getItem('accentColor');
    if (storedAccent) setAccentColor(parseHslString(storedAccent));
    
    // For logo, you'd fetch URL or use a default
    setLogoPreview(localStorage.getItem('logoPreview') || 'https://placehold.co/150x50.png?text=YourLogo');
  }, []);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (colorSetter: React.Dispatch<React.SetStateAction<{h:number, s:number, l:number}>>, component: 'h' | 's' | 'l', value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
        colorSetter(prev => ({...prev, [component]: numValue}));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, upload logoFile to storage (e.g., Cloudinary, Firebase Storage)
    // and save all settings to a database.
    localStorage.setItem('siteTitle', siteTitle);
    if (logoPreview) localStorage.setItem('logoPreview', logoPreview); // Store preview URL or uploaded URL
    
    localStorage.setItem('backgroundColor', formatHslToString(backgroundColor));
    localStorage.setItem('foregroundColor', formatHslToString(foregroundColor));
    localStorage.setItem('primaryColor', formatHslToString(primaryColor));
    localStorage.setItem('accentColor', formatHslToString(accentColor));

    // This would dynamically update globals.css or similar in a full app
    // For demo, we just show a success message.
    document.documentElement.style.setProperty('--background', formatHslToString(backgroundColor));
    document.documentElement.style.setProperty('--foreground', formatHslToString(foregroundColor));
    document.documentElement.style.setProperty('--primary', formatHslToString(primaryColor));
    document.documentElement.style.setProperty('--accent', formatHslToString(accentColor));


    toast({
      title: 'Settings Updated',
      description: 'Site settings have been saved successfully. (Theme update is visual for this demo)',
    });
    setIsLoading(false);
  };

  const ColorInputGroup = ({ label, color, setColor }: { label: string, color: {h:number,s:number,l:number}, setColor: React.Dispatch<React.SetStateAction<{h:number,s:number,l:number}>> }) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-2">
            <Input type="number" value={color.h} onChange={e => handleColorChange(setColor, 'h', e.target.value)} placeholder="H" max={360} min={0} />
            <Input type="number" value={color.s} onChange={e => handleColorChange(setColor, 's', e.target.value)} placeholder="S (%)" max={100} min={0} />
            <Input type="number" value={color.l} onChange={e => handleColorChange(setColor, 'l', e.target.value)} placeholder="L (%)" max={100} min={0} />
            <div className="w-10 h-10 rounded border" style={{ backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)` }}></div>
        </div>
    </div>
  );


  return (
    <div className="space-y-6">
      <PageTitle>Site Settings</PageTitle>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Update your website's title and logo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input
                  id="siteTitle"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  placeholder="Your Awesome Foundation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Website Logo</Label>
                {logoPreview && (
                  <div className="my-2">
                    <img src={logoPreview} alt="Logo preview" className="h-12 max-w-xs object-contain border p-1 rounded bg-muted/20" data-ai-hint="website logo"/>
                  </div>
                )}
                <div className="flex items-center gap-2">
                    <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} className="hidden"/>
                    <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('logo')?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> Upload Logo
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">Recommended: PNG, SVG. Max size: 1MB.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Color Theme</CardTitle>
              <CardDescription>Customize the HSL values for your site's color palette. (Updates are visual for this demo)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorInputGroup label="Background Color (e.g., 210 100% 97%)" color={backgroundColor} setColor={setBackgroundColor} />
              <ColorInputGroup label="Foreground Color (e.g., 180 25% 37%)" color={foregroundColor} setColor={setForegroundColor} />
              <ColorInputGroup label="Primary Color (e.g., 210 98% 73%)" color={primaryColor} setColor={setPrimaryColor} />
              <ColorInputGroup label="Accent Color (e.g., 120 25% 65%)" color={accentColor} setColor={setAccentColor} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
      <p className="text-xs text-muted-foreground text-center pt-4">
        Note: Full functionality for logo upload and theme application requires backend integration.
      </p>
    </div>
  );
}
