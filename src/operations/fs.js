import { readdir } from 'fs/promises';
import { getCurrentPath } from './navigation.js';
import { nameSort } from '../utils/helpers.js';

export const ls = async () => {
    try {
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
    } catch(err) {
        throw err;
    }
}
