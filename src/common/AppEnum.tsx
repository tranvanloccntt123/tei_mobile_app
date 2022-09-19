export enum RelationShipEnum{
    request = 0,
    confirm = 1,
    cancel = -1,
    me = 3
}

export const getRelationShipName = (rl: RelationShipEnum) => {
    switch(rl){
        case RelationShipEnum.request: return "request";
        case RelationShipEnum.cancel: return "cancel";
        case RelationShipEnum.confirm: return "confirm";
        case RelationShipEnum.me: return "me";
    }
}

export type TypeMessage = 'image' | 'text' | 'video' | 'audio' | 'file';