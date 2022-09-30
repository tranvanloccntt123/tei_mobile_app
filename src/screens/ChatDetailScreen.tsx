import React from "react";
import ChatDetailLayout from "../components/layouts/ChatDetailLayout";
import { ScreenInterface, GroupChatInterface } from "../common/AppInterface";
import { IMessage } from "react-native-gifted-chat";
import { GiftedChat } from "react-native-gifted-chat";
import { Modalize } from "react-native-modalize";
import ChatDetailOptions from "../components/elements/ChatDetailOptions";
import { StatusBar } from "react-native";
import { Asset } from "react-native-image-picker";
import { getMessages, renderIMessage, sendMessages } from "../common/Until";
import { PROFILE_INFO_SCREEN } from "../common/RouteName";

export default function ChatDetailScreen(props: ScreenInterface) {
  const isDarkMode = false;
  const [messages, setMessages] = React.useState<Array<IMessage>>([]);
  const [room, setCurrentRoom] = React.useState<GroupChatInterface>();
  const [leftId, setLeftId] = React.useState<string | number>(0);
  const [isSend, setIsSend] = React.useState<boolean>(false);
  const modalizeRef = React.useRef<Modalize>(null);
  React.useEffect(() => {
    setCurrentRoom(__DEV__ ? {
      id: 1,
      name: 'Test room'
    } : props.route?.item);
  }, [])

  React.useEffect(() => {
    if (room) getData();
  }, [room]);

  const getData = async () => {
    if (!room) return
    let result = await getMessages(room.id, leftId);
    if(!result) return;
    let collection = result.data.map(renderIMessage);
    if(!collection || !collection.length) return
    setMessages(previousMessages => GiftedChat.prepend(previousMessages, collection));
    setLeftId(collection[collection.length - 1]._id);
  }

  const onSend = React.useCallback(async (messages: Array<IMessage> = [], fileName?: string, typeFile?: string) => {
    if (room) {
      setIsSend(true);
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
      await sendMessages(room.id, messages[0].image? 'image' : 'text', messages[0].image? messages[0].image : messages[0].text, fileName, typeFile);
      setIsSend(false);
    }
  }, [room])

  const onMore = () => {
    modalizeRef.current?.open();
  }

  const onClose = () => {
    modalizeRef.current?.close()
  }

  const onSelectImage = (result: Asset[]) => {
    if (!result || result.length == 0) return
    // result.forEach(item => {
    //   onSend([{
    //     _id: Math.random(),
    //     text: "",
    //     createdAt: new Date(),
    //     image: item.uri,
    //     user: user()
    //   }], item.fileName, item.type);
    // });
  }

  const onOpenProfile = (user: any) => {
    if(props.navigation){
      props.navigation.navigate(PROFILE_INFO_SCREEN as never, {user: user} as never);
    }
  }

  return <ChatDetailLayout 
    onLoadMessages={getData}
    isSend={isSend} 
    messages={messages} 
    onSend={onSend} 
    onMore={onMore}
    onAvatarPress={onOpenProfile}
  >
    <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
    <Modalize ref={modalizeRef} adjustToContentHeight={true}>
      <ChatDetailOptions onBefore={onClose} onSelectImage={onSelectImage} />
    </Modalize>
  </ChatDetailLayout>
}