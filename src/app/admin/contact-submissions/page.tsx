
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { PageTitle } from '@/components/shared/PageTitle';
import { Eye, Trash2, Mail, User, Phone, MessageCircle } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
  submittedAt: string; // ISO date string
}

const initialSubmissions: ContactSubmission[] = [
  { id: 'cs1', name: 'John Doe', email: 'john.doe@example.com', phoneNumber: '+11234567890', message: 'Interested in volunteering opportunities. Please provide more details.', submittedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'cs2', name: 'Jane Smith', email: 'jane.smith@example.com', message: 'I have a query regarding donations. Can someone contact me?', submittedAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 'cs3', name: 'Ahmed Ali', email: 'ahmed.ali@example.com', phoneNumber: '+923001234567', message: 'Great work by the foundation! Keep it up.', submittedAt: new Date().toISOString() },
];


export default function ContactSubmissionsPage() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(initialSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const handleDelete = async (id: string) => {
    // Simulate API call for deletion
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmissions(prev => prev.filter(s => s.id !== id));
    toast({ title: 'Submission Deleted', description: 'The contact submission has been deleted successfully (mocked).' });
  };

  return (
    <div className="space-y-6">
      <PageTitle>Contact Form Submissions</PageTitle>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
          <CardDescription>View and manage messages received through the contact form.</CardDescription>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No submissions yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Submitted At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map(submission => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setSelectedSubmission(submission)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Submission</span>
                          </Button>
                        </DialogTrigger>
                        {selectedSubmission && selectedSubmission.id === submission.id && (
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Submission Details</DialogTitle>
                              <DialogDescription>From: {selectedSubmission.name}</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex items-start space-x-3">
                                <User className="h-5 w-5 mt-1 text-muted-foreground" /> 
                                <div><strong>Name:</strong> {selectedSubmission.name}</div>
                              </div>
                               <div className="flex items-start space-x-3">
                                <Mail className="h-5 w-5 mt-1 text-muted-foreground" /> 
                                <div><strong>Email:</strong> {selectedSubmission.email}</div>
                              </div>
                              {selectedSubmission.phoneNumber && (
                                <div className="flex items-start space-x-3">
                                  <Phone className="h-5 w-5 mt-1 text-muted-foreground" /> 
                                  <div><strong>Phone:</strong> {selectedSubmission.phoneNumber}</div>
                                </div>
                              )}
                              <div className="flex items-start space-x-3">
                                <MessageCircle className="h-5 w-5 mt-1 text-muted-foreground" /> 
                                <div className="flex-1">
                                  <strong>Message:</strong>
                                  <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/50 p-2 rounded-md mt-1">{selectedSubmission.message}</p>
                                </div>
                              </div>
                               <div className="flex items-start space-x-3">
                                 <Eye className="h-5 w-5 mt-1 text-muted-foreground" /> 
                                 <div><strong>Submitted:</strong> {new Date(selectedSubmission.submittedAt).toLocaleString()}</div>
                               </div>
                            </div>
                            <DialogClose asChild>
                               <Button type="button" variant="outline" className="mt-4">Close</Button>
                            </DialogClose>
                          </DialogContent>
                        )}
                      </Dialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="destructive" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                             <span className="sr-only">Delete Submission</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the submission from {submission.name}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(submission.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground text-center pt-4">
        Note: Contact submissions would be fetched from a database in a real application. This is a mocked UI.
      </p>
    </div>
  );
}
