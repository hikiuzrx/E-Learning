import type { IChatRepository } from "../../../interface/repository/IchatRepository";

export class messageusecase {
    
    constructor(private chatRepository: IChatRepository) {
    }
    
    async sendMessage(conversationId: number, senderId: number, message: string): Promise<void|null> {
        if (!conversationId || !senderId || !message) {
            return null
        }
        return await this.chatRepository.saveMessage(conversationId, senderId, message);
    }
    async isuserinconverstation(user1Id: number,conversationId: number): Promise<boolean> {
        const conversation = await this.chatRepository.getconversationbyid(conversationId);
        if (!conversation) {
            return false
        }
        if (conversation.user1Id === user1Id || conversation.user2Id === user1Id) {
            return true
        }
        return false
}
async getreciepentid(conversationId: number, user1Id: number): Promise<number|null> {
    const conversation = await this.chatRepository.getconversationbyid(conversationId);
    if (!conversation) {
        return null
    }
    if (conversation.user1Id === user1Id) {
        return conversation.user2Id as number
    }
    if (conversation.user2Id === user1Id) {
        return conversation.user1Id as number
    }
    return null
    }
}