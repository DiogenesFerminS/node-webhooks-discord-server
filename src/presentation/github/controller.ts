import type { Request, Response } from "express";
import type { GitHubService } from "../services/github.service.js";
import type { DiscordService } from "../services/discord.service.js";

export class GithubController {
    constructor(
        private readonly gitHubService: GitHubService,
        private readonly discordService: DiscordService, 
    ) {}

    webhookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header('x-github-event') ?? 'unknown';
        const payload = req.body;
        let message: string;

        switch (githubEvent) {
            case 'star':
                message = this.gitHubService.onStar(payload);
                break;
            
            case 'issues':
                message = this.gitHubService.onIssues(payload);
                break;
        
            default:
                message = `Error unknow event: ${githubEvent}`;
                break;
        };

        console.log({message});
        this.discordService.notify(message)
        .then(() => res.status(202).send("Accepted") )
        .catch(() => res.status(400).json({error: 'Internal Server Error'}))
        
    }
}