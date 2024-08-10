import fs from 'fs'
import path from 'path'


export function getAllFilesAndDirectories(dirPath: string, arrayOfFilesAndDirs: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFilesAndDirs.push(fullPath);
            getAllFilesAndDirectories(fullPath, arrayOfFilesAndDirs);
        } else {
            arrayOfFilesAndDirs.push(fullPath);
        }
    });

    return arrayOfFilesAndDirs;
}
