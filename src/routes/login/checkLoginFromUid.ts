import {ResponseObject} from "../../class/ResponseObject";
import {connectDatabase} from "../../db";

export async function checkLoginFromUid(uid : number) : Promise<ResponseObject> {
    let client = connectDatabase();
    let res = await client.query("SELECT * FROM users WHERE id = $1",
        [uid]);

    if (res.rowCount == 0){
        return {
            data : "",
            success : false,
            user : null
        }
    }

    return {
        data : "",
        success : true,
        user : res.rows[0]
    }
}
