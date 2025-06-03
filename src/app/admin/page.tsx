
import { PageTitle } from '@/components/shared/PageTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CreditCard, DollarSign, FileText, Users } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const overviewStats = [
    { title: 'Total Donations', value: '$12,540', icon: <DollarSign className="h-6 w-6 text-primary" />, href: '#' },
    { title: 'Active Projects', value: '15', icon: <Briefcase className="h-6 w-6 text-primary" />, href: '#' },
    { title: 'Registered Volunteers', value: '250', icon: <Users className="h-6 w-6 text-primary" />, href: '#' },
    { title: 'Contact Submissions', value: '78', icon: <FileText className="h-6 w-6 text-primary" />, href: '/admin/contact-submissions' },
  ];

  return (
    <div className="space-y-6">
      <PageTitle>Admin Dashboard</PageTitle>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
           <Link href={stat.href} key={stat.title}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month (mock data)
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Mock recent activities in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>New donation of $50 received.</li>
              <li>Media item "Community Event Highlights" uploaded.</li>
              <li>Contact form submission from John Doe.</li>
              <li>Site title updated.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
             <CardDescription>Quick access to common admin tasks.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/admin/site-settings" className="text-primary hover:underline">Update Site Settings</Link>
            <Link href="/admin/payment-methods" className="text-primary hover:underline">Manage Payment Methods</Link>
            <Link href="/admin/media-management" className="text-primary hover:underline">Upload Media</Link>
            <Link href="/admin/contact-submissions" className="text-primary hover:underline">View Submissions</Link>
          </CardContent>
        </Card>
      </div>
       <p className="text-xs text-muted-foreground text-center pt-4">
        Note: All data displayed on this dashboard is for demonstration purposes only. Full functionality requires backend integration.
      </p>
    </div>
  );
}
