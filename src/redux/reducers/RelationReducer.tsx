import { Action } from 'redux';
import { RelationShipDescriptionEnum } from '../../common/AppEnum';
import { RELATION_ACTION_CLEAR, RELATION_ACTION_DELETE, RELATION_ACTION_SET } from '../actions/RelationAction';

const selectRelationShip: Array<RelationShipDescriptionEnum> = ['friend', 'daughter', 'husband', 'wife', 'son', 'grandfather', 'grandmother', 'father', 'mother', 'lover'];


export interface RelationReducerInterface{
    _relationShipCache: Map<any, any>,
    _titleRelationShipCache: Map<any, any>
    _startDayRelationShipCache: Map<any, any>
}

export interface RelationReducerAction extends Action{
    userId: number,
    relation: RelationShipDescriptionEnum,
    startDay: any
}

const _relationShipCache = new Map();
const _titleRelationShipCache = new Map();
const _startDayRelationShipCache = new Map();

const store:RelationReducerInterface = {
    _relationShipCache: _relationShipCache,
    _titleRelationShipCache: _titleRelationShipCache,
    _startDayRelationShipCache: _startDayRelationShipCache
}

export default function RelationReducer(state: any = store, action: any){
    const a: RelationReducerAction = action;
    const s: RelationReducerInterface = state;
    switch(a.type){
        case RELATION_ACTION_SET: {
            _relationShipCache.set(`${a.userId}`, a.relation);
            _titleRelationShipCache.set(a.relation, `${a.userId}`);
            _startDayRelationShipCache.set(a.relation, a.startDay);
            return {...s, _relationShipCache: _relationShipCache, _titleRelationShipCache: _titleRelationShipCache, _startDayRelationShipCache: _startDayRelationShipCache};
        }
        case RELATION_ACTION_CLEAR: {
            _relationShipCache.clear();
            _titleRelationShipCache.clear();
            _startDayRelationShipCache.clear();
            return {...s, _relationShipCache: _relationShipCache, _titleRelationShipCache: _titleRelationShipCache, _startDayRelationShipCache: _startDayRelationShipCache};
        }
        case RELATION_ACTION_DELETE: {
            let getTitle = _relationShipCache.get(`${a.userId}`);
            _relationShipCache.delete(`${a.userId}`);
            _titleRelationShipCache.delete(getTitle);
            _startDayRelationShipCache.delete(getTitle);
            return {...s, _relationShipCache: _relationShipCache, _titleRelationShipCache: _titleRelationShipCache, _startDayRelationShipCache: _startDayRelationShipCache};
        }
        default: return s;
    }
}