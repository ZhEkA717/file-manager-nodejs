import { join, resolve, parse } from 'path';
import { getCurrentPath } from './navigation.js';
import { createReadStream, createWriteStream } from 'fs';
import { isDirectory, isFile } from '../utils/helpers.js';
import { writeFile, rename, unlink } from 'fs/promises';

export const cat = async (params) => {
    const param = params.join(' ').trim();
    const path = resolve(getCurrentPath(), param);

    try{
        if (await isFile(path)) {
            const readableStream = createReadStream(path, "utf-8");
            console.log(await readFile(readableStream));
        } else {
            console.log('There is no such file or folder!');
        }
    } catch(err) {
        console.log(err.message);
    }

}

export const add = async (params) => {
    const param = params.join(' ').trim();
    const path = join(getCurrentPath(), param);

    try {
        if(await isFile(path)) {
            console.log('Such file is already exist!');
        } 
    } catch {
        try {
            await writeFile(path,'');
        } catch(err) {
            console.log(err.message);
        }
    }
}

export const rn = async (params) => {
    const [oldName, newName] = params;
    const pathOldName = resolve(getCurrentPath(), oldName);
    const pathNewName = join(parse(pathOldName).dir, newName);

    try {
        if (await isFile(pathNewName)) {
            console.log('Such file is already exist!');
        } else {
            console.log('There is no such file or folder!');
        }
    } catch {
        try {
            await rename(pathOldName, pathNewName);
        } catch(err) {
            console.log(err.message);
        }
    }
}

export const rm = async (params) => {
    const param = params.join(' ').trim();
    const path = resolve(getCurrentPath(), param);

    try {
        await unlink(path);
    } catch(err) {
        console.log(err.message);
    }
}

export const cp = async (params) => {   
    const [file] = params;
    const copyName = parse(file).name  + '-copy' + parse(file).ext;
    console.log(copyName);
    await copyFile(params, copyName);
}

export const mv = async (params) => {
    const [file, folder] = params;
    const filePath = resolve(getCurrentPath(), file);
    const folderPath = resolve(getCurrentPath(), folder);
    const fileName = parse(file).base;
    try {
        if (await isFile(filePath) && await isDirectory(folderPath)) {
            if (filePath !== resolve(folderPath, fileName)) {
                await copyFile(params, fileName);
                await unlink(filePath);
            }
        } else {
            console.log('There is no such file or folder!');
        }
    } catch(err) {
        console.log(err.message);
    }
}

const copyFile = async (params, name) => {
    const [fileCopy, toFolder] = params;
    return new Promise(async (res) => {
            const fileCopyPath = resolve(getCurrentPath(), fileCopy);
            const toFolderPath = resolve(getCurrentPath(), toFolder);
        try {    
            if (await isFile(fileCopyPath) && await isDirectory(toFolderPath)) {
                const readableStream = createReadStream(fileCopyPath, "utf-8");
                const writableStream = createWriteStream(join(toFolderPath, name), "utf-8");    
             
                readableStream.pipe(writableStream);

                readableStream.on('end', () => {
                    res();
                })
                
            } else {
                console.log('There is no such file or folder!');
            }
        } catch (err) {
            console.log(err.message);
        }
    })
}

const readFile = async (stream) => {
    return new Promise(res => {
        let data = "";
        stream.on("data", (chunk) => {
            data += chunk;
        });

        stream.on("end", () => {
            res(data);
        });
    })
};


