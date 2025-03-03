import { Server } from "socket.io";
import { messageusecase } from "../../app/usecase/chat/sendmessageUsecase";
import { ChatRepository } from "../../infrastructure/db/roomRepository";
import morgan from "morgan";

const chatRepository = new ChatRepository();
const messageUseCase = new messageusecase(chatRepository);

export function setupSocket(io: Server) {
    io.on("connection", (socket) => {
      
        console.log("A user connected:", socket.id);
        
        socket.on("joinConversation", async (data) => {
            try {
                const parsedData = JSON.parse(data);
                
                if (!parsedData || !parsedData.conversationId || !parsedData.userId) {
                    console.log(parsedData);
                    return socket.emit("error", { message: "Invalid request data" });
                }
                
                const { conversationId, userId } = parsedData;
                console.log(conversationId, userId);
                console.log("joinConversation");
                
                const isUserInConversation = await messageUseCase.isuserinconverstation(userId, conversationId);
                if (!isUserInConversation) {
                    return socket.emit("error", { message: "User not in conversation" });
                }
                
                socket.join(`conversation-${conversationId}`);
                console.log(`User ${userId} joined conversation ${conversationId}`);
            } catch (error) {
                console.error("Error in joinConversation:", error);
                socket.emit("error", { message: "Server error" });
            }
        });
        socket.on("sendMessage", async (data) => {
            try {
                const parsedData = JSON.parse(data);
                
                if (!parsedData || !parsedData.conversationId || !parsedData.senderId || !parsedData.message) {
                    console.log(parsedData);
                    return socket.emit("error", { message: "Invalid request data" });
                }
                
                console.log("sendMessage");
                
                const { conversationId, senderId, message } = parsedData;
                
                const isUserInConversation = await messageUseCase.isuserinconverstation(senderId, conversationId);
                if (!isUserInConversation) {
                    console.log(isUserInConversation);
                    return socket.emit("error", { message: "User not in conversation" });
                }
                
                await messageUseCase.sendMessage(conversationId, senderId, message);
                console.log(`User ${senderId} sent message to conversation ${conversationId}`);
                
                io.to(`conversation-${conversationId}`).emit("receiveMessage", {
                    conversationId,
                    senderId,
                    message,
                    createdAt: new Date()
                });
            } catch (error) {
                console.error("Error in sendMessage:", error);
                socket.emit("error", { message: "Server error" });
            }
        });
        
        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });
    });
}
