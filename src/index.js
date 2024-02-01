import { createInterface } from 'readline';
import { showCurrentlyPath, getUserName, showGoodbye, showWelocome } from './utils/helpers.js';
import { controller } from './controller.js';


const inputStream = async (line, readline) => {
    const [command, ...params] = line.split(' ');

    if (command === '.exit') {
        readline.close();
        return;
    }

    try {
        controller(command, params);
        showCurrentlyPath();
    } catch(err) {
        console.error(`Operation failed: ${err.message}`);
    }
}

const start = () => {
    const username = getUserName();

    showWelocome(username);
    showCurrentlyPath();

    const readline = createInterface(
        process.stdin,
        process.stdout,
    );

    readline.on('line', (line) => { line && inputStream(line, readline); });
    readline.on('close', () => { showGoodbye(username); });
}

start();