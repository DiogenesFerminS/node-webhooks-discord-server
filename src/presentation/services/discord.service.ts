import { envs } from "../../config/envs.js";

export class DiscordService {
    private readonly discordWebhookUrl:string = envs.DISCORD_WEBHOOK_URL;

    constructor() {}

    async notify(message: string) {
        const body = {
            content: message,
            embeds: [
                {
                    image: {url: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXM3YjVhb2Z1bzI0MjJsOHJkdTQ5N3IycGJ0emN3Z2FpZ3lpdXJqaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif'},
                }
            ]
        };

        const resp = await fetch(this.discordWebhookUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });

        if(!resp.ok) {
            console.log('Error sending message to discord')
            return false;
        }

        return true;
    }
}