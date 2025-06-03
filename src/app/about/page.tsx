import Image from 'next/image';
import { PageTitle } from '@/components/shared/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Target, Users, Gem, HandHeart, Lightbulb } from 'lucide-react';

const teamMembers = [
  { name: 'Ansar Ali', title: 'Founder & Chairman', imgSrc: 'https://placehold.co/300x300.png', dataAiHint: 'male portrait' },
  { name: 'Fatima Khan', title: 'Director of Operations', imgSrc: 'https://placehold.co/300x300.png', dataAiHint: 'female portrait' },
  { name: 'Ahmed Raza', title: 'Community Outreach Lead', imgSrc: 'https://placehold.co/300x300.png', dataAiHint: 'male professional' },
  { name: 'Aisha Begum', title: 'Volunteer Coordinator', imgSrc: 'https://placehold.co/300x300.png', dataAiHint: 'female professional' },
];

const values = [
  { icon: <HandHeart className="w-8 h-8 text-primary" />, title: 'Compassion', description: 'We approach our work with empathy and a deep understanding of the needs of those we serve.' },
  { icon: <Gem className="w-8 h-8 text-primary" />, title: 'Integrity', description: 'We uphold the highest ethical standards in all our actions and communications.' },
  { icon: <Lightbulb className="w-8 h-8 text-primary" />, title: 'Transparency', description: 'We are committed to openness and accountability in our operations and use of resources.' },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <PageTitle>About Ansar Ali Foundation</PageTitle>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-headline font-semibold text-foreground mb-4 flex items-center">
            <Target className="w-7 h-7 mr-3 text-primary" /> Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            To empower underserved communities by providing access to essential resources, fostering sustainable development, and promoting education and well-being. We strive to create a world where every individual has the opportunity to reach their full potential and live with dignity.
          </p>
        </div>
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://placehold.co/600x450.png"
            alt="Mission in action"
            layout="fill"
            objectFit="cover"
            data-ai-hint="community action"
            className="transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="md:order-2">
          <h2 className="text-2xl font-headline font-semibold text-foreground mb-4 flex items-center">
            <Eye className="w-7 h-7 mr-3 text-primary" /> Our Vision
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We envision a future where communities are resilient, individuals are empowered, and opportunities for growth and development are accessible to all. Our goal is to be a catalyst for positive change, inspiring hope and building a legacy of impact.
          </p>
        </div>
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-xl md:order-1">
          <Image
            src="https://placehold.co/600x450.png"
            alt="Vision for the future"
            layout="fill"
            objectFit="cover"
            data-ai-hint="hopeful future"
            className="transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-semibold text-foreground mb-8 text-center flex items-center justify-center">
           Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map(value => (
            <Card key={value.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                {value.icon}
                <CardTitle className="mt-2 font-headline">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-semibold text-foreground mb-8 text-center flex items-center justify-center">
          <Users className="w-7 h-7 mr-3 text-primary" /> Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={member.imgSrc}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={member.dataAiHint}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-headline font-medium text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
