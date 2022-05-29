import {checkLoginFromUid} from "../login/checkLoginFromUid";
import {connectDatabase} from "../../db";
import {uploadImage} from "../../upload-util/util";

export async function uploadFileToUserAndGroup(uid: number, groupId: number, file: File | undefined){
    let client = connectDatabase();
    let user = await checkLoginFromUid(uid);

    if (!user.success){
        return {
            data : "Unable to find user with uid",
            success : false,
            user : null
        }
    }
    let imageUrl : string = "";
    try{
        imageUrl = await uploadImage(file);

    }
    catch (e) {
        console.log(e);
        return{
            data : "Unable to upload image",
            success : false,
            user : null
        }
    }

    let pushUploadResult = await client.query("INSERT INTO uploads (url, userid, groupid) VALUES ($1, $2, $3)",
        [imageUrl, uid, groupId]);

    if (pushUploadResult.rowCount == 0){
        return {
            data : "Unable to save to uploads",
            success : false,
            user : user.user
        }
    }

    return {
        data : imageUrl,
        success : true,
        user : user.user
    }

}
