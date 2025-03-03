import type { Server } from "socket.io";
import { coversationeusecase } from "../../app/usecase/chat/coverstationUsecase";
import { messageusecase } from "../../app/usecase/chat/sendmessageUsecase";
import { ChatController } from "../../controllers/chat.controller";
import { ChatRepository } from "../db/roomRepository";
import express from "express";

export function chatRoutes() {
    const router = express.Router();
    
    const chatRepository = new ChatRepository();
    const conversationUseCase = new coversationeusecase(chatRepository);
    const messageUseCase = new messageusecase(chatRepository);

    const chatController = new ChatController(conversationUseCase, messageUseCase, );

    router.get("/conversation/", (req, res, next) => {
        chatController.getConversation(req, res, next);
    });
     router.post("/conversation", (req, res , next) => {
        
        chatController.createConversation(req, res, next);
     });
     router.get("/messages/:conversationId",(req, res, next)=>{chatController.getMessages(req,res,next)});
   

    return router;
}