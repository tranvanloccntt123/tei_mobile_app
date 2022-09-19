import { ProfileInterface, VisitProfile } from "./AppInterface";

let cacheUser: Map<number, VisitProfile> = new Map();
export const setCacheUser = (id: number, data: VisitProfile) => {
    cacheUser.set(id, data);
}
export const getCacheUser = (id: number): VisitProfile | undefined => cacheUser.get(id);