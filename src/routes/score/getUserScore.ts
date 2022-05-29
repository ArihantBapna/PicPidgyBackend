import {ResponseObject} from "../../class/ResponseObject";
import {checkLoginFromUid} from "../login/checkLoginFromUid";

export async function getUserScore(uid : number) : Promise<ResponseObject> {

    let result = await checkLoginFromUid(uid);

    if (result.success){
        return {
            data : result.user?.score,
            success : true,
            user : result.user
        }
    }

    return {
        data : "Could not find score for user",
        success : false,
        user : null
    }
}
