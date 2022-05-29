import {format} from "util";
import gc from "../upload-config/config";

const bucket = gc.bucket('pidgy-storage-bucket');


/**
 *
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 * @param file
 */

export const uploadImage = (file : any) => new Promise<string>((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
        resumable: false
    });

    blobStream.on('finish', () => {
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        )
        resolve(publicUrl)
    })
        .on('error', (err) => {
            console.log(err);
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
});
