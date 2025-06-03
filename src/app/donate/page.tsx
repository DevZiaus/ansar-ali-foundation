import Image from 'next/image';
import { PageTitle } from '@/components/shared/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Banknote, Smartphone, QrCode } from 'lucide-react';

export default function DonatePage() {
  return (
    <div className="space-y-12">
      <PageTitle>Support Our Cause</PageTitle>
      <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
        Your generous contributions help us continue our mission to empower communities and inspire change.
        Every donation, no matter the size, makes a significant impact.
      </p>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <Banknote className="w-6 h-6 mr-2 text-primary" /> Bank Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p><span className="font-semibold text-foreground">Account Name:</span> Ansar Ali Foundation</p>
            <p><span className="font-semibold text-foreground">Account Number:</span> 123456789012</p>
            <p><span className="font-semibold text-foreground">Bank Name:</span> Charity First Bank</p>
            <p><span className="font-semibold text-foreground">Branch:</span> Hope City Main Branch</p>
            <p><span className="font-semibold text-foreground">IFSC/SWIFT Code:</span> CFBHC01234</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <Smartphone className="w-6 h-6 mr-2 text-primary" /> Mobile Banking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p><span className="font-semibold text-foreground">Service A (e.g., bKash):</span> 01XXXXXXXXX</p>
            <p><span className="font-semibold text-foreground">Service B (e.g., Nagad):</span> 01YYYYYYYYY</p>
            <p><span className="font-semibold text-foreground">Service C (e.g., Rocket):</span> 01ZZZZZZZZZ</p>
            <p className="text-xs mt-2">Please use the 'Send Money' option and include 'Donation' in the reference if possible.</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <QrCode className="w-6 h-6 mr-2 text-primary" /> Scan to Donate
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-48 h-48 border rounded-md overflow-hidden">
              <Image
                src="https://placehold.co/300x300.png" 
                alt="Donation QR Code"
                layout="fill"
                objectFit="contain"
                data-ai-hint="qr code payment"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">Scan this QR code using your preferred mobile banking app.</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12 p-6 bg-secondary/30 rounded-lg shadow-inner">
        <h3 className="text-2xl font-headline font-semibold text-foreground mb-3">Thank You for Your Support!</h3>
        <p className="text-muted-foreground">
          Your generosity fuels our efforts and brings hope to many. If you have any questions about donations, please feel free to <a href="/contact" className="text-primary underline hover:opacity-80">contact us</a>.
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          Note: Donation details displayed are for demonstration purposes. These would be updatable via an admin panel in a full-stack implementation.
        </p>
      </div>
    </div>
  );
}
