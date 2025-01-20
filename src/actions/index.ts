import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';
import { EMAIL, RESEND_API_KEY } from 'astro:env/server';
import { z } from 'astro/zod';
import { db, eq, or, RegisterUser } from 'astro:db';


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
        bornDate: z.string({ required_error: 'Fecha de nacimiento es requerida' }).min(1, { message: 'Fecha de nacimiento es requerida' }),
        city: z.string({ required_error: 'Ciudad es requerida' }).min(2, { message: 'La ciudad debe tener 2 caracteres' }).max(50, { message: 'La ciudad debe tener 50 caracteres' }),
        formType: z.string({ required_error: 'Tipo de Formulario es requerido' }).min(1, { message: 'El tipo de formulario debe tener 1 caracteres' }).max(5, { message: 'El tipo de formulario debe tener 5 caracteres' }),
      })
        .transform(data => ({ ...data, formType: Number(data.formType) }))
        .safeParse(formValues);

      if (!validation.success) {
        const messages = validation.error.issues.map((issue) => issue.message);
        const message = messages.join(', ');
        throw new ActionError({
          message,
          code: 'BAD_REQUEST'
        });
      }

      // save in db
      // const result = await db.select().from(RegisterUser)
      //   .where(or(eq(RegisterUser.email, validation.data.email), eq(RegisterUser.ci, validation.data.cedula)));

      // if (result.length > 0) {
      //   throw new ActionError({
      //     message: 'El usuario ya se encuentra registrado',
      //     code: 'BAD_REQUEST'
      //   });
      // }

      try {
        // if not exists add to db
        await db.insert(RegisterUser).values({
          ci: validation.data.cedula,
          email: validation.data.email,
          name: validation.data.name,
          last_name: validation.data.lastName,
          phone_number: validation.data.phone,
          born_date: new Date(validation.data.bornDate),
          major: validation.data.major,
          business_type: validation.data.businessType,
          form_type_id: validation.data.formType,
          city: validation.data.city,
        });

        console.log('Registro exitoso');

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
