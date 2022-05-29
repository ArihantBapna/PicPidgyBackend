import {ResponseObject} from "../../class/ResponseObject";
import {checkLoginFromUid} from "../login/checkLoginFromUid";

export async function getUserGroups(uid: number) : Promise<ResponseObject> {

    let userResult = await checkLoginFromUid(uid);

    if (userResult.success){
        // Found a user with this uid
        return {
            data : userResult.user?.groupslist,
            success : true,
            user : userResult.user
        }
    }

    // Could not get the user groups
    return {
        data : "Could not find user with given uid",
        success : false,
        user : null
    }
}
