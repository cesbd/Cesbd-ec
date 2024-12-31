import type { APIRoute } from "astro";
import { RESEND_API_KEY } from "astro:env/server";
import { Resend } from 'resend';


export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  // const { searchParams } = new URL(request.url);
  // const name = searchParams.get("name");
  // const email = searchParams.get("email");
  // const message = searchParams.get("message");

  // if (!name || !email || !message) {
  // 	return new Response("Missing required fields", { status: 400 });
  // }

  // return new Response(
  // 	JSON.stringify({
  // 		name,
  // 		email,
  // 		message,
  // 	}),
  // 	{
  // 		status: 200,
  // 		headers: {
  // 			"Content-Type": "application/json",
  // 		},
  // 	}
  // );
  const resendApiKey = RESEND_API_KEY;

  return new Response(`Hello World!`);
};
