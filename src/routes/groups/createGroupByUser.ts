import {ResponseObject} from "../../class/ResponseObject";
import {connectDatabase} from "../../db";
import {checkLoginFromUid} from "../login/checkLoginFromUid";

export async function createGroupByUser(uid : number, groupName : string) : Promise<ResponseObject>{

    let client = connectDatabase();
    let userResult = await checkLoginFromUid(uid);

    // First check if this is a valid uid
    if (!userResult.success){
        return {
            data : "No such user found",
            success : false,
            user : null
        }
    }

    // Insert a new group into the table groups and validate it
    let result = await client.query("INSERT INTO groups (name, members) VALUES ($1, $2)",
        [groupName, [uid]]);

    if (result.rowCount == 0){
        return {
            data : "Error creating group",
            success : false,
            user : null
        }
    }

    // Get the groupId for the newly created group
    let groupsResult = await client.query("SELECT * FROM groups WHERE name = $1",
        [groupName]);

    if (result.rowCount == 0){
        return {
            data : "Group not found",
            success : false,
            user : null
        }
    }

    // Add the groupId to the user's groups list and validate
    let addUserResult = await client.query("UPDATE users SET groupslist = array_append(groupslist, $1) WHERE id = $2",
        [groupsResult.rows[0].id, uid]);

    if (addUserResult.rowCount == 0){
        return {
            data : "Error adding user to group",
            success : false,
            user : userResult.user
        }
    }

    // Return the response
    let userResultFinal = await checkLoginFromUid(uid);

    return {
        data : "Successfully created group and added user",
        success : true,
        user : userResultFinal.user
    }
}
