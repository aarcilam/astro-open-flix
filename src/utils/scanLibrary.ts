import * as fs from 'fs';
import * as path from 'path';
import * as config from '../config.json'; // Importar el archivo de configuración

export async function scanLibrary() {
    // Usar la ruta de configuración o la ruta por defecto
    const libraryPath = config.libraryPath || path.join(process.cwd(), 'public', 'library');
    const series = [];

    const dirs = await fs.promises.readdir(libraryPath);

    for (const dir of dirs) {
        const seriesPath = path.join(libraryPath, dir);
        const stat = await fs.promises.stat(seriesPath);
        if (stat.isDirectory()) {
            const files = await fs.promises.readdir(seriesPath);
            const episodes = files
                .filter((file: string) => /\.(mp4|avi|mkv|mov|webm)$/i.test(file) && !file.startsWith('._'))
                .map((file: string) => ({
                    id: path.parse(file).name,
                    title: path.parse(file).name,
                    path: config.libraryPath ? `${config.libraryPath}/${dir}/${file}` : `/library/${dir}/${file}`
                }));
            const imgGallery = files.filter((file: string) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file) && !file.startsWith('._')).map((file: string) => ({
                id: path.parse(file).name,
                title: path.parse(file).name,
                path: config.libraryPath ? `${config.libraryPath}/${dir}/${file}` : `/library/${dir}/${file}`
            }));

            // Verificar si hay subcarpetas (temporadas)
            const subDirs = await fs.promises.readdir(seriesPath);
            const seasons = [];

            for (const subDir of subDirs) {
                const seasonPath = path.join(seriesPath, subDir);
                const seasonStat = await fs.promises.stat(seasonPath);

                if (seasonStat.isDirectory()) {
                    const seasonFiles = await fs.promises.readdir(seasonPath);
                    const seasonEpisodes = seasonFiles
                        .filter((file: string) => /\.(mp4|avi|mkv|mov|webm)$/i.test(file) && !file.startsWith('._'))
                        .map((file: string) => ({
                            id: `${dir}_${subDir}_${path.parse(file).name}`,
                            title: path.parse(file).name,
                            path: config.libraryPath ? `${config.libraryPath}/${dir}/${subDir}/${file}` : `/library/${dir}/${subDir}/${file}`
                        }));

                    const imgSeason = seasonFiles.filter((file: string) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file) && !file.startsWith('._')).map((file: string) => ({
                        id: path.parse(file).name,
                        title: path.parse(file).name,
                        path: config.libraryPath ? `${config.libraryPath}/${dir}/${subDir}/${file}` : `/library/${dir}/${subDir}/${file}`
                    }));

                    if (seasonEpisodes.length > 0 || imgSeason.length > 0) {
                        seasons.push({
                            id: `${dir}_${subDir}`,
                            title: subDir,
                            episodes: seasonEpisodes,
                            imgGallery: imgSeason
                        });
                    }
                }
            }


            const thumbnailPath = imgGallery?.[0]?.path;
            const serie = {
                id: dir,
                title: dir,
                thumbnail: thumbnailPath,
                description: `Descripción de ${dir}`,
                episodes,
                seasons,
                imgGallery,
                comeFromApi: false
            }
            console.log(`Agregando serie: `, serie);

            series.push(serie);
        }
    }

    return series;
}