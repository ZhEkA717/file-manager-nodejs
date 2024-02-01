const operations = {

}

export const controller = (command, params) => {
    if (operations.hasOwnProperty(command)) {
        
    } else {
        throw new Error('invalid command');
    }
}