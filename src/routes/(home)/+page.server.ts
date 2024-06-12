import { FormSchema } from '$lib/schema/contact.js';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(FormSchema));

	// Always return { form } in load functions
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const phoneNumber = formData.get('phoneNumber') as string;

		const fullName: string = firstName + ' ' + lastName;

		const form = await superValidate(formData, zod(FormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const prefilledLink = `https://docs.google.com/forms/d/e/1FAIpQLSejDI7wSdQRhRGjmfBR1TN8vChB1fuw2NckrjneSbjmxdm-xg/formResponse?usp=pp_url&entry.198196790=${fullName}&entry.1928031652=${email}&entry.1807056883=${phoneNumber}&submit=Submit`;

			const res = await fetch(prefilledLink);

			if (!res.ok) throw Error('An error has occured!');
		} catch (err: any) {
			return fail(400, { form });
		}

		// Display a success status message
		return message(form, 'Form posted successfully!');
	}
};
