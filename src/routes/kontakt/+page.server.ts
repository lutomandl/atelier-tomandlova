import type { Actions } from './$types';
import { EMAIL_REGEX, MESSAGE_MAX_LENGTH, NAME_MAX_LENGTH } from '../../utils/constants';
import { fail } from '@sveltejs/kit';

export const prerender = false;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const captchaToken = data.get('captchaToken');

    if (!name) {
      return fail(400, { name, missing: true });
    }
    if (!email) {
      return fail(400, { email, missing: true });
    }
    if (!message) {
      return fail(400, { message, missing: true });
    }
    if (name?.toString().length > NAME_MAX_LENGTH) {
      return fail(400, { name, tooLong: true });
    }
    if (!EMAIL_REGEX.test(email?.toString())) {
      return fail(400, { email, invalid: true });
    }
    if (message?.toString().length > MESSAGE_MAX_LENGTH) {
      return fail(400, { message, tooLong: true });
    }
    if (!captchaToken) {
      return fail(400, { captchaToken, missing: true });
    }

    const grecaptchaApiKey = import.meta.env.VITE_GRECAPTCHA_SECRET_KEY;

    const captchaResult = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${grecaptchaApiKey}&response=${captchaToken}`,
      { method: 'POST' }
    ).then(response => response.json());

    if (!captchaResult.success) {
      return fail(400, { captchaResult, invalid: true });
    }

    const emailJsService = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailJsTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailJsUserId = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const emailJsAccessToken = import.meta.env.VITE_EMAILJS_SECRET_KEY;

    const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: emailJsService,
        template_id: emailJsTemplate,
        user_id: emailJsUserId,
        template_params: {
          name,
          email,
          message,
        },
        accessToken: emailJsAccessToken,
      }),
    });

    if (!emailJsResponse.ok) {
      const emailJsResponseData = await emailJsResponse.text();
      return fail(400, { emailJsResponseData, invalid: true });
    }

    return { message: 'Email sent.' };
  },
} satisfies Actions;
