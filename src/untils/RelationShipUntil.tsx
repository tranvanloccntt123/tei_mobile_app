import AsyncStorage from "@react-native-async-storage/async-storage";
import { RelationShipDescriptionEnum } from "../common/AppEnum";

const RELATION_STORAGE = "@teiresource.relation";

const START_RELATION_STORAGE = "@teiresource.start_relation";

const selectRelationShip: Array<RelationShipDescriptionEnum> = ['friend', 'daughter', 'husband', 'wife', 'son', 'grandfather', 'grandmother', 'father', 'mother', 'lover'];

export const deleteRelationShipInStorage = async (relation: RelationShipDescriptionEnum) => {
    await AsyncStorage.removeItem(`${RELATION_STORAGE}.${relation}`);
    await AsyncStorage.removeItem(`${START_RELATION_STORAGE}.${relation}`);
}

export const saveRelationShipToStorage = async (relation: RelationShipDescriptionEnum, userId: number, start: string) => {
    await AsyncStorage.setItem(`${RELATION_STORAGE}.${relation}`, userId.toString());
    await AsyncStorage.setItem(`${START_RELATION_STORAGE}.${relation}`, start);
}

export const loadALlRelationShip = (callback: Function) => {
    selectRelationShip.forEach(async (item: RelationShipDescriptionEnum) => {
        callback(item);
    });
}

export const loadRelationShipToStorage = async(relation: RelationShipDescriptionEnum) => {
    let result = await AsyncStorage.getItem(`${RELATION_STORAGE}.${relation}`);
    return result;
}

export const loadStartDayInStorage = async (relation: RelationShipDescriptionEnum) => {
    let result = await AsyncStorage.getItem(`${START_RELATION_STORAGE}.${relation}`);
    return result;
}