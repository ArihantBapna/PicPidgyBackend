import {connectDatabase} from "../../db";
import {ResponseObject} from "../../class/ResponseObject";

export async function getUserFromLogin(username : string, password : string) : Promise<ResponseObject> {
    let client = connectDatabase();
    let res = await client.query("SELECT * FROM users WHERE username = $1 AND password = $2",
        [username, password]);

    if (res.rowCount != 0){
        return {
            data: "",
            success: true,
            user: res.rows[0]
        };
    }
    return {
        data : "",
        success: false,
        user: null
    }

}
