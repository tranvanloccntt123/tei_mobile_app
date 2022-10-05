import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import ChatDetailLayout from "../components/layouts/ChatDetailLayout";
import { ScreenInterface } from "../common/AppInterface";
import { Bubble, Composer, Day, IMessage, InputToolbar, Send, User } from "react-native-gifted-chat";
import { GiftedChat } from "react-native-gifted-chat";
import { Modalize } from "react-native-modalize";
import ChatDetailOptions from "../components/elements/ChatDetailOptions";
import { StatusBar } from "react-native";
import { Asset } from "react-native-image-picker";
import { sendMessages } from "../common/Until";
import { PROFILE_INFO_SCREEN } from "../common/RouteName";
import { AppStyle } from "../common/AppStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { black, blue, gray, grayLightPrimary2, grayPrimary, red, violet, white } from "../common/Colors";
import { getData, stateManagement } from "../sevices/ChatServices";

import { esTime } from "../untils/Time";
import Ionicons from 'react-native-vector-icons/Ionicons'
const style = StyleSheet.create({
  sendButtonContainer: { justifyContent: "center", alignItems: "center", backgroundColor: grayLightPrimary2, borderRadius: 100, width: 45, height: 45 },
  inputStyle: { borderRadius: 100, fontSize: 18, flex: 1, backgroundColor: gray, paddingHorizontal: 15, marginRight: 10, height: 45, paddingTop: 13, paddingBottom: 13 },
  headerImage: { width: 150, height: 150, backgroundColor: white, borderRadius: 150 },
  footerContainer: { backgroundColor: blue, alignSelf: "center", alignItems: "center", height: 30, margin: 10, borderRadius: 5, justifyContent: "center", paddingHorizontal: 15 }
});
export default function ChatDetailScreen(this: any, props: ScreenInterface) {
  const isDarkMode = false;
  stateManagement.call(this, props.route);

  const modalizeRef = React.useRef<Modalize>(null);
  
  const navigation = useNavigation();

  const onSend = React.useCallback(async (messages: Array<IMessage> = [], fileName?: string, typeFile?: string) => {
    if (this.room) {
      this.setIsSend(true);
      this.setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));
      await sendMessages(this.room.id, messages[0].image? 'image' : 'text', messages[0].image? messages[0].image : messages[0].text, fileName, typeFile);
      this.setIsSend(false);
    }
  }, [this.room])

  const onMore = () => {
    modalizeRef.current?.open();
  }

  const onClose = () => {
    modalizeRef.current?.close()
  }

  const onSelectImage = (result: Asset[]) => {
    if(!this.currentUser) return;
    if (!result || result.length == 0) return
    result.forEach(item => {
      onSend([{
        _id: Math.random(),
        text: "",
        createdAt: new Date(),
        image: item.uri,
        user: this.currentUser
      }], item.fileName, item.type);
    });
  }

  const onOpenProfile = (user: any) => {
    if(props.navigation){
      props.navigation.navigate(PROFILE_INFO_SCREEN as never, {user: user} as never);
    }
  }

  const onPlush = () => {
    onMore()
  }

  const renderSend = (props: any) => <View style={{ flexDirection: "row" }}>
    <Send {...props} containerStyle={{ marginRight: 10 }} >
      <View style={style.sendButtonContainer}>
        <Ionicons name={"send-outline"} size={20} />
      </View>
    </Send>
    <TouchableOpacity onPress={onPlush} style={[style.sendButtonContainer]}>
      <Ionicons name={"ellipsis-vertical-outline"} size={20} />
    </TouchableOpacity>
  </View>

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: isDarkMode ? black : white
          },
          left: {
            color: isDarkMode ? black : white,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: isDarkMode ? grayLightPrimary2 : blue,
          },
          right: {
            backgroundColor: isDarkMode ? gray : violet,
          },
        }}
        
        renderTime={renderTime}
      />
    );
  }

  const renderInputToolbar = (props: any) => <InputToolbar
    {...props}
    primaryStyle={{
      marginHorizontal: 25
    }}
    accessoryStyle={{ color: "red" }}
    containerStyle={{
      borderTopColor: gray,
      backgroundColor: isDarkMode ? grayPrimary : white,
      paddingTop: 10
    }}
  />

  const renderDay = (props: any) => <Day {...props} textStyle={{ color: gray }} />

  const renderTime = (props: any) => {
    return <View style={[AppStyle.mb2, AppStyle.ml3, AppStyle.mr3]}>
      <Text style={{ fontSize: 13, color: isDarkMode ? violet : gray }}>{esTime(props.currentMessage.createdAt.getHours())}:{esTime(props.currentMessage.createdAt.getMinutes())}</Text>
    </View>
  }

  const renderFooter = React.useMemo(() => () => {
    return <View style={{ marginBottom: 25 }}>
      {
        this.isSend ? <View style={style.footerContainer}>
          <Text style={{ color: white, fontSize: 18 }}>Đang gửi</Text>
        </View> : null
      }
    </View>
  }, [this.isSend]);

  const renderLoadEarlier = React.useCallback(() => {
    return <View style={[{ alignItems: "center" }, AppStyle.mb3, AppStyle.pt3]}>
      <Text style={[{ fontSize: 18, fontWeight: "bold", }, { color: isDarkMode ? white : black }]}>Bắt đầu chat</Text>
    </View>
  }, []);

  const renderComposer = (props: any) => <Composer {...props} textInputStyle={[style.inputStyle]} />


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
    <View style={{backgroundColor: white, flex: 1}}>
      <GiftedChat
        listViewProps={{
          style: {marginTop: -45},
          showsVerticalScrollIndicator: false
        }}
        user={this.currentUser}
        messages={this.messages}
        showUserAvatar={true}
        infiniteScroll={true}
        textInputProps={{
          style: style.inputStyle
        }}
        loadEarlier={true}
        alwaysShowSend={true}
        onSend={messages => onSend(messages)}
        renderFooter={renderFooter}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderDay={renderDay}
        renderTime={renderTime}
        renderComposer={renderComposer}
        renderLoadEarlier={renderLoadEarlier}
        onLoadEarlier={() => getData.call(this)}
        onPressAvatar={onOpenProfile}
      />
    </View>
    <Modalize ref={modalizeRef} adjustToContentHeight={true}>
      <ChatDetailOptions onBefore={onClose} onSelectImage={onSelectImage} />
    </Modalize>
  </View>
}