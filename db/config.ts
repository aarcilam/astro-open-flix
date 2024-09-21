import { column, defineDb, defineTable } from 'astro:db';

const Movies = defineTable({
  columns: {
    id: column.text(),
    title: column.text(),
    thumbnail: column.text(),
    description: column.text(),
    year: column.text(),
    duration: column.text(),
    rating: column.text(),
    category: column.text(),
    language: column.text(),
    quality: column.text(),
    episodes: column.json(),
    seasons: column.json(),
    imgGallery: column.json(),
  }
})

export default defineDb({
  tables: {
    Movies
  }
});