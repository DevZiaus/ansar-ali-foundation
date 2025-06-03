import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Heart, Users, Handshake, BookOpen, ShieldCheck } from 'lucide-react';
import { PageTitle } from '@/components/shared/PageTitle';

export default function HomePage() {
  const impactAreas = [
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: 'Empowering Livelihoods',
      description: 'Providing resources and training to help individuals achieve financial independence.',
      dataAiHint: 'livelihood empowerment'
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: 'Health & Wellness',
      description: 'Supporting access to essential healthcare services and promoting well-being.',
      dataAiHint: 'health wellness'
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Community Support',
      description: 'Fostering strong, resilient communities through collaborative initiatives.',
      dataAiHint: 'community support'
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary/10 via-background to-accent/10 py-20 md:py-32 rounded-lg shadow-lg">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Welcome to <span className="text-primary">Ansar Ali Foundation</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
            Empowering Communities, Inspiring Change. Join us in making a difference.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brief About Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
          <div>
            <h2 className="text-3xl font-headline font-bold text-foreground mb-4">About Ansar Ali Foundation</h2>
            <p className="text-muted-foreground mb-4">
              Ansar Ali Foundation is dedicated to creating lasting positive change in the lives of individuals and communities. We believe in the power of collective action to address pressing social challenges and build a more equitable future.
            </p>
            <p className="text-muted-foreground mb-6">
              Our work focuses on key areas such as education, healthcare, livelihood development, and community support, driven by our core values of compassion, integrity, and transparency.
            </p>
            <Button variant="secondary" asChild>
              <Link href="/about">Discover Our Mission</Link>
            </Button>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Foundation team working"
              layout="fill"
              objectFit="cover"
              data-ai-hint="team collaboration"
              className="transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="w-full bg-secondary/30 py-16 md:py-24 rounded-lg shadow-inner">
        <div className="container mx-auto px-4">
          <PageTitle>Our Impact</PageTitle>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            We strive to make a tangible difference in the world. Here are some of the ways we are creating impact:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactAreas.map((area) => (
              <Card key={area.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  {area.icon}
                  <CardTitle className="mt-4 font-headline">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-headline font-bold text-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Your support can help us continue our mission and expand our reach. Every contribution, big or small, counts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/donate">Support Our Cause</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
