import type { IChatRepository } from "../../../interface/repository/IchatRepository";

export class messageusecase {
    // chatrepostory : IChatRepository
    constructor(private chatRepository: IChatRepository) {
        // this.chatrepostory=chatRepository to check
    }
    async sendMessage(conversationId: number, senderId: number, message: string): Promise<void|null> {
        //todo add notification here 
        return await this.chatRepository.saveMessage(conversationId, senderId, message);
    }
}