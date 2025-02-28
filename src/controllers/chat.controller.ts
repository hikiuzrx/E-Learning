import type { Request, Response, NextFunction } from "express";
import { coversationeusecase } from "../app/usecase/chat/coverstationUsecase";
import { messageusecase } from "../app/usecase/chat/sendmessageUsecase";

export class ChatController {
    private coversationeusecase: coversationeusecase;
    private messageusecase: messageusecase;

    constructor(coversationeusecase: coversationeusecase, messageusecase: messageusecase) {
        this.coversationeusecase = coversationeusecase;
        this.messageusecase = messageusecase;
    }

    async getconversation(req: Request, res: Response, next: NextFunction) {
        try {
            const user1Id = 1;//gte from 
            const conversations = await this.coversationeusecase.getconversation(user1Id);
            res.json(conversations);
        } catch (error) {
            next(error);
        }
    }

    async createconversation(req: Request, res: Response, next: NextFunction) {
        try {
            const user1Id = 1;
            const user2Id = req.body.user2Id as number;
            const conversation = await this.coversationeusecase.createconversation(user1Id, user2Id);
            if (conversation === null) {
                return res.status(500).json({ message: "something went wrong" });
            }
            res.json(conversation);
        } catch (error) {
            next(error);
        }
    }

    async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const conversationId = req.params.conversationId as string;
            const messages = await this.coversationeusecase.Getbymsgconversation(Number(conversationId));
            if (messages === null) {
                return res.status(500).json({ message: "something went wrong" });
            }
            res.json(messages);
        } catch (error) {
            next(error);
        }
    }

    async sendMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const conversationId = req.params.conversationId as string;
            const senderId = 1;
            const message = req.body.message as string;
            await this.messageusecase.sendMessage(Number(conversationId), senderId, message);
            res.json({ message: "message sent" });
        } catch (error) {
            next(error);
        }
    }
}

