import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GiftedChat, IMessage, Bubble, Send, InputToolbar, Day, Composer, User } from "react-native-gifted-chat";
import { black, blue, gray, grayLightPrimary2, grayPrimary, violet, white } from "../../common/Colors";
import { AppStyle } from "../../common/AppStyle";
import { esTime } from "../../untils/Time";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from "react-redux";
import { COMBINE_NAME_PROFILE } from "../../redux/reducers/CombineName";
import { ProfileInterface } from "../../common/AppInterface";
const style = StyleSheet.create({
  sendButtonContainer: { justifyContent: "center", alignItems: "center", backgroundColor: grayLightPrimary2, borderRadius: 100, width: 45, height: 45 },
  inputStyle: { borderRadius: 100, fontSize: 18, flex: 1, backgroundColor: gray, paddingHorizontal: 15, marginRight: 10, height: 45, paddingTop: 13, paddingBottom: 13 },
  headerImage: { width: 150, height: 150, backgroundColor: white, borderRadius: 150 },
  footerContainer: { backgroundColor: blue, alignSelf: "center", alignItems: "center", height: 30, margin: 10, borderRadius: 5, justifyContent: "center", paddingHorizontal: 15 }
});
interface LayoutProps {
  children?: ReactNode,
  onSend: Function,
  onMore: Function,
  messages: Array<IMessage>,
  isSend: boolean,
  onLoadMessages: Function,
  onAvatarPress: Function
};
export default function ChatDetailLayout(props: LayoutProps) {
  const isDarkMode = false;
  const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
  const [currentUser, setCurrentUser] = React.useState<User>();
  React.useEffect(() => {
    if (profile) {
      setCurrentUser({
        _id: profile.id,
        avatar: 'https://placeimg.com/140/140/any',
        name: profile.name
      });
    }
  }, [profile]);
  const onPlush = () => {
    props.onMore()
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
        props.isSend ? <View style={style.footerContainer}>
          <Text style={{ color: white, fontSize: 18 }}>Đang gửi</Text>
        </View> : null
      }
    </View>
  }, [props.isSend]);

  const renderLoadEarlier = React.useCallback(() => {
    return <View style={[{ alignItems: "center" }, AppStyle.mb3]}>
      <View style={[style.headerImage, AppStyle.mb3]} />
      <Text style={[{ fontSize: 18, fontWeight: "bold", }, { color: isDarkMode ? white : black }]}>Tran Van Loc</Text>
      <Text style={[{ fontSize: 15 }, { color: isDarkMode ? white : black }]}>Get Started</Text>
    </View>
  }, []);

  const renderComposer = (props: any) => <Composer {...props} textInputStyle={[style.inputStyle]} />

  return <View style={{ flex: 1, backgroundColor: isDarkMode ? grayPrimary : white }}>
    <GiftedChat
      messages={props.messages}
      onSend={messages => props.onSend(messages)}
      alwaysShowSend={true}
      user={currentUser}
      renderFooter={renderFooter}
      renderBubble={renderBubble}
      renderSend={renderSend}
      renderInputToolbar={renderInputToolbar}
      renderDay={renderDay}
      renderTime={renderTime}
      renderComposer={renderComposer}
      textInputProps={{
        style: style.inputStyle
      }}
      loadEarlier={true}
      renderLoadEarlier={renderLoadEarlier}
      onLoadEarlier={() => props.onLoadMessages()}
      infiniteScroll={true}
      onPressAvatar={(user) => props.onAvatarPress(user)}
    />
    {
      props.children
    }
  </View>
}