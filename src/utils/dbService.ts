import { eq, Movies, db } from "astro:db";
import { scanDb } from "./scanDb";

export class DbService {
    static async getMovies() {
        const dbSeries = await scanDb();
        return dbSeries;
    }

    static async getMovie(id: string) {
        const movie = await db.select().from(Movies).where(eq(Movies.id, id));
        return movie;
    }

    static async insertMovie(movie:any) {
        const newMovie = await db.insert(Movies).values(movie).returning();
        return newMovie[0];
    }
}