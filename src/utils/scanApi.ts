export async function scanApi() {
    const respuesta = await fetch('https://freetestapi.com/api/v1/movies');
    const series = await respuesta.json();
    return series.map((pelicula: any) => ({
        id: pelicula.id,
        title: pelicula.title,
        description: pelicula.plot,
        thumbnail: pelicula.poster,
        imgGallery: [],
        episodes: [],
        seasons: [],
        comeFromApi: true
    }));
}