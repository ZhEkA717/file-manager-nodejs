import { cd, up, ls } from './operations/navigation.js';
import {  add, cat, rn } from './operations/fs.js';
import { checkParams, errNoParams } from './utils/helpers.js';

const operations = {
    "up": (params) => {
        errNoParams(params);
        up();
    },

    "cd": async (params) => {
        await cd(params);
    },

    "ls": async (params) => {
        errNoParams(params);
        await ls();
    },

    "cat": async (params) => {
        await cat(params);
    },

    "add": async (params) => {
        await add(params);
    },

    "rn": async (params) => {
        checkParams(params, 2);
        await rn(params);
    }

}

export const controller = async (command, params) => {
    if (operations.hasOwnProperty(command)) {
        await operations[command](params);
    } else {
        console.log('Invalid input');
    }
}