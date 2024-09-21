import { Movies, db } from 'astro:db';

export async function scanDb() {
    const movies = await db.select().from(Movies);
    console.log(movies);
    return movies;
}