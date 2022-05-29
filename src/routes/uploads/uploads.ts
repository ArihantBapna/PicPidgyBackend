import express, {Request, Response} from "express";
import {uploadFileToUserAndGroup} from "./uploadFileToUserAndGroup";
import {getUploadedFileByGroup} from "./getUploadedFileByGroup";
import {getUploadedFileByUser} from "./getUploadedFileByUser";
import {uploadImageFromString} from "./uploadImageFromString";
const uploadsRouter = express.Router();

uploadsRouter.post("/", async function(req: Request, res: Response) {
    let result = await uploadFileToUserAndGroup(req.body.uid, req.body.groupId, req.file as File | undefined);
    res.send(JSON.stringify(result));
});

uploadsRouter.post("/uploadImageString", async function(req: Request, res: Response) {
   let fileString = req.body.fileString;
   let uid = req.body.uid;
   let result = uploadImageFromString(fileString, uid);
   res.send(JSON.stringify(result));
});

uploadsRouter.post("/getGroupUploads", async function(req: Request, res: Response) {
    let result = await getUploadedFileByGroup(req.body.groupId, req.body.uid);
    res.send(JSON.stringify(result));
})

uploadsRouter.post("/getUserUploads", async function(req: Request, res: Response) {
    let result = await getUploadedFileByUser(req.body.uid);
    res.send(JSON.stringify(result));
})

export default uploadsRouter;
