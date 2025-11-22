import express, { type Request, type Response } from "express";
import { envs } from "./config/envs.js";
import { GithubController } from "./presentation/github/controller.js";
import { GitHubService } from "./presentation/services/github.service.js";
import { DiscordService } from "./presentation/services/discord.service.js";
import { GithubSha256Middleware } from "./presentation/middlewares/github-sha256.middleware.js";

const discordService = new DiscordService();
const gitHubService = new GitHubService();
const controller = new GithubController(gitHubService, discordService);

const main = () => {
    const app = express();

    app.use(express.json());
    app.use(GithubSha256Middleware.verifyGithubSignature);

    app.post('/api/github', controller.webhookHandler);

    app.listen(envs.PORT, () => {
        console.log(`Server listen on port ${envs.PORT}`);
    });
}

(() => {
    main();
})()

