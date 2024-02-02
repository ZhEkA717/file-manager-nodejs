import { readdir } from 'fs/promises';
import { homedir } from 'os';
import { normalize, resolve } from 'path';
import { isDirectory, isFile, nameSort } from '../utils/helpers.js';

let currentPath = homedir() + '/desktop/zheka';

export const up = () => {
    currentPath = normalize(currentPath + '/..');
}
export const cd = async (params) => {
    const param = params.join(' ').trim();
    if (param === '..') {
        up();
    } else {
        try {
            const path = resolve(currentPath, param);
            if (await isDirectory(path)) {
                currentPath = path;
            }
        } catch(err) {
            console.log(err.message);
        }
    }
}
export const ls = async () => {
    const list = (await readdir(getCurrentPath(), {
        withFileTypes: true
    })).map((item) => ({
        Name: item.name,
        Type: item.isDirectory() ? 'Directory' : 'File'
    }));

    const directories = list
        .filter(item => item.Type === 'Directory')
        .sort(nameSort);
    const files = list.
        filter(item => item.Type === 'File')
        .sort(nameSort);
        
    console.table([...directories, ...files]);
    
}

export const getCurrentPath = () => currentPath;

