import express from "express";
import ingestDocument from "../controller/doc.controller.js";
const documentRouter = express.Router();

documentRouter.post('/:documentId/ingest',ingestDocument)

export default documentRouter;
