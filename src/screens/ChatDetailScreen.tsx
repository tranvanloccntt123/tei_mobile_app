import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import ChatDetailLayout from "../components/layouts/ChatDetailLayout";
import { ScreenInterface, GroupChatInterface, ProfileInterface } from "../common/AppInterface";
import { IMessage, User } from "react-native-gifted-chat";
import { GiftedChat } from "react-native-gifted-chat";
import { Modalize } from "react-native-modalize";
import ChatDetailOptions from "../components/elements/ChatDetailOptions";
import { StatusBar } from "react-native";
import { Asset } from "react-native-image-picker";
import { getMessages, renderIMessage, sendMessages } from "../common/Until";
import { PROFILE_INFO_SCREEN } from "../common/RouteName";
import { useSelector } from "react-redux";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";
import { AppStyle } from "../common/AppStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { blue, red, white } from "../common/Colors";
import { MessageFactory } from "../command/MessageFactory";
export default function ChatDetailScreen(props: ScreenInterface) {
  const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
  const [currentUser, setCurrentUser] = React.useState<User>();
  React.useEffect(() => {
    if (profile) {
      setCurrentUser(new MessageFactory("user", profile).build());
    }
  }, [profile]);
  const [messages, setMessages] = React.useState<Array<IMessage>>([]);
  const [room, setCurrentRoom] = React.useState<GroupChatInterface>();
  const [leftId, setLeftId] = React.useState<string | number>(0);
  const [isSend, setIsSend] = React.useState<boolean>(false);
  const modalizeRef = React.useRef<Modalize>(null);
  const navigation = useNavigation();
  React.useEffect(() => {
    setCurrentRoom(props.route?.params.item);
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
    if(!currentUser) return;
    if (!result || result.length == 0) return
    result.forEach(item => {
      onSend([{
        _id: Math.random(),
        text: "",
        createdAt: new Date(),
        image: item.uri,
        user: currentUser
      }], item.fileName, item.type);
    });
  }

  const onOpenProfile = (user: any) => {
    if(props.navigation){
      props.navigation.navigate(PROFILE_INFO_SCREEN as never, {user: user} as never);
    }
  }

  return <View style={[AppStyle.container, {backgroundColor: blue}]}>
    <StatusBar translucent={false} barStyle={"light-content"} />
    <SafeAreaView>
      <View style={{flexDirection: "row", marginVertical: 5, alignItems: 'center'}}>
        <TouchableOpacity style={{padding: 8}} onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={18} color={white} />
        </TouchableOpacity>
        <Text style={[AppStyle.h4, { color: white }]}>
            {props.route.params.item.name}
        </Text>
      </View>
    </SafeAreaView>
    <ChatDetailLayout 
      onLoadMessages={getData}
      isSend={isSend} 
      messages={messages} 
      onSend={onSend} 
      onMore={onMore}
      onAvatarPress={onOpenProfile}
      currentUser={currentUser}
     />
    <Modalize ref={modalizeRef} adjustToContentHeight={true}>
      <ChatDetailOptions onBefore={onClose} onSelectImage={onSelectImage} />
    </Modalize>
  </View>
}