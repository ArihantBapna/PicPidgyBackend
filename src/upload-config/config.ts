import path from "path";
import {Storage} from "@google-cloud/storage";

const serviceKey = path.join(__dirname, './apikey.json');

const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'pic-pidgy-2',
});

export default storage;
