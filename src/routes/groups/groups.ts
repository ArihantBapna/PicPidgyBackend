import express, {Request, Response} from "express";
import {getUserGroups} from "./getUserGroups";
import {addUserToGroup} from "./addUserToGroup";
import {createGroupByUser} from "./createGroupByUser";
const groupsRouter = express.Router();

groupsRouter.post("/", async function (req : Request, res : Response) {
    let result = await getUserGroups(req.body.uid);
    res.send(JSON.stringify(result));
});

groupsRouter.post("/addGroup", async function (req : Request, res : Response) {
    let result = await addUserToGroup(req.body.uid, req.body.groupId);
    res.send(JSON.stringify(result));
});

groupsRouter.post("/createGroup", async function(req :Request, res: Response) {
    let result = await createGroupByUser(req.body.uid, req.body.groupName);
    res.send(JSON.stringify(result));
})

export default groupsRouter;
