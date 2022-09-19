import { Dimensions, StyleSheet } from "react-native";
const width : number = Dimensions.get("window").width;

export const AppStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    h1: {
        fontSize: width * 0.1 < 40? 40 : width * 0.1,
        fontWeight: 'bold'
    },  
    h2: {
        fontSize: width * 0.08 < 30? 30 : width * 0.08,
        fontWeight: 'bold'
    },  
    h3:{
        fontSize: width * 0.06 < 25 ? 25 : width * 0.06,
        fontWeight: 'bold'
    },
    h4:{
        fontSize: width * 0.04 < 20 ? 20 : width * 0.04,
        fontWeight: 'bold'
    },
    h5:{
        fontSize: width * 0.03 < 18 ? 18 : width * 0.03,
    },
    p: {
        fontSize: width * 0.0295 < 15? 15 : width * 0.0295
    },
    p5: {
        padding: width * 0.05
    },
    p4: {
        padding: width * 0.04
    },
    p3: {
        padding: width * 0.03
    },
    p2: {
        padding: width * 0.02
    },
    p1: {
        padding: width * 0.01
    },
    m3:{
        margin: width * 0.03
    },
    m2: {
        margin: width * 0.02
    },
    m1: {
        margin: width * 0.01
    },
    pt3: {
        paddingTop: width * 0.03
    },
    pt2: {
        paddingTop: width * 0.02
    },
    pt1: {
        paddingTop: width * 0.01
    },
    pl3: {
        paddingLeft: width * 0.03
    },
    pl2: {
        paddingLeft: width * 0.02
    },
    pl1: {
        paddingLeft: width * 0.01
    },
    pr3: {
        paddingRight: width * 0.03
    },
    pr2: {
        paddingRight: width * 0.02
    },
    pr1: {
        paddingRight: width * 0.01
    },
    pb3: {
        paddingBottom: width * 0.03
    },
    pb2: {
        paddingBottom: width * 0.02
    },
    pb1: {
        paddingBottom: width * 0.01
    },
    mt5: {
        marginTop: width * 0.05
    },
    mt4: {
        marginTop: width * 0.04
    },
    mt3: {
        marginTop: width * 0.03
    },
    mt2: {
        marginTop: width * 0.02
    },
    mt1: {
        marginTop: width * 0.01
    },
    ml5: {
        marginLeft: width * 0.05
    },
    ml4: {
        marginLeft: width * 0.04
    },
    ml3: {
        marginLeft: width * 0.03
    },
    ml2: {
        marginLeft: width * 0.02
    },
    ml1: {
        marginLeft: width * 0.01
    },
    mr5: {
        marginRight: width * 0.05
    },
    mr4: {
        marginRight: width * 0.04
    },
    mr3: {
        marginRight: width * 0.03
    },
    mr2: {
        marginRight: width * 0.02
    },
    mr1: {
        marginRight: width * 0.01
    },
    mb5: {
        marginBottom: width * 0.05
    },
    mb4: {
        marginBottom: width * 0.04
    },
    mb3: {
        marginBottom: width * 0.03
    },
    mb2: {
        marginBottom: width * 0.02
    },
    mb1: {
        marginBottom: width * 0.01
    },
});