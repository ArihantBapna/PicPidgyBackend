import {Client} from "pg";

let client : Client;

export function connectDatabase() : Client {
    if (!client){
        client = new Client(process.env.CONNECTION_URL);
        client.connect().then(() =>{
        }).finally(() => {
            console.log("Connected to database at " +client.database);
            return client;
        })
    }
    return client;

}
