import { join } from 'path';
import { getCurrentPath } from './navigation.js';
import { createReadStream } from 'fs';
import { isFile } from '../utils/helpers.js';

export const cat = async (params) => {
    const param = params.join(' ').trim();
    const path = join(getCurrentPath(), param);

    try{
        if (await isFile(path)) {
            const readableStream = createReadStream(path, "utf-8");
            console.log(await read(readableStream));
        }
    } catch(err) {
        console.log(err.message);
    }

}

const read = async (stream) => {
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


