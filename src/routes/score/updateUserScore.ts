import {ResponseObject} from "../../class/ResponseObject";
import {connectDatabase} from "../../db";
import {checkLoginFromUid} from "../login/checkLoginFromUid";

export async function updateUserScore(uid : number, score : bigint ) : Promise<ResponseObject> {

    let client = connectDatabase();

    let result = await client.query("UPDATE users SET score = $1 WHERE id = $2",
        [score, uid]);

    let userResult = await checkLoginFromUid(uid);

    if (!userResult.success){
        return {
            data : "Cannot find a user with that uid",
            success : false,
            user : null
        }
    }

    if (userResult.user?.score == score){
        return {
            data : "Successfully updated score",
            success : true,
            user : userResult.user
        }
    }

    return {
        data : "Unable to update user score",
        success : false,
        user : null
    }
}
