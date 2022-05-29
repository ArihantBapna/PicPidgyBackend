import express, {Request, Response} from "express";
import {getUserScore} from "./getUserScore";
import {updateUserScore} from "./updateUserScore";
const scoreRouter = express.Router();

scoreRouter.post("/", async function(req :Request, res: Response) {
    let result = await getUserScore(req.body.uid);
    res.send(JSON.stringify(result));
});

scoreRouter.post("/updateScore", async function (req: Request, res : Response) {
    let result = await updateUserScore(req.body.uid, req.body.score);
    res.send(JSON.stringify(result));
});

export default scoreRouter;
