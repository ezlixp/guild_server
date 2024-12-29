import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { connect } from "mongoose";
import validatePassword from "./security/passwordValidator.js";
import dotenv from "dotenv";
import GuildModel from "./models/guildModel.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

try {
    const dbUrl: string = process.env.DB_URL as string;

    connect(dbUrl).then(() => {
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
} catch (error) {
    console.error("Failed to connect to database:", error);
}

app.head("/", (request: Request, response: Response) => {
    response.send();
});

app.get("/guild/:tag", validatePassword, async (request: Request<{ tag: string }>, response: Response) => {
    try {
        const tag = request.params.tag;

        const result = await GuildModel.findOne({
            tag: tag,
        });

        if (!result) {
            response.status(404).send({
                error: "Guild could not be found",
            });
            return;
        }

        response.status(200).send(result);
    } catch (error) {
        response.status(500).send({
            error: "Something went wrong processing your request.",
        });
        console.error("getGuildError:", error);
    }
});
