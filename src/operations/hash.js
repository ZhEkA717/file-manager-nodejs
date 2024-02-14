import { join } from "path";
import { getCurrentPath } from "./navigation.js";
import { isFile } from "../utils/helpers.js";
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

export const hash = async (params) => {
    const param = params.join(' ').trim(); 
    const path = join(getCurrentPath(), param);
    try {
        if (await isFile (path)) {
            await calculateHash(path);
        }
    } catch(err) {
        console.log(err.message);
    }
}

const calculateHash = async (path) => {
    const hash = createHash('SHA256');
    hash.setEncoding('hex');

    const fd = createReadStream(path);
        
    fd.on('end', () => {
            hash.end();
            console.log(hash.read());
        });
    fd.pipe(hash);
};