import {ResponseObject} from "../../class/ResponseObject";
import {connectDatabase} from "../../db";
import {checkLoginFromUid} from "../login/checkLoginFromUid";

export async function addUserToGroup (uid : number, groupId : string) : Promise<ResponseObject> {

    let client = connectDatabase();

    let result = await client.query("UPDATE users SET groupslist = array_append(groupslist, $1) WHERE id = $2",
        [groupId, uid]);

    if (result.rowCount == 0){
        return {
            data : "Could not find user",
            success : false,
            user : null
        }
    }

    // The user has the group in their data
    // Now we add the user to the group
    let groupResult = await client.query("UPDATE groups SET members = array_append(members, $1) WHERE id=$2",
        [uid, groupId]);

    if (groupResult.rowCount == 0){
        return {
            data : "Could not find the given group",
            success : false,
            user : null
        }
    }

    let userResult = await checkLoginFromUid(uid);

    return {
        data : "Added user to group",
        success : true,
        user : userResult.user
    }
}
