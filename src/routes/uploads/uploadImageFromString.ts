import {getFileFromBase64} from "../../upload-util/getFileFromBase64";
import {uploadImage} from "../../upload-util/util";

export async function uploadImageFromString(fileString : string, uid : number) {
    let file : File = getFileFromBase64(fileString, "file.jpg");
    let imageUrl : string = "";
    try{
        imageUrl = await uploadImage(file);
        console.log(imageUrl);
    }
    catch (e) {
        console.log(e);
        return{
            data : "Unable to upload image",
            success : false,
            user : null
        }
    }

    return {
        data : imageUrl,
        success: true,
        user : null
    };
}
