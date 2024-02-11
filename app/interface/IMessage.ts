export interface IMessage {
    content: string;
    receiverId: string;
    senderId: string;
    chat: string;
    hasSeen: boolean;
    dateTime: Date;
}
