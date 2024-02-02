import { join } from 'path';
import { getCurrentPath } from './navigation.js';
import { createReadStream } from 'fs';
import { isFile } from '../utils/helpers.js';
import { writeFile, rename } from 'fs/promises';

export const cat = async (params) => {
    const param = params.join(' ').trim();
    const path = join(getCurrentPath(), param);

    try{
        if (await isFile(path)) {
            const readableStream = createReadStream(path, "utf-8");
            console.log(await readFile(readableStream));
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
    const pathOldName = join(getCurrentPath(), oldName);
    const pathNewName = join(getCurrentPath(), newName);

    try {
        if (await isFile(pathNewName)) {
            console.log('Such file is already exist!');
        }
    } catch {
        try {
            await rename(pathOldName, pathNewName);
        } catch(err) {
            console.log(err.message);
        }
    }
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


