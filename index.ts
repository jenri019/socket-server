import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";

const server = Server.instance;

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

server.app.use(cors({
    origin: true, // Allows all origins
    credentials: true, // Allows cookies to be sent
}));

server.app.use('/', router);

server.start(() => {
    console.log(`Server running on port ${server.port}`);
});