import {checkLoginFromUid} from "../login/checkLoginFromUid";
import {connectDatabase} from "../../db";
import {uploadImage} from "../../upload-util/util";
import {getUserScore} from "../score/getUserScore";
import {updateUserScore} from "../score/updateUserScore";

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

    let scoreResponse = await getUserScore(uid);
    let score = (Math.floor(Math.random()*100 )+ 1) + scoreResponse.data;

    let updateScore = await updateUserScore(uid, score);

    if(!updateScore.success){
        console.log("Score is not updating properly");
    }

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
