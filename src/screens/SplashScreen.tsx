import React from "react";
import { View, Animated, Dimensions, Easing, Text, SafeAreaView } from "react-native";
import { Colors } from "react-native-paper";
import { Circle, G, Svg, TextPath } from "react-native-svg";
import { ScreenInterface } from "../common/AppInterface";
import { AppStyle } from "../common/AppStyle";
const {width, height} = Dimensions.get("window");
const strokeWidth = 5;
const radius = 15;
const circleCircumference = 2 * Math.PI * radius;
const halfCircle = radius + strokeWidth;
const fullCircle = halfCircle * 2;
const max = 100;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
export default function SplashScreen(props: ScreenInterface){
    const donutRef = React.useRef<any>();
    const animated = React.useRef(new Animated.Value(0)).current;
    const [value, setValue] = React.useState<string>("0%");
    React.useEffect(() => {
        Animated.timing(animated, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();

        animated.addListener((v) => {
            const maxPerc = ((100 * v.value) / max);
            const strokeDashoffset = circleCircumference - (circleCircumference * maxPerc )/100;
            setValue(`${Math.round(v.value)}%`);
            if(donutRef.current)
                donutRef.current.setNativeProps({strokeDashoffset})
        })
    }, []);

    return <View style={[AppStyle.container]}>
        <SafeAreaView style={{flex: 1}}>

            <View style={[AppStyle.container, AppStyle.center]}>
                <Svg width={width * 0.3} height={width * 0.3} viewBox={`0 0 ${fullCircle} ${fullCircle}`}>
                    <G rotation={-90} origin={`${halfCircle}, ${halfCircle}`}>
                        <Circle 
                            cx={'50%'}
                            cy={'50%'}
                            stroke={Colors.purple100}
                            strokeWidth={strokeWidth}
                            r={radius}
                            fill="transparent"
                        />
                        <AnimatedCircle 
                            ref={donutRef}
                            cx={'50%'}
                            cy={'50%'}
                            stroke={Colors.purple700}
                            strokeWidth={strokeWidth}
                            strokeDasharray={`${circleCircumference} ${circleCircumference}`}
                            strokeDashoffset={circleCircumference}
                            r={radius}
                            fill="transparent"
                            strokeLinecap={"round"}
                        />
                    </G>
                </Svg>
                <Text style={[AppStyle.p, {position: 'absolute', fontWeight: 'bold', color: Colors.pink900}]}>{value}</Text>
            </View>
        </SafeAreaView>
    </View>
}