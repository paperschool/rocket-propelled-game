import serverLogger from "./serverLogger";
serverLogger(true, true);

import http from "http";
import express from "express";
import path from "path";
import frontend from "./frontend";
import middlewares from "./middlewares";
import spotifriends from "./game"

const expressApp = express();
const PORT: number = 3000;

const assetPath: string = path.join(__dirname, "../client/")

middlewares(expressApp);

expressApp.use(express.static(assetPath));
expressApp.use(frontend);

const httpServer = http.createServer(expressApp);
spotifriends(httpServer);

httpServer.listen(PORT, () => console.server(`Server Listening on Port ${PORT}`));

