import "./componentscss/message.module.css";
import { IMessage } from "../interface/IMessage";
export default async function Message(isok:boolean, message:IMessage){
    if(isok){
        return (
            <div className="container">
            <div className="message-blue">
                <p className="message-content">{message.content}</p>
                <div className="message-timestamp-left" style={{overflow:'hidden',maxLines:"25"}}>SMS {message.dateTime.toString()}</div>
            </div>
        </div>
        )

    }
    else{
        return(
            <div className="container">
                <div className="message-blue">
                    <p className="message-content">{message.content}</p>
                    <div className="message-timestamp-left">SMS {message.dateTime.toString()}</div>
                </div>
            </div>
        )
    }
}