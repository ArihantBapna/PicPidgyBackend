import express, {Request, Response} from "express";
import {addUserToDb} from "./addUserToDb";
const registerRouter = express.Router();

registerRouter.post("/", async function (req: Request, res: Response) {
    let result = await addUserToDb(req.body.username, req.body.password);
    res.send(JSON.stringify(result));
});

export default registerRouter;
