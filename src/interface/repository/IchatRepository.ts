import { Message,  conversation } from "../../domain/message";

export interface IChatRepository {
    createConversation(user1Id: number, user2Id: number): Promise<number>;
   
    getConversation(user1Id: number, user2Id: number): Promise<conversation[]|null>;
    saveMessage(conversationId: number, senderId: number, message: string): Promise<void|null>;
    getMessages(conversationId: number): Promise<Message[]|null>;
  }
  
