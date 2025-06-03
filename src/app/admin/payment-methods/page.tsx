
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PageTitle } from '@/components/shared/PageTitle';
import { Banknote, Smartphone, QrCode, Upload } from 'lucide-react';

export default function PaymentMethodsPage() {
  const { toast } = useToast();
  
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    branch: '',
    ifscSwift: '',
  });
  const [mobileBanking, setMobileBanking] = useState({
    serviceA: '',
    serviceB: '',
    serviceC: '',
  });
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load existing settings from localStorage (or API in real app)
    setBankDetails({
      accountName: localStorage.getItem('pm_accountName') || 'Ansar Ali Foundation',
      accountNumber: localStorage.getItem('pm_accountNumber') || '123456789012',
      bankName: localStorage.getItem('pm_bankName') || 'Charity First Bank',
      branch: localStorage.getItem('pm_branch') || 'Hope City Main Branch',
      ifscSwift: localStorage.getItem('pm_ifscSwift') || 'CFBHC01234',
    });
    setMobileBanking({
      serviceA: localStorage.getItem('pm_serviceA') || '01XXXXXXXXX (bKash)',
      serviceB: localStorage.getItem('pm_serviceB') || '01YYYYYYYYY (Nagad)',
      serviceC: localStorage.getItem('pm_serviceC') || '01ZZZZZZZZZ (Rocket)',
    });
    setQrCodePreview(localStorage.getItem('pm_qrCodePreview') || 'https://placehold.co/200x200.png?text=QR+Code');
  }, []);

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleMobileBankingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMobileBanking(prev => ({ ...prev, [name]: value }));
  };
  
  const handleQrCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setQrCodeFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCodePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    // Save to localStorage (or API in real app)
    Object.entries(bankDetails).forEach(([key, value]) => localStorage.setItem(`pm_${key}`, value));
    Object.entries(mobileBanking).forEach(([key, value]) => localStorage.setItem(`pm_${key}`, value));
    if(qrCodePreview) localStorage.setItem('pm_qrCodePreview', qrCodePreview);
    
    toast({
      title: 'Payment Methods Updated',
      description: 'Payment details have been saved successfully.',
    });
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <PageTitle>Payment Methods</PageTitle>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><Banknote className="mr-2 h-5 w-5 text-primary" /> Bank Account Details</CardTitle>
            <CardDescription>Update the primary bank account for donations.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="accountName">Account Name</Label><Input id="accountName" name="accountName" value={bankDetails.accountName} onChange={handleBankDetailsChange} /></div>
            <div><Label htmlFor="accountNumber">Account Number</Label><Input id="accountNumber" name="accountNumber" value={bankDetails.accountNumber} onChange={handleBankDetailsChange} /></div>
            <div><Label htmlFor="bankName">Bank Name</Label><Input id="bankName" name="bankName" value={bankDetails.bankName} onChange={handleBankDetailsChange} /></div>
            <div><Label htmlFor="branch">Branch</Label><Input id="branch" name="branch" value={bankDetails.branch} onChange={handleBankDetailsChange} /></div>
            <div className="md:col-span-2"><Label htmlFor="ifscSwift">IFSC/SWIFT Code</Label><Input id="ifscSwift" name="ifscSwift" value={bankDetails.ifscSwift} onChange={handleBankDetailsChange} /></div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><Smartphone className="mr-2 h-5 w-5 text-primary" /> Mobile Banking Details</CardTitle>
            <CardDescription>Update mobile banking numbers (e.g., bKash, Nagad).</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label htmlFor="serviceA">Service A (e.g. bKash)</Label><Input id="serviceA" name="serviceA" value={mobileBanking.serviceA} onChange={handleMobileBankingChange} /></div>
            <div><Label htmlFor="serviceB">Service B (e.g. Nagad)</Label><Input id="serviceB" name="serviceB" value={mobileBanking.serviceB} onChange={handleMobileBankingChange} /></div>
            <div><Label htmlFor="serviceC">Service C (e.g. Rocket)</Label><Input id="serviceC" name="serviceC" value={mobileBanking.serviceC} onChange={handleMobileBankingChange} /></div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><QrCode className="mr-2 h-5 w-5 text-primary" /> Donation QR Code</CardTitle>
            <CardDescription>Upload or update the QR code image for donations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrCodePreview && (
              <div className="my-2">
                <img src={qrCodePreview} alt="QR Code preview" className="h-40 w-40 object-contain border p-1 rounded bg-muted/20" data-ai-hint="payment QR code" />
              </div>
            )}
            <div className="flex items-center gap-2">
                <Input id="qrCodeFile" type="file" accept="image/*" onChange={handleQrCodeChange} className="hidden"/>
                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('qrCodeFile')?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload QR Code
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">Recommended: PNG. Max size: 500KB.</p>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Payment Methods'}
          </Button>
        </div>
      </form>
      <p className="text-xs text-muted-foreground text-center pt-4">
        Note: Full functionality for QR code upload and persistence requires backend integration.
      </p>
    </div>
  );
}
