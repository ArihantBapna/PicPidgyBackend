import {ResponseObject} from "../../class/ResponseObject";
import {connectDatabase} from "../../db";
import {getUserGroups} from "../groups/getUserGroups";

export async function getUploadedFileByGroup(groupId : number, userId : number) : Promise<ResponseObject>{

    let client = connectDatabase();

    let results = await client.query("SELECT * FROM uploads WHERE groupid = $1",
        [groupId]);

    if (results.rowCount == 0){
        return {
            data : "No such group",
            success : false,
            user : null
        }
    }

    // Check if user is in group
    let groups = await getUserGroups(userId);

    if (!groups.data){
        return {
            data : "User not in group",
            success : false,
            user : null
        }
    }

    let data = groups.data as string[];
    console.log(data);
    if (data.indexOf(String(groupId)) == -1) {
        return {
            data : "User not in group",
            success : false,
            user : null
        }
    }

    return {
        data : results.rows,
        success : true,
        user : null
    }

}
