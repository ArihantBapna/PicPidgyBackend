import {ResponseObject} from "../../class/ResponseObject";
import {connectDatabase} from "../../db";
import {Feed} from "../../schema/Feed";
import {checkLoginFromUid} from "../login/checkLoginFromUid";

export async function getAllUploads() : Promise<ResponseObject>{
    let client = connectDatabase();

    let uploadsResponse = await client.query("SELECT * FROM uploads");

    if (uploadsResponse.rowCount == 0){
        // There are no uploads
        return {
            data : "No users found",
            success : false,
            user : null
        }
    }
    console.log('here');


    // Get usernames from userId for every upload
    let dat = Array<Feed>();

    for (let i=0;i<uploadsResponse.rowCount;i++){
        let userResponse = uploadsResponse.rows[i];
        let usernameResp = await checkLoginFromUid(userResponse.userid);
        let x : Feed = {
            username: usernameResp.user?.username as string,
            url: uploadsResponse.rows[i].url
        }
        dat.push(x);
    }


    return {
        data: dat,
        success: true,
        user: null
    }
}
