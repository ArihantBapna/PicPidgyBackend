import {ResponseObject} from "../../class/ResponseObject";
import {checkLoginFromUid} from "../login/checkLoginFromUid";
import {connectDatabase} from "../../db";

export async function getUserLeaderboard(uid : number) : Promise<ResponseObject> {
    let user = await checkLoginFromUid(uid);
    let client = connectDatabase();

    if (!user.success){
        return {
            data : "No such user found",
            success : false,
            user : null
        }
    }

    let result = await client.query("SELECT * FROM users");

    if (result.rowCount == 0){
        return {
            data : "No response found",
            success : false,
            user : null
        }
    }

    return {
        data : result.rows,
        success : true,
        user : user.user
    }
}
