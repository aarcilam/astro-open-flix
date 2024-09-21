import { db, Movies } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Movies).values({
		id: '1matrhix',
		title: 'The Matrix',
		thumbnail: 'https://m.media-amazon.com/images/I/91+Qy0XjXJL._AC_UF894,1000_QL80_.jpg',
		description: 'The Matrix is a 1999 science fiction action film written and directed by the Wachowskis.',
		year: '1999',
		duration: '2h 16m',
		rating: '8.7',
		category: 'Action',
		language: 'English',
		quality: 'HD',
		episodes: [],
		seasons: [],
		imgGallery: [],
	});
}