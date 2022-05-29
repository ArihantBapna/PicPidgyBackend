import {connectDatabase} from "../../db";
import {ResponseObject} from "../../class/ResponseObject";
import {getUserFromLogin} from "../login/getUserFromLogin";

export async function addUserToDb(username : string, password : string) : Promise<ResponseObject>{
    let client = connectDatabase();
    let res = await client.query("INSERT INTO users (username, password, groupslist) VALUES ($1, $2, $3)",
        [username, password, []]);

    if (res.rowCount == 1) {
        // Successfully added user to the database
        let loginResult = await getUserFromLogin(username, password);

        if (loginResult.success){
            // The user is logged in now
            return {
                data : loginResult.user?.id,
                success : true,
                user : loginResult.user
            }
        }

        // The log in failed, but registration succeeded
        return {
            data : "Failed to login, but registered successfully",
            success : true,
            user : null
        }
    }

    return {
        // There was an error adding user to the database
        data : "",
        success : false,
        user : null
    }
}
