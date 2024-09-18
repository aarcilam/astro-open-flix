import * as fs from 'fs';
import * as path from 'path';

export async function scanLibrary() {
    const libraryPath = path.join(process.cwd(), 'public', 'library');
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
                    path: `/library/${dir}/${file}`
                }));

            const firstVideoFile = episodes[0]?.path || '';
            const thumbnailPath = firstVideoFile.replace(/\.(mp4|avi|mkv|mov|webm)$/i, '.jpg');
            console.log(`Agregando serie: ${dir}`);
            console.log(`Número de episodios: ${episodes.length}`);
            console.log(`Miniatura: ${thumbnailPath}`);
            console.log(`episodes:`,episodes);
            
            series.push({
                id: dir,
                title: dir,
                thumbnail: thumbnailPath,
                description: `Descripción de ${dir}`,
                episodes
            }); 
        }
    }

    return series;
}