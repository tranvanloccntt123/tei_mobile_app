export enum RelationShipEnum{
    request = 0,
    confirm = 1,
    cancel = -1,
    me = 3
}

export const getRelationShipName = (rl: number) => {
    const indexOfS = Object.values(RelationShipEnum).indexOf(rl as unknown as RelationShipEnum);
    const key = Object.keys(RelationShipEnum)[indexOfS];
    return key;
}

export type TypeMessage = 'image' | 'text' | 'video' | 'audio' | 'file';