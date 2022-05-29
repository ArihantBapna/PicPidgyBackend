import {Users} from "../schema/Users";

export interface ResponseObject {
    data : any;
    success : boolean;
    user : Users | null;
}
