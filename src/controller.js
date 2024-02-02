import { cd, up, ls } from './operations/navigation.js';
import {  cat } from './operations/fs.js';

const operations = {
    "up": (params) => {
        if (params.length !== 0) {
            throw new Error('Invalid params');
        }
        up();
    },

    "cd": async (params) => {
        await cd(params);
    },

    "ls": async (params) => {
        if (params.length !== 0) {
            throw new Error('Invalid params');
        }
        await ls();
    },

    "cat": async (params) => {
        await cat(params);
    },
}

export const controller = async (command, params) => {
    if (operations.hasOwnProperty(command)) {
        await operations[command](params);
    } else {
        console.log('Invalid input');
    }
}