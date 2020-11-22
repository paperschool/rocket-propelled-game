import fs from 'fs';
import path from 'path';

export default (): JSON => {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '../client/manifest.json'), 'utf8'));
    } catch (error) {
        console.log(error);
        throw Error('Manifest File Not Present');
    }
};
