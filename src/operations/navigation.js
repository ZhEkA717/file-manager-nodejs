import { stat } from 'fs/promises';
import { homedir } from 'os';
import { normalize, resolve } from 'path';

let currentPath = homedir();

export const up = () => {
    currentPath = normalize(currentPath + '/..');
}
export const cd = async (params) => {
    const param = params.join(' ').trim();
    if (param === '..') {
        up();
    } else {
        const path = resolve(currentPath, param);

        const infoAboutPath = await stat(path);
       
        if (infoAboutPath.isDirectory()) {
            currentPath = path;
        }

    }
}


export const getCurrentPath = () => currentPath;