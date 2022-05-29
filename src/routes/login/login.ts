import express, {Request, Response} from "express";
const loginRouter = express.Router();

import {getUserFromLogin} from "./getUserFromLogin";
import {checkLoginFromUid} from "./checkLoginFromUid";

loginRouter.post("/", async function (req: Request, res: Response) {
   let result = await getUserFromLogin(req.body.username, req.body.password);
   res.send(JSON.stringify(result));
});

loginRouter.post("/checkUser", async function (req: Request, res : Response) {
   let result = await checkLoginFromUid(req.body.uid);
   res.send(JSON.stringify(result));
});

export default loginRouter;
