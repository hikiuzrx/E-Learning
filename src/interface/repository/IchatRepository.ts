import { Message,  conversation } from "../../domain/message";

export interface IChatRepository {
    createConversation(user1Id: number, user2Id: number): Promise<number|null>;
   getconversationbyid(conversationId: number): Promise<conversation|null>;
    getConversation(user1Id: number): Promise<conversation[]|null>;
    saveMessage(conversationId: number, senderId: number, message: string): Promise<void|null>;
    foundconverstation(user1Id: number, user2Id: number): Promise<conversation|null>;
    getMessages(conversationId: number): Promise<Message[]|null>;
  }
  
