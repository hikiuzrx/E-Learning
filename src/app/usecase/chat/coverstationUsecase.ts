
import type { conversation, Message } from "../../../domain/message";
import type { IChatRepository } from "../../../interface/repository/IchatRepository";

export class coversationeusecase {
    
    constructor(private chatRepository: IChatRepository) {

    }

    async Getbymsgconversation(conversationId: number): Promise<Message[]|null> {
       const messages = await this.chatRepository.getMessages(conversationId);
       if (!messages) {
            return null;
        }
        return messages;
    }
    async createconversation(user1Id: number, user2Id: number): Promise<number|null> {
        if (!user1Id || !user2Id) {
            throw new Error("user1Id or user2Id is missing");
        }
        const conversation =await this.chatRepository.foundconverstation(user1Id, user2Id)
       if (conversation) {
        throw new Error("conversation already exists");
       
       }
        const message=await this.chatRepository.createConversation(user1Id, user2Id);
     if (!message) {
        throw new Error(" robleem f creation ");
        
     }
        return message
    }
    async getconversation(user1Id: number): Promise<conversation[]|null> {
    const conversations = await this.chatRepository.getConversation(user1Id);
    if (!conversations) {
        return null;
    }
    return conversations;
    }

}