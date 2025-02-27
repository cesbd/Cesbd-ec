import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';
import { EMAIL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_UPLOAD_PRESET, RESEND_API_KEY } from 'astro:env/server';
import { z } from 'astro/zod';
import { db, RegisterUser, eq, or, FormType, asc } from 'astro:db';
import axios from 'axios';

const resend = new Resend(RESEND_API_KEY);

// const uploadFile = async (file: File): Promise<UploadApiResponse | null> => {
//   try {
//     // Convertir el archivo a base64
//     const arrayBuffer = await file.arrayBuffer();
//     const base64String = Buffer.from(arrayBuffer).toString('base64');
//     const dataUri = `data:${file.type};base64,${base64String}`;

//     // Configurar Cloudinary
//     cloudinary.config({
//       cloud_name: CLOUDINARY_CLOUD_NAME,
//       api_key: CLOUDINARY_API_KEY,
//       api_secret: CLOUDINARY_API_SECRET,
//     });

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

const arrayBufferToBase64 = (arrayBuffer: any) => {
  const uint8Array = new Uint8Array(arrayBuffer);
  let base64 = "";
  uint8Array.forEach((byte) => {
    base64 += String.fromCharCode(byte);
  });
  return btoa(base64);
};

const uploadFile = async (file: any) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    // const base64String = Buffer.from(arrayBuffer).toString('base64');
    const base64String = arrayBufferToBase64(arrayBuffer);
    const dataUri = `data:${file.type};base64,${base64String}`;

    const resource_type = file.type.includes('image') ? 'image' : 'file';
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resource_type}/upload`;

    // const signature = await getSignature();
    const response = await axios.post(url, JSON.stringify({
      file: dataUri,
      upload_preset: CLOUDINARY_UPLOAD_PRESET,
      public_id: Date.now().toString(),
      api_key: CLOUDINARY_API_KEY,
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     file: dataUri,
    //     upload_preset: CLOUDINARY_UPLOAD_PRESET,
    //     public_id: Date.now().toString(),
    //     api_key: CLOUDINARY_API_KEY,
    //   }),
    // });

    const result = await response.data;
    return result;
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error?.response ? error.response.data : error);
    return { error, isInvalid: true };
  }
};


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
        formType: z.string({ required_error: 'Tipo de Formulario es requerido' }).min(1, { message: 'El tipo de formulario debe tener 1 caracteres' }),
      })
        .safeParse(formValues);
      // .transform(data => ({ ...data, formType: Number(data.formType) }))

      if (!validation.success) {
        const messages = validation.error.issues.map((issue) => issue.message);
        const message = messages.join(', ');
        throw new ActionError({
          message,
          code: 'BAD_REQUEST'
        });
      }

      // save in db
      const result = await db.select().from(RegisterUser)
        .where(or(eq(RegisterUser.email, validation.data.email), eq(RegisterUser.ci, validation.data.cedula)));

      if (result.length > 0) {
        throw new ActionError({
          message: 'El usuario ya se encuentra registrado',
          code: 'BAD_REQUEST'
        });
      }

      let fileUrl = '';

      if (formValues.file && (formValues.file as File).size > 0) {
        const result = await uploadFile(formValues.file as File);

        if (result?.isInvalid) {
          throw new ActionError({
            message: `Error al subir la imagen ${JSON.stringify(result)}`,
            code: 'BAD_REQUEST'
          });
        };

        fileUrl = result.url;
      }

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

          // form_type_id: validation.data.formType,
          form_type: validation.data.formType,
          city: validation.data.city,
          file_url: fileUrl ? fileUrl : null
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
        subject: 'Centro de Entrenamiento SBD',
        html: '<strong>Hola, un saludo desde Centro de Entrenamiento SBD! Este mensaje ese para darte a conocer que tu registro fue hecho de manera exitosa, por favor no respondas a este email.</strong>',
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }
      return 'Proceso de registro exitoso!';
    }
  }),


  getEvents: defineAction({
    handler: async (formId: number) => {
      try {
        const result = await db.select().from(FormType).where(eq(FormType.id, formId));

        if (result.length === 0) {
          throw new ActionError({
            message: 'Error al obtener los eventos',
            code: 'BAD_REQUEST'
          });
        }

        const data = result[0];
        const eventTypes = data.event_types.split(',').map(item => item.trim());

        return eventTypes;
      } catch (error) {
        console.log(error);
        throw new ActionError({
          message: 'Error al obtener los eventos',
          code: 'BAD_REQUEST'
        });
      }
    }
  }),

};
