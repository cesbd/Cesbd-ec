import { db, FormType } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(FormType).values([
		{
			event_name: 'Evento',
			event_types: 'Evento',
			// event_location: 'Evento',
			event_date: new Date(),
			// brand: 'Evento',
			// staff: 'Evento',
		},
		{
			event_name: 'Promo',
			event_types: 'Promo',
			// event_location: 'Promo',
			event_date: new Date(),
			// brand: 'Promo',
			// staff: 'Promo',
		},
		{
			event_name: 'Capacitación',
			event_types: 'Capacitación',
			// event_location: 'Capacitación',
			event_date: new Date(),
			// brand: 'Capacitación',
			// staff: 'Capacitación',
		},
		{
			event_name: 'Contacto',
			event_types: 'Contacto',
			// event_location: 'Contacto',
			event_date: new Date(),
			// brand: 'Contacto',
			// staff: 'Contacto',
		},
		{
			event_name: 'Descarga',
			event_types: 'Descarga',
			// event_location: 'Descarga',
			event_date: new Date(),
			// brand: 'Descarga',
			// staff: 'Descarga',
		},
	]);

	console.log('Seeded data');
}
