// import type { Request, Response, NextFunction } from "express";
// import { coversationeusecase } from "../app/usecase/chat/coverstationUsecase";
// import { messageusecase } from "../app/usecase/chat/sendmessageUsecase";
// import type { Server } from "socket.io";

// export class ChatController {
//     private coversationeusecase: coversationeusecase;
//     private messageusecase: messageusecase;
//     private io: Server;

//     constructor(coversationeusecase: coversationeusecase, messageusecase: messageusecase, io: Server) {
//         this.coversationeusecase = coversationeusecase;
//         this.messageusecase = messageusecase;
//         this.io = io;
//     }

//     async getconversation(req: Request, res: Response, next: NextFunction) {
//         try {
//             const user1Id = 1;//gte from 

//             // const user1id = req.body.user1Id as number;
//             const conversations = await this.coversationeusecase.getconversation(user1Id);
//             if (conversations === null) {
//                 return res.status(500).json({ message: "something went wrong" });   
//             }
//             res.json(conversations);
//         } catch (error) {
//             next(error);
//         }
//     }

//     async createconversation(req: Request, res: Response, next: NextFunction) {
//         try {
//             const user1Id = 1;
//             // const user1id = req.body.user1Id as number;
//             const user2Id = req.body.user2Id as number;
//             const conversation = await this.coversationeusecase.createconversation(user1Id, user2Id);
//             if (conversation === null) {
//                next(new Error("conversation already exists"));
//             }
//             res.json(conversation);
//         } catch (error) {
//             next(error);
//         }
//     }

//     async getMessages(req: Request, res: Response, next: NextFunction) {
//         try {
//             const conversationId = req.params.conversationId as string;
//             const user1Id = 1;
//            const isUserInConversation = await this.messageusecase.isuserinconverstation(user1Id, Number(conversationId));
//            if (isUserInConversation===false)  {
//             next(new Error("user not in conversation"));
               
//            }
//             const messages = await this.coversationeusecase.Getbymsgconversation(Number(conversationId));
//             if (messages === null) {
//                 return res.status(500).json({ message: "something went wrong" });
//             }
//             res.json(messages);
//         } catch (error) {
//             next(error);
//         }
//     }

//     // async sendMessage(req: Request, res: Response, next: NextFunction) {
//     //     try {
//     //         const conversationId = req.params.conversationId as string;
//     //         const senderId = 1;
//     //         const message = req.body.message as string;
//     //         await this.messageusecase.sendMessage(Number(conversationId), senderId, message);
//     //         res.json({ message: "message sent" });
//     //     } catch (error) {
//     //         next(error);
//     //     }
//     // }
//     async Handlemessage(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { conversationId, message } = req.body;
//             const senderId = 1; // Assume logged-in user ID

//             const isUserInConversation = await this.messageusecase.isuserinconverstation(senderId, conversationId);
//             if (!isUserInConversation) {
//                 return res.status(403).json({ message: "User not in conversation" });
//             }

//             await this.messageusecase.sendMessage(conversationId, senderId, message);

//             // Emit the message via WebSocket
//             this.io.to(`conversation-${conversationId}`).emit("receiveMessage", {
//                 conversationId,
//                 senderId,
//                 message,
//                 createdAt: new Date()
//             });

//             res.json({ message: "Message sent successfully" });
//         } catch (error) {
//             next(error);
//         }
//     }
// }
import type { Request, Response, NextFunction } from "express";
import { coversationeusecase } from "../app/usecase/chat/coverstationUsecase";
import { messageusecase } from "../app/usecase/chat/sendmessageUsecase";
import type { Server } from "socket.io";

export class ChatController {
    private conversationUseCase: coversationeusecase;
    private messageUseCase: messageusecase;
   

    constructor(conversationUseCase: coversationeusecase, messageUseCase: messageusecase) {
        this.conversationUseCase = conversationUseCase;
        this.messageUseCase = messageUseCase;
       
    }

    async getConversation(req: Request, res: Response, next: NextFunction) {
        try {
            const user1Id = 1;
             // todo: Get user ID from request/session
            const conversations = await this.conversationUseCase.getconversation(user1Id);
            
            if (!conversations) {
                return res.status(500).json({ message: "Something went wrong" });
            }

            res.json(conversations);
        } catch (error) {
            next(error);
        }
    }

    async createConversation(req: Request, res: Response, next: NextFunction) {
        try {
            const user1Id = 1; // Replace with actual user ID from request/session
            const user2Id = req.body.user2Id as number;
            
            const conversation = await this.conversationUseCase.createconversation(user1Id, user2Id);
            if (!conversation) {
                return next(new Error("Conversation already exists"));
            }

            res.json(conversation);
        } catch (error) {
            next(error);
        }
    }

    async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const conversationId = req.params.conversationId as string;
            const user1Id = 1; // Replace with actual user ID from request/session
            
            const isUserInConversation = await this.messageUseCase.isuserinconverstation(user1Id, Number(conversationId));
            if (!isUserInConversation) {
                return next(new Error("User not in conversation"));
            }

            const messages = await this.conversationUseCase.Getbymsgconversation(Number(conversationId));
            if (!messages) {
                return res.status(500).json({ message: "Something went wrong" });
            }

            res.json(messages);
        } catch (error) {
            next(error);
        }
    }

    // async handleMessage(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { conversationId, message } = req.body;
    //         const senderId = 1; // Replace with actual user ID from request/session

    //         const isUserInConversation = await this.messageUseCase.isuserinconverstation(senderId, conversationId);
    //         if (!isUserInConversation) {
    //             return res.status(403).json({ message: "User not in conversation" });
    //         }

    //         await this.messageUseCase.sendMessage(conversationId, senderId, message);

    //         // Emit the message via WebSocket
    //         this.io.to(`conversation-${conversationId}`).emit("receiveMessage", {
    //             conversationId,
    //             senderId,
    //             message,
    //             createdAt: new Date()
    //         });

    //         res.json({ message: "Message sent successfully" });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

