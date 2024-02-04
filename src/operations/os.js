import { homedir, userInfo , cpus, EOL} from 'os'

export const os = (params) => {
    const flag = params.join('').trim();
    if (!flag.startsWith('--')) 
        throw new Error('The flag should start with "--"!'); 
    
    switch(flag) {
        case '--homedir': flagHomedir();
            break;
        case '--username': flagUsername();
            break;
        case '--cpus': flagCpus();
            break;
        case '--EOL': flagEOL();
            break;
        case '--architecture': flagArchitecture();
            break;
        default: console.log("err: flag don't exist ");
    }

}

const flagHomedir = () => { console.log(homedir()); }

const flagUsername = () => { console.log(userInfo().username); }

const flagCpus = () => {
    const info = cpus().map(item => ({
        model: item.model.trim(),
        clock_rate: item.speed / 1000 + ' GHz',
    }))
    console.log(`Amount of CPUs: ${info.length}`);
    console.table(info);
}

const flagEOL = () => { console.log(JSON.stringify(EOL)); }

const flagArchitecture = () => { console.log(process.arch); }