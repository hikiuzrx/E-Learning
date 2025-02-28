import type { Request, Response } from "express";
import { coversationeusecase } from "../app/usecase/chat/coverstationUsecase";
import { messageusecase } from "../app/usecase/chat/sendmessageUsecase";

export class ChatController {
    private coversationeusecase: coversationeusecase;
    private messageusecase: messageusecase;

    constructor(coversationeusecase: coversationeusecase, messageusecase: messageusecase) {
        this.coversationeusecase = coversationeusecase;
        this.messageusecase = messageusecase;
    }

    async getconversation(req: Request, res: Response) {
        try {
            // const user1Id = req.user?.id as number;
            const user1Id=1
            const conversations = await this.coversationeusecase.getconversation(user1Id);
            res.json(conversations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "something went wrong" });
        }
    }

    async createconversation(req: Request, res: Response) {
        try {
            //header id todo
            // const user1Id = req.user?. as number;
            const user1Id=1
            const user2Id = req.body.user2Id as number;
            const conversation = await this.coversationeusecase.createconversation(user1Id, user2Id);
            if (conversation === null) {
                res.status(500).json({ message: "something went wrong" });
            }
            res.json(conversation);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "something went wrong" });
        }
    }

    async getMessages(req: Request, res: Response) {
        try {
            const conversationId = req.params.conversationId as string;
            const messages = await this.coversationeusecase.Getbymsgconversation(Number(conversationId));
            if (messages === null) {
                res.status(500).json({ message: "something went wrong" });
            }
            res.json(messages);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "something went wrong" });
        }
    }

    async sendMessage(req: Request, res: Response) {
        try {
            const conversationId = req.params.conversationId as string;
            // const senderId = req.user?.id as number;
            const senderId=1
            const message = req.body.message as string;
            await this.messageusecase.sendMessage(Number(conversationId), senderId, message);
            res.json({ message: "message sent" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "something went wrong" });
        }
    }
}
