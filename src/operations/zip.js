import { resolve, parse, join } from 'path';
import { getCurrentPath } from './navigation.js';
import { isFile } from '../utils/helpers.js';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compress = async (params) => {
    const brotli = createBrotliCompress();
    await zip(params, brotli);
}

export const decompress = async (params) => {
    const brotli = createBrotliDecompress();
    await zip(params, brotli);
}

export const zip = async (params, brotli) => {
    const [file, compressfile] = params;
    const pathToFile = resolve(getCurrentPath(), file);
    const pathToCompressFile = resolve(
        parse(pathToFile).dir, 
        compressfile
    );

    try {
        const readStream = createReadStream(pathToFile);
        const writeStream = createWriteStream(pathToCompressFile)
        
        if (await isFile(pathToFile)) {
            readStream.pipe(brotli).pipe(writeStream);
            writeStream.on('error', (err) => {
                console.log(err.message);
            })
        } else {
            console.log('There is no such file or folder!');
        }
    } catch(err) {
        console.log(err.message);
    }

}