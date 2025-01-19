import { db, FormTye } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(FormTye).values([
		{
			event_name: 'Evento',
			event_type: 'Evento',
			event_location: 'Evento',
			event_date: new Date(),
			brand: 'Evento',
			staff: 'Evento',
		},
		{
			event_name: 'Promo',
			event_type: 'Promo',
			event_location: 'Promo',
			event_date: new Date(),
			brand: 'Promo',
			staff: 'Promo',
		},
		{
			event_name: 'Premio',
			event_type: 'Premio',
			event_location: 'Premio',
			event_date: new Date(),
			brand: 'Premio',
			staff: 'Premio',
		},
		{
			event_name: 'Contacto',
			event_type: 'Contacto',
			event_location: 'Contacto',
			event_date: new Date(),
			brand: 'Contacto',
			staff: 'Contacto',
		},
		{
			event_name: 'Descarga',
			event_type: 'Descarga',
			event_location: 'Descarga',
			event_date: new Date(),
			brand: 'Descarga',
			staff: 'Descarga',
		},
	]);

	console.log('Seeded data');
}
