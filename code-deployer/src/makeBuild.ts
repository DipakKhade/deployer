import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'




export function generateBuild(id: string) {
    return new Promise((resolve,reject)=>{
        const folderToMakeBuild = path.resolve(__dirname,"FileToMakeDist"); 
        console.log('folderToMakeBuild',folderToMakeBuild)

        const cmd = `cd ${folderToMakeBuild}\\${id} && npm run build`;
        console.log('cmd',cmd)
        
        const buildProcess = spawn(cmd, {
            shell: true, 
            stdio: 'inherit'
        });
    
        buildProcess.on('error', (err) => {
            console.error(`Error: ${err.message}`);

            reject('')
        });
    
        buildProcess.on('exit', (code) => {
            if (code !== 0) {
                console.log(`Build process exited with code ${code}`);
            } else {
                console.log('Build process completed successfully');
            }
        });

        resolve('')
    })
   
}