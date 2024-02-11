import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IChat {
    userTwo: IUser;
    owner: string;
    messages: IMessage; 
    chatKey: string;
}