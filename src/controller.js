import { cd, up } from './operations/navigation.js';

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
        ls();
    }
}

export const controller = async (command, params) => {
    if (operations.hasOwnProperty(command)) {
        await operations[command](params);
    } else {
        console.log('Invalid input');
    }
}