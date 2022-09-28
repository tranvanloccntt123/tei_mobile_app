import AsyncStorage from "@react-native-async-storage/async-storage";
import { RelationShipDescriptionEnum } from "../common/AppEnum";
import { ProfileInterface } from "../common/AppInterface";

const RELATION_STORAGE = "@teiresource.relation";

const START_RELATION_STORAGE = "@teiresource.start_relation";

const selectRelationShip: Array<RelationShipDescriptionEnum> = ['friend', 'daughter', 'husband', 'wife', 'son', 'grandfather', 'grandmother', 'father', 'mother', 'lover'];

const _relationShipCache = new Map();

export const deleteRelationShipInStorage = async (relation: RelationShipDescriptionEnum) => {
    await AsyncStorage.removeItem(`${RELATION_STORAGE}.${relation}`);
    await AsyncStorage.removeItem(`${START_RELATION_STORAGE}.${relation}`);
}

export const saveRelationShipToStorage = async (relation: RelationShipDescriptionEnum, userId: number, start: string) => {
    await AsyncStorage.setItem(`${RELATION_STORAGE}.${relation}`, userId.toString());
    await AsyncStorage.setItem(`${START_RELATION_STORAGE}.${relation}`, start);
}

export const loadALlRelationShip = () => {
    selectRelationShip.forEach(async (item: RelationShipDescriptionEnum) => {
        await loadRelationShipToStorage(item);
    });
}

export const loadRelationShipToStorage = async(relation: RelationShipDescriptionEnum) => {
    let result = await AsyncStorage.getItem(`${RELATION_STORAGE}.${relation}`);
    if(result) {
        setCacheRelationShip(parseInt(result), relation);
        return result;
    }
    return null;
}

export const setCacheRelationShip = (userId: number, relation: RelationShipDescriptionEnum) => {
    _relationShipCache.set(userId, relation);
}

export const getCacheRelationShip = (userId: number) => {
    let result = _relationShipCache.get(userId);
    return result;
}

export const deleteCacheRelation = (userId: number) => {
    _relationShipCache.delete(userId);
}

export const clearCacheRelationShip = () => {
    _relationShipCache.clear();
}

export const loadStartDayInStorage = async (relation: RelationShipDescriptionEnum) => {
    let result = await AsyncStorage.getItem(`${START_RELATION_STORAGE}.${relation}`);
    return result;
}