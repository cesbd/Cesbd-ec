import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';
import { EMAIL, RESEND_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from 'astro:env/server';
import { z } from 'astro/zod';
import { db, RegisterUser } from 'astro:db';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';

const resend = new Resend(RESEND_API_KEY);

const uploadFile = async (file: File): Promise<UploadApiResponse | null> => {
  try {
    // Convertir el archivo a base64
    const arrayBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    const dataUri = `data:${file.type};base64,${base64String}`;

    // Configurar Cloudinary
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });

    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: 'auto',
    });
    return result;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    return null; // Retornar null si ocurre un error
  }
};

// const uploadFile = async (file: File): Promise<any | null> => {
//   try {
//     // Importar cloudinary dinámicamente para evitar problemas de empaquetado
//     const { v2: cloudinary } = await import('cloudinary');

//     // Configurar Cloudinary
//     cloudinary.config({
//       cloud_name: CLOUDINARY_CLOUD_NAME,
//       api_key: CLOUDINARY_API_KEY,
//       api_secret: CLOUDINARY_API_SECRET,
//     });

//     // Convertir el archivo a base64
//     const arrayBuffer = await file.arrayBuffer();
//     const base64String = Buffer.from(arrayBuffer).toString('base64');
//     const dataUri = `data:${file.type};base64,${base64String}`;

//     // Subir la imagen a Cloudinary
//     const result = await cloudinary.uploader.upload(dataUri, {
//       resource_type: 'auto',
//     });
//     return result;
//   } catch (error) {
//     console.error('Error al subir la imagen:', error);
//     return null; // Retornar null si ocurre un error
//   }
// };

// const getSignature = async () => {
//   const timestamp = Math.floor(Date.now() / 1000);
//   const paramsToSign = `timestamp=${timestamp}&public_id=your_public_id`;

//   const signature = crypto
//     .createHmac('sha1', process.env.CLOUDINARY_API_SECRET!)
//     .update(paramsToSign)
//     .digest('hex');

//   return signature;
// };

// const uploadFile = async (file: any) => {
//   try {
//     const arrayBuffer = await file.arrayBuffer();
//     const base64String = Buffer.from(arrayBuffer).toString('base64');
//     const dataUri = `data:${file.type};base64,${base64String}`;

//     const resource_type = file.type.includes('image') ? 'image' : 'file';
//     const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resource_type}/upload`;

//     const signature = await getSignature();

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         file: dataUri,
//         api_key: CLOUDINARY_API_KEY,
//         // upload_preset: 'ml_default',
//         // public_id: CLOUDINARY_CLOUD_NAME,
//         signature: signature,
//         timestamp: Math.floor(Date.now() / 1000),
//         // upload_preset: 'your_upload_preset',
//       }),
//     });

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Error uploading to Cloudinary:', error);
//     return null;
//   }
// };


// export const prerender = false;

export const server = {
  sendEmail: defineAction({
    // input: z.object({
    //   name: z.string(),
    // }),
    accept: 'form',
    handler: async (input) => {
      const formValues = Object.fromEntries(input.entries());

      // cloudinary.config({
      //   cloud_name: CLOUDINARY_CLOUD_NAME,
      //   api_key: CLOUDINARY_API_KEY,
      //   api_secret: CLOUDINARY_API_SECRET,
      // });

      let fileUrl = '';

      if (formValues.file) {
        const result = await uploadFile(formValues.file as File);
        console.log({ result });
      }

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
