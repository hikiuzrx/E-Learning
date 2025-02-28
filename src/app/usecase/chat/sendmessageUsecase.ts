import type { IChatRepository } from "../../../interface/repository/IchatRepository";

export class messageusecase {
    constructor(private chatRepository: IChatRepository) {}
    async sendMessage(conversationId: number, senderId: number, message: string): Promise<void|null> {
        //todo add notification here 
        return await this.chatRepository.saveMessage(conversationId, senderId, message);
    }
}