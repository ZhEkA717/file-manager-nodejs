import { getCurrentPath } from '../operations/navigation.js';
import { stat } from 'fs/promises';

export const getUserName = () => {
    const userFlag = '--username=';
    const name = process.argv
    .map((item) => {
        if (item.startsWith(userFlag)) {
            return `${item.substring(userFlag.length)}`;
        }
    }).filter(item => item)[0];

    return name ? name : 'Stranger';
}

export const showWelocome = (username) => {
    console.log(`Welcome to the File Manager, ${username}!`);
}

export const showGoodbye = (username) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

export const showCurrentlyPath = () => {
    console.log(`You are currently in ${getCurrentPath()}`);
}
export const nameSort = (a, b) => (a.Name > b.Name) ? 1 : (a.Name > b.Name) ? -1 : 0;

export const isFile = async (path) => {
    try {
        const infoAboutPath = await stat(path);
        return infoAboutPath.isFile();
    } catch(err) {
        throw new Error(`${err.code}: no such file, stat '${path}'`);
    }
}
export const isDirectory = async (path) => {
    try {
        const infoAboutPath = await stat(path);
        return infoAboutPath.isDirectory();
    } catch(err) {
        throw new Error(`${err.code}: no such directory, stat '${path}'`);
    }
}

export const errNoParams = (params) => {
    if (params.length !== 0) {
        throw new Error('Invalid params');
    }
}

export const checkParams = (params, count) => {
    if (params.length !== count) {
        throw new Error('Invalid params!');
    }
}