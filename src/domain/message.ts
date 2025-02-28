export class Message {
    id: number;
    message: string;
    senderId: number;
    conversationId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, message: string, senderId: number, conversationId: number, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.message = message;
        this.senderId = senderId;
        this.conversationId = conversationId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export class conversation {
    id :Number;
    user1Id :Number;
    user2Id :Number;
    created_at :Date;
    constructor(id: number, user1id: number, user2id: number, createdAt: Date) {
        this.id = id;
        this.user1Id = user1id;
        this.user2Id = user2id;
        this.created_at = createdAt;
    }
}