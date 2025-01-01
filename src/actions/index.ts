import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';
import { EMAIL, RESEND_API_KEY } from 'astro:env/server';
import { z } from 'astro/zod';
import { db, eq, RegisterUsers } from 'astro:db';

const resend = new Resend(RESEND_API_KEY);

// export const prerender = false;

export const server = {
  sendEmail: defineAction({
    // input: z.object({
    //   name: z.string(),
    // }),
    accept: 'form',
    handler: async (input) => {
      const formValues = Object.fromEntries(input.entries());

      const validation = z.object({
        cedula: z.string({ required_error: 'Cédula es requerida' }).min(10, { message: 'La cédula debe tener 10 caracteres' }).max(10, { message: 'La cedula debe tener 10 caracteres' }),
        name: z.string({ required_error: 'Nombres es requerido' }).min(2, { message: 'El nombre debe tener 2 caracteres' }).max(50, { message: 'El nombre debe tener 50 caracteres' }),
        lastName: z.string({ required_error: 'Apellidos es requerido' }).min(2, { message: 'El apellidos debe tener 2 caracteres' }).max(50, { message: 'El apellidos debe tener 50 caracteres' }),
        email: z.string().email({ message: 'Email no válido' }),
        phone: z.string({ required_error: 'Telefono es requerido' }).min(10, { message: 'El teléfono debe tener un mínimo de 10 caracteres' }),
        major: z.string({ required_error: 'Especialidad es requerida' }).min(2, { message: 'La especialidad debe tener 2 caracteres' }).max(50, { message: 'La especialidad debe tener 50 caracteres' }),
        businessType: z.string({ required_error: 'Tipo de Negocio es requerido' }).min(2, { message: 'El tipo de negocio debe tener 2 caracteres' }).max(50, { message: 'El tipo de negocio debe tener 50 caracteres' }),
        bornDate: z.string({ required_error: 'Fecha de nacimiento es requerida' }).min(1, { message: 'Fecha de nacimiento es requerida' })
      }).safeParse(formValues);

      if (!validation.success) {
        const messages = validation.error.issues.map((issue) => issue.message);
        const message = messages.join(', ');
        throw new ActionError({
          message,
          code: 'BAD_REQUEST'
        });
      }

      // save in db
      const result = await db.select().from(RegisterUsers).where(eq(RegisterUsers.email, validation.data.email));

      if (result.length > 0) {
        throw new ActionError({
          message: 'El usuario ya se encuentra registrado',
          code: 'BAD_REQUEST'
        });
      }

      try {
        // if not exists add to db
        await db.insert(RegisterUsers).values({
          email: validation.data.email,
          name: validation.data.name,
          lastName: validation.data.lastName,
          phone: validation.data.phone,
          bornDate: new Date(validation.data.bornDate),
          major: validation.data.major,
          businessType: validation.data.businessType,
        });
      } catch (error) {
        console.log(error);
        throw new ActionError({
          message: 'Error al guardar registrar el usuario, por favor intente de nuevo',
          code: 'BAD_REQUEST'
        });
      }

      // send email
      const { error } = await resend.emails.send({
        from: `Registro Exitoso <${EMAIL}>`,
        to: [validation.data.email],
        subject: 'Hello world',
        html: '<strong>It works!</strong>',
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }


      return 'Proceso de registro exitoso!';
    }
  })

};
