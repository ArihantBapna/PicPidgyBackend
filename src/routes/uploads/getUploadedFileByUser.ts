import {ResponseObject} from "../../class/ResponseObject";
import {connectDatabase} from "../../db";
import {checkLoginFromUid} from "../login/checkLoginFromUid";

export async function getUploadedFileByUser(uid : number) : Promise<ResponseObject> {
    let client = connectDatabase();
    let uploadResult = await client.query("SELECT * FROM uploads WHERE userid = $1",
        [uid]);

    let user = await checkLoginFromUid(uid);

    if (uploadResult.rowCount == 0){
        return {
            data: "No uploads for the user",
            success: false,
            user : null
        }
    }

    return {
        data : uploadResult.rows,
        success : true,
        user : user.user
    }
}
