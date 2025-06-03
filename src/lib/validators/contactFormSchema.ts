import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name must be 100 characters or less." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(15, { message: "Phone number must be 15 digits or less." })
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, { message: "Invalid phone number format."})
    .optional()
    .or(z.literal('')), // Allow empty string
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message must be 1000 characters or less." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
