import React from "react";
import { useSelector } from "react-redux";
import { ProfileInterface } from "../common/AppInterface";
import { getVisitProfile } from "../common/Until";
import { UserFactory } from "../Factory/UserFactory";
import { COMBINE_NAME_RELATION } from "../redux/reducers/CombineName";
import { loadRelationShipToStorage, loadStartDayInStorage } from "../untils/RelationShipUntil";

export function stateManagement(this: any){
    const titleRelationInStorage = useSelector((state:any) => state[`${COMBINE_NAME_RELATION}`]._titleRelationShipCache.get("lover"));
    const [profileLover, setProfileLover] = React.useState<ProfileInterface | null>(null);
    const [loadProfile, setLoadProfile] = React.useState<boolean>(false);
    const [countDay, setCountDay] = React.useState<number>(0);

    this.profileLover = profileLover;
    this.setProfileLover = setProfileLover;
    this.loadProfile = loadProfile;
    this.setLoadProfile = setLoadProfile;
    this.countDay = countDay;
    this.setCountDay = setCountDay;

    const syncProfileLover = async () => {
        this.setLoadProfile(true);
        let userId = await loadRelationShipToStorage("lover");
        let startDay = await loadStartDayInStorage("lover");
        if(startDay){
            let date = new Date(startDay);
            let now = Date.now();
            let diff:number = (now - date.getTime()) / (1000 * 3600 * 24);
            this.setCountDay(parseInt(diff.toString()));
        }
        if(userId){
            let resultProfile = await getVisitProfile(parseInt(userId));
            if(resultProfile)
            {
                this.setProfileLover(new UserFactory("ProfileInterface", resultProfile.profile).build());
            }
        }
        this.setLoadProfile(false);
    }
    
    React.useEffect(() => {
        if(titleRelationInStorage)
            syncProfileLover();
        else {
            this.setProfileLover(null);
            this.setCountDay(0);
        }
    }, [titleRelationInStorage]);
}

