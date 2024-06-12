import { z } from 'zod';

export const FormSchema = z.object({
	firstName: z.string().trim().min(3, 'First name must be at least 3 characters').max(255),
	lastName: z.string().trim().min(3, 'Last name must be at least 3 characters').max(255),
	email: z.string().email('Invalid email format'),
	phoneNumber: z
		.string()
		.regex(new RegExp(/^\d{13}$/), { message: 'Invalid phone number format' })
		.transform((value) => value?.trim())
});
