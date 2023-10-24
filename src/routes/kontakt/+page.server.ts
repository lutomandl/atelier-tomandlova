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

    // const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return { message: 'Email sent.' };

    // const contactApi = strapi.query('contact');
    // const createEmail = await contactApi.create(email, message, name);
    // try {
    //   const emailText = `New message from web form:\n\nEmail: ${email}\nName: ${name}\n\n${message}`;

    //   const params = {
    //     Destination: {
    //       ToAddresses: ['info@ateliertomandlova.cz'],
    //     },
    //     Message: {
    //       Body: {
    //         Text: {
    //           Charset: 'UTF-8',
    //           Data: emailText,
    //         },
    //       },
    //       Subject: {
    //         Charset: 'UTF-8',
    //         Data: 'Ateliertomandlova.cz: Message from form',
    //       },
    //     },
    //     ReplyToAddresses: [email],
    //     Source: 'noreply@ateliertomandlova.cz',
    //   };

    //   await AWS_SES.sendEmail(params, function (err, data) {
    //     if (err) console.log(err, err.stack);
    //     // an error occurred
    //     else console.log(data); // successful response
    //   });
    //   createEmail;
    //   console.log(`EMAIL: ${emailText}`);
    //   return { message: 'Email sent.' };
    // } catch (error) {
    //   console.log(error);

    //   return { message: 'Amazon SES error.' };
    // }
  },
  // };
  //   },
} satisfies Actions;
