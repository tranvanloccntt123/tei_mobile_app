import React from "react";
import { Dimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider, List, Text } from "react-native-paper";
import { RelationShipDescriptionEnum } from "../common/AppEnum";
import { red } from "../common/Colors";
import AppLayout from "../components/layouts/AppLayout";
const {width, height} = Dimensions.get('window');
export default function ProfileAddRelationShipScreen(){
    const scrollRef = React.useRef<any>();
    const [selected, setSelected] = React.useState<RelationShipDescriptionEnum | null>(null);
    let selectRelationShip = ['friend', 'daughter', 'husband', 'wife', 'son', 'grandfather', 'grandmother', 'father', 'mother', 'lover'];
    /**
     * 
     * 
    

     */
    const onSelectRelationShip = (item: any) => {
        setSelected(item);
        scrollRef.current?.scrollTo({x: width, y: 0, animated: true});
    }
    const selectDateTime = () => {
        let date = new Date();
    }
    return <AppLayout>
        <ScrollView ref={(ref) => scrollRef.current = ref} horizontal>
            <View style={{width: width, height: height}}>
                {
                    selectRelationShip.map((item: any) => <View key={item} >
                        <List.Item onPress={() => onSelectRelationShip(item)} title={item} />
                        <Divider />
                    </View>)
                }
            </View>
            <View style={{width: width, height: height}}>
                {
                    selectRelationShip.map((item: any) => <View key={item} >
                        <List.Item title={item} />
                        <Divider />
                    </View>)
                }
            </View>
        </ScrollView>
    </AppLayout>
}