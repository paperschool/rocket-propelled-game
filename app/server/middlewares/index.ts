import { Express } from "express";
import jsonBodyParser from "./JsonBodyParser";

export default (app: Express) => {
    [jsonBodyParser].map(middlware => app.use(middlware));
}