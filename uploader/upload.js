import * as Client from '@web3-storage/w3up-client'
import fs from 'node:fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { CID } from "multiformats";

const client = await Client.create()
const account = await client.login("[email]");
const __dirname = dirname(fileURLToPath(import.meta.url));
const files = [];

await account.plan.wait();
await client.setCurrentSpace('[did:key]');

fs.readdirSync(__dirname + '/src-website').forEach(file => {
    const data = fs.readFileSync(__dirname + '/src-website/' + file);
    const file_ext = path.extname(file)

    if (file == '.DS_Store') return;
    if (file_ext == '.jpg') var blob = new Blob([data], { type: "image/jpg", });
    if (file_ext == '.png') var blob = new Blob([data], { type: "image/png", });
    if (!blob) var blob = new Blob([data], { type: "text/plain", });

    files.push(new File([blob], file));
});

const directoryCid = await client.uploadDirectory(files);
console.log('https://ipfs.io/ipfs/' + CID.parse(directoryCid).toV0().toString());
console.log('https://' + directoryCid + '.ipfs.w3s.link');