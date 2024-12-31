import { ActionError, defineAction } from 'astro:actions';
import { FROM_EMAIL, RESEND_API_KEY } from 'astro:env/server';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export const prerender = false;

export const server = {
  getGreeting: defineAction({
    // input: z.object({
    //   name: z.string(),
    // }),
    accept: 'form',
    handler: async (input) => {
      return `Hello, World!`
    }
  })

};
