
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
            return null;
        }
        const conversation =await this.chatRepository.foundconverstation(user1Id, user2Id)
       if ( !conversation) {//todo check type if err happened 
        const message=await this.chatRepository.createConversation(user1Id, user2Id);
     if (!message) {
        return null;
     }
        return message
           
       }
       return null
        // return await this.chatRepository.createConversation(user1Id, user2Id);
        
    }
    async getconversation(user1Id: number): Promise<conversation[]|null> {
        return await this.chatRepository.getConversation(user1Id);
    }

}