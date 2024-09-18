import fs from 'fs/promises'; 
import path from 'path';

export async function scanLibrary() {
    const libraryPath = path.join(process.cwd(), 'public', 'library');
    const series = [];

    const dirs = await fs.readdir(libraryPath);

    for (const dir of dirs) {
        const seriesPath = path.join(libraryPath, dir);
        const stat = await fs.stat(seriesPath);

        if (stat.isDirectory()) {
            const files = await fs.readdir(seriesPath);
            const episodes = files
                .filter((file: string) => file.endsWith('.mp4'))
                .map((file: string) => ({
                    id: path.parse(file).name,
                    title: path.parse(file).name,
                    path: `/library/${dir}/${file}`
                }));

            series.push({
                id: dir,
                title: dir,
                thumbnail: `/library/${dir}/thumbnail.jpg`,
                description: `Descripción de ${dir}`, // Añadir una descripción
                episodes
            });
        }
    }

    return series;
}