import React from "react";
import { GiftedChat, IMessage, User } from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import { MessageFactory } from "../Factory/MessageFactory";
import { GroupChatInterface, ProfileInterface } from "../common/AppInterface";
import { getMessages, renderIMessage } from "../common/Until";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";

export function stateManagement(this: any, route: any){
    const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
    const [currentUser, setCurrentUser] = React.useState<User>();
    const [messages, setMessages] = React.useState<Array<IMessage>>([]);
    const [room, setCurrentRoom] = React.useState<GroupChatInterface>();
    const [leftId, setLeftId] = React.useState<string | number>(0);
    const [isSend, setIsSend] = React.useState<boolean>(false);
    
    this.currentUser = currentUser;
    this.setCurrentUser = setCurrentUser;
    this.messages = messages;
    this.setMessages = setMessages;
    this.room = room;
    this.setCurrentRoom = setCurrentRoom;
    this.leftId = leftId;
    this.setLeftId = setLeftId;
    this.isSend = isSend;
    this.setIsSend = setIsSend;


    React.useEffect(() => {
        if (profile) {
          this.setCurrentUser(new MessageFactory("user", profile).build());
        }
    }, [profile]);
  
    React.useEffect(() => {
      this.setCurrentRoom(route?.params.item);
    }, []);

    React.useEffect(() => {
        if (this.room){
          getData.call(this);
        }
    }, [this.room]);
}

export async function getData(this: any){
    if (!this.room) return
    let result = await getMessages(this.room.id, this.leftId);
    if(!result) return;
    let collection = result.data.map(renderIMessage);
    if(!collection || !collection.length) return
    this.setMessages((previousMessages: any) => GiftedChat.prepend(previousMessages, collection));
    this.setLeftId(collection[collection.length - 1]._id);
  }